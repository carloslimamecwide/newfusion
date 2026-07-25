import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, getServiceLocal } from "@/content/services";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const serviceIcon: Record<string, Parameters<typeof Icon>[0]["name"]> = {
  "sites-landing-pages": "globe",
  "web-applications": "app",
  ecommerce: "cart",
  "mobile-apps": "mobile",
  "integrations-apis": "link",
  "maintenance-support": "shield",
  "consulting-ux": "bulb",
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
      {/* header band */}
      <Section className="border-b border-line bg-surface pb-0">
        <div className="max-w-3xl pb-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <Icon name={serviceIcon[svc.slug]} size={24} />
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
            {svc.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {svc.short}
          </p>
        </div>
        <div className="relative aspect-[21/9] overflow-hidden rounded-t-2xl bg-surface-2">
          <Image
            src={svc.image}
            alt={svc.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-5">
          {/* main */}
          <div className="space-y-12 lg:col-span-3">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {locale === "pt" ? "Sobre este serviço" : "About this service"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {svc.description}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("includes")}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {svc.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-soft text-brand">
                      <Icon name="check" size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("process")}
              </h2>
              <ol className="mt-4 space-y-4">
                {svc.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-4 text-sm text-muted">
                    <span className="font-display text-xl font-bold leading-none text-brand/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-xl border border-line bg-surface-2 p-6">
                <h3 className="text-sm font-semibold text-ink">{t("forWhom")}</h3>
                <ul className="mt-3 space-y-2">
                  {svc.forWhom.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-brand">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contacto"
                className="group flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
              >
                {t("cta")}
                <Icon
                  name="arrow"
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/servicos"
                className="block rounded-lg border border-line-strong bg-surface px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink/30"
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
