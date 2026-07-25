import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { Section, SectionHeading } from "@/components/Section";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const serviceIcon: Record<string, Parameters<typeof Icon>[0]["name"]> = {
  "sites-landing-pages": "globe",
  "web-applications": "app",
  ecommerce: "cart",
  "mobile-apps": "mobile",
  "integrations-apis": "link",
  "maintenance-support": "shield",
  "consulting-ux": "bulb",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return { title: t("heroTitle"), description: t("heroSubtitle") };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const loc = locale as Locale;

  const pricingCategories = [
    { key: "sites", icon: "globe" as const },
    { key: "apps", icon: "app" as const },
    { key: "ecom", icon: "cart" as const },
    { key: "mobile", icon: "mobile" as const },
    { key: "integrations", icon: "link" as const },
    { key: "maintenance", icon: "shield" as const },
    { key: "consulting", icon: "bulb" as const },
  ];

  return (
    <>
      {/* ============ HERO — asymmetric, editorial ============ */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-12 lg:gap-8">
          {/* left: copy */}
          <div className="lg:col-span-6 lg:pt-6">
            <div className="reveal flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                {t("heroTag")}
              </span>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                <span className="h-px w-8 bg-brand" aria-hidden />
                {t("heroEyebrow")}
              </p>
            </div>
            <h1 className="reveal reveal-1 mt-5 max-w-xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              {t("heroTitle")}
            </h1>
            <p className="reveal reveal-2 mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {t("heroSubtitle")}
            </p>
            <div className="reveal reveal-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
              >
                {t("heroCta")}
                <Icon
                  name="arrow"
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/servicos"
                className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-surface px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                {t("heroSecondary")}
              </Link>
            </div>
          </div>

          {/* right: image composition */}
          <div className="relative lg:col-span-6">
            <div className="reveal reveal-2 relative ml-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl lg:aspect-[5/4]">
              <Image
                src="/images/hero/hero-main.jpg"
                alt={locale === "pt" ? "Ferramentas de trabalho do estúdio" : "Studio work tools"}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            {/* floating texture card */}
            <div className="reveal reveal-3 relative -mt-16 ml-4 hidden aspect-[4/5] w-40 overflow-hidden rounded-xl border-4 border-paper shadow-lg sm:block lg:absolute lg:-bottom-10 lg:left-0 lg:ml-0 lg:mt-0 lg:w-48">
              <Image
                src="/images/hero/hero-texture.jpg"
                alt=""
                fill
                sizes="12rem"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="flex flex-col gap-1.5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                {t(`proof${n}Title`)}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {t(`proof${n}Text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES — editorial list, not identical cards ============ */}
      <Section>
        <SectionHeading
          title={t("servicesTitle")}
          subtitle={t("servicesSubtitle")}
        />
        <div className="divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: s.slug } }}
              className="group grid items-center gap-4 py-6 transition sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:py-7"
            >
              <div className="flex items-center gap-5">
                <span className="font-display text-sm font-bold tabular-nums text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon name={serviceIcon[s.slug]} size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink transition group-hover:text-brand sm:text-xl">
                  {s[loc].title}
                </h3>
              </div>
              <p className="hidden max-w-md text-sm leading-relaxed text-muted md:block">
                {s[loc].short}
              </p>
              <span className="hidden text-brand opacity-0 transition group-hover:opacity-100 sm:block">
                <Icon name="arrow" size={20} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ PROCESS — typographic numbers ============ */}
      <Section className="bg-surface-2">
        <SectionHeading
          title={t("processTitle")}
          subtitle={t("processSubtitle")}
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="relative">
              <p className="font-display text-6xl font-bold leading-none text-brand/15 lg:text-7xl">
                {n}
              </p>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">
                {t(`process${n}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`process${n}Text`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ PRICING PREVIEW ============ */}
      <Section>
        <SectionHeading
          title={locale === "pt" ? "Investimento" : "Investment"}
          subtitle={locale === "pt" ? "Faixas de mercado para cada tipo de projecto. O valor exacto depende do âmbito." : "Market ranges for each project type. The exact amount depends on scope."}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingCategories.slice(0, 6).map((cat) => (
            <Link
              key={cat.key}
              href="/precos"
              className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-line-strong hover:shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon name={cat.icon} size={20} />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-ink transition group-hover:text-brand">
                  {locale === "pt"
                    ? ({ sites: "Sites", apps: "Apps web", ecom: "E-commerce", mobile: "Mobile", integrations: "Integrações", maintenance: "Manutenção", consulting: "Consultoria" } as const)[cat.key]
                    : ({ sites: "Websites", apps: "Web apps", ecom: "E-commerce", mobile: "Mobile", integrations: "Integrations", maintenance: "Maintenance", consulting: "Consulting" } as const)[cat.key]}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-brand">
                  {locale === "pt"
                    ? ({ sites: "500 € – 3 000 €", apps: "3 000 € – 15 000 €", ecom: "2 000 € – 10 000 €", mobile: "5 000 € – 25 000 €", integrations: "1 000 € – 8 000 €", maintenance: "200 € – 800 €/mês", consulting: "80 € – 150 €/h" } as const)[cat.key]
                    : ({ sites: "€500 – €3,000", apps: "€3,000 – €15,000", ecom: "€2,000 – €10,000", mobile: "€5,000 – €25,000", integrations: "€1,000 – €8,000", maintenance: "€200 – €800/mo", consulting: "€80 – €150/hr" } as const)[cat.key]}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/precos"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            {locale === "pt" ? "Ver todos os preços" : "View all pricing"}
            <Icon
              name="arrow"
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Section>

      {/* ============ WHY — dense, not 4 identical cards ============ */}
      <Section className="border-t border-line bg-surface">
        <SectionHeading title={t("whyTitle")} />
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                <Icon name="check" size={16} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {t(`why${n}Title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t(`why${n}Text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ CTA — drenched brand block ============ */}
      <Section className="bg-brand-ink-2">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {t("ctaText")}
          </p>
          <Link
            href="/contacto"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-ink-2 shadow-sm transition hover:bg-white/90"
          >
            {t("ctaButton")}
            <Icon
              name="arrow"
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Section>
    </>
  );
}
