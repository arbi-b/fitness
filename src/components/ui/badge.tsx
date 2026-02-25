import * as React from 'react';
import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary';
};

export function Badge({ className, variant = 'default', ...props }: Props) {
  const styles =
    variant === 'default'
      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800/70';

  return (
    <span
      className={cn('inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium', styles, className)}
      {...props}
    />
  );
}