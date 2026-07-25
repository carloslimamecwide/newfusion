import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { Section, SectionHeading } from "@/components/Section";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ServicesListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale as Locale;

  return (
    <>
      <Section className="bg-gradient-to-br from-white to-blue-50/40 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      </Section>
      <Section className="bg-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: s.slug } }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={s.image}
                  alt={s[loc].title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 text-2xl">{s.icon}</div>
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                  {s[loc].title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {s[loc].short}
                </p>
                <span className="mt-4 text-sm font-semibold text-blue-700">
                  {t("cta")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
