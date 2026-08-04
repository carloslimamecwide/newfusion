import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { StudioBlueprint } from "@/components/StudioBlueprint";
import { CallToAction } from "@/components/CallToAction";
import { getLocalizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const loc = locale as Locale;
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getLocalizedAlternates(loc, { pt: "/sobre", en: "/about" }),
    openGraph: { title: t("title"), description: t("subtitle") },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const loc = locale as Locale;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">{t("manifestoLabel")}</p>
            <p className="mt-8 font-display text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-navy sm:text-5xl">{t("manifesto")}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><StudioBlueprint locale={loc} /></div>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t("modelLabel")}</p>
            <h2 className="section-title mt-7">{t("modelTitle")}</h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {([1, 2, 3] as const).map((item) => (
              <article key={item} className="grid grid-cols-[3rem_1fr] gap-5 py-8">
                <span className="font-display text-xl font-semibold text-brand">0{item}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy">{t(`model${item}Title`)}</h3>
                  <p className="mt-3 leading-relaxed text-fg-muted">{t(`model${item}Text`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <p className="eyebrow">{t("principlesLabel")}</p>
        <h2 className="section-title mt-7">{t("principlesTitle")}</h2>
        <div className="mt-16 border-y border-line">
          {([1, 2, 3, 4] as const).map((item) => (
            <article key={item} className="grid gap-4 border-b border-line py-7 last:border-b-0 sm:grid-cols-12 sm:items-start">
              <span className="font-display text-xl font-semibold text-brand sm:col-span-1">0{item}</span>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-navy sm:col-span-4">{t(`principle${item}Title`)}</h3>
              <p className="max-w-xl leading-relaxed text-fg-muted sm:col-span-6 sm:col-start-7">{t(`principle${item}Text`)}</p>
            </article>
          ))}
        </div>
      </Section>

      <CallToAction title={t("ctaTitle")} text={t("ctaText")} button={t("cta")} />
    </>
  );
}
