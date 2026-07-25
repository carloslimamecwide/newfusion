import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const serviceIcon: Record<string, Parameters<typeof Icon>[0]["name"]> = {
  "sites-landing-pages": "globe",
  "web-applications": "app",
  ecommerce: "cart",
  "mobile-apps": "mobile",
  "integrations-apis": "link",
  "maintenance-support": "shield",
  "consulting-ux": "bulb",
};

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
      <Section className="border-b border-line bg-surface">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={{ pathname: "/servicos/[slug]", params: { slug: s.slug } }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
                <Image
                  src={s.image}
                  alt={s[loc].title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Icon name={serviceIcon[s.slug]} size={20} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink transition group-hover:text-brand">
                    {s[loc].title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {s[loc].short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {t("cta")}
                    <Icon
                      name="arrow"
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
