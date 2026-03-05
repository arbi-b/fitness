import Link from 'next/link';
import { Search, Flame, FlaskConical, Mail, ArrowRight } from 'lucide-react';
import { listPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { FeedLoadMore } from '@/components/feed-load-more';
import { listPublishedPostsPage } from '@/lib/posts';

const CATEGORY_LABELS: Array<{ key: string; label: string }> = [
  { key: 'training', label: 'Training' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'research', label: 'Research' },
  { key: 'programs', label: 'Programs' },
  { key: 'injury', label: 'Injury Prevention' },
];

function ButtonLink({ href, active, icon, children }: { href: string; active?: boolean; icon?: React.ReactNode; children: React.ReactNode }) {
  const cls = cn(
    'inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium transition',
    active
      ? 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200'
      : 'border border-zinc-200/70 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:border-zinc-800/70 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
  );

  return (
    <Link href={href} className={cls}>
      {icon}
      {children}
    </Link>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const q = typeof sp.q === "string" ? sp.q : "";
  const cat = typeof sp.cat === "string" ? sp.cat : "all";
  const tab = typeof sp.tab === "string" ? sp.tab : "latest";

  const effectiveCategory = tab === "research" ? "research" : cat;

  const all = await listPosts({
    category: effectiveCategory === "all" ? undefined : effectiveCategory,
    query: q,
    sort: "newest",
  });

  // Popular: demo logic (tagged 'popular' first; fallback to newest)
  const popular =
    tab === "popular"
      ? all.filter((p) => (p.tags || []).some((t) => t.toLowerCase() === "popular"))
      : [];
  const feedSource = tab === "popular" && popular.length ? popular : all;

  const pageSize = 5;
  const feed = feedSource; // full list now (Load more will handle the paging)
  const trending = all.slice(0, 4);

  const makeQuery = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = {
      q: q || undefined,
      cat: effectiveCategory !== "all" ? effectiveCategory : undefined,
      tab: tab !== "latest" ? tab : undefined,
      ...next,
    };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const str = params.toString();
    return str ? `/?${str}#posts` : "/#posts";
  };

  return (
    <div className="pb-10">
      {/* Compact hero */}
      <section className="pt-8 md:pt-10">
        <Card className="rounded-3xl">
          <CardContent className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl mt-3 font-semibold tracking-tight md:text-3xl">
                  A blog for training smarter. Everything You Need About FITNESS
                </h1>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Study breakdowns, programs, and practical lifting advice.
                </p>
              </div>

              <form className="w-full md:max-w-md" action="/" method="get">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input name="q" defaultValue={q} className="h-11 pl-9" placeholder="Search posts…" />
                  {effectiveCategory !== "all" && <input type="hidden" name="cat" value={effectiveCategory} />}
                  {tab !== "latest" && <input type="hidden" name="tab" value={tab} />}
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main */}
      <section id="posts" className="pt-6 md:pt-8 overflow-x-hidden">
        {/* ✅ two-column layout */}
        <div className="grid gap-6 md:grid-cols-12 min-w-0 max-w-full items-start">
          {/* LEFT: Posts + Newsletter + About */}
          <div className="md:col-span-8 min-w-0 max-w-full flex flex-col gap-6">
            {/* Feed */}
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2" id="topics">
                  <Link href={makeQuery({ cat: "all" })}>
                    <Badge variant={effectiveCategory === "all" ? "default" : "secondary"} className="cursor-pointer">
                      All topics
                    </Badge>
                  </Link>
                  {CATEGORY_LABELS.map((c) => (
                    <Link key={c.key} href={makeQuery({ cat: c.key, tab: tab === "research" ? "latest" : tab })}>
                      <Badge variant={effectiveCategory === c.key ? "default" : "secondary"} className="cursor-pointer">
                        {c.label}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {feed.length > 0 ? (
                  <FeedLoadMore posts={feed as any} pageSize={pageSize} />
                ) : (
                  <Card className="rounded-3xl">
                    <CardContent className="p-6">
                      <p className="text-sm font-medium">No posts found</p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        Try a different keyword or reset the topic filter.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Link
                          href="/#posts"
                          className="inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                          Reset
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Newsletter (moved to LEFT column) */}
            <Card id="newsletter" className="rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Newsletter</CardTitle>
                <CardDescription>Weekly highlights + best new posts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input className="h-11 pl-9" placeholder="you@example.com" aria-label="Email" />
                </div>
                <Button className="h-11 w-full">Subscribe</Button>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Unsubscribe anytime.</p>
              </CardContent>
            </Card>

            {/* About (moved to LEFT column) */}
            <Card id="about" className="rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">About</CardTitle>
                <CardDescription>What this blog is (and isn’t)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <p>Evidence-based fitness content: study summaries, training frameworks, and programs you can run.</p>
                <p className="text-xs text-zinc-500">Educational content only, not medical advice.</p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Start here + Trending */}
          <aside className="md:col-span-4 min-w-0 max-w-full">
            <div className="sticky top-[78px] space-y-4">
              <Card className="rounded-3xl overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300" />
                <CardHeader className="pb-2">
                  <CardTitle>Start here</CardTitle>
                  <CardDescription>The essentials: routine, progression, recovery.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={feedSource[0] ? `/posts/${feedSource[0].slug}` : "/#posts"}
                    className="inline-flex h-10 w-full items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Read the guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="rounded-3xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Trending</CardTitle>
                  <CardDescription>What readers open most</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trending.map((t) => (
                    <Link key={t.id} href={`/posts/${t.slug}`} className="group flex items-start justify-between gap-3" prefetch={false}>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium group-hover:underline underline-offset-4">{t.title}</div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">{(t as any).readTime}</p>
                      </div>

                      <span
                        className="shrink-0 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}