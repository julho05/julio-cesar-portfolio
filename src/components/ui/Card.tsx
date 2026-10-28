import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Superfície padrão dos cards: borda translúcida, sombra discreta e brilho no hover. */
export const cardClasses =
  "relative rounded-[var(--radius-card)] border border-border-subtle bg-card/70 shadow-card backdrop-blur-sm " +
  "transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out-expo";

export const cardHoverClasses = "hover:-translate-y-1 hover:border-accent/40 hover:bg-card-hover";

export function Card({ className, interactive = false, ...props }: ComponentPropsWithoutRef<"div"> & { interactive?: boolean }) {
  return <div className={cn(cardClasses, interactive && cardHoverClasses, className)} {...props} />;
}
