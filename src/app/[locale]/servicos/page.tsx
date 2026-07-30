import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const primary = ["sites-landing-pages", "ecommerce", "web-applications"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale as Locale;
  const primaryServices = services.filter((service) => primary.includes(service.slug));
  const secondaryServices = services.filter((service) => !primary.includes(service.slug));

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
        <p className="eyebrow mb-8">{t("primaryLabel")}</p>
        <div className="border-y border-line">
          {primaryServices.map((service, index) => (
            <Link
              key={service.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: service.slug } }}
              className="group grid gap-5 border-b border-line py-9 last:border-b-0 lg:grid-cols-12 lg:items-center"
            >
              <span className="text-sm tabular-nums text-fg-subtle lg:col-span-1">0{index + 1}</span>
              <h2 className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] group-hover:text-brand lg:col-span-5 sm:text-5xl">
                {service[loc].title}
              </h2>
              <p className="max-w-xl leading-relaxed text-fg-muted lg:col-span-5">{service[loc].short}</p>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-brand transition group-hover:border-brand lg:justify-self-end">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t("secondaryLabel")}</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-none tracking-[-0.04em]">{t("secondaryTitle")}</h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {secondaryServices.map((service) => (
              <Link
                key={service.slug}
                href={{ pathname: "/servicos/[slug]", params: { slug: service.slug } }}
                className="group flex min-h-20 items-center justify-between gap-5 py-4"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-fg group-hover:text-brand">{service[loc].title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{service[loc].short}</p>
                </div>
                <Icon name="arrow" size={17} className="shrink-0 text-brand" />
              </Link>
            ))}
          </div>
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
