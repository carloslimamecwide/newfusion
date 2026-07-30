import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, type ServiceSlug } from "@/content/services";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
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
      <Section className="hero-grid border-b border-line pt-16 sm:pt-24">
        <Link href="/servicos" className="eyebrow inline-flex min-h-12 items-center gap-2">
          <span aria-hidden="true">←</span>
          {t("allServices")}
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="page-title lg:col-span-8">{service[loc].title}</h1>
          <p className="body-copy lg:col-span-4">{service[loc].short}</p>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{t("aboutLabel")}</p>
            <p className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-[-0.035em] text-fg sm:text-5xl">
              {service[loc].description}
            </p>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-y border-line py-6">
              <h2 className="text-sm font-semibold text-fg">{t("forWhom")}</h2>
              <ul className="mt-5 space-y-3">
                {service[loc].forWhom.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
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
            <p className="eyebrow">{t("includes")}</p>
            <h2 className="mt-5 section-title">{t("scopeTitle")}</h2>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {service[loc].includes.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 text-base text-fg-muted">
                <span className="text-sm tabular-nums text-brand">0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-b border-line">
        <p className="eyebrow">{t("process")}</p>
        <h2 className="mt-5 section-title">{t("processTitle")}</h2>
        <ol className="mt-14 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {service[loc].process.map((step, index) => (
            <li key={step} className="min-h-52 border-b border-line p-6 sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:last:border-r-0">
              <span className="font-display text-2xl font-semibold text-brand">0{index + 1}</span>
              <p className="mt-16 font-display text-xl font-semibold leading-tight text-fg">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-brand text-bg">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title lg:col-span-8">{t("detailCtaTitle", { service: service[loc].title })}</h2>
          <div className="lg:col-span-4">
            <p className="leading-relaxed text-bg/75">{t("detailCtaText")}</p>
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
