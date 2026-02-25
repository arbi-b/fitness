import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-zinc-200/70 py-8 text-xs text-zinc-600 dark:border-zinc-800/70 dark:text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} EvidenceFit. Built for clarity.</p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/#posts">Posts</Link>
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/#topics">Topics</Link>
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/#newsletter">Newsletter</Link>
          <Link className="hover:text-zinc-900 dark:hover:text-white" href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}