import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme";
import { buttonClasses } from "@/components/ui/Button";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Júlio César",
  description: "Página não encontrada · Page not found",
};

/**
 * 404 para URLs sem rota correspondente. Fica fora do layout `[locale]`,
 * então não sabe o idioma: o conteúdo é bilíngue.
 */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative grid min-h-dvh place-items-center px-4">
        <div aria-hidden="true" className="bg-tech-grid pointer-events-none fixed inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]"
        />
        <main className="max-w-lg text-center">
          <p className="font-display text-[clamp(5rem,20vw,9rem)] leading-none font-semibold tracking-[-0.06em]">
            <span className="text-gradient">404</span>
          </p>
          <h1 className="mt-6 font-display text-3xl font-semibold text-fg">Página não encontrada</h1>
          <p lang="en" className="mt-1 font-display text-lg text-muted">
            Page not found
          </p>
          <p className="mt-6 text-muted">O endereço acessado não existe ou foi movido.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/pt" className={buttonClasses("primary", "lg")}>
              Voltar ao início
            </Link>
            <Link href="/en" lang="en" className={buttonClasses("secondary", "lg")}>
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
