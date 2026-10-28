# Júlio César — Portfólio

Portfólio profissional de **Júlio César**, Desenvolvedor Full Stack com experiência anterior em análise de dados e graduando em Engenharia de Software.

Site bilíngue (português e inglês), estático por padrão, com tema escuro/claro, páginas de detalhe para cada projeto e foco em desempenho, acessibilidade e SEO.

## Tecnologias

| Área | Escolha |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Cache Components, Partial Prerendering) |
| Linguagem | TypeScript (modo estrito) |
| Estilo | Tailwind CSS v4 + design tokens em variáveis CSS |
| Animações | [Motion](https://motion.dev) (respeita `prefers-reduced-motion`) |
| Ícones | [Lucide](https://lucide.dev) + [Simple Icons](https://simpleicons.org) (marcas) |
| Formulário | React Hook Form + Zod (validação compartilhada entre cliente e servidor) |
| Internacionalização | i18n nativo do Next.js: `proxy.ts` + `next/root-params` + dicionários JSON |
| Hospedagem | Vercel |

Não há banco de dados: todo o conteúdo fica em arquivos TypeScript e JSON dentro de `src/`.

## Pré-requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Instalação e execução

```bash
npm install
npm run dev          # http://localhost:3000 (redireciona para /pt ou /en)
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Gera os tipos de rota e roda `tsc --noEmit` |

## Estrutura de pastas

```text
src/
├── app/
│   ├── [locale]/                  # Layout raiz por idioma (/pt e /en)
│   │   ├── layout.tsx             # <html>, fontes, tema, header/footer, metadados
│   │   ├── page.tsx               # Página inicial (todas as seções)
│   │   ├── not-found.tsx          # 404 localizado (chamadas a notFound())
│   │   ├── opengraph-image.tsx    # Imagem de compartilhamento gerada por idioma
│   │   └── projetos/[slug]/       # Página de detalhes de cada projeto
│   ├── api/contact/route.ts       # Envio do formulário (Resend), com antispam
│   ├── global-not-found.tsx       # 404 para URLs sem rota
│   ├── globals.css                # Design system (tokens, utilitários, animações)
│   ├── icon.svg                   # Favicon (monograma JC)
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── layout/                    # Header, MobileMenu, Footer, Providers
│   ├── sections/                  # Hero, About, Experience, Skills, Projects, Education, Contact
│   ├── projects/                  # ProjectCard, ProjectCover, StatusBadge
│   ├── contact/                   # ContactForm
│   ├── icons/                     # Ícones de marca (GitHub, LinkedIn)
│   └── ui/                        # Button, Card, Container, Section, SectionHeading, Reveal…
├── data/                          # ← conteúdo profissional (edite aqui)
│   ├── profile.ts                 # Nome, localização, e-mail e redes
│   ├── experience.ts              # Experiências
│   ├── skills.ts                  # Tecnologias por categoria
│   ├── projects.ts                # Projetos
│   └── education.ts               # Graduação e certificações
├── messages/                      # ← textos da interface (pt.json / en.json)
├── i18n/                          # Configuração de idiomas e carregamento dos dicionários
├── hooks/                         # useActiveSection, useScrolled
├── lib/                           # Utilitários (datas, tema, fontes, contato, URL do site)
├── types/content.ts               # Tipos de todo o conteúdo
└── proxy.ts                       # Redireciona / para o idioma do visitante e trata slugs inválidos
public/projects/                   # Capturas de tela dos projetos
```

**Onde fica cada texto:** os textos fixos da interface (menus, títulos, botões, mensagens de validação) ficam em `src/messages/*.json`. O conteúdo profissional (experiências, projetos, formação) fica em `src/data/*.ts`, com os campos traduzíveis no formato `{ pt: "...", en: "..." }`.

## Regra de conteúdo: nada fictício

Campos com valor `null` (ou listas vazias) **não aparecem no site**. Assim, dados ainda não confirmados (datas, empresa anterior, instituição de ensino, e-mail) ficam preparados no código sem que nada inventado seja publicado.

## Como alterar informações pessoais

Edite `src/data/profile.ts`:

```ts
email: "voce@seudominio.com", // passa a aparecer na seção de contato
```

## Como adicionar experiências

Edite `src/data/experience.ts`. Cada item aceita empresa, período (`"AAAA-MM"`), responsabilidades, ferramentas e resultados:

```ts
{
  id: "data-analyst",
  role: { pt: "Analista de Dados", en: "Data Analyst" },
  company: "Empresa X",
  current: false,
  start: "2022-03",
  end: "2024-01",
  summary: { pt: "…", en: "…" },
  responsibilities: { pt: ["…"], en: ["…"] },
  tools: ["Power BI", "SQL"],
  achievements: { pt: [], en: [] },
}
```

## Como adicionar projetos

1. Adicione um objeto em `src/data/projects.ts` (veja os existentes como modelo).
2. Coloque a imagem de capa em `public/projects/` (recomendado: 1440×900, `.webp`) e referencie em `cover.src`.
   Para projetos sem interface web, use `cover: { type: "terminal" | "architecture", alt: {…} }`.
3. A página `/pt/projetos/<slug>` e `/en/projetos/<slug>` é gerada automaticamente, e o sitemap é atualizado.

O campo `status` aceita `"demo"` (demonstração publicada), `"completed"` (concluído) ou `"evolving"` (em evolução).

## Como adicionar tecnologias

Em `src/data/skills.ts`, inclua o item na categoria com `confirmed: true` (apenas itens confirmados aparecem). Para exibir um ícone de marca, mapeie o nome em `src/components/ui/TechIcon.tsx`.

## Como adicionar traduções

1. Adicione a chave em `src/messages/pt.json` **e** em `src/messages/en.json`. O TypeScript acusa erro se o inglês não tiver a mesma estrutura do português.
2. Use nos componentes de servidor com `const dict = await getDictionary()`.
3. Para um novo idioma: inclua o código em `locales` (`src/i18n/config.ts`), crie `src/messages/<código>.json` e registre-o em `src/i18n/dictionaries.ts`.

## Formulário de contato

Sem configuração, o formulário aparece **desabilitado com um aviso** (não há confirmação falsa de envio). Para ativá-lo:

1. Crie uma conta no [Resend](https://resend.com) e gere uma API key.
2. Defina as variáveis de ambiente (veja `.env.example`):
   - `RESEND_API_KEY` (secreta, apenas no servidor)
   - `CONTACT_TO_EMAIL` (quem recebe as mensagens)
   - `CONTACT_FROM_EMAIL` (opcional, remetente de um domínio verificado)

Proteções do endpoint `/api/contact`: validação Zod no servidor, honeypot, tempo mínimo de preenchimento, limite de 3 envios por IP a cada 10 minutos (em memória, por instância) e limite de tamanho do corpo.

## Deploy na Vercel

1. Publique o repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório (o framework Next.js é detectado automaticamente).
3. Em **Settings → Environment Variables**, defina `NEXT_PUBLIC_SITE_URL` com a URL final (ex.: `https://juliocesar.dev`) e, se quiser, as variáveis do formulário.
4. Faça o deploy. O HTTPS é automático.

**Domínio personalizado:** em **Settings → Domains**, adicione o domínio e configure o DNS conforme as instruções da Vercel. Depois, atualize `NEXT_PUBLIC_SITE_URL` e refaça o deploy, para que canonical, sitemap e Open Graph usem o domínio novo.

## Qualidade

- Rotas `/pt` e `/en` e páginas de projeto pré-renderizadas no build
- Metadados por idioma, Open Graph, Twitter Cards, canonical, hreflang, `sitemap.xml` e `robots.txt`
- Navegação por teclado, foco visível, skip link, menu mobile com foco preso e fechamento por Esc
- Tema escuro por padrão, preferência salva sem "piscada" na troca
- Cabeçalhos de segurança (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
