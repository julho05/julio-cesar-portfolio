import type { Project } from "@/types/content";

/**
 * Projetos exibidos no portfólio, na ordem de destaque.
 * Conteúdo baseado nos READMEs dos repositórios públicos de github.com/julho05.
 * Para adicionar um projeto, inclua um objeto nesta lista (a página /projetos/[slug] é gerada automaticamente).
 */
export const projects: Project[] = [
  {
    slug: "central-contabilidade",
    name: "Central Contabilidade",
    featured: true,
    status: "demo",
    year: 2026,
    kind: { pt: "Site institucional e migração", en: "Corporate website & migration" },
    summary: {
      pt: "Reconstrução do site de um escritório contábil de São Bento do Sul (SC): migração de WordPress com Elementor para um site estático rápido, preservando o posicionamento no Google.",
      en: "Rebuild of an accounting firm's website in São Bento do Sul (Brazil): a migration from WordPress + Elementor to a fast static site that keeps its Google rankings.",
    },
    problem: {
      pt: "O site antigo era, na prática, dois sites sobrepostos: páginas novas em Elementor convivendo com páginas de 2019 da agência anterior, com cabeçalho, menu e endereço diferentes, textos copiados de outra empresa e links que transferiam autoridade de SEO para terceiros.",
      en: "The old site was effectively two sites layered on top of each other: new Elementor pages living alongside 2019 pages from a previous agency, with different headers, menus and addresses, copy borrowed from another company and links passing SEO authority to third parties.",
    },
    solution: {
      pt: "Site estático em HTML, CSS e JavaScript puro, com 270 páginas e um único arquivo JavaScript de 8,7 KB no site publicado. O conteúdo foi migrado pela REST API do WordPress, e um conjunto de ferramentas em Node.js mantém cabeçalho, rodapé e blog consistentes, sem uma segunda fonte da verdade.",
      en: "A static site in plain HTML, CSS and JavaScript: 270 pages and a single 8.7 KB JavaScript file in production. Content was migrated through the WordPress REST API, and a set of Node.js tools keeps the header, footer and blog consistent with a single source of truth.",
    },
    features: {
      pt: [
        "233 posts migrados pela REST API do WordPress, com 230 imagens destacadas",
        "250 URLs antigas preservadas, sem nenhum redirect necessário",
        "Script que propaga cabeçalho, rodapé e bloco comum do <head> para as outras 269 páginas",
        "Gerador do blog com índice paginado em 20 páginas e sitemap.xml",
        "FAQ próprio em cada página de serviço, com marcação FAQPage",
        "Formulários validados que abrem o WhatsApp com a mensagem pronta",
        "Empacotador que gera o .zip de publicação e valida os caminhos internos",
      ],
      en: [
        "233 posts migrated through the WordPress REST API, with 230 featured images",
        "250 legacy URLs preserved with zero redirects required",
        "Script that syncs the header, footer and shared <head> block across the other 269 pages",
        "Blog generator with a 20-page paginated index and sitemap.xml",
        "Dedicated FAQ on each service page, with FAQPage markup",
        "Validated forms that open WhatsApp with a ready-to-send message",
        "Packager that builds the deployment .zip and validates internal paths",
      ],
    },
    challenges: {
      pt: [
        "Preservar o SEO: os posts ficaram na raiz, exatamente onde estavam no WordPress, evitando 233 redirects 301 e semanas de reindexação.",
        "Menu mobile cortado: o backdrop-filter do cabeçalho criava um bloco contentor para o menu fixo. O efeito foi mantido apenas no desktop.",
        "O Compress-Archive do PowerShell 5.1 grava caminhos com barra invertida e quebra a extração em servidores Linux. O empacotador próprio monta o zip corretamente e confere o resultado antes de terminar.",
        "Limpeza de conteúdo: links para redes de terceiros removidos, missão copiada de outra empresa corrigida e serviço não oferecido retirado do site.",
      ],
      en: [
        "Keeping SEO intact: posts stayed at the root, exactly where WordPress served them, avoiding 233 301-redirects and weeks of reindexing.",
        "Clipped mobile menu: the header's backdrop-filter created a containing block for the fixed menu. The effect now runs on desktop only.",
        "PowerShell 5.1's Compress-Archive writes backslash paths that break extraction on Linux servers. A custom packager builds a spec-compliant zip and verifies it before finishing.",
        "Content clean-up: links to third-party networks removed, a mission statement copied from another company fixed, and a service the firm doesn't offer taken off the site.",
      ],
    },
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "WordPress REST API", "SEO"],
    cover: {
      type: "image",
      src: "/projects/central-contabilidade.webp",
      alt: {
        pt: "Página inicial do site da Central Contabilidade, com formulário de contato no destaque",
        en: "Central Contabilidade home page, with a contact form in the hero section",
      },
    },
    gallery: [],
    links: {
      repository: "https://github.com/julho05/julho05.github.io",
      demo: "https://julho05.github.io/",
    },
  },
  {
    slug: "sgs-gestao-de-solicitacoes",
    name: "SGS — Gestão de Solicitações",
    featured: true,
    status: "completed",
    year: 2026,
    kind: { pt: "Aplicação web full stack", en: "Full stack web application" },
    summary: {
      pt: "Sistema web para registrar, consultar e acompanhar solicitações de pagamento com controle de fluxo e status, desenvolvido como desafio técnico.",
      en: "Web system to register, search and track payment requests with workflow and status control, built as a technical challenge.",
    },
    problem: {
      pt: "Uma empresa precisa registrar solicitações de pagamento e garantir que cada uma siga um fluxo de aprovação válido, com rastreabilidade e precisão nos valores.",
      en: "A company needs to record payment requests and make sure each one follows a valid approval flow, with traceability and exact monetary values.",
    },
    solution: {
      pt: "Backend em Java 21 com Spring Boot, organizado em três camadas (Controller, Service e Repository), banco de dados MySQL e frontend em HTML, CSS e JavaScript.",
      en: "A Java 21 + Spring Boot backend organized in three layers (Controller, Service and Repository), a MySQL database and an HTML, CSS and JavaScript frontend.",
    },
    features: {
      pt: [
        "Cadastro de solicitações vinculadas a solicitante e categoria",
        "Listagem com filtros dinâmicos opcionais",
        "Fluxo de status com transições controladas",
        "Tabelas e dados iniciais criados automaticamente na inicialização",
        "Scripts SQL de schema e dados iniciais versionados no repositório",
      ],
      en: [
        "Payment requests linked to a requester and a category",
        "Listing with optional dynamic filters",
        "Status workflow with controlled transitions",
        "Tables and seed data created automatically on startup",
        "Versioned SQL scripts for schema and seed data",
      ],
    },
    challenges: {
      pt: [
        "Uma única query nativa com INNER JOIN entre as três tabelas atende à listagem com ou sem filtros, usando a técnica :parametro IS NULL OR coluna = :parametro.",
        "As transições de status ficam no Service, com switch expression do Java 21: uma solicitação SOLICITADA só pode seguir para LIBERADA ou REJEITADA.",
        "Valores monetários usam BigDecimal em vez de double, eliminando erros de precisão em operações decimais.",
      ],
      en: [
        "A single native query with INNER JOINs across the three tables serves the listing with or without filters, using the :param IS NULL OR column = :param technique.",
        "Status transitions live in the Service layer using Java 21 switch expressions: a REQUESTED item can only move to RELEASED or REJECTED.",
        "Monetary values use BigDecimal instead of double, removing precision errors in decimal arithmetic.",
      ],
    },
    technologies: ["Java", "Spring Boot", "Maven", "MySQL", "SQL", "JavaScript", "HTML", "CSS"],
    cover: {
      type: "architecture",
      alt: {
        pt: "Diagrama da arquitetura em camadas: Controller, Service, Repository e MySQL",
        en: "Layered architecture diagram: Controller, Service, Repository and MySQL",
      },
    },
    gallery: [],
    links: { repository: "https://github.com/julho05/sgsdesafio" },
  },
  {
    slug: "controle-de-produtos",
    name: "Controle de Produtos",
    featured: true,
    status: "evolving",
    year: 2026,
    kind: { pt: "Sistema de linha de comando", en: "Command-line application" },
    summary: {
      pt: "Sistema de controle de estoque em Python puro, com persistência em JSON, histórico de movimentações e 101 testes automatizados.",
      en: "Inventory management system in plain Python, with JSON persistence, movement history and 101 automated tests.",
    },
    problem: {
      pt: "Controlar estoque exige que o saldo de cada produto seja confiável e auditável, inclusive quando produtos são renomeados, excluídos ou quando a contagem física discorda do sistema.",
      en: "Inventory control requires every product balance to be reliable and auditable, even when products are renamed, deleted or a physical count disagrees with the system.",
    },
    solution: {
      pt: "Um sistema em Python sem dependências externas em que a quantidade só muda por movimentos registrados, garantindo que a soma do histórico de cada produto feche com o seu saldo.",
      en: "A dependency-free Python system where quantities only change through recorded movements, guaranteeing that each product's history always adds up to its balance.",
    },
    features: {
      pt: [
        "Cadastro e edição com validação de nome, preço, quantidade e categoria",
        "Busca por parte do nome e listagem ordenável",
        "Entrada, saída e ajuste de estoque, com bloqueio de saídas acima do disponível",
        "Histórico vinculado ao id do produto, que sobrevive a renomeações e exclusões",
        "Relatório com valor total, quebra por categoria e alerta de estoque baixo",
        "Gravação segura: escrita em arquivo temporário e troca atômica pelo original",
      ],
      en: [
        "Create and edit products with validation of name, price, quantity and category",
        "Partial-name search and sortable listing",
        "Stock in, stock out and adjustments, blocking withdrawals above available stock",
        "History tied to the product id, surviving renames and deletions",
        "Report with total value, per-category breakdown and low-stock alerts",
        "Safe writes: data goes to a temporary file, then atomically replaces the original",
      ],
    },
    challenges: {
      pt: [
        "Código de busca duplicado em cinco funções multiplicava os bugs. Extrair funções comuns eliminou a duplicação e fez cada correção valer para todo o sistema.",
        "Separar a busca parcial da busca exata evitou que excluir \"caneta\" apagasse a \"Caneta Azul\" sem aviso.",
        "Arquivos gravados no formato antigo são migrados automaticamente na primeira execução: os produtos ganham id e as movimentações são associadas pelo nome.",
        "Evolução incremental por pull requests pequenos, um assunto por vez, coberta por 101 testes com pytest.",
      ],
      en: [
        "Search logic duplicated across five functions multiplied bugs. Extracting shared helpers removed the duplication so each fix applied everywhere.",
        "Separating partial from exact search stopped deleting \"pen\" from silently removing \"Blue Pen\".",
        "Files saved in the legacy format are migrated on first run: products receive ids and movements are matched by name.",
        "Incremental evolution through small, single-topic pull requests, covered by 101 pytest tests.",
      ],
    },
    technologies: ["Python", "pytest", "JSON"],
    cover: {
      type: "terminal",
      alt: {
        pt: "Menu principal do sistema de controle de produtos no terminal",
        en: "Main menu of the inventory system running in a terminal",
      },
    },
    gallery: [],
    links: { repository: "https://github.com/julho05/controle-produtos-python-" },
  },
  {
    slug: "contabilize",
    name: "Contabilize Assessoria Contábil",
    featured: true,
    status: "demo",
    year: 2026,
    kind: { pt: "Site institucional", en: "Corporate website" },
    summary: {
      pt: "Site institucional para um escritório de contabilidade de Itabaiana (SE), com foco em SEO local e conversão de visitantes em contatos pelo WhatsApp.",
      en: "Corporate website for an accounting firm in Itabaiana (Brazil), focused on local SEO and turning visitors into WhatsApp leads.",
    },
    problem: {
      pt: "O escritório precisava ser encontrado em buscas locais e transformar visitas em contatos, sem depender de servidor ou de uma plataforma paga.",
      en: "The firm needed to be found in local searches and turn visits into leads, without depending on a server or a paid platform.",
    },
    solution: {
      pt: "Página única em HTML, CSS e JavaScript puro, com cerca de 40 KB de código próprio e nenhuma biblioteca externa, dados estruturados para o Google e formulário que leva o contato direto ao WhatsApp.",
      en: "A single page in plain HTML, CSS and JavaScript, around 40 KB of hand-written code and no external libraries, with structured data for Google and a form that sends leads straight to WhatsApp.",
    },
    features: {
      pt: [
        "Dados estruturados JSON-LD: AccountingService, LocalBusiness, WebSite e FAQPage",
        "Textos construídos em torno das buscas reais do público",
        "Formulário que monta a mensagem e abre o WhatsApp",
        "FAQ acessível, com aria-expanded",
        "sitemap.xml, robots.txt e manifesto para instalação no celular",
        "Animações que respeitam prefers-reduced-motion",
      ],
      en: [
        "JSON-LD structured data: AccountingService, LocalBusiness, WebSite and FAQPage",
        "Copy written around the audience's real search queries",
        "Form that composes the message and opens WhatsApp",
        "Accessible FAQ with aria-expanded",
        "sitemap.xml, robots.txt and a web app manifest",
        "Animations that respect prefers-reduced-motion",
      ],
    },
    challenges: {
      pt: [
        "Publicar a demonstração sem competir com o site oficial: o canonical aponta para o domínio definitivo, para que o Google não indexe a cópia.",
        "Desempenho sem frameworks: zero bibliotecas externas, fontes com preconnect e ícones SVG inline.",
      ],
      en: [
        "Publishing the demo without competing with the official site: the canonical URL points to the final domain so Google doesn't index the copy.",
        "Performance without frameworks: zero external libraries, preconnected fonts and inline SVG icons.",
      ],
    },
    technologies: ["HTML", "CSS", "JavaScript", "JSON-LD", "SEO"],
    cover: {
      type: "image",
      src: "/projects/contabilize.webp",
      alt: {
        pt: "Página inicial do site da Contabilize, com formulário de diagnóstico contábil",
        en: "Contabilize home page, with an accounting assessment form",
      },
    },
    gallery: [],
    links: {
      repository: "https://github.com/julho05/contabilize-site",
      demo: "https://julho05.github.io/contabilize-site/",
    },
  },
  {
    slug: "sandrade-contabilidade",
    name: "S. Andrade Contabilidade",
    featured: true,
    status: "demo",
    year: 2026,
    kind: { pt: "Site institucional", en: "Corporate website" },
    summary: {
      pt: "Site institucional para um escritório contábil de Itajaí (SC), com SEO local, página de privacidade (LGPD) e formulário integrado ao WhatsApp.",
      en: "Corporate website for an accounting firm in Itajaí (Brazil), with local SEO, a privacy policy page (LGPD) and a WhatsApp-integrated form.",
    },
    problem: {
      pt: "Ser encontrado por quem procura contabilidade em Itajaí e cidades vizinhas, e converter essas visitas em contatos qualificados.",
      en: "Getting found by people searching for accounting services in Itajaí and nearby cities, and converting those visits into qualified leads.",
    },
    solution: {
      pt: "Site estático em HTML5, CSS3 e JavaScript puro, com SEO local, dados estruturados e todas as interações escritas sem bibliotecas.",
      en: "A static site in plain HTML5, CSS3 and JavaScript, with local SEO, structured data and every interaction written without libraries.",
    },
    features: {
      pt: [
        "Meta geo e JSON-LD com AccountingService, LocalBusiness, FAQPage e BreadcrumbList",
        "Catálogo de serviços e área atendida descritos nos dados estruturados",
        "Scrollspy, animações de entrada com IntersectionObserver e contadores animados",
        "FAQ em acordeão e máscara de telefone",
        "Formulário validado que envia a mensagem formatada ao WhatsApp",
        "Política de privacidade (LGPD) e página 404 amigável",
      ],
      en: [
        "Geo meta tags and JSON-LD with AccountingService, LocalBusiness, FAQPage and BreadcrumbList",
        "Service catalog and service area described in structured data",
        "Scrollspy, IntersectionObserver entrance animations and animated counters",
        "Accordion FAQ and phone input mask",
        "Validated form that sends a formatted message to WhatsApp",
        "Privacy policy (LGPD) and a friendly 404 page",
      ],
    },
    challenges: {
      pt: [
        "Servir o site em subpasta no GitHub Pages, com caminhos ajustados e um roteiro documentado para a migração ao domínio próprio.",
        "Acessibilidade desde o início: skip-link, foco visível, contraste AA e respeito a prefers-reduced-motion.",
      ],
      en: [
        "Serving the site from a GitHub Pages subfolder, with adjusted paths and a documented plan for moving to a custom domain.",
        "Accessibility from day one: skip link, visible focus, AA contrast and prefers-reduced-motion support.",
      ],
    },
    technologies: ["HTML", "CSS", "JavaScript", "JSON-LD", "SEO", "GitHub Pages"],
    cover: {
      type: "image",
      src: "/projects/sandrade-contabilidade.webp",
      alt: {
        pt: "Página inicial do site da S. Andrade Contabilidade",
        en: "S. Andrade Contabilidade home page",
      },
    },
    gallery: [],
    links: {
      repository: "https://github.com/julho05/sandrade-contabilidade",
      demo: "https://julho05.github.io/sandrade-contabilidade/",
    },
  },
  {
    slug: "cr-recursos-humanos",
    name: "CR Recursos Humanos",
    featured: true,
    status: "demo",
    year: 2026,
    kind: { pt: "Site institucional multipágina", en: "Multi-page corporate website" },
    summary: {
      pt: "Site institucional para uma consultoria de RH, com páginas dedicadas a cada serviço, área para candidatos e política de privacidade.",
      en: "Corporate website for an HR consultancy, with a dedicated page for each service, a careers page and a privacy policy.",
    },
    problem: {
      pt: "Apresentar quatro frentes de serviço distintas (recrutamento e seleção, consultoria de RH, gestão de benefícios e folha de pagamento) de forma clara para empresas e candidatos.",
      en: "Presenting four distinct service lines (recruitment, HR consulting, benefits management and payroll) clearly to both companies and candidates.",
    },
    solution: {
      pt: "Site estático com 11 páginas em HTML, CSS e JavaScript puros, um design system único e módulos de interação independentes.",
      en: "An 11-page static site in plain HTML, CSS and JavaScript, with a single design system and independent interaction modules.",
    },
    features: {
      pt: [
        "Uma página dedicada para cada um dos quatro serviços",
        "Página Trabalhe Conosco para candidatos",
        "Política de privacidade (LGPD) e página 404",
        "Design system compartilhado por todas as páginas",
        "robots.txt, sitemap.xml e manifesto web",
      ],
      en: [
        "A dedicated page for each of the four services",
        "Careers page for candidates",
        "Privacy policy (LGPD) and 404 page",
        "Design system shared across every page",
        "robots.txt, sitemap.xml and web manifest",
      ],
    },
    challenges: {
      pt: [
        "Manter a consistência visual em 11 páginas sem framework nem etapa de build, concentrando o design system em um único CSS.",
      ],
      en: [
        "Keeping 11 pages visually consistent without a framework or build step, by centralizing the design system in a single stylesheet.",
      ],
    },
    technologies: ["HTML", "CSS", "JavaScript", "SEO"],
    cover: {
      type: "image",
      src: "/projects/cr-recursos-humanos.webp",
      alt: {
        pt: "Página inicial do site da CR Recursos Humanos, em tema escuro com detalhes dourados",
        en: "CR Recursos Humanos home page, dark theme with gold accents",
      },
    },
    gallery: [],
    links: {
      repository: "https://github.com/julho05/cr-recursos-humanos",
      demo: "https://julho05.github.io/cr-recursos-humanos/",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
