import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cases } from "@/content/portfolio";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

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
  const loc = locale as Locale;

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
        <div className="mx-auto max-w-5xl space-y-20">
          {cases.map((c, idx) => (
            <article
              key={c.slug}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src={c.image}
                  alt={c[loc].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  {c[loc].client}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {c[loc].title}
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-faint">
                      {t("challenge")}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {c[loc].challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-faint">
                      {t("solution")}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {c[loc].solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-faint">
                      {t("result")}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">
                      {c[loc].result}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {c[loc].stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-ink-2">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl">
            {t("cta")}
          </h2>
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
