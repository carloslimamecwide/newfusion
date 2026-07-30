import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCaseImageAlt, publishedCases } from "@/content/portfolio";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const loc = locale as Locale;

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
        {publishedCases.length > 0 ? (
          <div className="space-y-24">
            {publishedCases.map((item, index) => (
              <article key={item.slug} className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <Link
                  href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }}
                  className={`group relative min-h-[26rem] overflow-hidden rounded-xl border border-line bg-surface lg:col-span-8 ${index % 2 === 1 ? "lg:col-start-5" : ""}`}
                >
                  <Image
                    src={item.cover.src}
                    alt={getCaseImageAlt(item.cover, loc)}
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </Link>
                <div className={`lg:col-span-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <p className="eyebrow">{item[loc].clientLabel}</p>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-none tracking-[-0.045em]">{item[loc].title}</h2>
                  <p className="mt-5 leading-relaxed text-fg-muted">{item[loc].summary}</p>
                  <Link href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }} className="mt-7 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-brand">
                    {t("viewCase")}
                    <Icon name="arrow" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid min-h-[28rem] gap-12 border-y border-line py-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">{t("emptyLabel")}</p>
              <h2 className="mt-6 section-title">{t("emptyTitle")}</h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-fg-muted">{t("emptyText")}</p>
              <Link href="/contacto" className="button-primary mt-8">
                {t("emptyCta")}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
        )}
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title lg:col-span-8">{t("cta")}</h2>
          <div className="lg:col-span-4">
            <p className="leading-relaxed text-fg-muted">{t("ctaText")}</p>
            <Link href="/contacto" className="button-primary mt-7">{t("ctaButton")}</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
