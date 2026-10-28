import type { SkillCategory } from "@/types/content";

/**
 * Tecnologias por categoria. Apenas itens com `confirmed: true` aparecem no site.
 *
 * Fontes das confirmações:
 * - "Tech Stack" declarada no README do perfil do GitHub (github.com/julho05);
 * - linguagens e ferramentas dos repositórios públicos (HTML, CSS, Spring Boot, SQL);
 * - experiência informada como Analista de Dados (Power BI, análise de dados).
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    skills: [
      { name: "HTML", confirmed: true },
      { name: "CSS", confirmed: true },
      { name: "JavaScript", confirmed: true },
      { name: "TypeScript", confirmed: true },
      { name: "React", confirmed: true },
      { name: "Next.js", confirmed: true },
    ],
  },
  {
    id: "backend",
    skills: [
      { name: "Node.js", confirmed: true },
      { name: "Python", confirmed: true },
      { name: "Java", confirmed: true },
      { name: "Spring Boot", confirmed: true },
      { name: "REST", label: { pt: "APIs REST", en: "REST APIs" }, confirmed: true },
    ],
  },
  {
    id: "database",
    skills: [
      { name: "SQL", confirmed: true },
      { name: "MySQL", confirmed: true },
      { name: "PostgreSQL", confirmed: true },
      { name: "SQL Server", confirmed: false },
    ],
  },
  {
    id: "data",
    skills: [
      { name: "Power BI", confirmed: true },
      { name: "Data Analysis", label: { pt: "Análise de Dados", en: "Data Analysis" }, confirmed: true },
    ],
  },
  {
    id: "tools",
    skills: [
      { name: "Git", confirmed: true },
      { name: "GitHub", confirmed: true },
      { name: "Docker", confirmed: true },
      { name: "Insomnia", confirmed: true },
      { name: "VS Code", confirmed: false },
    ],
  },
];
