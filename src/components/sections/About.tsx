import { ChartColumn, CodeXml, GraduationCap, MapPin, Target, type LucideIcon } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const pillarIcons: Record<"fullstack" | "data" | "engineering", LucideIcon> = {
  fullstack: CodeXml,
  data: ChartColumn,
  engineering: GraduationCap,
};

export async function About() {
  const [locale, { about }] = await Promise.all([getLocale(), getDictionary()]);

  const facts = [
    { icon: MapPin, label: about.facts.location, value: profile.location[locale] },
    { icon: Target, label: about.facts.focus, value: about.facts.focusValue },
    { icon: GraduationCap, label: about.facts.education, value: about.facts.educationValue },
  ];

  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading id="about-title" index={1} eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />

          <Reveal delay={0.1} className="mt-10 space-y-5 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border-subtle bg-border-subtle sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-bg/90 p-5">
                  <dt className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted uppercase">
                    <Icon aria-hidden="true" className="size-3.5 text-accent-glow" />
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-4 lg:col-span-5 lg:pt-24">
          {(Object.keys(pillarIcons) as Array<keyof typeof pillarIcons>).map((key, index) => {
            const Icon = pillarIcons[key];
            const pillar = about.pillars[key];
            return (
              <Reveal as="li" key={key} delay={0.1 * index}>
                <Card interactive className="group flex gap-5 p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent-soft text-accent-glow transition-transform duration-500 ease-out-expo group-hover:scale-105">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-fg">{pillar.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
