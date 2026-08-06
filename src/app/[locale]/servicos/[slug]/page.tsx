import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, type ServiceSlug } from "@/content/services";
import { Section } from "@/components/Section";
import { ServiceVisual } from "@/components/ServiceVisual";
import { CallToAction } from "@/components/CallToAction";
import { Icon } from "@/components/Icon";
import { AnimatedText } from "@/components/AnimatedText";
import { getLocalizedAlternates, getLocalizedSocialMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  const loc = locale as Locale;
  return {
    title: service[loc].seoTitle,
    description: service[loc].seoDescription,
    alternates: getLocalizedAlternates(loc, { pt: `/servicos/${slug}`, en: `/services/${slug}` }),
    ...getLocalizedSocialMetadata(
      loc,
      service[loc].seoTitle,
      service[loc].seoDescription,
      loc === "pt" ? `/servicos/${slug}` : `/services/${slug}`,
    ),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale as Locale;
  const service = services.find((item) => item.slug === (slug as ServiceSlug));
  if (!service) notFound();

  return (
    <>
      <Section className="border-b border-line bg-bg pb-20 pt-14 sm:pb-28 sm:pt-20">
        <Link href="/servicos" className="editorial-link editorial-link-back hero-sequence-item hero-sequence-eyebrow">
          <Icon name="arrow-left" size={17} />{t("allServices")}
        </Link>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="page-title lg:col-span-8" data-reveal="words">
            <AnimatedText text={service[loc].title} mode="words" />
          </h1>
          <p className="body-copy hero-sequence-item hero-sequence-copy lg:col-span-4">{service[loc].short}</p>
        </div>
      </Section>

      <Section className="border-b border-line py-8 sm:py-12">
        <ServiceVisual icon={service.icon} title={service[loc].title} label={service[loc].imageAlt} image={service.image} />
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal="fade">{t("aboutLabel")}</p>
            <p className="mt-8 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-navy sm:text-5xl" data-reveal="text" data-reveal-index="1">{service[loc].description}</p>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-y border-line py-7" data-reveal="rise" data-reveal-index="2">
              <h2 className="text-sm font-semibold text-navy">{t("forWhom")}</h2>
              <ul className="mt-5 divide-y divide-line">
                {service[loc].forWhom.map((item) => (
                  <li key={item} className="flex min-h-14 items-center gap-3 text-sm leading-relaxed text-fg-muted">
                    <Icon name="check" size={17} className="shrink-0 text-brand" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal="fade">{t("includes")}</p>
            <h2 className="section-title mt-7" data-reveal="words" data-reveal-index="1"><AnimatedText text={t("scopeTitle")} mode="words" /></h2>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {service[loc].includes.map((item, index) => (
              <li key={item} className="grid min-h-16 grid-cols-[3rem_1fr] items-center gap-4 text-fg-muted" data-reveal="rise" data-reveal-index={Math.min(index, 5)}>
                <span className="font-semibold tabular-nums text-brand">0{index + 1}</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-b border-line">
        <p className="eyebrow" data-reveal="fade">{t("process")}</p>
        <h2 className="section-title mt-7" data-reveal="words" data-reveal-index="1"><AnimatedText text={t("processTitle")} mode="words" /></h2>
        <ol className="mt-16 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {service[loc].process.map((step, index) => (
            <li key={step} className="min-h-52 border-b border-line py-7 sm:px-6 lg:border-b-0" data-reveal="rise" data-reveal-index={index}>
              <span className="font-display text-2xl font-semibold text-brand">0{index + 1}</span>
              <p className="mt-16 max-w-[12rem] font-display text-xl font-semibold leading-tight tracking-[-0.025em] text-navy">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CallToAction title={t("detailCtaTitle", { service: service[loc].title })} text={t("detailCtaText")} button={t("cta")} />
    </>
  );
}
