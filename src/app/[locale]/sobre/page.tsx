import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { AnimatedText } from "@/components/AnimatedText";
import { getLocalizedAlternates, getLocalizedSocialMetadata } from "@/lib/metadata";
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
    ...getLocalizedSocialMetadata(loc, t("title"), t("subtitle"), loc === "pt" ? "/sobre" : "/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const home = await getTranslations("home");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal="fade">{t("manifestoLabel")}</p>
            <p className="mt-8 font-display text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-navy sm:text-5xl" data-reveal="text" data-reveal-index="1">{t("manifesto")}</p>
          </div>
          <div className="studio-disciplines lg:col-span-7 lg:col-start-6">
            {([
              ["studio1", "/images/editorial/studio-design-digital.webp"],
              ["studio2", "/images/editorial/studio-engineering-digital.webp"],
            ] as const).map(([key, image], index) => (
              <figure key={key} className="studio-discipline" data-reveal="media" data-reveal-index={index}>
                <div className="studio-image">
                  <Image src={image} alt={home(`${key}Alt`)} fill sizes="(max-width: 767px) 100vw, 35vw" className="object-cover" />
                </div>
                <figcaption><span>{home(`${key}Title`)}</span><small>{home(`${key}Label`)}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal="fade">{t("modelLabel")}</p>
            <h2 className="section-title mt-7" data-reveal="words" data-reveal-index="1"><AnimatedText text={t("modelTitle")} mode="words" /></h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {([1, 2, 3] as const).map((item) => (
              <article key={item} className="grid grid-cols-[3rem_1fr] gap-5 py-8" data-reveal="rise" data-reveal-index={item - 1}>
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
        <p className="eyebrow" data-reveal="fade">{t("principlesLabel")}</p>
        <h2 className="section-title mt-7" data-reveal="words" data-reveal-index="1"><AnimatedText text={t("principlesTitle")} mode="words" /></h2>
        <div className="mt-16 border-y border-line">
          {([1, 2, 3, 4] as const).map((item) => (
            <article key={item} className="grid gap-4 border-b border-line py-7 last:border-b-0 sm:grid-cols-12 sm:items-start" data-reveal="rise" data-reveal-index={item - 1}>
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
