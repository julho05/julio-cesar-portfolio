"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { sectionIds } from "@/types/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";

export interface NavItem {
  id: (typeof sectionIds)[number];
  label: string;
  href: string;
}

interface HeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
}

export function Header({ locale, nav }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}`;
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds, isHome);

  const items: NavItem[] = sectionIds.map((id) => ({ id, label: nav[id], href: `/${locale}#${id}` }));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-out-expo",
        scrolled || !isHome
          ? "border-border-subtle bg-[var(--header-bg)] shadow-[0_10px_30px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo href={`/${locale}`} label={nav.homeLink} />

        <nav aria-label={nav.label} className="hidden lg:block">
          <ul className="flex items-center xl:gap-1">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative inline-flex min-h-10 items-center rounded-lg px-2.5 text-sm transition-colors duration-300 xl:px-3",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-center bg-linear-to-r from-transparent via-accent-glow to-transparent transition-transform duration-500 ease-out-expo",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LocaleSwitcher
            current={locale}
            groupLabel={nav.language}
            switchLabel={nav.switchLanguage}
            className="hidden sm:flex"
          />
          <ThemeToggle label={nav.toggleTheme} />
          <div className="hidden xl:block">
            <ButtonLink href={`/${locale}#contact`} size="sm">
              {nav.cta}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />
            </ButtonLink>
          </div>
          <MobileMenu items={items} active={active} locale={locale} nav={nav} />
        </div>
      </Container>
    </header>
  );
}
