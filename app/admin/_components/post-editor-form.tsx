import Image from 'next/image';
import { savePostAction } from '../actions';
import type { Post } from '@/lib/posts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { key: 'training', label: 'Training' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'research', label: 'Research' },
  { key: 'programs', label: 'Programs' },
  { key: 'injury', label: 'Injury Prevention' },
];

export function PostEditorForm({
  mode,
  post,
}: {
  mode: 'new' | 'edit';
  post?: (Post & { readTime?: string }) | null;
}) {
  const p = post ?? null;

  return (
    <form action={savePostAction} className="grid gap-4">
      <input type="hidden" name="mode" value={mode} />
      {mode === 'edit' && <input type="hidden" name="id" value={p?.id || ''} />}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Title</label>
          <Input name="title" defaultValue={p?.title || ''} placeholder="Post title" required />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Slug (optional)</label>
          <Input name="slug" defaultValue={p?.slug || ''} placeholder="auto-generated-from-title" />
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Leave blank to auto-generate from the title.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Category</label>
          <select
            name="category"
            defaultValue={(p?.category || 'training').toLowerCase()}
            className="h-10 rounded-2xl border border-zinc-200/70 bg-white px-3 text-sm dark:border-zinc-800/70 dark:bg-zinc-950"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2 md:col-span-2">
          <label className="text-sm font-medium">Tags (comma-separated)</label>
          <Input name="tags" defaultValue={(p?.tags || []).join(', ')} placeholder="hypertrophy, volume, research" />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={p?.excerpt || ''}
          placeholder="Short summary shown on the homepage"
          className="min-h-[90px] w-full rounded-3xl border border-zinc-200/70 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400/60 dark:border-zinc-800/70 dark:bg-zinc-950"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Content (Markdown)</label>
        <textarea
          name="content"
          defaultValue={p?.content || ''}
          placeholder="# Your title\n\nWrite your post in Markdown…"
          className="min-h-[320px] w-full rounded-3xl border border-zinc-200/70 bg-white p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-zinc-400/60 dark:border-zinc-800/70 dark:bg-zinc-950"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Status</label>
          <select
            name="status"
            defaultValue={p?.status || 'draft'}
            className="h-10 rounded-2xl border border-zinc-200/70 bg-white px-3 text-sm dark:border-zinc-800/70 dark:bg-zinc-950"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Publish date</label>
          <Input name="publishedAt" type="date" defaultValue={(p?.publishedAt || new Date().toISOString().slice(0, 10)).slice(0, 10)} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Cover image</label>
          <input
            name="cover"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-zinc-700 file:mr-3 file:rounded-2xl file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-zinc-200 dark:text-zinc-300 dark:file:bg-zinc-900 dark:hover:file:bg-zinc-800"
          />
        </div>
      </div>

      {p?.coverImage && (
        <div className="rounded-3xl border border-zinc-200/70 p-3 dark:border-zinc-800/70">
          <p className="text-sm font-medium">Current cover</p>
          <div className="relative mt-2 h-40 overflow-hidden rounded-2xl">
            <Image src={p.coverImage} alt="Cover" fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" />
          </div>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">Upload a new image to replace it.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit">Save</Button>
        {p?.slug && (
          <a
            href={`/posts/${p.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-2xl border border-zinc-200/70 bg-zinc-100 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-200 dark:border-zinc-800/70 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            Preview
          </a>
        )}
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Tip: you can write <code>##</code> headings, lists, and links in Markdown.
        </p>
      </div>
    </form>
  );
}