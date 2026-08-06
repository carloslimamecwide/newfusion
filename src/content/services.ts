import type { IconName } from "@/components/Icon";

export type ServiceSlug =
  | "sites-landing-pages"
  | "web-applications"
  | "ecommerce"
  | "mobile-apps"
  | "integrations-apis"
  | "maintenance-support"
  | "consulting-ux";

export type ServiceContent = {
  slug: ServiceSlug;
  icon: IconName;
  image: string;
  pt: {
    imageAlt: string;
    title: string;
    short: string;
    description: string;
    forWhom: string[];
    includes: string[];
    process: string[];
    seoTitle: string;
    seoDescription: string;
  };
  en: {
    imageAlt: string;
    title: string;
    short: string;
    description: string;
    forWhom: string[];
    includes: string[];
    process: string[];
    seoTitle: string;
    seoDescription: string;
  };
};

export const services: ServiceContent[] = [
  {
    slug: "sites-landing-pages",
    icon: "globe",
    image: "/images/editorial/capability-web-digital.webp",
    pt: {
      imageAlt: "Ecrã com camadas transparentes de interfaces web conceptuais",
      title: "Sites e landing pages",
      short: "Presença online profissional que converte visitantes em contactos.",
      description:
        "Desenhamos e desenvolvemos websites e landing pages rápidas, acessíveis e optimizadas para SEO, pensadas para o seu mercado e objectivos de negócio.",
      forWhom: [
        "PME e comércio local",
        "Empresas que precisam de redesign",
        "Campanhas e lançamentos de produto",
      ],
      includes: [
        "Design UI/UX responsivo",
        "Desenvolvimento Next.js / performance",
        "SEO técnico base (metadata, sitemap)",
        "Formulários e integrações de contacto",
        "Deploy e HTTPS",
      ],
      process: [
        "Briefing e objectivos",
        "Wireframes e design",
        "Desenvolvimento e conteúdos",
        "Lançamento e formação",
      ],
      seoTitle: "Desenvolvimento de websites e landing pages",
      seoDescription:
        "Sites e landing pages profissionais para PME e empresas. Rápidos, SEO-friendly e pensados para gerar contactos.",
    },
    en: {
      imageAlt: "Display with layered transparent conceptual web interfaces",
      title: "Websites & landing pages",
      short: "Professional online presence that turns visitors into leads.",
      description:
        "We design and build fast, accessible, SEO-ready websites and landing pages tailored to your market and business goals.",
      forWhom: [
        "SMEs and local businesses",
        "Companies needing a redesign",
        "Campaigns and product launches",
      ],
      includes: [
        "Responsive UI/UX design",
        "Next.js development / performance",
        "Core technical SEO (metadata, sitemap)",
        "Contact forms and integrations",
        "Deploy and HTTPS",
      ],
      process: [
        "Brief and goals",
        "Wireframes and design",
        "Build and content",
        "Launch and handoff",
      ],
      seoTitle: "Website and landing page development",
      seoDescription:
        "Professional websites and landing pages for SMEs and companies. Fast, SEO-friendly, built to generate leads.",
    },
  },
  {
    slug: "web-applications",
    icon: "app",
    image: "/images/editorial/studio-engineering-digital.webp",
    pt: {
      imageAlt: "Módulo de computação com circuitos e infraestrutura de dados",
      title: "Aplicações web",
      short: "Portais, dashboards e produtos web à medida do seu processo.",
      description:
        "Construímos aplicações web robustas: back-offices, portais de cliente, dashboards e ferramentas internas que eliminam folhas de cálculo e trabalho manual.",
      forWhom: [
        "Empresas com processos manuais",
        "Equipas que precisam de portais",
        "Startups em fase de produto",
      ],
      includes: [
        "Análise de requisitos",
        "Arquitectura e UX",
        "Frontend e backend",
        "Autenticação e permissões",
        "Deploy e documentação",
      ],
      process: [
        "Discovery e priorização",
        "MVP / iterações",
        "Testes e hardening",
        "Go-live e suporte",
      ],
      seoTitle: "Desenvolvimento de aplicações web à medida",
      seoDescription:
        "Aplicações web, dashboards e portais para PME e empresas. Software à medida com foco em usabilidade e escalabilidade.",
    },
    en: {
      imageAlt: "Compute module with circuits and data infrastructure",
      title: "Web applications",
      short: "Portals, dashboards, and custom web products for your process.",
      description:
        "We build robust web apps: back-offices, customer portals, dashboards, and internal tools that replace spreadsheets and manual work.",
      forWhom: [
        "Companies with manual processes",
        "Teams that need portals",
        "Product-stage startups",
      ],
      includes: [
        "Requirements analysis",
        "Architecture and UX",
        "Frontend and backend",
        "Auth and permissions",
        "Deploy and documentation",
      ],
      process: [
        "Discovery and prioritisation",
        "MVP / iterations",
        "Testing and hardening",
        "Go-live and support",
      ],
      seoTitle: "Custom web application development",
      seoDescription:
        "Web apps, dashboards, and portals for SMEs and companies. Custom software focused on usability and scale.",
    },
  },
  {
    slug: "ecommerce",
    icon: "cart",
    image: "/images/editorial/capability-commerce-digital.webp",
    pt: {
      imageAlt: "Terminal de pagamento e interface conceptual de checkout digital",
      title: "E-commerce",
      short: "Lojas online preparadas para vender com confiança.",
      description:
        "Implementamos e customizamos lojas online com checkout fiável, catálogo claro e integrações de pagamento e envio adequadas ao seu negócio.",
      forWhom: [
        "Marcas e retalho",
        "Negócios B2C e B2B",
        "Quem migra de Instagram/WhatsApp para loja",
      ],
      includes: [
        "Catálogo e fichas de produto",
        "Checkout e pagamentos",
        "Integrações de envio",
        "Painel de gestão",
        "SEO e performance base",
      ],
      process: [
        "Modelo de negócio e catálogo",
        "Design da loja",
        "Integrações e testes",
        "Lançamento e optimização",
      ],
      seoTitle: "Desenvolvimento de lojas online (e-commerce)",
      seoDescription:
        "E-commerce para PME e marcas. Lojas online com pagamentos, envios e gestão simples.",
    },
    en: {
      imageAlt: "Payment terminal and conceptual digital checkout interface",
      title: "E-commerce",
      short: "Online stores built to sell with confidence.",
      description:
        "We implement and customise online stores with reliable checkout, clear catalogues, and payment/shipping integrations that fit your business.",
      forWhom: [
        "Brands and retail",
        "B2C and B2B sellers",
        "Moving from social/WhatsApp to a real store",
      ],
      includes: [
        "Catalogue and product pages",
        "Checkout and payments",
        "Shipping integrations",
        "Admin panel",
        "Core SEO and performance",
      ],
      process: [
        "Business model and catalogue",
        "Store design",
        "Integrations and testing",
        "Launch and optimisation",
      ],
      seoTitle: "E-commerce store development",
      seoDescription:
        "E-commerce for SMEs and brands. Online stores with payments, shipping, and simple management.",
    },
  },
  {
    slug: "mobile-apps",
    icon: "mobile",
    image: "/images/editorial/capability-product-digital.webp",
    pt: {
      imageAlt: "Telemóvel e tablet com interfaces conceptuais de aplicações",
      title: "Apps mobile",
      short: "Experiências móveis para clientes e equipas em movimento.",
      description:
        "Desenvolvemos aplicações mobile (nativas ou cross-platform) quando o telemóvel é o canal principal, com UX clara e backends sólidos.",
      forWhom: [
        "Produtos com uso diário em mobile",
        "Field service e operações",
        "Complemento a plataformas web",
      ],
      includes: [
        "UX mobile-first",
        "App iOS/Android (conforme stack)",
        "API e autenticação",
        "Publicação nas stores (quando aplicável)",
        "Manutenção e updates",
      ],
      process: [
        "Casos de uso e protótipo",
        "Desenvolvimento por sprints",
        "Testes em dispositivos",
        "Release e suporte",
      ],
      seoTitle: "Desenvolvimento de aplicações mobile",
      seoDescription:
        "Apps mobile para iOS e Android. UX clara, backends sólidos e foco no utilizador final.",
    },
    en: {
      imageAlt: "Phone and tablet with conceptual application interfaces",
      title: "Mobile apps",
      short: "Mobile experiences for customers and teams on the move.",
      description:
        "We build mobile apps (native or cross-platform) when the phone is the main channel, with clear UX and solid backends.",
      forWhom: [
        "Products with daily mobile use",
        "Field service and operations",
        "Companion apps to web platforms",
      ],
      includes: [
        "Mobile-first UX",
        "iOS/Android app (stack as needed)",
        "API and authentication",
        "Store publishing (when applicable)",
        "Maintenance and updates",
      ],
      process: [
        "Use cases and prototype",
        "Sprint-based build",
        "Device testing",
        "Release and support",
      ],
      seoTitle: "Mobile app development",
      seoDescription:
        "Mobile apps for iOS and Android. Clear UX, solid backends, focused on end users.",
    },
  },
  {
    slug: "integrations-apis",
    icon: "link",
    image: "/images/editorial/capability-strategy-digital.webp",
    pt: {
      imageAlt: "Topologia conceptual de dados com fibras e nós interligados",
      title: "Integrações e APIs",
      short: "Sistemas a falar entre si: menos cópia manual, mais fiabilidade.",
      description:
        "Ligamos o seu software a ERPs, CRMs, pagamentos, moradas e serviços externos. APIs bem desenhadas e automações que poupam tempo.",
      forWhom: [
        "Empresas com várias ferramentas",
        "Operações com dados duplicados",
        "Produtos que precisam de API pública/privada",
      ],
      includes: [
        "Mapeamento de fluxos de dados",
        "Desenvolvimento de APIs",
        "Webhooks e filas",
        "Monitorização de erros",
        "Documentação para equipas",
      ],
      process: [
        "Inventário de sistemas",
        "Contrato de integração",
        "Implementação e testes",
        "Monitorização em produção",
      ],
      seoTitle: "Integrações de sistemas e desenvolvimento de APIs",
      seoDescription:
        "Integrações e APIs para empresas. Ligue ERP, CRM, pagamentos e automação de processos.",
    },
    en: {
      imageAlt: "Conceptual data topology with interconnected fibres and nodes",
      title: "Integrations & APIs",
      short: "Systems that talk to each other: less copy-paste, more reliability.",
      description:
        "We connect your software to ERPs, CRMs, payments, logistics, and external services. Well-designed APIs and automations that save time.",
      forWhom: [
        "Companies with many tools",
        "Operations with duplicated data",
        "Products that need public/private APIs",
      ],
      includes: [
        "Data flow mapping",
        "API development",
        "Webhooks and queues",
        "Error monitoring",
        "Team documentation",
      ],
      process: [
        "Systems inventory",
        "Integration contract",
        "Build and testing",
        "Production monitoring",
      ],
      seoTitle: "System integrations and API development",
      seoDescription:
        "Integrations and APIs for businesses. Connect ERP, CRM, payments, and process automation.",
    },
  },
  {
    slug: "maintenance-support",
    icon: "shield",
    image: "/images/editorial/studio-engineering-digital.webp",
    pt: {
      imageAlt: "Módulo de computação com circuitos e infraestrutura de dados",
      title: "Manutenção e suporte",
      short: "O seu produto em produção com acompanhamento contínuo.",
      description:
        "Cuidamos de websites e aplicações em produção: updates, segurança, pequenas evoluções e resposta quando algo falha.",
      forWhom: [
        "Quem já tem site/app e precisa de dono técnico",
        "Equipas sem recursos internos de IT",
        "Produtos pós-lançamento",
      ],
      includes: [
        "Monitorização e alertas",
        "Updates de dependências",
        "Correcção de bugs",
        "Pequenas melhorias",
        "Relatório periódico",
      ],
      process: [
        "Onboarding e acesso",
        "Baseline de saúde do sistema",
        "Plano mensal / retainer",
        "Melhoria contínua",
      ],
      seoTitle: "Manutenção e suporte de websites e aplicações",
      seoDescription:
        "Manutenção contínua de sites e apps. Segurança, updates e suporte para o seu software em produção.",
    },
    en: {
      imageAlt: "Compute module with circuits and data infrastructure",
      title: "Maintenance & support",
      short: "Your product in production with ongoing care.",
      description:
        "We look after websites and apps in production: updates, security, small improvements, and response when something breaks.",
      forWhom: [
        "Teams that need a technical owner",
        "Companies without in-house IT",
        "Post-launch products",
      ],
      includes: [
        "Monitoring and alerts",
        "Dependency updates",
        "Bug fixes",
        "Small improvements",
        "Periodic reporting",
      ],
      process: [
        "Onboarding and access",
        "System health baseline",
        "Monthly / retainer plan",
        "Continuous improvement",
      ],
      seoTitle: "Website and application maintenance & support",
      seoDescription:
        "Ongoing maintenance for sites and apps. Security, updates, and support for production software.",
    },
  },
  {
    slug: "consulting-ux",
    icon: "bulb",
    image: "/images/editorial/studio-design-digital.webp",
    pt: {
      imageAlt: "Mão utiliza uma caneta digital numa interface conceptual de produto",
      title: "Consultoria e UX",
      short: "Clareza antes de construir: menos desperdício, melhores decisões.",
      description:
        "Apoiamos discovery, arquitectura de produto e UX: workshops, auditorias técnicas e roadmaps para decidir o que construir a seguir.",
      forWhom: [
        "Quem está a validar uma ideia",
        "Produtos com fricção de utilização",
        "Equipas que precisam de segundo olhar técnico",
      ],
      includes: [
        "Workshops de discovery",
        "Auditoria UX / técnica",
        "Protótipos e fluxos",
        "Roadmap prioritizado",
        "Acompanhamento de implementação",
      ],
      process: [
        "Diagnóstico",
        "Hipóteses e protótipos",
        "Validação",
        "Plano de execução",
      ],
      seoTitle: "Consultoria de produto digital e UX",
      seoDescription:
        "Consultoria UX e discovery para produtos digitais. Roadmaps claros e decisões técnicas fundamentadas.",
    },
    en: {
      imageAlt: "Hand uses a digital stylus on a conceptual product interface",
      title: "Consulting & UX",
      short: "Clarity before you build: less waste, better decisions.",
      description:
        "We support discovery, product architecture, and UX: workshops, technical audits, and roadmaps so you know what to build next.",
      forWhom: [
        "Teams validating an idea",
        "Products with UX friction",
        "Teams needing a second technical opinion",
      ],
      includes: [
        "Discovery workshops",
        "UX / technical audit",
        "Prototypes and flows",
        "Prioritised roadmap",
        "Implementation guidance",
      ],
      process: [
        "Diagnosis",
        "Hypotheses and prototypes",
        "Validation",
        "Execution plan",
      ],
      seoTitle: "Digital product consulting and UX",
      seoDescription:
        "UX and discovery consulting for digital products. Clear roadmaps and sound technical decisions.",
    },
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceLocal(
  slug: string,
  locale: "pt" | "en",
): (ServiceContent["pt"] & { slug: ServiceSlug; icon: string; image: string }) | undefined {
  const s = getService(slug);
  if (!s) return undefined;
  return { slug: s.slug, icon: s.icon, image: s.image, ...s[locale] };
}
