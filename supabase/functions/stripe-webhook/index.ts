import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.25.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Email template functions
function getBookingConfirmationBuyerEmail(props: any) {
  const { creatorName, creatorTitle, amountPaid, calendlyUrl, buyerEmail } = props;
  
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f8fafc;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
<tr><td style="background:linear-gradient(135deg,#0a66c2 0%,#004182 100%);padding:40px;text-align:center;">
<h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 8px 0;">Session Confirmed! 🎉</h1>
<p style="color:rgba(255,255,255,0.9);font-size:16px;margin:0;">Your booking with ${creatorName} is all set</p>
</td></tr>
<tr><td style="padding:40px;">
<p style="color:#1e293b;font-size:16px;margin:0 0 24px 0;">Hi there,</p>
<p style="color:#1e293b;font-size:16px;margin:0 0 24px 0;">Great news! Your consultation session with <strong>${creatorName}</strong> has been confirmed.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f9ff;border:2px solid #bae6fd;border-radius:12px;margin-bottom:32px;">
<tr><td style="padding:24px;">
<h2 style="color:#0369a1;font-size:18px;font-weight:700;margin:0 0 16px 0;">Session Details</h2>
<table width="100%"><tr><td style="color:#0c4a6e;font-size:14px;padding:8px 0;"><strong>Expert:</strong></td><td style="color:#0c4a6e;font-size:14px;padding:8px 0;text-align:right;">${creatorName}</td></tr>
<tr><td style="color:#0c4a6e;font-size:14px;padding:8px 0;"><strong>Session:</strong></td><td style="color:#0c4a6e;font-size:14px;padding:8px 0;text-align:right;">${creatorTitle}</td></tr>
<tr><td style="color:#0c4a6e;font-size:14px;padding:8px 0;"><strong>Amount Paid:</strong></td><td style="color:#0c4a6e;font-size:14px;padding:8px 0;text-align:right;"><strong>$${amountPaid}</strong></td></tr>
<tr><td style="color:#0c4a6e;font-size:14px;padding:8px 0;"><strong>Duration:</strong></td><td style="color:#0c4a6e;font-size:14px;padding:8px 0;text-align:right;">30 minutes</td></tr>
</table></td></tr></table>
<h3 style="color:#1e293b;font-size:18px;font-weight:700;margin:0 0 16px 0;">📅 Next Step: Schedule Your Time</h3>
<p style="color:#475569;font-size:15px;margin:0 0 24px 0;">Click the button below to choose a time on ${creatorName}'s calendar:</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;"><tr><td align="center">
<a href="${calendlyUrl}" style="display:inline-block;background:linear-gradient(135deg,#0a66c2,#004182);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:700;font-size:16px;">Schedule Your Session</a>
</td></tr></table>
</td></tr>
<tr><td style="background-color:#f8fafc;padding:32px;text-align:center;border-top:1px solid #e2e8f0;">
<p style="color:#94a3b8;font-size:13px;margin:0 0 8px 0;">🔒 Secure payment by Stripe</p>
<p style="color:#cbd5e1;font-size:11px;margin:0;">Powered by Marrow</p>
</td></tr>
</table></td></tr></table>
</body></html>`;

  const text = `Session Confirmed!\n\nYour consultation with ${creatorName} is confirmed.\n\nSession: ${creatorTitle}\nAmount Paid: $${amountPaid}\n\nSchedule your time: ${calendlyUrl}\n\nPowered by Marrow`;
  
  return { html, text };
}

function getBookingNotificationCreatorEmail(props: any) {
  const { creatorName, buyerEmail, amountGross, amountNet, platformFee, calendlyUrl } = props;
  
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f8fafc;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
<tr><td style="background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%);padding:40px;text-align:center;">
<h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 8px 0;">New Booking! 💰</h1>
<p style="color:rgba(255,255,255,0.9);font-size:16px;margin:0;">Someone just booked time with you</p>
</td></tr>
<tr><td style="padding:40px;">
<p style="color:#1e293b;font-size:16px;margin:0 0 24px 0;">Hi ${creatorName},</p>
<p style="color:#1e293b;font-size:16px;margin:0 0 24px 0;">Congrats! You just received a new booking.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:2px solid #bbf7d0;border-radius:12px;margin-bottom:32px;">
<tr><td style="padding:24px;">
<h2 style="color:#166534;font-size:18px;font-weight:700;margin:0 0 16px 0;">Booking Details</h2>
<table width="100%"><tr><td style="color:#14532d;font-size:14px;padding:8px 0;"><strong>Client:</strong></td><td style="color:#14532d;font-size:14px;padding:8px 0;text-align:right;">${buyerEmail}</td></tr>
<tr><td style="color:#14532d;font-size:14px;padding:8px 0;"><strong>Price:</strong></td><td style="color:#14532d;font-size:14px;padding:8px 0;text-align:right;">$${amountGross}</td></tr>
<tr><td style="color:#14532d;font-size:14px;padding:8px 0;"><strong>Platform Fee:</strong></td><td style="color:#14532d;font-size:14px;padding:8px 0;text-align:right;">-$${platformFee}</td></tr>
<tr style="border-top:2px solid #bbf7d0;"><td style="color:#14532d;font-size:16px;padding:12px 0 0 0;"><strong>Your Earnings:</strong></td><td style="color:#14532d;font-size:18px;padding:12px 0 0 0;text-align:right;"><strong>$${amountNet}</strong></td></tr>
</table></td></tr></table>
<h3 style="color:#1e293b;font-size:18px;font-weight:700;margin:0 0 16px 0;">✅ What Happens Next</h3>
<p style="color:#475569;font-size:15px;margin:0 0 16px 0;">1. Client will schedule on your Calendly<br>2. You'll get a calendar invite<br>3. Show up and deliver a great session!</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr><td align="center">
<a href="https://marrow.ideatoads.com/dashboard" style="display:inline-block;background:linear-gradient(135deg,#0a66c2,#004182);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">View Dashboard</a>
</td></tr></table>
</td></tr>
<tr><td style="background-color:#f8fafc;padding:32px;text-align:center;border-top:1px solid #e2e8f0;">
<p style="color:#94a3b8;font-size:13px;margin:0 0 8px 0;">💳 Earnings available after Stripe setup</p>
<p style="color:#cbd5e1;font-size:11px;margin:0;">Powered by Marrow</p>
</td></tr>
</table></td></tr></table>
</body></html>`;

  const text = `New Booking!\n\nHi ${creatorName},\n\nYou have a new booking!\n\nClient: ${buyerEmail}\nPrice: $${amountGross}\nPlatform Fee: -$${platformFee}\nYour Earnings: $${amountNet}\n\nThe client will schedule on your Calendly calendar.\n\nView dashboard: https://marrow.ideatoads.com/dashboard`;
  
  return { html, text };
}

