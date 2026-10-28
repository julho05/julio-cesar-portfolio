import type { Locale } from "@/i18n/config";

/** Conteúdo com uma versão por idioma. */
export type Localized<T = string> = Record<Locale, T>;

export type SocialNetwork = "github" | "linkedin";

export interface Profile {
  name: string;
  initials: string;
  location: Localized;
  email: string | null;
  socials: Record<SocialNetwork, string>;
}

/** Texto com um trecho destacado em azul: `before` + `highlight` + `after`. */
export interface HighlightedText {
  before: string;
  highlight: string;
  after: string;
}

/** Âncoras das seções da página inicial, iguais em todos os idiomas. */
export const sectionIds = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Mês no formato "AAAA-MM" (ex.: "2024-03"). */
export type YearMonth = `${number}-${number}`;

export interface Experience {
  id: string;
  role: Localized;
  /** `null` = ainda não informado (o campo não aparece no site). */
  company: string | null;
  current: boolean;
  start: YearMonth | null;
  end: YearMonth | null;
  summary: Localized;
  responsibilities: Localized<string[]>;
  tools: string[];
  achievements: Localized<string[]>;
}

export type SkillCategoryId = "frontend" | "backend" | "database" | "data" | "tools";

export interface Skill {
  /** Identificador (usado para escolher o ícone). */
  name: string;
  /** Rótulo traduzido, quando o nome muda entre idiomas. */
  label?: Localized;
  /** Somente tecnologias confirmadas são exibidas. */
  confirmed: boolean;
}

export interface SkillCategory {
  id: SkillCategoryId;
  skills: Skill[];
}

export type ProjectStatus = "demo" | "completed" | "evolving";

export type ProjectCover =
  | { type: "image"; src: string; alt: Localized }
  /** Capa ilustrada para projetos sem interface web publicada. */
  | { type: "terminal" | "architecture"; alt: Localized };

export interface Project {
  slug: string;
  name: string;
  featured: boolean;
  status: ProjectStatus;
  year: number;
  kind: Localized;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  features: Localized<string[]>;
  challenges: Localized<string[]>;
  technologies: string[];
  cover: ProjectCover;
  /** Capturas adicionais exibidas na página de detalhes. */
  gallery: Array<{ src: string; alt: Localized }>;
  links: { repository?: string; demo?: string };
}

export interface Education {
  degree: Localized;
  status: "in-progress" | "completed";
  institution: string | null;
  start: YearMonth | null;
  expectedEnd: YearMonth | null;
  areas: Localized<string[]>;
}

export interface Certification {
  name: string;
  issuer: string;
  issued: YearMonth;
  url?: string;
}
