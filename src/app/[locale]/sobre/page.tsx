import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

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
      <Section className="border-b border-line bg-surface">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
        </div>
      </Section>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("missionTitle")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t("missionText")}
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("marketsTitle")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t("marketsText")}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("valuesTitle")}
              </h2>
              <ul className="mt-4 space-y-3">
                {(["value1", "value2", "value3", "value4"] as const).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-soft text-brand">
                      <Icon name="check" size={13} />
                    </span>
                    <span className="text-sm font-medium text-ink">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2 lg:sticky lg:top-24">
            <Image
              src="/images/about/studio.jpg"
              alt={locale === "pt" ? "Estúdio WebFusionLab" : "WebFusionLab studio"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-brand-ink-2">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
            {locale === "pt" ? "Vamos construir algo juntos?" : "Let's build something together?"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {locale === "pt"
              ? "Conte-nos o seu projecto. Sem compromisso."
              : "Tell us about your project. No obligation."}
          </p>
          <Link
            href="/contacto"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-ink-2 shadow-sm transition hover:bg-white/90"
          >
            {t("cta")}
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
