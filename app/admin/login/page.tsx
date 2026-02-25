import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createSessionToken, getCookieName, isPasswordValid } from '@/lib/auth';

async function loginAction(formData: FormData) {
  'use server';

  const password = String(formData.get('password') || '');

  if (!password) {
    redirect('/admin/login?error=missing');
  }

  const ok = isPasswordValid(password);
  if (!ok) {
    redirect('/admin/login?error=invalid');
  }

  const token = createSessionToken();

  const jar = await cookies();
  jar.set({
    name: getCookieName(),
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/admin');
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const error = typeof sp.error === 'string' ? sp.error : '';

  return (
    <div className="mx-auto max-w-md py-12">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Admin login</CardTitle>
          <CardDescription>Enter your admin password to manage posts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
              {error === 'invalid' ? 'Wrong password.' : 'Please enter a password.'}
            </p>
          )}

          <form action={loginAction} className="space-y-3">
            <Input type="password" name="password" placeholder="Admin password" required />
            <Button className="w-full">Login</Button>
          </form>

          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Tip: set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code> in <code>.env.local</code>.
          </p>

          <Link href="/" className="inline-flex text-sm text-zinc-700 hover:underline dark:text-zinc-300">
            Back to site
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}