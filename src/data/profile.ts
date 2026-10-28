import type { Profile } from "@/types/content";

/**
 * Informações pessoais e links profissionais.
 * Campos `null` ainda não foram confirmados e não são exibidos no site.
 */
export const profile: Profile = {
  name: "Júlio César",
  initials: "JC",
  // Fonte: perfil público do GitHub.
  location: { pt: "Sergipe, Brasil", en: "Sergipe, Brazil" },
  // Preencha para exibir o e-mail na seção de contato (ex.: "contato@seudominio.com").
  email: null,
  socials: {
    github: "https://github.com/julho05",
    linkedin: "https://www.linkedin.com/in/j%C3%BAlio-c%C3%A9sar-98a510218/",
  },
};
