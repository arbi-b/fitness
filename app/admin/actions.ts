'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { nanoid } from 'nanoid';

import { deletePost, getPostById, upsertPost } from '@/lib/posts';
import { safeFilename, slugify } from '@/lib/utils';

export async function savePostAction(formData: FormData) {
  const mode = String(formData.get('mode') || 'edit');

  const id = String(formData.get('id') || '').trim() || `post_${nanoid(10)}`;

  const title = String(formData.get('title') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const category = String(formData.get('category') || 'training').trim().toLowerCase();
  const tagsRaw = String(formData.get('tags') || '');
  const status = (String(formData.get('status') || 'draft') as 'published' | 'draft') || 'draft';
  const publishedAt = String(formData.get('publishedAt') || '').trim() || new Date().toISOString().slice(0, 10);
  const content = String(formData.get('content') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();

  if (!title || !excerpt || !content) {
    redirect(mode === 'new' ? '/admin/new?error=missing' : `/admin/edit/${id}?error=missing`);
  }

  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  // Handle cover upload
  const coverFile = formData.get('cover') as unknown as File | null;
  let coverImage: string | undefined = undefined;

  const prev = await getPostById(id);
  if (prev?.coverImage) coverImage = prev.coverImage;

  if (coverFile && typeof coverFile === 'object' && 'arrayBuffer' in coverFile && (coverFile as any).size > 0) {
    const buf = Buffer.from(await coverFile.arrayBuffer());
    const ext = path.extname((coverFile as any).name || '').toLowerCase() || '.jpg';
    const fname = `${Date.now()}-${safeFilename(slugify(title) || 'cover')}${ext}`;
    const outDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, fname), buf);
    coverImage = `/uploads/${fname}`;
  }

  const post = await upsertPost(id, {
    title,
    excerpt,
    category,
    tags,
    coverImage,
    status,
    publishedAt,
    content,
    slug: slugInput || undefined,
  });

  revalidatePath('/');
  revalidatePath(`/posts/${post.slug}`);
  revalidatePath('/admin');

  redirect('/admin');
}

export async function deletePostAction(formData: FormData) {
  const id = String(formData.get('id') || '').trim();
  if (!id) redirect('/admin');

  await deletePost(id);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}