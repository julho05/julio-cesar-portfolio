import { Braces, ChartColumn, ChartLine, Database, Search, type LucideIcon } from "lucide-react";
import {
  siApachemaven,
  siCss,
  siDocker,
  siGit,
  siGithub,
  siGithubpages,
  siHtml5,
  siInsomnia,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPytest,
  siPython,
  siReact,
  siSpringboot,
  siTypescript,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/cn";

/** Ícones de marca (simple-icons) ou genéricos (lucide) por nome de tecnologia. */
const icons: Record<string, SimpleIcon | LucideIcon> = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  Python: siPython,
  Java: siOpenjdk,
  "Spring Boot": siSpringboot,
  Maven: siApachemaven,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  Git: siGit,
  GitHub: siGithub,
  "GitHub Pages": siGithubpages,
  Docker: siDocker,
  Insomnia: siInsomnia,
  pytest: siPytest,
  "WordPress REST API": siWordpress,
  REST: Braces,
  SQL: Database,
  "SQL Server": Database,
  "Power BI": ChartColumn,
  "Data Analysis": ChartLine,
  SEO: Search,
  "JSON-LD": Braces,
  JSON: Braces,
};

function isSimpleIcon(icon: SimpleIcon | LucideIcon): icon is SimpleIcon {
  return typeof icon === "object" && "path" in icon;
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = icons[name] ?? Braces;
  const classes = cn("size-5 shrink-0", className);

  if (isSimpleIcon(icon)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={classes}>
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return <Icon aria-hidden="true" strokeWidth={1.75} className={classes} />;
}
