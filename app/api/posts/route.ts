import { NextResponse } from 'next/server';
import { listPublishedPostsPage } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') || '6');
  const cursor = searchParams.get('cursor') || '';

  const data = await listPublishedPostsPage({ limit, cursor });
  return NextResponse.json(data);
}