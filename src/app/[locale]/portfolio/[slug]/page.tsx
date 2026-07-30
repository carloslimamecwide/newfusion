import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseImageAlt, getPublishedCase, publishedCases } from "@/content/portfolio";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
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
      <Section className="hero-grid border-b border-line pt-16 sm:pt-24">
        <Link href="/portfolio" className="eyebrow inline-flex min-h-12 items-center gap-2">
          <span aria-hidden="true">←</span>
          {t("allWork")}
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">{item[loc].clientLabel}</p>
            <h1 className="page-title mt-6">{item[loc].title}</h1>
          </div>
          <p className="body-copy lg:col-span-4">{item[loc].summary}</p>
        </div>
      </Section>

      <div className="relative min-h-[55vh] border-b border-line bg-surface">
        <Image src={item.cover.src} alt={getCaseImageAlt(item.cover, loc)} fill priority fetchPriority="high" sizes="100vw" className="object-cover" />
      </div>

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t("context")}</p>
            <p className="mt-6 leading-relaxed text-fg-muted">{item[loc].context}</p>
          </div>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            <div><p className="eyebrow">{t("challenge")}</p><p className="mt-5 font-display text-3xl font-medium leading-tight tracking-[-0.03em]">{item[loc].challenge}</p></div>
            <div><p className="eyebrow">{t("solution")}</p><p className="mt-5 font-display text-3xl font-medium leading-tight tracking-[-0.03em]">{item[loc].solution}</p></div>
            <div><p className="eyebrow">{t("result")}</p><p className="mt-5 font-display text-3xl font-medium leading-tight tracking-[-0.03em]">{item[loc].result}</p></div>
          </div>
        </div>
      </Section>

      {item.metrics.length > 0 && (
        <Section className="border-b border-line bg-surface">
          <p className="eyebrow">{t("results")}</p>
          <div className="mt-10 grid border-y border-line sm:grid-cols-2 lg:grid-cols-3">
            {item.metrics.map((metric) => (
              <div key={metric[loc].label} className="border-b border-line p-6 sm:border-r lg:border-b-0 lg:last:border-r-0">
                <p className="font-display text-4xl font-semibold text-brand">{metric.value}</p>
                <p className="mt-3 text-sm text-fg-muted">{metric[loc].label}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {item.gallery.length > 0 && (
        <Section className="border-b border-line">
          <div className="space-y-5">
            {item.gallery.map((image) => (
              <div key={image.src} className="relative min-h-[32rem] overflow-hidden rounded-xl border border-line bg-surface">
                <Image src={image.src} alt={getCaseImageAlt(image, loc)} fill sizes="100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section className="bg-brand text-bg">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title lg:col-span-8">{t("caseCtaTitle")}</h2>
          <Link href="/contacto" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-bg px-6 py-3.5 text-sm font-semibold text-fg lg:col-span-3 lg:col-start-10">
            {t("caseCta")}
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </Section>
    </>
  );
}
