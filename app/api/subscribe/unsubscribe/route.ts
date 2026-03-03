import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/subscribe/invalid", req.url));
  }

  await db`
    UPDATE subscribers
    SET unsubscribed_at = now()
    WHERE unsubscribe_token = ${token}
  `;

  return NextResponse.redirect(new URL("/subscribe/unsubscribed", req.url));
}