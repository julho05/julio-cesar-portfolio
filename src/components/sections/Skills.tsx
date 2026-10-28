import { Braces, ChartColumn, Database, Server, Wrench, type LucideIcon } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { skillCategories } from "@/data/skills";
import type { SkillCategoryId } from "@/types/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/cn";

const categoryIcons: Record<SkillCategoryId, LucideIcon> = {
  frontend: Braces,
  backend: Server,
  database: Database,
  data: ChartColumn,
  tools: Wrench,
};

/** Bento grid: as duas primeiras categorias ocupam metade da linha; as demais, um terço. */
const spans: Record<SkillCategoryId, string> = {
  frontend: "lg:col-span-3",
  backend: "lg:col-span-3",
  database: "lg:col-span-2",
  data: "lg:col-span-2",
  tools: "lg:col-span-2",
};

export async function Skills() {
  const [locale, { skills: t }] = await Promise.all([getLocale(), getDictionary()]);

  const categories = skillCategories
    .map((category) => ({ ...category, skills: category.skills.filter((skill) => skill.confirmed) }))
    .filter((category) => category.skills.length > 0);

  return (
    <Section id="skills">
      <SectionHeading id="skills-title" index={3} eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category.id];
          return (
            <Reveal key={category.id} delay={0.08 * index} className={cn(spans[category.id], "sm:last:col-span-2 lg:last:col-span-2")}>
              <Card className="h-full p-6">
                <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-fg">
                  <span className="grid size-9 place-items-center rounded-lg border border-accent/20 bg-accent-soft text-accent-glow">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {t.categories[category.id]}
                  <span className="ml-auto font-mono text-xs font-normal text-muted">
                    {String(category.skills.length).padStart(2, "0")}
                  </span>
                </h3>

                <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(9.5rem,100%),1fr))] gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group flex min-h-12 items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-elevated/50 px-3 py-2.5 text-sm text-fg transition-[border-color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft"
                    >
                      <TechIcon
                        name={skill.name}
                        className="size-[1.125rem] text-muted transition-colors duration-300 group-hover:text-accent-glow"
                      />
                      <span className="truncate">{skill.label?.[locale] ?? skill.name}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
