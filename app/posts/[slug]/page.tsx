import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';

import { getPostBySlug } from '@/lib/posts';
import { formatDateISO } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pb-10">
      <div className="pt-8">
        <Link
          href="/#posts"
          className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to posts
        </Link>
      </div>

      <article className="mt-4 overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
        <div className="relative h-56 md:h-80">
          <Image
            src={post.coverImage || '/uploads/cover-1.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-xl capitalize">{post.category}</Badge>
              {(post.tags || []).slice(0, 4).map((t) => (
                <Badge key={t} variant="secondary" className="rounded-xl">
                  #{t}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {formatDateISO(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {(post as any).readTime}
              </span>
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>

          <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}