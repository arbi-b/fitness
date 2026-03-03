import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifyNewPost } from "@/lib/notify";

export const runtime = "nodejs";
export const maxDuration = 60;

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: Request) {
  if (req.headers.get("x-admin-key") !== process.env.ADMIN_SECRET) {
    return unauthorized();
  }

  const body = await req.json().catch(() => null);
  const postId = body?.postId;

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  type PostRow = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    email_sent_at: string | null;
  };

  const rows = (await db`
    SELECT id, title, slug, excerpt, email_sent_at
    FROM posts
    WHERE id = ${postId}
    LIMIT 1
  `) as PostRow[];

  const post = rows[0];
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  await db`UPDATE posts SET published_at = COALESCE(published_at, now()) WHERE id = ${postId}`;

  if (!post.email_sent_at) {
    await notifyNewPost({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? undefined,
    });
    await db`UPDATE posts SET email_sent_at = now() WHERE id = ${postId}`;
  }

  return NextResponse.json({ ok: true });
}