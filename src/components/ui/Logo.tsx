import Link from "next/link";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

/** Assinatura visual: monograma JC + nome em caixa alta. */
export function Logo({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("group/logo inline-flex min-h-11 items-center gap-3 rounded-lg", className)}
    >
      <span
        aria-hidden="true"
        className="border-gradient relative grid size-9 place-items-center rounded-[10px] font-display text-sm font-bold tracking-tight text-fg shadow-card transition-transform duration-500 ease-out-expo group-hover/logo:-rotate-6"
      >
        {profile.initials}
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full bg-accent-glow shadow-[0_0_10px_2px_rgb(96_165_250/0.6)]" />
      </span>
      <span aria-hidden="true" className="font-display text-[0.8125rem] font-semibold tracking-[0.22em] whitespace-nowrap text-fg">
        {profile.name.toUpperCase()}
      </span>
    </Link>
  );
}
