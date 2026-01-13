"use client";

import { useEffect, useState } from "react";

const VERIFY_URL =
  "https://mqvuqmysklmkjtarmods.supabase.co/functions/v1/verify-session";

export default function SuccessPage() {
  const [msg, setMsg] = useState("Verifying your payment…");

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const session_id = params.get("session_id");

      if (!session_id) {
        setMsg("Missing session_id. Please go back and try again.");
        return;
      }

      try {
        const res = await fetch(VERIFY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id }),
        });

        const data = await res.json();

        if (!res.ok || !data?.paid || !data?.booking_url) {
          setMsg("We couldn’t verify payment yet. Refresh in a few seconds.");
          return;
        }

        setMsg("Verified ✅ Redirecting you to booking…");
        window.location.href = data.booking_url;
      } catch {
        setMsg("Error verifying payment. Please refresh or contact support.");
      }
    })();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 40, maxWidth: 720, margin: "0 auto" }}>
      <h1>Payment received ✅</h1>
      <p>{msg}</p>
    </main>
  );
}
