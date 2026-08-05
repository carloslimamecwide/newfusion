import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { AnimatedText } from "@/components/AnimatedText";
import { getLocalizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const loc = locale as Locale;
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getLocalizedAlternates(loc, { pt: "/precos", en: "/pricing" }),
    openGraph: { title: t("title"), description: t("subtitle") },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-14 lg:grid-cols-12">
          <p className="body-copy lg:col-span-4" data-reveal="rise">{t("intro")}</p>
          <div className="border-y border-line lg:col-span-7 lg:col-start-6">
            {(["sites", "ecommerce", "apps"] as const).map((key, index) => (
              <article key={key} className="grid gap-4 border-b border-line py-8 last:border-b-0 sm:grid-cols-12 sm:items-start sm:py-10" data-reveal="rise" data-reveal-index={index}>
                <span className="font-display text-xl font-semibold tabular-nums text-brand sm:col-span-1">0{index + 1}</span>
                <div className="sm:col-span-7">
                  <h2 className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-navy sm:text-4xl">{t(key)}</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-fg-muted">{t(`${key}Desc`)}</p>
                  <p className="mt-5 text-sm leading-relaxed text-fg-subtle"><span className="font-semibold text-fg">{t("included")}:</span> {t(`${key}Includes`)}</p>
                </div>
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-navy sm:col-span-4 sm:text-right sm:text-4xl">{t(`${key}Range`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal="fade">{t("otherLabel")}</p>
            <h2 className="section-title mt-7" data-reveal="words" data-reveal-index="1"><AnimatedText text={t("otherTitle")} mode="words" /></h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {(["integrations", "maintenance", "mobile", "consulting"] as const).map((key, index) => (
              <div key={key} className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-5" data-reveal="rise" data-reveal-index={index}>
                <p className="font-display text-xl font-semibold text-navy">{t(key)}</p>
                <p className="text-sm font-semibold text-brand">{t("onRequest")}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CallToAction title={t("cta")} text={t("ctaText")} button={t("ctaButton")} />
    </>
  );
}
