import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, localeCookie, locales, type Locale } from "@/i18n/config";
import { projects } from "@/data/projects";

/** Escolhe o idioma: preferência salva > Accept-Language > padrão (pt). */
function resolveLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (saved && isLocale(saved)) return saved;

  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const match = accepted.find(({ lang }) => isLocale(lang))?.lang;
  return match && isLocale(match) ? match : defaultLocale;
}

const projectSlugs = new Set(projects.map((project) => project.slug));
const projectPath = /^\/([a-z]{2})\/projetos\/([^/]+)\/?$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    // Com Partial Prerendering o shell sai com status 200 antes do notFound() da página.
    // Slugs inexistentes são reescritos para uma rota sem correspondência, que responde 404 de verdade.
    const match = pathname.match(projectPath);
    if (match && !projectSlugs.has(decodeURIComponent(match[2]))) {
      return NextResponse.rewrite(new URL(`/${match[1]}/projetos/${match[2]}/404`, request.url));
    }
    return;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${resolveLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Ignora internos do Next, API e arquivos com extensão (imagens, robots.txt, sitemap.xml…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
