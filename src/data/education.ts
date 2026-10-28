import type { Certification, Education } from "@/types/content";

/** Campos `null` ainda não foram informados e não aparecem no site. */
export const education: Education = {
  degree: { pt: "Bacharelado em Engenharia de Software", en: "Bachelor's in Software Engineering" },
  status: "in-progress",
  institution: null, // ex.: "Universidade X"
  start: null, // ex.: "2023-02"
  expectedEnd: null, // ex.: "2027-12"
  // Áreas relacionadas à formação — não representam disciplinas concluídas.
  areas: {
    pt: [
      "Desenvolvimento de software",
      "Arquitetura de sistemas",
      "Algoritmos",
      "Estruturas de dados",
      "Qualidade de software",
      "Engenharia de requisitos",
    ],
    en: [
      "Software development",
      "Systems architecture",
      "Algorithms",
      "Data structures",
      "Software quality",
      "Requirements engineering",
    ],
  },
};

/**
 * Certificações. A lista vazia oculta o bloco no site.
 * Exemplo: { name: "Nome do curso", issuer: "Instituição", issued: "2025-06", url: "https://..." }
 */
export const certifications: Certification[] = [];
