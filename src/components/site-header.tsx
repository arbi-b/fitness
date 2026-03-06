import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/75 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white dark:bg-white">
            <Image
              src="/favicon-32x32-1.png"
              alt="MuscleLogic logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">MuscleLogic</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Studies and Practical Training</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/#posts">
            Posts
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/?cat=programs&tab=latest#posts">
            Programs
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/?cat=nutrition&tab=latest#posts">
            Nutrition
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" href="/#about">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="secondary" className="hidden md:inline-flex">
            <Link href="/subscribe">Subscribe</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}