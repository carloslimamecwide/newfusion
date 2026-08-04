import type { Locale } from "@/i18n/routing";

export type LocalizedImage = {
  src: string;
  pt: { alt: string };
  en: { alt: string };
};

export type CaseMetric = {
  value: string;
  pt: { label: string };
  en: { label: string };
};

export type CaseStudy = {
  slug: string;
  published: boolean;
  cover: LocalizedImage;
  gallery: LocalizedImage[];
  tags: string[];
  metrics: CaseMetric[];
  pt: {
    title: string;
    clientLabel: string;
    summary: string;
    context: string;
    challenge: string;
    solution: string;
    result: string;
    stack: string[];
  };
  en: {
    title: string;
    clientLabel: string;
    summary: string;
    context: string;
    challenge: string;
    solution: string;
    result: string;
    stack: string[];
  };
};

/*
 * Cases are intentionally empty until real, publishable screenshots and
 * outcomes are supplied. Never populate this collection with stock imagery,
 * fabricated metrics, or unapproved client names.
 */
export const cases: CaseStudy[] = [];

export const publishedCases = cases.filter((item) => item.published);

export function getPublishedCase(slug: string) {
  return publishedCases.find((item) => item.slug === slug);
}

export function getCaseImageAlt(image: LocalizedImage, locale: Locale) {
  return image[locale].alt;
}
