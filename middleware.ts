import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookieName, verifySessionToken } from '@/lib/auth-edge';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  const token = req.cookies.get(getCookieName())?.value;
  const secret = process.env.ADMIN_SECRET || '';
  const ok = token && secret ? await verifySessionToken(token, secret) : false;

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/admin/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};