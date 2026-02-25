import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PostEditorForm } from '../_components/post-editor-form';

const btnSecondary =
  'inline-flex h-10 items-center justify-center rounded-2xl border border-zinc-200/70 bg-zinc-100 px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:border-zinc-800/70 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800';

export default async function NewPost({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const error = typeof sp.error === 'string' ? sp.error : '';

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">New post</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Create a new post and publish when ready.</p>
        </div>
        <Link href="/admin" className={btnSecondary}>
          Back
        </Link>
      </div>

      <Card className="mt-6 rounded-3xl">
        <CardHeader>
          <CardTitle>Post details</CardTitle>
          <CardDescription>Markdown is supported.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {error === 'missing' && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
              Please fill title, excerpt and content.
            </p>
          )}
          <PostEditorForm mode="new" />
        </CardContent>
      </Card>
    </div>
  );
}