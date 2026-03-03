import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return NextResponse.redirect(new URL("/subscribe/invalid", req.url));

  const { rowCount } = await sql`
    UPDATE subscribers
    SET confirmed_at = now(), confirm_token = NULL
    WHERE confirm_token = ${token} AND unsubscribed_at IS NULL
  `;

  return NextResponse.redirect(new URL(rowCount ? "/subscribe/success" : "/subscribe/invalid", req.url));
}