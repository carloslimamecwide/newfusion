import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/servicos": {
      pt: "/servicos",
      en: "/services",
    },
    "/servicos/[slug]": {
      pt: "/servicos/[slug]",
      en: "/services/[slug]",
    },
    "/portfolio": "/portfolio",
    "/sobre": {
      pt: "/sobre",
      en: "/about",
    },
    "/contacto": {
      pt: "/contacto",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
