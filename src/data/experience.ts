import type { Experience } from "@/types/content";

/**
 * Trajetória profissional, da mais recente para a mais antiga.
 * Campos `null` ou listas vazias não aparecem no site — preencha quando tiver o dado.
 */
export const experiences: Experience[] = [
  {
    id: "full-stack",
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    // Fonte: campo "company" do perfil público do GitHub.
    company: "Contabilize Assessoria Contábil",
    current: true,
    start: null, // ex.: "2025-02"
    end: null,
    summary: {
      pt: "Atuação no desenvolvimento de soluções digitais, aplicações web e sistemas.",
      en: "Building digital solutions, web applications and systems.",
    },
    responsibilities: { pt: [], en: [] },
    tools: [],
    achievements: { pt: [], en: [] },
  },
  {
    id: "data-analyst",
    role: { pt: "Analista de Dados", en: "Data Analyst" },
    company: null,
    current: false,
    start: null,
    end: null,
    summary: {
      pt: "Atuação com análise de dados, Power BI e desenvolvimento de soluções para organização e interpretação de informações.",
      en: "Worked with data analysis and Power BI, building solutions to organize and interpret information.",
    },
    responsibilities: { pt: [], en: [] },
    tools: ["Power BI"],
    achievements: { pt: [], en: [] },
  },
];
