import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** id do <h2>, referenciado pelo aria-labelledby da seção. */
  id: string;
  index: number;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ id, index, eyebrow, title, subtitle, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent-glow uppercase">
        <span aria-hidden="true">{String(index).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-accent-glow to-transparent" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
