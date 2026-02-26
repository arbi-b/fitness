import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft } from 'lucide-react';

import { getPostById } from '@/lib/posts';
import { formatDateISO } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default async function AdminPreviewPage({ params }: any) {
  const post = await getPostById(params.id);
  if (!post) notFound();

  return (
    <div className="pb-10">
      <div className="pt-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to admin
        </Link>
      </div>

      <article className="mt-4 overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm dark:border-zinc-800/70 dark:bg-zinc-950">
        {post.coverImage ? (
          <div className="relative h-56 md:h-80">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        ) : null}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-xl capitalize">{post.category}</Badge>
            {post.status === 'draft' ? (
              <Badge variant="secondary" className="rounded-xl">
                DRAFT
              </Badge>
            ) : null}
          </div>

          <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">{formatDateISO(post.publishedAt)}</div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{post.title}</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>

          <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}