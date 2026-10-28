import type { HighlightedText } from "@/types/content";
import { cn } from "@/lib/cn";

/** Renderiza um texto traduzido com um trecho destacado em azul. */
export function Highlight({ text, className }: { text: HighlightedText; className?: string }) {
  return (
    <>
      {text.before}
      <span className={cn("text-gradient", className)}>{text.highlight}</span>
      {text.after}
    </>
  );
}
