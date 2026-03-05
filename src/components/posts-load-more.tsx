'use client';

import { useState } from 'react';
import { PostCard } from '@/components/post-card';
import type { Post } from '@/lib/posts';

export function PostsLoadMore({
  initialPosts,
  initialCursor,
  pageSize = 6,
}: {
  initialPosts: (Post & { readTime?: string })[];
  initialCursor: string | null;
  pageSize?: number;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [loading, setLoading] = useState(false);

  async function onLoadMore() {
    if (!cursor || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/posts?limit=${pageSize}&cursor=${encodeURIComponent(cursor)}`, {
        cache: 'no-store',
      });
      const data = await res.json();

      setPosts((p) => [...p, ...(data.posts || [])]);
      setCursor(data.nextCursor ?? null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div className="flex justify-center">
        {cursor ? (
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white px-5 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-800/70 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
        ) : (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">No more posts.</p>
        )}
      </div>
    </div>
  );
}