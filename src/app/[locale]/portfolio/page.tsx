import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cases } from "@/content/portfolio";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/Section";
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
      <Section className="bg-gradient-to-br from-white to-blue-50/40 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      </Section>
      <Section className="bg-white">
        <div className="mx-auto max-w-4xl space-y-16">
          {cases.map((c) => (
            <article key={c.slug} className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="aspect-[21/9] overflow-hidden bg-slate-100">
                <img
                  src={c.image}
                  alt={c[loc].title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900">{c[loc].title}</h2>
                  <span className="text-sm text-slate-400">·</span>
                  <span className="text-sm text-slate-500">{c[loc].client}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{t("challenge")}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {c[loc].challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{t("solution")}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {c[loc].solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{t("result")}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {c[loc].result}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{t("stack")}</h3>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {c[loc].stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("cta")}</h2>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
          >
            {locale === "pt" ? "Falar connosco" : "Talk to us"}
          </Link>
        </div>
      </Section>
    </>
  );
}
