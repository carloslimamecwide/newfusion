import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseImageAlt, getPublishedCase, publishedCases } from "@/content/portfolio";
import { Section } from "@/components/Section";
import { CallToAction } from "@/components/CallToAction";
import { Icon } from "@/components/Icon";
import { AnimatedText } from "@/components/AnimatedText";
import { getLocalizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return publishedCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getPublishedCase(slug);
  if (!item) return {};
  const loc = locale as Locale;
  return {
    title: item[loc].title,
    description: item[loc].summary,
    alternates: getLocalizedAlternates(loc, { pt: `/portfolio/${slug}`, en: `/portfolio/${slug}` }),
    openGraph: {
      title: item[loc].title,
      description: item[loc].summary,
      images: [{ url: item.cover.src, alt: getCaseImageAlt(item.cover, loc) }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const loc = locale as Locale;
  const item = getPublishedCase(slug);
  if (!item) notFound();

  return (
    <>
      <Section className="border-b border-line bg-bg pb-20 pt-14 sm:pb-28 sm:pt-20">
        <Link href="/portfolio" className="editorial-link editorial-link-back hero-sequence-item hero-sequence-eyebrow"><Icon name="arrow-left" size={17} />{t("allWork")}</Link>
        <div className="mt-12 grid gap-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="hero-sequence-item hero-sequence-eyebrow text-sm font-semibold text-brand">{item[loc].clientLabel}</p>
            <h1 className="page-title mt-6" data-reveal="words">
              <AnimatedText text={item[loc].title} mode="words" />
            </h1>
          </div>
          <p className="body-copy hero-sequence-item hero-sequence-copy lg:col-span-4">{item[loc].summary}</p>
        </div>
      </Section>

      <div className="relative min-h-[55vh] border-b border-line bg-surface">
        <ViewTransition name={`case-cover-${item.slug}`} share="case-image">
          <Image src={item.cover.src} alt={getCaseImageAlt(item.cover, loc)} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
        </ViewTransition>
      </div>

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4" data-reveal="rise">
            <p className="eyebrow">{t("context")}</p>
            <p className="mt-8 leading-relaxed text-fg-muted">{item[loc].context}</p>
            <div className="mt-10 border-y border-line py-6">
              <h2 className="text-sm font-semibold text-navy">{t("technologies")}</h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {item[loc].stack.map((technology) => <li key={technology} className="text-sm text-fg-muted">{technology}</li>)}
              </ul>
            </div>
          </aside>
          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            {(["challenge", "solution", "result"] as const).map((key, index) => (
              <section key={key} className="border-t border-line pt-7 first:border-0 first:pt-0" data-reveal="rise" data-reveal-index={index}>
                <h2 className="text-sm font-semibold text-brand">{t(key)}</h2>
                <p className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-navy sm:text-4xl">{item[loc][key]}</p>
              </section>
            ))}
          </div>
        </div>
      </Section>

      {item.metrics.length > 0 ? (
        <Section className="border-b border-line bg-surface">
          <p className="eyebrow" data-reveal="fade">{t("results")}</p>
          <div className="mt-12 grid border-y border-line sm:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-line">
            {item.metrics.map((metric, index) => (
              <div key={metric[loc].label} className="border-b border-line py-7 sm:px-7 lg:border-b-0" data-reveal="rise" data-reveal-index={Math.min(index, 5)}>
                <p className="font-display text-5xl font-semibold tracking-[-0.05em] text-navy">{metric.value}</p>
                <p className="mt-3 text-sm text-fg-muted">{metric[loc].label}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {item.gallery.length > 0 ? (
        <Section className="border-b border-line">
          <div className="space-y-6">
            {item.gallery.map((image, index) => (
              <div key={image.src} className="relative min-h-[30rem] overflow-hidden border border-line bg-surface sm:min-h-[42rem]" data-reveal="media" data-reveal-index={Math.min(index, 5)}>
                <Image src={image.src} alt={getCaseImageAlt(image, loc)} fill sizes="(max-width: 1360px) 100vw, 1360px" className="object-cover" />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <CallToAction title={t("caseCtaTitle")} text={item[loc].summary} button={t("caseCta")} />
    </>
  );
}
