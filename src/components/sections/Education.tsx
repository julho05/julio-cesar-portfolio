import { Award, Calendar, ExternalLink, GraduationCap } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { certifications, education } from "@/data/education";
import { formatYearMonth } from "@/lib/date";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

export async function Education() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.education;
  const inProgress = education.status === "in-progress";

  const dates = [
    education.start && { label: t.started, value: formatYearMonth(education.start, locale) },
    education.expectedEnd && { label: t.expectedEnd, value: formatYearMonth(education.expectedEnd, locale) },
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <Section id="education">
      <SectionHeading id="education-title" index={5} eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Card className="h-full overflow-hidden p-7 sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,var(--glow-1),transparent)]"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-12 place-items-center rounded-xl border border-accent/20 bg-accent-soft text-accent-glow">
                  <GraduationCap aria-hidden="true" className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent-glow uppercase">
                  {inProgress && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-glow" />}
                  {inProgress ? t.inProgress : t.completed}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-fg sm:text-3xl">{education.degree[locale]}</h3>
              {education.institution && <p className="mt-2 text-sm font-medium text-accent-glow">{education.institution}</p>}

              {dates.length > 0 && (
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {dates.map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-2 text-muted">
                      <Calendar aria-hidden="true" className="size-3.5" />
                      <dt>{label}:</dt>
                      <dd className="text-fg">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <p className="mt-6 max-w-xl leading-relaxed text-muted">{t.description}</p>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Card className="h-full p-7 sm:p-9">
            <h3 className="font-display text-lg font-semibold text-fg">{t.areasTitle}</h3>
            <p className="mt-1.5 text-sm text-muted">{t.areasNote}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {education.areas[locale].map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border-subtle bg-bg-elevated/60 px-3.5 py-1.5 text-sm text-fg transition-colors duration-300 hover:border-accent/40"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      {certifications.length > 0 && (
        <Reveal delay={0.15} className="mt-10">
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-fg">
            <Award aria-hidden="true" className="size-5 text-accent-glow" />
            {t.certifications}
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <li key={`${cert.name}-${cert.issued}`}>
                <Card interactive className="h-full p-5">
                  <p className="font-medium text-fg">{cert.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {cert.issuer} · {formatYearMonth(cert.issued, locale)}
                  </p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm text-accent-glow hover:underline"
                    >
                      {t.viewCertificate}
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">({dict.common.opensInNewTab})</span>
                    </a>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
