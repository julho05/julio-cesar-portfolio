export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

/** Cookie que guarda o idioma escolhido manualmente pelo visitante. */
export const localeCookie = "NEXT_LOCALE";

/** Valores usados em `<html lang>`, Open Graph e hreflang. */
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  pt: { htmlLang: "pt-BR", ogLocale: "pt_BR", label: "Português" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "English" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
