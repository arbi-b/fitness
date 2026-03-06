"use client";

import { useEffect, useState } from "react";

export default function ConfirmClient({ token }: { token: string }) {
  const [message, setMessage] = useState("Confirming your subscription...");

  useEffect(() => {
    if (!token || token === "invalid") {
      setMessage("Invalid confirmation link.");
      return;
    }

    const run = async () => {
      const res = await fetch(`/api/confirm?token=${encodeURIComponent(token)}`);
      setMessage(
        res.ok
          ? "Email confirmed! You are now subscribed."
          : "Confirmation failed (link invalid or expired)."
      );
    };

    run().catch(() => setMessage("Confirmation failed. Please try again."));
  }, [token]);

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-semibold">Subscription Confirmation</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{message}</p>
    </div>
  );
}