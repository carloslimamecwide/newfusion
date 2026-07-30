import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  return (
    <>
      <Section className="hero-grid border-b border-line pt-16 sm:pt-24">
        <p className="eyebrow">{t("eyebrow")}</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="page-title lg:col-span-8">{t("title")}</h1>
          <p className="body-copy lg:col-span-4">{t("subtitle")}</p>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <p className="body-copy lg:col-span-4">{t("intro")}</p>
          <div className="border-y border-line lg:col-span-7 lg:col-start-6">
            {(["sites", "ecommerce", "apps"] as const).map((key, index) => (
              <div key={key} className="border-b border-line py-8 last:border-b-0">
                <div className="flex items-baseline justify-between gap-5">
                  <span className="text-sm tabular-nums text-fg-subtle">0{index + 1}</span>
                  <p className="font-display text-xl font-semibold text-brand sm:text-2xl">{t(`${key}Range`)}</p>
                </div>
                <h2 className="mt-6 font-display text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-4xl">{t(key)}</h2>
                <p className="mt-4 max-w-xl leading-relaxed text-fg-muted">{t(`${key}Desc`)}</p>
                <p className="mt-5 text-sm text-fg-subtle">{t("included")}: {t(`${key}Includes`)}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t("otherLabel")}</p>
            <h2 className="mt-5 section-title">{t("otherTitle")}</h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {(["integrations", "maintenance", "mobile", "consulting"] as const).map((key) => (
              <div key={key} className="flex min-h-20 items-center justify-between gap-5 py-4">
                <p className="font-display text-xl font-semibold">{t(key)}</p>
                <p className="text-sm text-fg-muted">{t("onRequest")}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-brand text-bg">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title lg:col-span-8">{t("cta")}</h2>
          <div className="lg:col-span-4">
            <p className="leading-relaxed text-bg/75">{t("ctaText")}</p>
            <Link href="/contacto" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-bg px-6 py-3.5 text-sm font-semibold text-fg">
              {t("ctaButton")}
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
