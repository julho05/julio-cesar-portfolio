import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleCheck, ExternalLink } from "lucide-react";
import { localeMeta, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getProject, projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { buttonClasses } from "@/components/ui/Button";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { StatusBadge } from "@/components/projects/StatusBadge";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projetos/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const project = getProject(slug);
  if (!project) return {};

  const path = `/projetos/${slug}`;
  const description = project.summary[locale];
  return {
    title: project.name,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}${path}`])),
        "x-default": `/pt${path}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/${locale}${path}`,
      title: project.name,
      description,
      locale: localeMeta[locale].ogLocale,
      ...(project.cover.type === "image" && {
        images: [{ url: project.cover.src, width: 1440, height: 900, alt: project.cover.alt[locale] }],
      }),
    },
    twitter: { card: "summary_large_image", title: project.name, description },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section aria-labelledby={id} className="border-t border-border-subtle pt-10">
        <h2 id={id} className="font-display text-2xl font-semibold text-fg">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projetos/[slug]">) {
  const [{ slug }, locale, dict] = await Promise.all([params, getLocale(), getDictionary()]);
  const project = getProject(slug);
  if (!project) notFound();

  const t = dict.projects;
  const d = t.detail;
  const newTab = dict.common.opensInNewTab;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-28 pb-8 sm:pt-36">
      <Container>
        <Link
          href={`/${locale}#projects`}
          className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          {d.back}
        </Link>

        <header className="animate-enter mt-6 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.16em] text-accent-glow uppercase">
            {project.kind[locale]} · {project.year}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-6xl">{project.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary[locale]}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "lg")}>
                {d.demoLink}
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only">({newTab})</span>
              </a>
            )}
            {project.links.repository && (
              <a
                href={project.links.repository}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses(project.links.demo ? "secondary" : "primary", "lg")}
              >
                <GithubIcon size={16} />
                {d.repositoryLink}
                <span className="sr-only">({newTab})</span>
              </a>
            )}
          </div>
        </header>

        <div
          className="animate-enter mt-12 overflow-hidden rounded-[var(--radius-card)] border border-border-subtle shadow-card"
          style={{ animationDelay: "120ms" }}
        >
          <ProjectCover cover={project.cover} locale={locale} priority sizes="(min-width: 1152px) 1152px, 100vw" />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <Block id="overview" title={d.overview}>
              <p className="leading-relaxed text-muted">{project.summary[locale]}</p>
            </Block>
            <Block id="problem" title={d.problem}>
              <p className="leading-relaxed text-muted">{project.problem[locale]}</p>
            </Block>
            <Block id="solution" title={d.solution}>
              <p className="leading-relaxed text-muted">{project.solution[locale]}</p>
            </Block>
            <Block id="features" title={d.features}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features[locale].map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-xl border border-border-subtle bg-card/50 p-4 text-sm leading-relaxed text-fg">
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-glow" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Block>
            <Block id="technologies" title={d.technologies}>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated/60 px-3 py-2 text-sm text-fg"
                  >
                    <TechIcon name={tech} className="size-4 text-muted" />
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
            {project.challenges[locale].length > 0 && (
              <Block id="challenges" title={d.challenges}>
                <ol className="space-y-4">
                  {project.challenges[locale].map((challenge, i) => (
                    <li key={challenge} className="flex gap-4">
                      <span aria-hidden="true" className="font-mono text-sm text-accent-glow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="leading-relaxed text-muted">{challenge}</p>
                    </li>
                  ))}
                </ol>
              </Block>
            )}
            {project.gallery.length > 0 && (
              <Block id="images" title={d.images}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((image) => (
                    <li key={image.src} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border-subtle">
                      <Image src={image.src} alt={image.alt[locale]} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          <aside className="lg:col-span-4">
            <Card className="p-6 lg:sticky lg:top-28">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs tracking-wide text-muted uppercase">{d.statusLabel}</dt>
                  <dd className="mt-1.5">
                    <StatusBadge status={project.status} label={t.status[project.status]} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-muted uppercase">{d.type}</dt>
                  <dd className="mt-1 text-fg">{project.kind[locale]}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wide text-muted uppercase">{d.year}</dt>
                  <dd className="mt-1 text-fg">{project.year}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-border-subtle pt-6">
                <h2 className="text-xs tracking-wide text-muted uppercase">{d.links}</h2>
                <ul className="mt-3 space-y-1">
                  {project.links.demo && (
                    <li>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center gap-2 text-sm text-fg transition-colors hover:text-accent-glow"
                      >
                        <ExternalLink aria-hidden="true" className="size-4 text-muted" />
                        {d.demoLink}
                        <span className="sr-only">({newTab})</span>
                      </a>
                    </li>
                  )}
                  {project.links.repository && (
                    <li>
                      <a
                        href={project.links.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center gap-2 text-sm text-fg transition-colors hover:text-accent-glow"
                      >
                        <GithubIcon size={16} className="text-muted" />
                        {d.repositoryLink}
                        <span className="sr-only">({newTab})</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </Card>
          </aside>
        </div>

        {next.slug !== project.slug && (
          <Link
            href={`/${locale}/projetos/${next.slug}`}
            className="group mt-20 flex items-center justify-between gap-6 rounded-[var(--radius-card)] border border-border-subtle bg-card/60 p-6 transition-[border-color,background-color] duration-500 hover:border-accent/40 hover:bg-card sm:p-8"
          >
            <span>
              <span className="block font-mono text-xs tracking-[0.16em] text-muted uppercase">{d.next}</span>
              <span className="mt-2 block font-display text-2xl font-semibold text-fg sm:text-3xl">{next.name}</span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-6 shrink-0 text-accent-glow transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
            />
          </Link>
        )}
      </Container>
    </article>
  );
}
