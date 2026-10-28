import type { ReactNode } from "react";
import type { SectionId } from "@/types/content";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
}

/** Seção da página inicial: âncora de navegação + espaçamento vertical padrão. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-24 sm:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}
