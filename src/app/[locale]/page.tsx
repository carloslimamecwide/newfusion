import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { getCaseImageAlt, publishedCases } from "@/content/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import { ProjectMosaic } from "@/components/ProjectMosaic";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const primaryServiceSlugs = ["sites-landing-pages", "ecommerce", "web-applications"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const loc = locale as Locale;
  const primaryServices = services.filter((service) => primaryServiceSlugs.includes(service.slug));

  return (
    <>
      <section className="hero-grid border-b border-line px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-[var(--container)]">
          <div className="hero-reveal flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <p className="text-sm text-fg-muted">{t("heroMeta")}</p>
          </div>

          <div className="mt-12 grid gap-9 lg:grid-cols-12 lg:items-end">
            <h1 className="display-title hero-reveal hero-reveal-delay-1 lg:col-span-8">
              {t("heroTitle")}
            </h1>
            <div className="hero-reveal hero-reveal-delay-2 lg:col-span-4 lg:pb-2">
              <p className="body-copy">{t("heroSubtitle")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="/contacto" className="button-primary">
                  {t("heroCta")}
                  <Icon name="arrow" size={17} />
                </Link>
                <a href="#trabalho" className="button-secondary">
                  {t("heroSecondary")}
                </a>
              </div>
            </div>
          </div>

          <div className="hero-reveal hero-reveal-delay-2 mt-14 sm:mt-20">
            <ProjectMosaic locale={loc} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[var(--container)] divide-y divide-line px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {([1, 2, 3] as const).map((item) => (
            <div key={item} className="py-7 sm:px-7 sm:first:pl-0 sm:last:pr-0">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                {t(`proof${item}Label`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(`proof${item}Text`)}</p>
            </div>
          ))}
        </div>
      </section>

      <Section id="trabalho" className="border-b border-line">
        <SectionHeading
          eyebrow={t("workEyebrow")}
          title={t("workTitle")}
          subtitle={t("workSubtitle")}
        />

        {publishedCases.length > 0 ? (
          <div className="space-y-20">
            {publishedCases.slice(0, 3).map((item, index) => (
              <article key={item.slug} className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <Link
                  href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }}
                  className={`group relative min-h-80 overflow-hidden rounded-xl border border-line bg-surface lg:col-span-8 ${
                    index % 2 === 1 ? "lg:col-start-5" : ""
                  }`}
                >
                  <Image
                    src={item.cover.src}
                    alt={getCaseImageAlt(item.cover, loc)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </Link>
                <div className={`lg:col-span-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <p className="eyebrow">{item[loc].clientLabel}</p>
                  <h3 className="mt-4 font-display text-3xl font-semibold leading-none tracking-[-0.04em]">
                    {item[loc].title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-fg-muted">{item[loc].summary}</p>
                  <Link
                    href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }}
                    className="mt-7 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-brand"
                  >
                    {t("viewCase")}
                    <Icon name="arrow" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 border-y border-line py-10 sm:py-14 lg:grid-cols-12 lg:items-end">
            <p className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] lg:col-span-6 sm:text-5xl">
              {t("workPendingTitle")}
            </p>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="leading-relaxed text-fg-muted">{t("workPendingText")}</p>
              <Link href="/contacto" className="mt-6 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-brand">
                {t("workPendingCta")}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
        )}
      </Section>

      <Section id="servicos" className="border-b border-line bg-surface">
        <SectionHeading
          eyebrow={t("servicesEyebrow")}
          title={t("servicesTitle")}
          subtitle={t("servicesSubtitle")}
        />

        <div className="border-y border-line">
          {primaryServices.map((service, index) => (
            <Link
              key={service.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: service.slug } }}
              className="group grid gap-5 border-b border-line py-8 last:border-b-0 md:grid-cols-12 md:items-center"
            >
              <span className="text-sm font-semibold tabular-nums text-fg-subtle md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] transition-colors group-hover:text-brand md:col-span-5 sm:text-4xl">
                {service[loc].title}
              </h3>
              <p className="max-w-xl leading-relaxed text-fg-muted md:col-span-5">{service[loc].short}</p>
              <span className="flex h-12 w-12 items-center justify-center justify-self-start rounded-full border border-line text-brand transition group-hover:border-brand md:justify-self-end">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">{t("secondaryServices")}</p>
          <Link href="/servicos" className="button-secondary shrink-0">{t("allServices")}</Link>
        </div>
      </Section>

      <Section id="processo" className="border-b border-line">
        <div className="grid gap-16 lg:grid-cols-12">
          <SectionHeading
            eyebrow={t("processEyebrow")}
            title={t("processTitle")}
            subtitle={t("processSubtitle")}
          />
          <ol className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {([1, 2, 3, 4] as const).map((item) => (
              <li key={item} className="grid grid-cols-[3rem_1fr] gap-5 py-7 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-2xl font-semibold text-brand">0{item}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-fg">{t(`process${item}Title`)}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-fg-muted">{t(`process${item}Text`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <SectionHeading
          eyebrow={t("pricingEyebrow")}
          title={t("pricingTitle")}
          subtitle={t("pricingSubtitle")}
        />
        <div className="border-y border-line">
          {(["sites", "ecommerce", "apps"] as const).map((key, index) => (
            <div key={key} className="grid gap-3 border-b border-line py-7 last:border-b-0 sm:grid-cols-12 sm:items-baseline">
              <span className="text-sm tabular-nums text-fg-subtle sm:col-span-1">0{index + 1}</span>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:col-span-5 sm:text-3xl">{t(`price${key}Title`)}</h3>
              <p className="text-fg-muted sm:col-span-3">{t(`price${key}Text`)}</p>
              <p className="font-display text-xl font-semibold text-brand sm:col-span-3 sm:text-right">{t(`price${key}Value`)}</p>
            </div>
          ))}
        </div>
        <Link href="/precos" className="button-secondary mt-8">{t("pricingCta")}</Link>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">{t("studioEyebrow")}</p>
            <h2 className="section-title">{t("studioTitle")}</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="body-copy">{t("studioText")}</p>
            <Link href="/sobre" className="mt-7 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-brand">
              {t("studioCta")}
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
        <div className="mx-auto max-w-4xl border-y border-line">
          {([1, 2, 3, 4] as const).map((item) => (
            <details key={item} name="home-faq" className="group border-b border-line last:border-b-0">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-5 py-5 text-lg font-semibold text-fg">
                {t(`faq${item}Question`)}
                <span className="text-2xl font-light text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-3xl pb-7 leading-relaxed text-fg-muted">{t(`faq${item}Answer`)}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-brand text-bg">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="section-title lg:col-span-8">{t("ctaTitle")}</h2>
          <div className="lg:col-span-4">
            <p className="max-w-md leading-relaxed text-bg/75">{t("ctaText")}</p>
            <Link
              href="/contacto"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-bg px-6 py-3.5 text-sm font-semibold text-fg transition hover:bg-surface"
            >
              {t("ctaButton")}
              <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
