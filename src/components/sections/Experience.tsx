import { Building2, Calendar } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { experiences } from "@/data/experience";
import type { Locale } from "@/i18n/config";
import type { Experience as ExperienceItem } from "@/types/content";
import { formatYearMonth } from "@/lib/date";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

/** Período só aparece quando a data de início foi informada. */
function period(item: ExperienceItem, locale: Locale, present: string): string | null {
  if (!item.start) return null;
  const start = formatYearMonth(item.start, locale);
  const end = item.end ? formatYearMonth(item.end, locale) : item.current ? present : null;
  return end ? `${start} — ${end}` : start;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-5">
      <h4 className="text-xs font-medium tracking-wide text-muted uppercase">{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent-glow" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Experience() {
  const [locale, { experience: t }] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section id="experience">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <SectionHeading
          id="experience-title"
          index={2}
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          className="lg:sticky lg:top-32"
        />
      </div>

      <ol className="relative lg:col-span-7">
        {/* Linha vertical da timeline */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-linear-to-b from-accent-glow/80 via-border to-transparent sm:left-[11px]"
        />

        {experiences.map((item, index) => {
          const dates = period(item, locale, t.present);
          return (
            <Reveal as="li" key={item.id} delay={0.12 * index} className="relative pb-10 pl-9 last:pb-0 sm:pl-14">
              {/* Marcador luminoso */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-7 left-0 grid size-[15px] place-items-center rounded-full border sm:size-[23px]",
                  item.current
                    ? "border-accent-glow/60 bg-accent-soft shadow-[0_0_18px_2px_rgb(96_165_250/0.45)]"
                    : "border-border bg-bg",
                )}
              >
                <span className={cn("size-1.5 rounded-full sm:size-2", item.current ? "bg-accent-glow" : "bg-muted/60")} />
              </span>

              <Card className={cn("overflow-hidden p-6 sm:p-7", item.current && "border-accent/30")}>
                {item.current && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-glow/70 to-transparent"
                  />
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
                      item.current
                        ? "border border-accent/30 bg-accent-soft text-accent-glow"
                        : "border border-border-subtle text-muted",
                    )}
                  >
                    {item.current && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-glow" />}
                    {item.current ? t.current : t.previous}
                  </span>
                  {dates && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <Calendar aria-hidden="true" className="size-3.5" />
                      {dates}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold text-fg sm:text-2xl">{item.role[locale]}</h3>
                {item.company && (
                  <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-accent-glow">
                    <Building2 aria-hidden="true" className="size-4" />
                    {item.company}
                  </p>
                )}
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.summary[locale]}</p>

                <DetailList title={t.responsibilities} items={item.responsibilities[locale]} />
                <DetailList title={t.achievements} items={item.achievements[locale]} />

                {item.tools.length > 0 && (
                  <div className="mt-5">
                    <h4 className="sr-only">{t.tools}</h4>
                    <ul className="flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-md border border-border-subtle bg-bg-elevated/60 px-2.5 py-1 font-mono text-xs text-muted"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </Reveal>
          );
        })}
      </ol>
      </div>
    </Section>
  );
}
