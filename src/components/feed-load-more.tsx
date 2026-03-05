'use client';

import { useState } from 'react';
import { PostCard } from '@/components/post-card';
import type { Post } from '@/lib/posts';

export function FeedLoadMore({
  posts,
  pageSize = 5,
}: {
  posts: (Post & { readTime?: string })[];
  pageSize?: number;
}) {
  const [visible, setVisible] = useState(pageSize);

  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <div className="space-y-4">
      {shown.map((p) => (
        <PostCard key={p.id} post={p as any} />
      ))}

      <div className="flex justify-center pt-2 pb-8">
        {hasMore ? (
          <button
            onClick={() => setVisible((v) => Math.min(v + pageSize, posts.length))}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-6 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Load more
          </button>
        ) : posts.length > 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">No more posts.</p>
        ) : null}
      </div>
    </div>
  );
}