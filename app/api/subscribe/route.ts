import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resend, RESEND_FROM, SITE_URL } from "@/lib/resend";

export const runtime = "nodejs";

const Schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const confirm_token = crypto.randomUUID();
  const unsubscribe_token = crypto.randomUUID();

  await db`
    INSERT INTO subscribers (email, confirm_token, unsubscribe_token, confirmed_at, unsubscribed_at)
    VALUES (${email}, ${confirm_token}, ${unsubscribe_token}, NULL, NULL)
    ON CONFLICT (email) DO UPDATE
    SET confirm_token = EXCLUDED.confirm_token,
        unsubscribed_at = NULL,
        confirmed_at = NULL
  `;

  const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${confirm_token}`;

  await resend.emails.send({
    from: RESEND_FROM,
    to: email,
    subject: "Confirm your subscription",
    html: `
      <div style="font-family:system-ui">
        <h2>Confirm subscription</h2>
        <p><a href="${confirmUrl}">Click here to confirm</a></p>
        <p>If you didn’t request this, ignore it.</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}