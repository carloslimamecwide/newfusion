import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Brand } from "@/components/Brand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "construction" });
  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function ConstructionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("construction");
  const isPt = locale === "pt";

  return (
    <div className="hero-grid flex min-h-screen flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex h-[4.5rem] max-w-[var(--container)] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="WebFusionLab, início" className="shrink-0">
            <Brand />
          </Link>

          <nav aria-label={t("switchLanguage")}>
            <span className="flex items-center gap-1 rounded-md border border-line bg-surface p-1 text-xs font-semibold uppercase tracking-[0.12em]">
              <Link
                href="/"
                locale="pt"
                aria-current={isPt ? "page" : undefined}
                className={`rounded px-2.5 py-1.5 transition-colors ${
                  isPt ? "bg-brand text-bg" : "text-fg-muted hover:text-fg"
                }`}
              >
                PT
              </Link>
              <Link
                href="/"
                locale="en"
                aria-current={!isPt ? "page" : undefined}
                className={`rounded px-2.5 py-1.5 transition-colors ${
                  !isPt ? "bg-brand text-bg" : "text-fg-muted hover:text-fg"
                }`}
              >
                EN
              </Link>
            </span>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-[var(--container)] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 className="page-title mt-6">{t("title")}</h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="body-copy">{t("subtitle")}</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[var(--container)] items-center justify-between gap-4 px-5 py-6 text-xs text-fg-muted sm:px-8">
          <p>© {new Date().getFullYear()} WebFusionLab</p>
          <p>{t("tagline")}</p>
        </div>
      </footer>
    </div>
  );
}
