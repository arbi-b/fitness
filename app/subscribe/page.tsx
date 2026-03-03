"use client";

import { useState } from "react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setStatus(res.ok ? "done" : "error");
  }

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-semibold">Newsletter</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Get an email whenever I publish a new post.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 rounded-xl border px-3 py-2 bg-transparent"
        />
        <button className="rounded-xl border px-4 py-2">
          {status === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </form>

      {status === "done" && <p className="mt-3 text-sm">Check your email to confirm.</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-500">Error. Try again.</p>}
    </div>
  );
}