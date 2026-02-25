import { NextResponse } from 'next/server';
import { getCookieName } from '@/lib/auth';

export async function GET(req: Request) {
  const url = new URL('/', req.url);
  const res = NextResponse.redirect(url);
  res.cookies.set({ name: getCookieName(), value: '', path: '/', maxAge: 0 });
  return res;
}