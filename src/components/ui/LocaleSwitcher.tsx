"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, localeMeta, locales, type Locale } from "@/i18n/config";
import { format } from "@/lib/format";
import { cn } from "@/lib/cn";

interface LocaleSwitcherProps {
  current: Locale;
  groupLabel: string;
  /** Ex.: "Mudar idioma para {language}" */
  switchLabel: string;
  className?: string;
}

/** Troca o primeiro segmento da URL, preservando a página atual. */
function swapLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

/** Salva a escolha para que o proxy redirecione `/` ao idioma preferido nas próximas visitas. */
function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleSwitcher({ current, groupLabel, switchLabel, className }: LocaleSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={groupLabel} className={cn("flex items-center rounded-full border border-border-subtle p-0.5", className)}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={localeMeta[locale].htmlLang}
            lang={localeMeta[locale].htmlLang}
            onClick={() => rememberLocale(locale)}
            aria-current={active ? "true" : undefined}
            aria-label={format(switchLabel, { language: localeMeta[locale].label })}
            className={cn(
              "grid h-9 min-w-10 place-items-center rounded-full px-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-300",
              active ? "bg-accent-soft text-accent-glow" : "text-muted hover:text-fg",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
