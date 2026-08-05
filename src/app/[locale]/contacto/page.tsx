import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { AnimatedText } from "@/components/AnimatedText";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getCalendlyUrl } from "@/lib/site";
import { getLocalizedAlternates } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const loc = locale as Locale;
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: getLocalizedAlternates(loc, { pt: "/contacto", en: "/contact" }),
    openGraph: { title: t("title"), description: t("subtitle") },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const whatsAppUrl = getWhatsAppUrl(locale === "pt" ? "Olá! Gostaria de falar sobre um projeto." : "Hello! I would like to discuss a project.");
  const calendlyUrl = getCalendlyUrl();

  return (
    <Section className="border-b border-line pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow hero-sequence-item hero-sequence-eyebrow">{t("eyebrow")}</p>
          <h1 className="contact-title mt-9" data-reveal="words">
            <AnimatedText text={t("title")} mode="words" />
          </h1>
          <p className="body-copy hero-sequence-item hero-sequence-copy mt-8">{t("subtitle")}</p>
        </div>

        <div className="lg:col-span-8">
          <ContactForm />

          <aside className="mt-12 grid gap-7 border-t border-line pt-7 sm:grid-cols-[1fr_auto] sm:items-start" data-reveal="rise">
            <div>
              <h2 className="text-sm font-semibold text-brand">{t("alternatives")}</h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
                {whatsAppUrl ? (
                  <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="editorial-link">
                    {t("whatsapp")}<Icon name="external" size={16} />
                  </a>
                ) : null}
                {calendlyUrl ? (
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="editorial-link">
                    {t("call")}<Icon name="calendar" size={17} />
                  </a>
                ) : null}
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-fg-subtle sm:text-right">{t("response")}</p>
          </aside>
        </div>
      </div>
    </Section>
  );
}
