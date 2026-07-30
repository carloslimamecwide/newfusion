import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getCalendlyUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const whatsAppUrl = getWhatsAppUrl(locale === "pt" ? "Olá! Gostaria de falar sobre um projeto." : "Hello! I would like to discuss a project.");
  const calendlyUrl = getCalendlyUrl();

  return (
    <>
      <Section className="hero-grid border-b border-line pt-16 sm:pt-24">
        <p className="eyebrow">{t("eyebrow")}</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="page-title lg:col-span-8">{t("title")}</h1>
          <p className="body-copy lg:col-span-4">{t("subtitle")}</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-8 lg:col-span-8">
            <ContactForm />
          </div>
          <aside className="lg:col-span-3 lg:col-start-10">
            <p className="eyebrow">{t("alternatives")}</p>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {whatsAppUrl && (
                <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="block py-6">
                  <p className="font-display text-xl font-semibold text-fg">{t("whatsapp")}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t("whatsappHint")}</p>
                </a>
              )}
              {calendlyUrl && (
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="block py-6">
                  <p className="font-display text-xl font-semibold text-fg">{t("call")}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t("callHint")}</p>
                </a>
              )}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-fg-subtle">{t("response")}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
