import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeroVisual } from "./hero/HeroVisual";

/** Atraso escalonado da animação de entrada (CSS puro, sem JavaScript). */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export async function Hero() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { hero } = dict;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 lg:pt-32"
    >
      {/* Iluminação de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)]" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p
            className="animate-enter inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.18em] text-accent-glow uppercase"
            style={delay(0)}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-glow shadow-[0_0_8px_2px_rgb(96_165_250/0.7)]" />
            {hero.badge}
          </p>

          <h1
            id="hero-title"
            className="animate-enter mt-6 font-display text-[clamp(3.25rem,10vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-fg"
            style={delay(80)}
          >
            {profile.name}
          </h1>

          <p
            className="animate-enter mt-5 font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl"
            style={delay(160)}
          >
            <Highlight text={hero.role} />
          </p>

          <div className="animate-enter mt-8 max-w-xl border-l-2 border-accent/40 pl-5" style={delay(240)}>
            <p className="font-display text-lg leading-snug text-fg/90 sm:text-xl">
              <Highlight text={hero.tagline} />
            </p>
          </div>

          <p className="animate-enter mt-6 max-w-xl text-base leading-relaxed text-muted" style={delay(320)}>
            {hero.description}
          </p>

          <div className="animate-enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(400)}>
            <ButtonLink href={`/${locale}#projects`} size="lg">
              {hero.primaryCta}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out-expo group-hover/button:translate-x-1"
              />
            </ButtonLink>
            <ButtonLink href={`/${locale}#contact`} variant="secondary" size="lg">
              {hero.secondaryCta}
              <ArrowDownRight
                aria-hidden="true"
                className="size-4 text-muted transition-[transform,color] duration-300 ease-out-expo group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5 group-hover/button:text-accent-glow"
              />
            </ButtonLink>
          </div>

          <div className="animate-enter mt-10 flex items-center gap-4" style={delay(480)}>
            <span aria-hidden="true" className="h-px w-10 bg-border" />
            <SocialLinks label={hero.socialLabel} newTabLabel={dict.common.opensInNewTab} />
          </div>
        </div>

        <div className="animate-enter lg:col-span-5" style={delay(300)}>
          <HeroVisual copy={hero.visual} />
        </div>
      </Container>

      <Link
        href={`/${locale}#about`}
        aria-label={hero.scroll}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-fg lg:flex [@media(max-height:760px)]:hidden"
      >
        <span className="relative flex h-9 w-5.5 justify-center rounded-full border border-border pt-2">
          <span className="animate-scroll-dot size-1 rounded-full bg-accent-glow" />
        </span>
      </Link>
    </section>
  );
}
