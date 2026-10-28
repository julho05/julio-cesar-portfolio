import type { MetadataRoute } from "next";
import { localeMeta, locales } from "@/i18n/config";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

/** Gera uma entrada por idioma para cada rota, com as alternativas hreflang. */
function localized(path: string, priority: number): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [localeMeta[locale].htmlLang, `${siteUrl}/${locale}${path}`]),
  );
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("", 1),
    ...projects.flatMap((project) => localized(`/projetos/${project.slug}`, 0.7)),
  ];
}
