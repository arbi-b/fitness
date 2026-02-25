import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Post not found</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">The post may have been removed or is still a draft.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-2xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Go back home
      </Link>
    </div>
  );
}