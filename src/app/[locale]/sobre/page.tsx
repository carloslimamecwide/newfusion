import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/Section";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <Section className="bg-gradient-to-br from-white to-blue-50/40 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      </Section>

      <Section className="bg-white">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{t("missionTitle")}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {t("missionText")}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{t("marketsTitle")}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {t("marketsText")}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">{t("valuesTitle")}</h2>
            <ul className="mt-3 space-y-4">
              {(["value1", "value2", "value3", "value4"] as const).map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs text-blue-700">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-slate-700">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {locale === "pt" ? "Vamos construir algo juntos?" : "Let's build something together?"}
          </h2>
          <p className="mt-3 text-blue-100">
            {locale === "pt"
              ? "Conte-nos o seu projecto. Sem compromisso."
              : "Tell us about your project. No obligation."}
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
          >
            {t("cta")}
          </Link>
        </div>
      </Section>
    </>
  );
}
