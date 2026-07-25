import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { DM_Sans } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppSticky } from "@/components/WhatsAppSticky";
import { getSiteUrl } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const site = getSiteUrl();

  return {
    metadataBase: new URL(site),
    title: {
      default: t("defaultTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: {
      languages: {
        pt: `${site}/pt`,
        en: `${site}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const tContact = await getTranslations({ locale, namespace: "contact" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebFusionLab",
    url: getSiteUrl(),
    description:
      locale === "pt"
        ? "Desenvolvimento web e software para PME e empresas."
        : "Web and software development for SMEs and companies.",
    areaServed: ["PT", "Worldwide"],
  };

  return (
    <html lang={locale} className={`${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
          <WhatsAppSticky label={tContact("whatsapp")} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
