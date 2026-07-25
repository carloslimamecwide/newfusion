export type CaseStudy = {
  slug: string;
  image: string;
  tags: string[];
  pt: {
    title: string;
    client: string;
    challenge: string;
    solution: string;
    result: string;
    stack: string[];
  };
  en: {
    title: string;
    client: string;
    challenge: string;
    solution: string;
    result: string;
    stack: string[];
  };
};

export const cases: CaseStudy[] = [
  {
    slug: "mariscos-da-anita",
    image:
      "/images/work/mariscos.jpg",
    tags: ["website", "seo", "devops"],
    pt: {
      title: "Landing B2B para marisco HORECA",
      client: "Mariscos da Anita",
      challenge:
        "Precisavam de uma presença digital profissional para restaurantes e hotelaria, com contacto fácil e deploy fiável.",
      solution:
        "Landing page Next.js com formulário (email), WhatsApp, SEO/OG e pipeline CI/CD com Docker na VPS atrás de Cloudflare.",
      result:
        "Site em produção com HTTPS Full Strict, formulário operacional e base sólida para evoluir a marca online.",
      stack: ["Next.js", "Tailwind", "Resend", "Docker", "nginx", "Cloudflare"],
    },
    en: {
      title: "B2B landing for HORECA seafood",
      client: "Mariscos da Anita",
      challenge:
        "They needed a professional digital presence for restaurants and hospitality, with easy contact and reliable deploy.",
      solution:
        "Next.js landing with contact form (email), WhatsApp, SEO/OG, and CI/CD with Docker on a VPS behind Cloudflare.",
      result:
        "Production site with Full Strict HTTPS, working form, and a solid base to grow the brand online.",
      stack: ["Next.js", "Tailwind", "Resend", "Docker", "nginx", "Cloudflare"],
    },
  },
  {
    slug: "internal-ops-portal",
    image:
      "/images/work/portal.jpg",
    tags: ["web-app", "b2b"],
    pt: {
      title: "Portal interno de operações",
      client: "Empresa B2B (confidencial)",
      challenge:
        "Processos espalhados por email e folhas de cálculo, com pouca visibilidade do estado dos pedidos.",
      solution:
        "Aplicação web com autenticação, estados de workflow e painel para a equipa acompanhar o trabalho em tempo quase real.",
      result:
        "Menos trabalho manual, menos erros de comunicação e um único sítio para o estado operacional.",
      stack: ["Next.js", "API", "Auth", "PostgreSQL"],
    },
    en: {
      title: "Internal operations portal",
      client: "B2B company (confidential)",
      challenge:
        "Processes scattered across email and spreadsheets, with little visibility on request status.",
      solution:
        "Web app with authentication, workflow states, and a dashboard so the team can track work in near real time.",
      result:
        "Less manual work, fewer communication errors, and a single place for operational status.",
      stack: ["Next.js", "API", "Auth", "PostgreSQL"],
    },
  },
  {
    slug: "sme-digital-presence",
    image:
      "/images/work/sme.jpg",
    tags: ["website", "branding"],
    pt: {
      title: "Presença digital para PME de serviços",
      client: "PME de serviços (PT)",
      challenge:
        "Imagem online desactualizada e dificuldade em explicar a oferta a novos clientes.",
      solution:
        "Site institucional claro, com serviços bem estruturados, prova social e CTAs de contacto directos.",
      result:
        "Mensagem de marca mais clara e caminho simples para o cliente pedir orçamento.",
      stack: ["Next.js", "Tailwind", "SEO"],
    },
    en: {
      title: "Digital presence for a services SME",
      client: "Services SME (PT)",
      challenge:
        "Outdated online image and difficulty explaining the offer to new clients.",
      solution:
        "Clear institutional site with structured services, social proof, and direct contact CTAs.",
      result:
        "Clearer brand message and a simple path for clients to request a quote.",
      stack: ["Next.js", "Tailwind", "SEO"],
    },
  },
];
