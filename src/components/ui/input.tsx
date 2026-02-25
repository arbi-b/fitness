import * as React from 'react';
import { cn } from '@/lib/cn';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-2xl border border-zinc-200/70 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-400/60 dark:border-zinc-800/70 dark:bg-zinc-950 dark:placeholder:text-zinc-500',
        className
      )}
      {...props}
    />
  );
});