import type { Metadata, Viewport } from "next";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: meta.title, template: `%s | ${meta.siteName}` },
    description: meta.description,
    applicationName: meta.siteName,
    authors: [{ name: "Júlio César", url: "https://github.com/julho05" }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}`])),
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: meta.siteName,
      title: meta.title,
      description: meta.description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      data-theme="dark"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top" className="relative min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[70] rounded-lg bg-accent-strong px-4 py-3 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.common.skipToContent}
        </a>
        <div aria-hidden="true" className="bg-tech-grid pointer-events-none fixed inset-0 -z-10" />
        <Providers>
          <Header locale={locale} nav={dict.nav} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
