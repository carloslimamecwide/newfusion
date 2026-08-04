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
