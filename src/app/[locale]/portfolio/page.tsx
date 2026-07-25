import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

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
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 text-faint">
            <Icon name="bulb" size={30} />
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold text-ink">
            {locale === "pt" ? "Portfolio em atualização" : "Portfolio being updated"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {locale === "pt"
              ? "Estamos a preparar os próximos casos. Entretanto, pode ver os serviços ou pedir um orçamento."
              : "We're preparing upcoming case studies. In the meantime, feel free to check our services or request a quote."}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              {locale === "pt" ? "Ver serviços" : "View services"}
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
            >
              {locale === "pt" ? "Pedir orçamento" : "Request a quote"}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
