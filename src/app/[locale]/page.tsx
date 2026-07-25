import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { cases } from "@/content/portfolio";
import { Section, SectionHeading } from "@/components/Section";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return { title: t("heroTitle"), description: t("heroSubtitle") };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const loc = locale as Locale;

  return (
    <>
      {/* HERO */}
      <Section className="bg-gradient-to-br from-white via-blue-50/60 to-white pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Portugal &amp; International
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contacto"
              className="rounded-xl bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800"
            >
              {t("heroCta")}
            </Link>
            <Link
              href="/servicos"
              className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              {t("heroSecondary")}
            </Link>
          </div>
        </div>
      </Section>

      {/* PROOF */}
      <Section className="border-b border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                {t(`proof${n}Title`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(`proof${n}Text`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <SectionHeading title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: s.slug } }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-3 text-3xl">{s.icon}</div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700">
                {s[loc].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s[loc].short}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="bg-white">
        <SectionHeading title={t("processTitle")} subtitle={t("processSubtitle")} />
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-4">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                {n}
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {t(`process${n}Title`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {t(`process${n}Text`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO TEASER */}
      <Section>
        <SectionHeading title={t("portfolioTitle")} subtitle={t("portfolioSubtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href="/portfolio"
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={c.image}
                  alt={c[loc].title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {c[loc].title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{c[loc].client}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {t("portfolioCta")}
          </Link>
        </div>
      </Section>

      {/* WHY */}
      <Section className="bg-white">
        <SectionHeading title={t("whyTitle")} />
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-base font-semibold text-slate-900">
                {t(`why${n}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(`why${n}Text`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-base text-blue-100">{t("ctaText")}</p>
          <Link
            href="/contacto"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </Section>
    </>
  );
}
