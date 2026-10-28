import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/types/content";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { cardClasses } from "@/components/ui/Card";
import { ProjectCover } from "./ProjectCover";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/cn";

const MAX_TAGS = 4;

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  t: Dictionary["projects"];
  newTabLabel: string;
}

export function ProjectCard({ project, locale, t, newTabLabel }: ProjectCardProps) {
  const href = `/${locale}/projetos/${project.slug}`;
  const extraTags = project.technologies.length - MAX_TAGS;

  return (
    <article
      className={cn(
        cardClasses,
        "group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow focus-within:border-accent/40",
      )}
    >
      <div className="relative overflow-hidden border-b border-border-subtle">
        <ProjectCover
          cover={project.cover}
          locale={locale}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b0f19]/50 via-transparent to-transparent"
        />
        <StatusBadge status={project.status} label={t.status[project.status]} className="absolute top-3 left-3" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] tracking-wide text-muted uppercase">
          {project.kind[locale]} · {project.year}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-fg">
          {/* Link "esticado": o card inteiro é clicável sem aninhar links. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary[locale]}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.detail.technologies}>
          {project.technologies.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech} className="rounded-md border border-border-subtle bg-bg-elevated/60 px-2 py-1 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
          {extraTags > 0 && (
            <li className="rounded-md px-1.5 py-1 font-mono text-[11px] text-muted">+{extraTags}</li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-glow">
            {t.details}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            />
          </span>

          {/* Links externos ficam acima do link esticado (z-10). */}
          <div className="relative z-10 flex items-center gap-1">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-accent-soft hover:text-fg"
              >
                <ExternalLink aria-hidden="true" className="size-[1.0625rem]" />
                <span className="sr-only">
                  {t.demo}: {project.name} ({newTabLabel})
                </span>
              </a>
            )}
            {project.links.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-accent-soft hover:text-fg"
              >
                <GithubIcon size={17} />
                <span className="sr-only">
                  {t.repository}: {project.name} ({newTabLabel})
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