serve(async (req) => {
  console.log("Webhook received");
  console.log("Has SERVICE_ROLE_KEY:", !!Deno.env.get("SERVICE_ROLE_KEY"));
  console.log("Has STRIPE_SECRET_KEY:", !!Deno.env.get("STRIPE_SECRET_KEY"));

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);

  const STRIPE_SECRET_KEY = (Deno.env.get("STRIPE_SECRET_KEY") ?? "").trim();
  const STRIPE_WEBHOOK_SECRET = (Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "").trim();
  const SUPABASE_URL = (Deno.env.get("PUBLIC_SUPABASE_URL") ?? "").trim();
  const SERVICE_ROLE_KEY = (Deno.env.get("SERVICE_ROLE_KEY") ?? "").trim();
  const RESEND_API_KEY = (Deno.env.get("RESEND_API_KEY") ?? "").trim();

  if (!STRIPE_SECRET_KEY) return json({ error: "Missing STRIPE_SECRET_KEY" }, 500);
  if (!STRIPE_WEBHOOK_SECRET) return json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, 500);
  if (!SUPABASE_URL) return json({ error: "Missing PUBLIC_SUPABASE_URL" }, 500);
  if (!SERVICE_ROLE_KEY) return json({ error: "Missing SERVICE_ROLE_KEY" }, 500);

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

  const signature = req.headers.get("stripe-signature");
  if (!signature) return json({ error: "Missing stripe-signature header" }, 400);

  const rawBody = new Uint8Array(await req.arrayBuffer());
  const STRIPE_WEBHOOK_SECRET_CONNECT = (Deno.env.get("STRIPE_WEBHOOK_SECRET_CONNECT") ?? "").trim();

  let event: Stripe.Event;
  let verified = false;
  
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, STRIPE_WEBHOOK_SECRET);
    verified = true;
  } catch (err: any) {
    if (STRIPE_WEBHOOK_SECRET_CONNECT) {
      try {
        event = await stripe.webhooks.constructEventAsync(rawBody, signature, STRIPE_WEBHOOK_SECRET_CONNECT);
        verified = true;
      } catch (err2: any) {
        console.error("Both signature verifications failed");
        return json({ error: "Invalid signature" }, 400);
      }
    } else {
      console.error("Signature verification failed:", err?.message ?? err);
      return json({ error: "Invalid signature" }, 400);
    }
  }
  
  if (!verified) return json({ error: "Invalid signature" }, 400);

  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;
    
    const { error: updateError } = await supabase
      .from("users")
      .update({
        stripe_onboarding_complete: account.details_submitted || false,
        stripe_charges_enabled: account.charges_enabled || false,
        stripe_payouts_enabled: account.payouts_enabled || false,
      })
      .eq("stripe_account_id", account.id);

    if (updateError) {
      console.error("Failed to update creator Stripe status:", updateError);
      return json({ error: "Failed to update creator status" }, 500);
    }

    return json({ ok: true, event: "account.updated" }, 200);
  }

  if (event.type !== "checkout.session.completed") {
    return json({ ok: true, ignored: event.type }, 200);
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const linkedin_slug = session.metadata?.linkedin_slug;
  if (!linkedin_slug) return json({ error: "Missing linkedin_slug metadata" }, 400);

  if (!session.payment_intent || !session.amount_total) {
    return json({ error: "Missing payment_intent/amount_total" }, 400);
  }

  const amount_total_cents = session.amount_total;
  const platform_fee_cents = Math.round(amount_total_cents * 0.2);
  const creator_net_cents = amount_total_cents - platform_fee_cents;

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, full_name, title, email, booking_url")
    .eq("linkedin_slug", linkedin_slug)
    .single();

  if (userError || !user) return json({ error: "Creator not found" }, 404);

  const { data: existingOrder } = await supabase
    .from("orders")
    .select("id, balance_applied")
    .eq("stripe_checkout_session_id", session.id)
    .maybeSingle();

  if (!existingOrder) {
    const { error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      linkedin_slug,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent,
      stripe_customer_email: session.customer_details?.email,
      currency: session.currency,
      amount_total_cents,
      platform_fee_cents,
      creator_net_cents,
      status: "paid",
      paid_at: new Date().toISOString(),
      balance_applied: false,
    });

    if (orderError) {
      console.error("Order insert failed:", orderError);
      return json({ error: "Failed to record order", details: orderError.message }, 500);
    }
  } else if (existingOrder.balance_applied) {
    return json({ ok: true, already_processed: true }, 200);
  }

  const { error: balanceError } = await supabase.rpc("increment_creator_balance", {
    p_user_id: user.id,
    p_gross: amount_total_cents,
    p_platform_fee: platform_fee_cents,
    p_creator_net: creator_net_cents,
  });

  if (balanceError) {
    console.error("Balance update failed:", balanceError);
    return json({ error: "Failed to update balance", details: balanceError.message }, 500);
  }

  const { error: markError } = await supabase
    .from("orders")
    .update({ balance_applied: true })
    .eq("stripe_checkout_session_id", session.id);

  if (markError) {
    console.error("Failed to mark balance_applied:", markError);
  }

  // Send emails
  if (false && RESEND_API_KEY) {
    const buyerEmail = session.customer_details?.email;
    
    // Email to buyer
    if (buyerEmail) {
      const buyerEmailContent = getBookingConfirmationBuyerEmail({
        creatorName: user.full_name || "Your Expert",
        creatorTitle: user.title || "Consultation",
        amountPaid: (amount_total_cents / 100).toFixed(0),
        calendlyUrl: user.booking_url,
        buyerEmail,
      });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "bookings@mail.marrow.ideatoads.com",
          to: [buyerEmail],
          subject: `Your session with ${user.full_name} is confirmed`,
          html: buyerEmailContent.html,
          text: buyerEmailContent.text,
        }),
      });
    }

    // Email to creator
    if (user.email) {
      const creatorEmailContent = getBookingNotificationCreatorEmail({
        creatorName: user.full_name || "there",
        buyerEmail: buyerEmail || "Client",
        amountGross: (amount_total_cents / 100).toFixed(0),
        amountNet: (creator_net_cents / 100).toFixed(0),
        platformFee: (platform_fee_cents / 100).toFixed(0),
        calendlyUrl: user.booking_url,
      });

      console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);
console.log("RESEND_API_KEY length:", RESEND_API_KEY?.length);

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "bookings@mail.marrow.ideatoads.com",
          to: [user.email],
          subject: "New Booking! 💰",
          html: creatorEmailContent.html,
          text: creatorEmailContent.text,
        }),
      });
    }
  }

  return json({ ok: true }, 200);
});