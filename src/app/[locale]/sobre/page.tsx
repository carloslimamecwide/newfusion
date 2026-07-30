import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

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
          <p className="eyebrow lg:col-span-3">{t("manifestoLabel")}</p>
          <p className="font-display text-3xl font-medium leading-[1.1] tracking-[-0.035em] lg:col-span-8 lg:col-start-5 sm:text-5xl">
            {t("manifesto")}
          </p>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t("modelLabel")}</p>
            <h2 className="mt-5 section-title">{t("modelTitle")}</h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {([1, 2, 3] as const).map((item) => (
              <div key={item} className="grid grid-cols-[3rem_1fr] gap-5 py-7">
                <span className="font-display text-xl font-semibold text-brand">0{item}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{t(`model${item}Title`)}</h3>
                  <p className="mt-3 leading-relaxed text-fg-muted">{t(`model${item}Text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <p className="eyebrow">{t("principlesLabel")}</p>
        <h2 className="mt-5 section-title">{t("principlesTitle")}</h2>
        <div className="mt-14 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {([1, 2, 3, 4] as const).map((item) => (
            <article key={item} className="min-h-60 border-b border-line p-6 sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:last:border-r-0">
              <span className="text-sm tabular-nums text-brand">0{item}</span>
              <h3 className="mt-14 font-display text-xl font-semibold">{t(`principle${item}Title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t(`principle${item}Text`)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-brand text-bg">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title lg:col-span-8">{t("ctaTitle")}</h2>
          <div className="lg:col-span-4">
            <p className="leading-relaxed text-bg/75">{t("ctaText")}</p>
            <Link href="/contacto" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-bg px-6 py-3.5 text-sm font-semibold text-fg">
              {t("cta")}
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
