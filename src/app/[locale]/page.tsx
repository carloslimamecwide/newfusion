import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { getCaseImageAlt, publishedCases } from "@/content/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import { ProjectMosaic } from "@/components/ProjectMosaic";
import { StudioBlueprint } from "@/components/StudioBlueprint";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";
import { getLocalizedAlternates } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const primaryServiceSlugs = ["sites-landing-pages", "ecommerce", "web-applications"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
    twitter: { title: t("metaTitle"), description: t("metaDescription") },
    alternates: getLocalizedAlternates(loc, { pt: "/", en: "/" }),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const loc = locale as Locale;
  const primaryServices = primaryServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));

  const proofIcons = ["message", "ruler", "code"] as const;

  return (
    <>
      <section className="border-b border-line bg-bg px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="mx-auto grid max-w-[var(--container)] gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="hero-reveal lg:col-span-6">
            <h1 className="display-title">{t("heroTitle")}</h1>
            <p className="body-copy mt-8 max-w-xl">{t("heroSubtitle")}</p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8">
              <Link href="/contacto" className="button-primary">
                {t("heroCta")}
                <Icon name="arrow" size={18} />
              </Link>
              <a href="#trabalho" className="editorial-link">
                {t("heroSecondary")}
                <Icon name="arrow" size={17} />
              </a>
            </div>
          </div>

          <div className="hero-reveal hero-reveal-delay-1 lg:col-span-6 lg:pl-4">
            <ProjectMosaic locale={loc} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[var(--container)] divide-y divide-line px-5 sm:px-8 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {([1, 2, 3] as const).map((item, index) => (
            <div key={item} className="grid grid-cols-[3.5rem_1fr] gap-5 py-8 lg:px-10 lg:first:pl-0 lg:last:pr-0">
              <span className="flex h-12 w-12 items-center justify-center border border-brand text-brand">
                <Icon name={proofIcons[index]} size={25} />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-navy">{t(`proof${item}Label`)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t(`proof${item}Text`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section id="trabalho" className="border-b border-line">
        <SectionHeading eyebrow={t("workEyebrow")} title={t("workTitle")} subtitle={t("workSubtitle")} />

        {publishedCases.length > 0 ? (
          <div>
            {publishedCases.slice(0, 1).map((item) => (
              <article key={item.slug} className="border border-line">
                <Link href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }} className="group relative block min-h-[26rem] overflow-hidden bg-surface sm:min-h-[36rem]">
                  <Image
                    src={item.cover.src}
                    alt={getCaseImageAlt(item.cover, loc)}
                    fill
                    sizes="(max-width: 1360px) 100vw, 1360px"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </Link>
                <div className="grid gap-4 border-t border-line px-5 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
                  <span className="text-sm font-semibold tabular-nums text-brand">01</span>
                  <h3 className="font-display text-xl font-semibold text-navy">{item[loc].title}</h3>
                  <Link href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }} className="editorial-link">
                    {t("viewCase")}<Icon name="arrow" size={17} />
                  </Link>
                </div>
              </article>
            ))}

            {publishedCases.length > 1 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {publishedCases.slice(1, 3).map((item, index) => (
                  <article key={item.slug} className="border border-line">
                    <Link href={{ pathname: "/portfolio/[slug]", params: { slug: item.slug } }} className="group relative block min-h-[24rem] overflow-hidden bg-surface">
                      <Image src={item.cover.src} alt={getCaseImageAlt(item.cover, loc)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]" />
                    </Link>
                    <div className="grid gap-3 border-t border-line p-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                      <span className="text-sm tabular-nums text-brand">0{index + 2}</span>
                      <h3 className="font-display text-lg font-semibold text-navy">{item[loc].title}</h3>
                      <Icon name="arrow" size={19} className="text-brand" />
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid min-h-[25rem] gap-12 border-y border-line py-12 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-7">
              <p className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-navy sm:text-6xl">{t("workPendingTitle")}</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-fg-muted">{t("workPendingText")}</p>
              <Link href="/contacto" className="editorial-link mt-7">
                {t("workPendingCta")}<Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
        )}
      </Section>

      <Section id="servicos" className="border-b border-line bg-surface">
        <SectionHeading eyebrow={t("servicesEyebrow")} title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />

        <div className="border-y border-line">
          {primaryServices.map((service, index) => (
            <Link
              key={service.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: service.slug } }}
              className="group grid gap-5 border-b border-line py-7 last:border-b-0 md:grid-cols-12 md:items-center"
            >
              <span className="flex h-12 w-12 items-center justify-center border border-brand text-brand md:col-span-1">
                <Icon name={service.icon} size={24} />
              </span>
              <div className="md:col-span-5">
                <span className="text-xs tabular-nums text-brand">0{index + 1}</span>
                <h3 className="mt-1 font-display text-2xl font-semibold leading-none tracking-[-0.035em] text-navy sm:text-3xl">{service[loc].title}</h3>
              </div>
              <p className="max-w-xl leading-relaxed text-fg-muted md:col-span-5">{service[loc].short}</p>
              <span className="service-row-arrow justify-self-start text-brand md:justify-self-end">
                <Icon name="arrow" size={27} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">{t("secondaryServices")}</p>
          <Link href="/servicos" className="editorial-link shrink-0">{t("allServices")}<Icon name="arrow" size={17} /></Link>
        </div>
      </Section>

      <Section id="processo" className="border-b border-line">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">{t("processEyebrow")}</p>
            <h2 className="section-title mt-7">{t("processTitle")}</h2>
            <p className="body-copy mt-7">{t("processSubtitle")}</p>
          </div>
          <ol className="process-path lg:col-span-8">
            {([1, 2, 3, 4] as const).map((item, index) => (
              <li key={item} className="process-step" style={{ "--step": index } as CSSProperties}>
                <span className="font-display text-3xl font-semibold text-brand">0{item}</span>
                <div className="mt-4 max-w-[13rem] md:mt-5">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-navy">{t(`process${item}Title`)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t(`process${item}Text`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <SectionHeading eyebrow={t("pricingEyebrow")} title={t("pricingTitle")} subtitle={t("pricingSubtitle")} />
        <div className="border-y border-line">
          {(["sites", "ecommerce", "apps"] as const).map((key, index) => (
            <div key={key} className="grid gap-3 border-b border-line py-7 last:border-b-0 sm:grid-cols-12 sm:items-center sm:py-8">
              <span className="font-display text-xl font-semibold tabular-nums text-brand sm:col-span-1">0{index + 1}</span>
              <div className="sm:col-span-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-navy sm:text-3xl">{t(`price${key}Title`)}</h3>
                <p className="mt-2 text-sm text-fg-muted">{t(`price${key}Text`)}</p>
              </div>
              <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-navy sm:col-span-5 sm:text-right sm:text-5xl">{t(`price${key}Value`)}</p>
            </div>
          ))}
        </div>
        <Link href="/precos" className="editorial-link mt-8">{t("pricingCta")}<Icon name="arrow" size={18} /></Link>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">{t("studioEyebrow")}</p>
            <h2 className="section-title mt-7">{t("studioTitle")}</h2>
            <p className="body-copy mt-7">{t("studioText")}</p>
            <Link href="/sobre" className="editorial-link mt-7">{t("studioCta")}<Icon name="arrow" size={18} /></Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <StudioBlueprint locale={loc} />
          </div>
        </div>
      </Section>

      <Section className="border-b border-line bg-surface">
        <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
        <div className="border-y border-line">
          {([1, 2, 3, 4] as const).map((item) => (
            <details key={item} name="home-faq" className="group border-b border-line last:border-b-0">
              <summary className="flex min-h-20 cursor-pointer items-center justify-between gap-6 py-5 font-display text-xl font-semibold tracking-[-0.02em] text-navy sm:text-2xl">
                {t(`faq${item}Question`)}
                <span className="text-3xl font-light text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-3xl pb-8 leading-relaxed text-fg-muted">{t(`faq${item}Answer`)}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-brand text-white">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="section-title !text-white">{t("ctaTitle")}</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white">{t("ctaText")}</p>
          </div>
          <Link href="/contacto" className="button-inverse lg:col-span-3 lg:col-start-10">
            {t("ctaButton")}<Icon name="arrow" size={18} />
          </Link>
        </div>
      </Section>
    </>
  );
}
