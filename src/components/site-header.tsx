import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/75 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">EvidenceFit</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Studies + practical training</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/#posts">
            Posts
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/#topics">
            Topics
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/#newsletter">
            Newsletter
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/#about">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="secondary" className="hidden md:inline-flex">
            Subscribe
          </Button>
          <Link
            href="/#posts"
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Start reading
          </Link>
        </div>
      </div>
    </header>
  );
}