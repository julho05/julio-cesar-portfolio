import { localeMeta, type Locale } from "@/i18n/config";
import type { YearMonth } from "@/types/content";

/** "2024-03" → "mar. de 2024" (pt) / "Mar 2024" (en). */
export function formatYearMonth(value: YearMonth, locale: Locale): string {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
