import Link from 'next/link';
import { listPosts } from '@/lib/posts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateISO } from '@/lib/utils';
import { deletePostAction } from './actions';

const btnPrimary =
  'inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200';
const btnSecondary =
  'inline-flex h-10 items-center justify-center rounded-2xl border border-zinc-200/70 bg-zinc-100 px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:border-zinc-800/70 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800';

export default async function AdminDashboard() {
  const posts = await listPosts({ includeDrafts: true, sort: 'newest' });

  return (
    <div className="py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Create, edit, and publish posts.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/new" className={btnPrimary}>
            New post
          </Link>
          <Link href="/api/admin/logout" className={btnSecondary}>
            Logout
          </Link>
        </div>
      </div>

      <Card className="mt-6 rounded-3xl">
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>{posts.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-500">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {posts.map((p) => (
                  <tr key={p.id} className="align-top">
                    <td className="py-3 pr-4 min-w-[260px]">
                      <div className="font-medium">{p.title}</div>
                      <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-[520px]">{p.excerpt}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={p.status === 'published' ? 'default' : 'secondary'} className="rounded-xl">
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 capitalize">{p.category}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{formatDateISO(p.publishedAt)}</td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/posts/${p.slug}`} className="text-sm hover:underline underline-offset-4">
                          View
                        </Link>
                        <Link href={`/admin/edit/${p.id}`} className="text-sm hover:underline underline-offset-4">
                          Edit
                        </Link>
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={p.id} />
                          <button className="text-sm text-red-600 hover:underline underline-offset-4">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts.length === 0 && <p className="text-sm text-zinc-600 dark:text-zinc-400">No posts yet. Create your first one.</p>}
        </CardContent>
      </Card>

      <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
        Storage is file-based: posts are saved to <code>data/posts.json</code> and cover images to <code>public/uploads</code>.
      </p>
    </div>
  );
}