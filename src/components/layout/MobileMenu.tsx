"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/ui/Logo";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import type { NavItem } from "./Header";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  items: NavItem[];
  active: string | null;
  locale: Locale;
  nav: Dictionary["nav"];
}

const subscribeNoop = () => () => {};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ items, active, locale, nav }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Enquanto aberto: trava a rolagem, prende o foco no painel e fecha com Esc.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    // Ao passar para o layout desktop, o menu mobile deixa de existir.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => event.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={nav.openMenu}
        className="grid size-11 place-items-center rounded-[var(--radius-control)] border border-border-subtle text-fg transition-colors duration-300 hover:bg-accent-soft lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-menu"
                ref={panelRef}
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div aria-hidden="true" className="bg-tech-grid pointer-events-none absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-32 right-[-20%] size-96 rounded-full bg-[var(--glow-1)] blur-3xl"
                />

                <h2 id={titleId} className="sr-only">
                  {nav.mobileMenu}
                </h2>

                <div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
                  <Logo href={`/${locale}`} label={nav.homeLink} />
                  <button
                    type="button"
                    onClick={close}
                    aria-label={nav.closeMenu}
                    className="grid size-11 place-items-center rounded-[var(--radius-control)] border border-border-subtle text-fg transition-colors duration-300 hover:bg-accent-soft"
                  >
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </div>

                <nav aria-label={nav.label} className="relative flex-1 px-4 pt-6 sm:px-6">
                  <ul className="flex flex-col">
                    {items.map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * index + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-border-subtle"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active === item.id ? "location" : undefined}
                          className={cn(
                            "flex min-h-14 items-center gap-4 py-2 font-display text-2xl font-medium tracking-tight transition-colors",
                            active === item.id ? "text-fg" : "text-muted hover:text-fg",
                          )}
                        >
                          <span aria-hidden="true" className="w-6 font-mono text-xs text-accent-glow">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="relative flex flex-col gap-4 px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
                  <LocaleSwitcher
                    current={locale}
                    groupLabel={nav.language}
                    switchLabel={nav.switchLanguage}
                    className="self-start"
                  />
                  <ButtonLink href={`/${locale}#contact`} size="lg" onClick={() => setOpen(false)} className="w-full">
                    {nav.cta}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </ButtonLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
