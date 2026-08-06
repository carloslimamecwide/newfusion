import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site";

function localizedUrl(locale: Locale, pathname: string) {
  const path = pathname === "/" ? "" : pathname;
  return `${getSiteUrl()}/${locale}${path}`;
}

export function getLocalizedAlternates(locale: Locale, paths: { pt: string; en: string }): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, paths[locale]),
    languages: {
      pt: localizedUrl("pt", paths.pt),
      en: localizedUrl("en", paths.en),
    },
  };
}

export function getLocalizedSocialMetadata(
  locale: Locale,
  title: string,
  description: string,
  pathname: string,
  media?: { url: string; alt: string },
): Pick<Metadata, "openGraph" | "twitter"> {
  const site = getSiteUrl();
  const url = localizedUrl(locale, pathname);
  const image = media?.url
    ? media.url.startsWith("http") ? media.url : `${site}${media.url}`
    : `${site}/${locale}/opengraph-image`;
  const imageAlt = media?.alt ?? title;

  return {
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      siteName: "WebFusionLab",
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
  };
}
