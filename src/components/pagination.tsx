import Link from 'next/link';
import { cn } from '@/lib/cn';

function PageLink({ href, disabled, children }: { href: string; disabled?: boolean; children: React.ReactNode }) {
  const cls = cn(
    'inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-medium transition',
    'border border-zinc-200/70 bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
    'dark:border-zinc-800/70 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800',
    disabled && 'pointer-events-none opacity-50'
  );

  if (disabled) return <span className={cls}>{children}</span>;
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Pagination({
  page,
  totalPages,
  baseQuery,
}: {
  page: number;
  totalPages: number;
  baseQuery: Record<string, string | undefined>;
}) {
  const makeHref = (p: number) => {
    const sp = new URLSearchParams();
    Object.entries(baseQuery).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    sp.set('page', String(p));
    return `/?${sp.toString()}#posts`;
  };

  return (
    <div className="flex items-center justify-between pt-2">
      <PageLink href={makeHref(page - 1)} disabled={page <= 1}>
        Previous
      </PageLink>
      <p className="text-xs text-zinc-500">
        Page {page} of {totalPages}
      </p>
      <PageLink href={makeHref(page + 1)} disabled={page >= totalPages}>
        Next
      </PageLink>
    </div>
  );
}