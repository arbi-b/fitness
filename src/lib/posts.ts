import { sql } from '@vercel/postgres';
import { estimateReadTimeMinutes, slugify } from './utils';

export type PostStatus = 'published' | 'draft';

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage?: string;
  status: PostStatus;
  publishedAt: string; // YYYY-MM-DD
  content: string;
};

export type PostInput = Omit<Post, 'id' | 'slug'> & { slug?: string };

export function withDerived(post: Post) {
  const minutes = estimateReadTimeMinutes(post.content);
  return { ...post, readTime: `${minutes} min read` };
}

function normalizeCategory(cat?: string) {
  const c = (cat || '').trim().toLowerCase();
  if (!c || c === 'all') return '';
  return c;
}

export async function listPosts(opts?: {
  includeDrafts?: boolean;
  category?: string;
  query?: string;
  sort?: 'newest' | 'oldest';
}) {
  const includeDrafts = opts?.includeDrafts ?? false;
  const category = normalizeCategory(opts?.category);
  const q = (opts?.query || '').trim();
  const like = q ? `%${q}%` : '';

  const order = (opts?.sort ?? 'newest') === 'oldest' ? 'ASC' : 'DESC';

  // Two queries only to keep ORDER BY simple & safe
  const { rows } =
    order === 'ASC'
      ? await sql<Post>`
          SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            tags,
            cover_image AS "coverImage",
            status,
            to_char(published_at, 'YYYY-MM-DD') AS "publishedAt",
            content
          FROM posts
          WHERE (${includeDrafts} OR status = 'published')
            AND (${category} = '' OR lower(category) = lower(${category}))
            AND (
              ${like} = '' OR
              title ILIKE ${like} OR
              excerpt ILIKE ${like} OR
              content ILIKE ${like} OR
              array_to_string(tags, ' ') ILIKE ${like}
            )
          ORDER BY published_at ASC;
        `
      : await sql<Post>`
          SELECT
            id,
            slug,
            title,
            excerpt,
            category,
            tags,
            cover_image AS "coverImage",
            status,
            to_char(published_at, 'YYYY-MM-DD') AS "publishedAt",
            content
          FROM posts
          WHERE (${includeDrafts} OR status = 'published')
            AND (${category} = '' OR lower(category) = lower(${category}))
            AND (
              ${like} = '' OR
              title ILIKE ${like} OR
              excerpt ILIKE ${like} OR
              content ILIKE ${like} OR
              array_to_string(tags, ' ') ILIKE ${like}
            )
          ORDER BY published_at DESC;
        `;

  return rows.map(withDerived);
}

export async function getPostBySlug(slug: string, includeDrafts = false) {
  const { rows } = await sql<Post>`
    SELECT
      id,
      slug,
      title,
      excerpt,
      category,
      tags,
      cover_image AS "coverImage",
      status,
      to_char(published_at, 'YYYY-MM-DD') AS "publishedAt",
      content
    FROM posts
    WHERE slug = ${slug}
      AND (${includeDrafts} OR status = 'published')
    LIMIT 1;
  `;
  return rows[0] ? withDerived(rows[0]) : null;
}

export async function getPostById(id: string) {
  const { rows } = await sql<Post>`
    SELECT
      id,
      slug,
      title,
      excerpt,
      category,
      tags,
      cover_image AS "coverImage",
      status,
      to_char(published_at, 'YYYY-MM-DD') AS "publishedAt",
      content
    FROM posts
    WHERE id = ${id}
    LIMIT 1;
  `;
  return rows[0] ? withDerived(rows[0]) : null;
}

async function ensureUniqueSlug(id: string, baseSlug: string) {
  const base = baseSlug || `post-${id}`;
  let candidate = base;
  let n = 2;

  while (true) {
    const { rows } = await sql`SELECT 1 FROM posts WHERE slug = ${candidate} AND id <> ${id} LIMIT 1;`;
    if (rows.length === 0) return candidate;
    candidate = `${base}-${n++}`;
  }
}

export async function upsertPost(id: string, input: PostInput): Promise<Post> {
  const baseSlug = (input.slug && input.slug.trim()) ? slugify(input.slug) : slugify(input.title);
  const slug = await ensureUniqueSlug(id, baseSlug);

  const publishedAt = input.publishedAt || new Date().toISOString().slice(0, 10);

  const { rows } = await sql<Post>`
    INSERT INTO posts (
      id, slug, title, excerpt, category, tags, cover_image, status, published_at, content, updated_at
    )
    VALUES (
      ${id},
      ${slug},
      ${input.title},
      ${input.excerpt},
      ${input.category},
      ${(input.tags ?? []) as unknown as any},      ${input.coverImage || null},
      ${input.status},
      ${publishedAt}::date,
      ${input.content},
      now()
    )
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      category = EXCLUDED.category,
      tags = EXCLUDED.tags,
      cover_image = EXCLUDED.cover_image,
      status = EXCLUDED.status,
      published_at = EXCLUDED.published_at,
      content = EXCLUDED.content,
      updated_at = now()
    RETURNING
      id,
      slug,
      title,
      excerpt,
      category,
      tags,
      cover_image AS "coverImage",
      status,
      to_char(published_at, 'YYYY-MM-DD') AS "publishedAt",
      content;
  `;

  return rows[0];
}

export async function deletePost(id: string): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id};`;
}