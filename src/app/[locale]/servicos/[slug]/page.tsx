import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, getServiceLocal } from "@/content/services";
import { Section } from "@/components/Section";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return services.flatMap((s) => [
    { locale: "pt", slug: s.slug },
    { locale: "en", slug: s.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const svc = getServiceLocal(slug, locale as Locale);
  if (!svc) return {};
  return { title: svc.seoTitle, description: svc.seoDescription };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const svc = getServiceLocal(slug, locale as Locale);
  if (!svc) notFound();

  const t = await getTranslations("services");

  return (
    <>
      <Section className="bg-gradient-to-br from-white to-blue-50/40 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-4xl">{svc.icon}</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {svc.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {svc.short}
          </p>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-5">
          {/* MAIN CONTENT */}
          <div className="space-y-10 lg:col-span-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {locale === "pt" ? "Sobre este serviço" : "About this service"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {svc.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">{t("includes")}</h2>
              <ul className="mt-3 space-y-2">
                {svc.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">{t("process")}</h2>
              <ol className="mt-3 space-y-3">
                {svc.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-sm font-semibold text-slate-900">{t("forWhom")}</h3>
                <ul className="mt-2 space-y-1.5">
                  {svc.forWhom.map((item) => (
                    <li key={item} className="text-sm text-slate-600">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contacto"
                className="block w-full rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                {t("cta")}
              </Link>
              <Link
                href="/servicos"
                className="block w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {t("allServices")}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
