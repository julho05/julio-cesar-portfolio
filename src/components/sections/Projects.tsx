import { ArrowUpRight } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { ProjectCard } from "@/components/projects/ProjectCard";

export async function Projects() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.projects;
  const featured = projects.filter((project) => project.featured);

  return (
    <Section id="projects">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="projects-title" index={4} eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <Reveal delay={0.1} className="shrink-0">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("secondary", "md")}
          >
            <GithubIcon size={16} />
            {t.viewAll}
            <ArrowUpRight aria-hidden="true" className="size-4 text-muted" />
            <span className="sr-only">({dict.common.opensInNewTab})</span>
          </a>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={0.06 * (index % 3)}>
            <ProjectCard project={project} locale={locale} t={t} newTabLabel={dict.common.opensInNewTab} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
