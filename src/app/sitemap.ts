import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { publishedCases } from "@/content/portfolio";

const baseUrl = "https://webfusionlab.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = {
    pt: ["", "/servicos", "/precos", "/portfolio", "/sobre", "/contacto"],
    en: ["", "/services", "/pricing", "/portfolio", "/about", "/contact"],
  } as const;

  const staticEntries: MetadataRoute.Sitemap = Object.entries(staticPaths).flatMap(([locale, paths]) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path.includes("contact") || path.includes("contacto") ? 0.8 : 0.7,
    })),
  );

  const serviceEntries: MetadataRoute.Sitemap = services.flatMap((service) => [
    {
      url: `${baseUrl}/pt/servicos/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/services/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]);

  const caseEntries: MetadataRoute.Sitemap = publishedCases.flatMap((item) => [
    {
      url: `${baseUrl}/pt/portfolio/${item.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/portfolio/${item.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [...staticEntries, ...serviceEntries, ...caseEntries];
}
