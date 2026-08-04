import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseImageAlt, publishedCases } from "@/content/portfolio";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { Icon } from "@/components/Icon";
import { getLocalizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  const loc = locale as Locale;
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getLocalizedAlternates(loc, { pt: "/portfolio", en: "/portfolio" }),
    openGraph: { title: t("title"), description: t("subtitle") },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const loc = locale as Locale;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Section className="border-b border-line">
        {publishedCases.length > 0 ? (
          <div className="space-y-24">
            {publishedCases.map((item, index) => (
              <article key={item.slug} className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <Link
                  href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }}
                  className={`group relative min-h-[27rem] overflow-hidden border border-line bg-surface lg:col-span-8 sm:min-h-[36rem] ${index % 2 === 1 ? "lg:col-start-5" : ""}`}
                >
                  <Image src={item.cover.src} alt={getCaseImageAlt(item.cover, loc)} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]" />
                </Link>
                <div className={`border-t border-line pt-6 lg:col-span-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-brand">0{index + 1}</p>
                    <p className="text-sm text-fg-subtle">{item[loc].clientLabel}</p>
                  </div>
                  <h2 className="mt-7 font-display text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-navy">{item[loc].title}</h2>
                  <p className="mt-5 leading-relaxed text-fg-muted">{item[loc].summary}</p>
                  <Link href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }} className="editorial-link mt-7">
                    {t("viewCase")}<Icon name="arrow" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid min-h-[30rem] gap-12 border-y border-line py-12 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">{t("emptyLabel")}</p>
              <h2 className="section-title mt-8">{t("emptyTitle")}</h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-fg-muted">{t("emptyText")}</p>
              <Link href="/contacto" className="editorial-link mt-8">{t("emptyCta")}<Icon name="arrow" size={17} /></Link>
            </div>
          </div>
        )}
      </Section>

      <CallToAction title={t("cta")} text={t("ctaText")} button={t("ctaButton")} />
    </>
  );
}
