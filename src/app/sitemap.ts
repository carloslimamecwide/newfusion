import type { MetadataRoute } from "next";

const baseUrl = "https://webfusionlab.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/pt`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
