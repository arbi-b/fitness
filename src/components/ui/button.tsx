import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  type,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition focus:outline-none focus:ring-2 focus:ring-zinc-400/60 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-800/70",
    ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm rounded-2xl",
    md: "h-10 px-4 text-sm rounded-2xl",
    lg: "h-11 px-5 text-sm rounded-2xl",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  // If asChild, render the child element (e.g., Link) as the "button" and merge props/classes into it.
  if (asChild) {
    return <Slot className={classes} {...props} />;
  }

  return <button className={classes} type={type ?? "button"} {...props} />;
}