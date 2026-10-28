"use client";

import { Moon, Sun } from "lucide-react";
import { themeStorageKey } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * O ícone é escolhido via CSS (variante `dark:`), então o HTML do servidor
 * e o do cliente são idênticos e não há "piscada" de ícone na hidratação.
 */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      // Armazenamento indisponível (modo privado): o tema vale só para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-11 place-items-center rounded-[var(--radius-control)] text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-fg",
        className,
      )}
    >
      <Sun aria-hidden="true" className="hidden size-[1.125rem] dark:block" />
      <Moon aria-hidden="true" className="block size-[1.125rem] dark:hidden" />
    </button>
  );
}
