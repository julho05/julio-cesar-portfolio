"use client";

import { useEffect, useState } from "react";

/**
 * Retorna o id da seção que ocupa a faixa central da viewport.
 * Com `enabled = false` (ex.: páginas internas), nada é observado.
 */
export function useActiveSection<T extends string>(ids: readonly T[], enabled = true): T | null {
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as T);
        }
      },
      // Considera "ativa" a seção que cruza a linha a ~40% do topo.
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}
