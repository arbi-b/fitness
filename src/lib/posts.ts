import fs from 'node:fs/promises';
import path from 'node:path';
import { estimateReadTimeMinutes, slugify } from './utils';

export type PostStatus = 'published' | 'draft';

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage?: string; // /uploads/...
  status: PostStatus;
  publishedAt: string; // ISO date
  content: string; // markdown
};

export type PostInput = Omit<Post, 'id' | 'slug'> & { slug?: string };

const DATA_PATH = path.join(process.cwd(), 'data', 'posts.json');

async function ensureStore(): Promise<void> {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify({ posts: [] }, null, 2), 'utf8');
  }
}

async function readStore(): Promise<{ posts: Post[] }> {
  await ensureStore();
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return { posts: Array.isArray(parsed.posts) ? parsed.posts : [] };
  } catch {
    return { posts: [] };
  }
}

async function writeStore(store: { posts: Post[] }): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export function withDerived(post: Post) {
  const minutes = estimateReadTimeMinutes(post.content);
  return { ...post, readTime: `${minutes} min read` };
}

export async function listPosts(opts?: {
  includeDrafts?: boolean;
  category?: string;
  query?: string;
  sort?: 'newest' | 'oldest';
}) {
  const { posts } = await readStore();
  const includeDrafts = opts?.includeDrafts ?? false;
  const category = (opts?.category || '').toLowerCase();
  const q = (opts?.query || '').trim().toLowerCase();

  let filtered = posts.filter((p) => includeDrafts || p.status === 'published');

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => (p.category || '').toLowerCase() === category);
  }

  if (q) {
    filtered = filtered.filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${p.category} ${(p.tags || []).join(' ')} ${p.content}`.toLowerCase();
      return hay.includes(q);
    });
  }

  filtered.sort((a, b) => {
    const da = new Date(a.publishedAt).getTime();
    const db = new Date(b.publishedAt).getTime();
    return (opts?.sort ?? 'newest') === 'newest' ? db - da : da - db;
  });

  return filtered.map(withDerived);
}

export async function getPostBySlug(slug: string, includeDrafts = false) {
  const { posts } = await readStore();
  const found = posts.find((p) => p.slug === slug && (includeDrafts || p.status === 'published'));
  return found ? withDerived(found) : null;
}

export async function getPostById(id: string) {
  const { posts } = await readStore();
  const found = posts.find((p) => p.id === id);
  return found ? withDerived(found) : null;
}

export async function upsertPost(id: string, input: PostInput): Promise<Post> {
  const store = await readStore();
  const existingIndex = store.posts.findIndex((p) => p.id === id);

  const finalSlug = (input.slug && input.slug.trim()) ? slugify(input.slug) : slugify(input.title);

  const base = finalSlug || `post-${id}`;
  let slug = base;
  let n = 2;
  while (store.posts.some((p) => p.slug === slug && p.id !== id)) {
    slug = `${base}-${n++}`;
  }

  const post: Post = {
    id,
    slug,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    tags: input.tags,
    coverImage: input.coverImage,
    status: input.status,
    publishedAt: input.publishedAt,
    content: input.content,
  };

  if (existingIndex >= 0) {
    store.posts[existingIndex] = post;
  } else {
    store.posts.unshift(post);
  }

  await writeStore(store);
  return post;
}

export async function deletePost(id: string): Promise<void> {
  const store = await readStore();
  store.posts = store.posts.filter((p) => p.id !== id);
  await writeStore(store);
}