import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import type pt from "@/messages/pt.json";

/** O dicionário em português é a fonte da verdade para o formato das traduções. */
export type Dictionary = typeof pt;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import("@/messages/pt.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

/** Idioma da rota atual, lido do segmento raiz `[locale]`. */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return dictionaries[locale ?? (await getLocale())]();
}
