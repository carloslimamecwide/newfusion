import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CallToAction } from "@/components/CallToAction";
import { Icon } from "@/components/Icon";
import { AnimatedText } from "@/components/AnimatedText";
import { getLocalizedAlternates, getLocalizedSocialMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const primarySlugs = ["sites-landing-pages", "ecommerce", "web-applications"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const loc = locale as Locale;
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getLocalizedAlternates(loc, { pt: "/servicos", en: "/services" }),
    ...getLocalizedSocialMetadata(loc, t("title"), t("subtitle"), loc === "pt" ? "/servicos" : "/services"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale as Locale;
  const primaryServices = primarySlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));
  const secondaryServices = services.filter((service) => !primarySlugs.includes(service.slug));

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <Section className="border-b border-line">
        <p className="eyebrow mb-10" data-reveal="fade">{t("primaryLabel")}</p>
        <div className="border-y border-line">
          {primaryServices.map((service, index) => (
            <Link
              key={service.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: service.slug } }}
              className="group grid gap-5 border-b border-line py-8 last:border-b-0 lg:grid-cols-12 lg:items-center"
              data-reveal="rise"
              data-reveal-index={index}
            >
              <span className="flex h-12 w-12 items-center justify-center border border-brand text-brand lg:col-span-1">
                <Icon name={service.icon} size={24} />
              </span>
              <div className="lg:col-span-5">
                <span className="text-xs tabular-nums text-brand">0{index + 1}</span>
                <h2 className="mt-1 font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-navy sm:text-5xl">{service[loc].title}</h2>
              </div>
              <p className="max-w-xl leading-relaxed text-fg-muted lg:col-span-5">{service[loc].short}</p>
              <span className="service-row-arrow text-brand lg:justify-self-end"><Icon name="arrow" size={27} /></span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal="fade">{t("secondaryLabel")}</p>
            <h2 className="section-title mt-7" data-reveal="words" data-reveal-index="1"><AnimatedText text={t("secondaryTitle")} mode="words" /></h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {secondaryServices.map((service, index) => (
              <Link key={service.slug} href={{ pathname: "/servicos/[slug]", params: { slug: service.slug } }} className="group grid min-h-24 grid-cols-[3rem_1fr_auto] items-center gap-4 py-4" data-reveal="rise" data-reveal-index={index}>
                <span className="flex h-10 w-10 items-center justify-center border border-brand text-brand"><Icon name={service.icon} size={20} /></span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-navy">{service[loc].title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{service[loc].short}</p>
                </div>
                <span className="service-row-arrow text-brand"><Icon name="arrow" size={20} /></span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CallToAction title={t("ctaTitle")} text={t("ctaText")} button={t("cta")} />
    </>
  );
}
