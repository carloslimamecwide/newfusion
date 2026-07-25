import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title"), description: t("subtitle") };
}

const categories = [
  { key: "sites", icon: "globe" as const },
  { key: "apps", icon: "app" as const },
  { key: "ecom", icon: "cart" as const },
  { key: "mobile", icon: "mobile" as const },
  { key: "integrations", icon: "link" as const },
  { key: "maintenance", icon: "shield" as const },
  { key: "consulting", icon: "bulb" as const },
];

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  return (
    <>
      <Section className="border-b border-line bg-surface">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
        </div>
      </Section>

      <Section>
        <p className="max-w-2xl text-base leading-relaxed text-muted">{t("intro")}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon name={cat.icon} size={20} />
                </span>
                <h2 className="font-display text-base font-semibold text-ink">
                  {t(`${cat.key}`)}
                </h2>
              </div>
              <p className="mt-2 font-display text-xl font-bold tracking-tight text-brand">
                {t(`${cat.key}Range`)}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t(`${cat.key}Desc`)}
              </p>
              <div className="mt-4 flex items-start gap-2 border-t border-line pt-4">
                <Icon name="check" size={15} className="mt-0.5 shrink-0 text-brand" />
                <p className="text-xs leading-relaxed text-faint">
                  {t(`${cat.key}Includes`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-2">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {t("notSure")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t("notSureText")}</p>
          <Link
            href="/contacto"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
          >
            {t("notSureText")}
            <Icon
              name="arrow"
              size={17}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Section>

      <Section className="bg-brand-ink-2">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
            {t("cta")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">{t("ctaText")}</p>
          <Link
            href="/contacto"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-ink-2 shadow-sm transition hover:bg-white/90"
          >
            {locale === "pt" ? "Falar connosco" : "Talk to us"}
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
