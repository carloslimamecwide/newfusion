import Image from "next/image";
import { Brand } from "@/components/Brand";
import { LivePreview } from "@/components/LivePreview";
import { cases } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";

export function ProjectMosaic({ locale }: { locale: Locale }) {
  const published = cases.filter((item) => item.published).slice(0, 3);

  if (published.length > 0) {
    return (
      <div className="relative min-h-[30rem] sm:min-h-[34rem]" role="group" aria-label={locale === "pt" ? "Projetos selecionados" : "Selected projects"}>
        {published.map((item, index) => (
          <div
            key={item.slug}
            className={`mosaic-device device-shell absolute ${
              index === 0
                ? "right-0 top-0 h-[72%] w-[88%]"
                : index === 1
                  ? "bottom-0 left-0 h-[50%] w-[58%]"
                  : "bottom-0 right-[4%] h-[43%] w-[28%]"
            }`}
          >
            <div className="device-screen relative h-full">
              <Image
                src={item.cover.src}
                alt={item.cover[locale].alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes={index === 0 ? "(max-width: 1024px) 90vw, 44vw" : "(max-width: 1024px) 58vw, 28vw"}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const label = locale === "pt"
    ? "Demonstração visual das capacidades da WebFusionLab em website, e-commerce e aplicação web"
    : "Visual demonstration of WebFusionLab capabilities across websites, e-commerce, and web applications";

  const preview = locale === "pt"
    ? {
        nav: ["Design", "Engenharia", "Contacto"],
        desktop: [
          "Design que dá forma ao crescimento.",
          "Engenharia preparada para crescer.",
          "Contacto direto. Decisões rápidas.",
        ],
        tablet: ["Websites.", "Lojas online.", "Aplicações web."],
        mobile: ["Produtos digitais.", "E-commerce.", "Web apps."],
        mobileLabels: ["UI · UX · CÓDIGO", "LOJA · PAGAMENTOS", "PRODUTO · ESCALA"],
      }
    : {
        nav: ["Design", "Engineering", "Contact"],
        desktop: [
          "Design that gives shape to growth.",
          "Engineering built to scale.",
          "Direct contact. Faster decisions.",
        ],
        tablet: ["Websites.", "Online stores.", "Web applications."],
        mobile: ["Digital products.", "E-commerce.", "Web apps."],
        mobileLabels: ["UI · UX · CODE", "STORE · PAYMENTS", "PRODUCT · SCALE"],
      };

  return (
    <LivePreview className="relative min-h-[29rem] sm:min-h-[34rem]" label={label}>
      <div className="mosaic-device device-shell absolute right-0 top-0 h-[72%] w-[92%] rotate-[-2deg] sm:w-[88%]" aria-hidden="true">
        <div className="live-desktop-preview device-screen relative flex h-full flex-col">
          <div className="relative flex h-8 shrink-0 items-center gap-1.5 overflow-hidden border-b border-line px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="mx-auto h-3 w-24 bg-surface" />
          </div>
          <div className="relative z-10 flex items-center justify-between border-b border-line bg-bg px-5 py-3">
            <Brand compact eager />
            <div className="hidden gap-5 text-[0.5rem] font-semibold text-fg-muted sm:flex">
              {preview.nav.map((item, index) => (
                <span className={`live-nav-item live-phase-${index + 1} live-animated`} key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="live-scroll-viewport relative flex-1 overflow-hidden">
            <div className="live-scroll-track live-scroll-track-desktop live-animated">
              {preview.desktop.map((title, index) => (
                <section className="live-scroll-section grid grid-cols-2" key={title}>
                  <div className="flex min-h-0 flex-col justify-center p-5 sm:p-8">
                    <span className="mb-3 text-[0.48rem] font-semibold tabular-nums text-brand">0{index + 1} / 03</span>
                    <p className="font-display text-2xl font-semibold leading-[0.95] tracking-[-0.05em] text-navy sm:text-4xl">{title}</p>
                    <span className="mt-6 h-7 w-24 bg-brand" />
                  </div>
                  <div className={`live-art live-art-${index + 1} relative min-h-0 overflow-hidden bg-surface`}>
                    <span className="live-art-frame absolute inset-[16%] border border-brand" />
                    <span className="live-art-line live-art-line-a absolute bg-brand" />
                    <span className="live-art-line live-art-line-b absolute bg-brand" />
                    <span className="live-art-line live-art-line-c absolute bg-brand" />
                  </div>
                </section>
              ))}
            </div>
            <span className="live-scroll-rail live-scroll-rail-desktop">
              <span className="live-scroll-thumb live-animated" />
            </span>
          </div>
          <span className="live-pointer live-animated"><span /></span>
        </div>
      </div>

      <div className="mosaic-device device-shell absolute bottom-0 left-0 h-[49%] w-[60%] rotate-[1deg]" aria-hidden="true">
        <div className="device-screen flex h-full flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-line pb-3 text-[0.52rem] font-semibold text-fg-muted">
            <span>WebFusionLab</span>
            <span className="live-counter relative min-w-8 text-right">
              {preview.tablet.map((item, index) => <span className={`live-counter-item live-phase-${index + 1} live-animated`} key={item}>0{index + 1} / 03</span>)}
            </span>
          </div>
          <div className="live-scroll-viewport relative flex-1 overflow-hidden">
            <div className="live-scroll-track live-scroll-track-tablet live-animated">
              {preview.tablet.map((title) => (
                <section className="live-scroll-section flex min-h-0 flex-col justify-center py-4 pr-3" key={title}>
                  <p className="max-w-[9ch] font-display text-xl font-semibold leading-none tracking-[-0.045em] text-navy sm:text-3xl">{title}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <span className="aspect-square border border-line bg-surface" />
                    <span className="aspect-square border border-brand bg-brand-soft" />
                    <span className="aspect-square border border-line bg-bg" />
                  </div>
                  <span className="mt-4 h-px w-2/3 bg-line" />
                </section>
              ))}
            </div>
            <span className="live-scroll-rail">
              <span className="live-scroll-thumb live-animated" />
            </span>
          </div>
        </div>
      </div>

      <div className="mosaic-device device-shell absolute bottom-0 right-[3%] h-[43%] w-[28%] min-w-[7rem] rotate-[2deg] rounded-[18px] p-1.5" aria-hidden="true">
        <div className="device-screen flex h-full flex-col rounded-[13px] p-3">
          <span className="mx-auto h-1.5 w-8 rounded-full bg-fg" />
          <div className="mt-2 flex items-center justify-between border-b border-line pb-2 text-[0.4rem] font-semibold text-fg-muted">
            <span>WebFusionLab</span>
            <span>•••</span>
          </div>
          <div className="live-scroll-viewport relative flex-1 overflow-hidden">
            <div className="live-scroll-track live-scroll-track-phone live-animated">
              {preview.mobile.map((title, index) => (
                <section className="live-scroll-section live-phone-section flex min-h-0 flex-col justify-center pr-2" key={title}>
                  <span className="mb-2 h-5 w-5 border border-brand bg-brand-soft" />
                  <p className="font-display text-lg font-semibold leading-none tracking-[-0.04em] text-navy sm:text-2xl">{title}</p>
                  <div className="mt-3 border-t border-line pt-2 text-[0.42rem] font-semibold uppercase tracking-[0.1em] text-brand">{preview.mobileLabels[index]}</div>
                </section>
              ))}
            </div>
            <span className="live-scroll-rail live-scroll-rail-phone">
              <span className="live-scroll-thumb live-animated" />
            </span>
          </div>
        </div>
      </div>
    </LivePreview>
  );
}
