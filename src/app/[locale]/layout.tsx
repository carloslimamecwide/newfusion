import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
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
      canonical: `${site}/${locale}`,
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
      url: `${site}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "WebFusionLab",
    url: getSiteUrl(),
    description:
      locale === "pt"
        ? "Estúdio boutique de websites, e-commerce e produtos digitais para PME e marcas."
        : "Boutique studio for websites, e-commerce, and digital products for SMEs and brands.",
    areaServed: ["PT", "Worldwide"],
    knowsLanguage: ["pt", "en"],
    priceRange: "€€",
  };

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${sourceSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body text-fg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            {locale === "pt" ? "Saltar para o conteúdo" : "Skip to content"}
          </a>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
