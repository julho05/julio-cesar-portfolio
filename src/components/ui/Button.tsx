import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-on-accent shadow-[0_8px_24px_-10px_rgb(37_99_235/0.7)] " +
    "hover:bg-accent-strong-hover hover:shadow-glow",
  secondary:
    "border border-border bg-card/60 text-fg backdrop-blur-sm " +
    "hover:border-accent/60 hover:bg-card hover:text-fg",
  ghost: "text-muted hover:bg-accent-soft hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.9375rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant; size?: Size };

/** Link interno estilizado como botão. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
