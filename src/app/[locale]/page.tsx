import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { HeroSculpture } from "@/components/HeroSculpture";
import { CapabilityRail, type CapabilityItem } from "@/components/CapabilityRail";
import { Icon, type IconName } from "@/components/Icon";
import { getLocalizedAlternates, getLocalizedSocialMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

const serviceIcons: IconName[] = ["code", "ruler", "bulb", "globe"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...getLocalizedSocialMetadata(loc, t("metaTitle"), t("metaDescription"), "/"),
    alternates: getLocalizedAlternates(loc, { pt: "/", en: "/" }),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const capabilities: CapabilityItem[] = [
    {
      image: "/images/editorial/capability-web-digital.webp",
      alt: t("capability1Alt"),
      title: t("capability1Title"),
      label: t("capability1Label"),
    },
    {
      image: "/images/editorial/capability-strategy-digital.webp",
      alt: t("capability2Alt"),
      title: t("capability2Title"),
      label: t("capability2Label"),
    },
    {
      image: "/images/editorial/capability-commerce-digital.webp",
      alt: t("capability3Alt"),
      title: t("capability3Title"),
      label: t("capability3Label"),
    },
    {
      image: "/images/editorial/capability-product-digital.webp",
      alt: t("capability4Alt"),
      title: t("capability4Title"),
      label: t("capability4Label"),
    },
  ];

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="hero-scroll-marker" aria-hidden="true">
            <span>{t("scroll")}</span><i />
          </div>

          <div className="home-hero-copy">
            <p className="hero-kicker">{t("heroEyebrow")}</p>
            <h1 className="home-hero-title" aria-label={t("heroTitle")}>
              <span className="hero-title-line" aria-hidden="true"><span>{t("heroLine1")}</span></span>
              <span className="hero-title-line" aria-hidden="true"><span>{t("heroLine2")}</span></span>
              <span className="hero-title-line" aria-hidden="true"><span>{t("heroLine3")}</span></span>
            </h1>
            <p className="home-hero-subtitle">{t("heroSubtitle")}</p>
            <div className="home-hero-actions">
              <a href="#trabalho" className="button-primary">
                {t("heroCta")}<span className="button-icon"><Icon name="arrow" size={16} /></span>
              </a>
              <Link href="/sobre" className="hero-text-link">
                {t("heroSecondary")}<span aria-hidden="true">•</span>
              </Link>
            </div>
          </div>

          <div className="home-hero-art">
            <div className="hero-orbit" aria-hidden="true" />
            <HeroSculpture alt={t("heroSculptureAlt")} />
            <div className="hero-orbit-signature" aria-hidden="true">
              <span>WEB</span><i>•</i><span>DESIGN</span><i>•</i><span>CODE</span>
            </div>
          </div>
        </div>
      </section>

      <Section id="servicos" className="dark-band services-band">
        <div className="services-band-grid">
          <div className="band-intro">
            <p className="band-label">{t("servicesEyebrow")}</p>
            <h2>{t("servicesTitle")}</h2>
            <Link href="/servicos" className="inverse-text-link">{t("allServices")}<Icon name="arrow" size={16} /></Link>
          </div>
          <div className="service-disciplines">
            {([1, 2, 3, 4] as const).map((item, index) => (
              <article key={item} className="service-discipline" data-reveal="rise" data-reveal-index={index}>
                <Icon name={serviceIcons[index]} size={29} />
                <span>0{item}</span>
                <h3>{t(`service${item}Title`)}</h3>
                <p>{t(`service${item}Text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="trabalho" className="capabilities-section border-b border-line">
        <div className="capabilities-layout">
          <div className="section-side-intro">
            <p className="eyebrow">{t("workEyebrow")}</p>
            <h2>{t("workTitle")}</h2>
            <p>{t("workSubtitle")}</p>
            <Link href="/servicos" className="editorial-link">{t("workCta")}<Icon name="arrow" size={16} /></Link>
          </div>
          <CapabilityRail
            items={capabilities}
            previousLabel={t("previousCapability")}
            nextLabel={t("nextCapability")}
            regionLabel={t("capabilitiesLabel")}
          />
        </div>
      </Section>

      <Section className="studio-section border-b border-line bg-surface">
        <div className="studio-layout">
          <div className="section-side-intro">
            <p className="eyebrow">{t("studioEyebrow")}</p>
            <h2>{t("studioTitle")}</h2>
            <p>{t("studioText")}</p>
            <Link href="/sobre" className="button-secondary">{t("studioCta")}<Icon name="arrow" size={16} /></Link>
          </div>
          <div className="studio-disciplines">
            {([
              ["studio1", "/images/editorial/studio-design-digital.webp"],
              ["studio2", "/images/editorial/studio-engineering-digital.webp"],
            ] as const).map(([key, image], index) => (
              <figure key={key} className="studio-discipline" data-reveal="media" data-reveal-index={index}>
                <div className="studio-image">
                  <Image src={image} alt={t(`${key}Alt`)} fill sizes="(max-width: 767px) 100vw, 36vw" className="object-cover" />
                </div>
                <figcaption>
                  <span>{t(`${key}Title`)}</span>
                  <small>{t(`${key}Label`)}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section id="processo" className="dark-band process-band">
        <div className="process-band-grid">
          <div className="band-intro">
            <p className="band-label">{t("processEyebrow")}</p>
            <h2>{t("processTitle")}</h2>
            <Link href="/contacto" className="inverse-text-link">{t("processCta")}<Icon name="arrow" size={16} /></Link>
          </div>
          <ol className="reference-process">
            {([1, 2, 3, 4] as const).map((item, index) => (
              <li key={item} style={{ "--step": index } as CSSProperties} data-reveal="rise" data-reveal-index={index}>
                <div className="process-number"><span>0{item}</span><i aria-hidden="true" /></div>
                <h3>{t(`process${item}Title`)}</h3>
                <p>{t(`process${item}Text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <section className="home-final-cta">
        <div className="home-final-cta-inner">
          <div className="final-cta-title">
            <h2 data-reveal="words">{t("ctaTitle")}</h2>
            <Link href="/contacto" className="button-primary">{t("ctaButton")}<span className="button-icon"><Icon name="arrow" size={16} /></span></Link>
          </div>
          <p className="final-cta-copy" data-reveal="rise" data-reveal-index="1">{t("ctaText")}</p>
          <div className="final-cta-image" data-reveal="media" data-reveal-index="2">
            <Image src="/images/editorial/cta-laptop-digital.webp" alt={t("ctaImageAlt")} fill sizes="(max-width: 900px) 100vw, 48vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
