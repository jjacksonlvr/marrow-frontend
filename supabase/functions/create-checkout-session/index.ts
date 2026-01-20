// supabase/functions/create-checkout-session/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") return json({ error: "Use POST" }, 405);

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const SUPABASE_URL = Deno.env.get("PUBLIC_SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY");

    if (!STRIPE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return json(
        {
          error:
            "Missing env vars. Need STRIPE_SECRET_KEY, PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY.",
        },
        500,
      );
    }

    let payload: any = {};
    try {
      payload = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const linkedin_slug = String(payload.linkedin_slug ?? "").trim();
    if (!linkedin_slug) return json({ error: "linkedin_slug is required" }, 400);

    const success_url =
      String(payload.success_url ?? "").trim() ||
      "https://marrow.ideatoads.com/success?session_id={CHECKOUT_SESSION_ID}";
    const cancel_url =
      String(payload.cancel_url ?? "").trim() ||
      "https://marrow.ideatoads.com/cancel";

    const PLATFORM_FEE_BPS = 2000; // 20%

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: user, error: userErr } = await supabase
      .from("users")
      .select("id, linkedin_slug, is_active, title, description, price_cents, booking_url, stripe_account_id, stripe_charges_enabled")
      .eq("linkedin_slug", linkedin_slug)
      .eq("is_active", true)
      .maybeSingle();

    if (userErr) return json({ error: `Supabase error: ${userErr.message}` }, 500);
    if (!user) return json({ error: "No active offer for this profile" }, 404);

    const booking_url = String(user.booking_url ?? "").trim();
    if (!booking_url) {
      return json(
        { error: "Creator has no booking_url set yet (cannot checkout)" },
        400,
      );
    }

    const title =
      String(user.title ?? "Priority Meeting").trim() || "Priority Meeting";
    const description =
      String(user.description ?? "Paid session").trim() || "Paid session";

    const amount_total_cents = Number(user.price_cents);
    if (!Number.isFinite(amount_total_cents) || amount_total_cents < 100) {
      return json(
        { error: "Invalid price (expected cents) on creator record" },
        400,
      );
    }

    const platform_fee_cents = Math.round(
      (amount_total_cents * PLATFORM_FEE_BPS) / 10000,
    );
    const creator_net_cents = amount_total_cents - platform_fee_cents;

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

    // Check if creator has Stripe Connect set up
    const useConnectAccount = user.stripe_account_id && user.stripe_charges_enabled;

    // Build checkout session config
    const sessionConfig: any = {
      mode: "payment",
      success_url,
      cancel_url,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount_total_cents,
            product_data: {
              name: title,
              description,
            },
          },
        },
      ],
      metadata: {
        user_id: String(user.id),
        linkedin_slug: String(user.linkedin_slug),
        amount_total_cents: String(amount_total_cents),
        platform_fee_cents: String(platform_fee_cents),
        creator_net_cents: String(creator_net_cents),
        booking_url,
      },
    };

    // Only use Connect if creator has Stripe set up
    if (useConnectAccount) {
      sessionConfig.payment_intent_data = {
        application_fee_amount: platform_fee_cents,
        transfer_data: {
          destination: user.stripe_account_id,
        },
      };
    }

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create(sessionConfig);
    } catch (e: any) {
      console.error("Stripe create session failed:", e);
      return json(
        {
          error: "Stripe error creating checkout session",
          details: e?.message ?? String(e),
        },
        500,
      );
    }

    if (!session.url) {
      return json({ error: "Stripe did not return a session URL" }, 500);
    }

    return json({
      url: session.url,
      amount_total_cents,
      platform_fee_cents,
      creator_net_cents,
    });
  } catch (e: any) {
    console.error("Unhandled create-checkout-session error:", e);
    return json(
      { error: "Internal server error", details: e?.message ?? String(e) },
      500,
    );
  }
});