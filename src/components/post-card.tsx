import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/lib/posts';
import { formatDateISO } from '@/lib/utils';

export function PostCard({ post }: { post: Post & { readTime?: string } }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/70 dark:bg-zinc-950">
      <div className="grid md:grid-cols-12">
        <div className="relative h-44 md:col-span-4 md:h-full">
          <Image
            src={post.coverImage || '/uploads/cover-1.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
        <div className="md:col-span-8">
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-xl">
                  <Tag className="mr-1 h-3.5 w-3.5" /> {post.tags?.[0] || post.category}
                </Badge>
                <Badge variant="secondary" className="rounded-xl capitalize">
                  {post.category}
                </Badge>
                {post.status === 'draft' && (
                  <Badge variant="secondary" className="rounded-xl">
                    Draft
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {formatDateISO(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {(post as any).readTime ?? ''}
                </span>
              </div>
            </div>

            <h2 className="mt-3 text-xl font-semibold tracking-tight leading-snug">
              <Link className="hover:underline underline-offset-4" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>

            <div className="mt-4 flex items-center justify-between">
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Continue reading <span aria-hidden>→</span>
              </Link>
              <div className="text-xs text-zinc-500">{(post.tags || []).slice(0, 3).map((t) => `#${t}`).join(' ')}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}