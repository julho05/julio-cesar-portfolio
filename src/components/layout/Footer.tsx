import { ArrowUp } from "lucide-react";
import { cacheLife } from "next/cache";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

/** Ano atual, recalculado no máximo uma vez por dia (compatível com o prerender). */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const [locale, dict, year] = await Promise.all([getLocale(), getDictionary(), getCurrentYear()]);

  return (
    <footer className="relative mt-24 border-t border-border-subtle">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-linear-to-r from-transparent via-accent/60 to-transparent"
      />
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <Logo href={`/${locale}`} label={dict.nav.homeLink} />
          <p className="text-sm text-muted">
            <span className="font-medium text-fg">{profile.name}</span> · {dict.footer.role}
          </p>
          <p className="text-sm leading-relaxed text-muted">{dict.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <SocialLinks label={dict.hero.socialLabel} newTabLabel={dict.common.opensInNewTab} />
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            {dict.common.backToTop}
            <span className="grid size-8 place-items-center rounded-full border border-border-subtle transition-[transform,border-color] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-accent/50">
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </span>
          </a>
        </div>
      </Container>

      <Container className="border-t border-border-subtle py-6">
        <p className="text-xs text-muted">
          © {year} {profile.name}. {dict.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
