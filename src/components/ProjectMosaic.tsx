import Image from "next/image";
import { Brand } from "@/components/Brand";
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
            className={`device-shell absolute ${
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

  return (
    <div className="relative min-h-[29rem] sm:min-h-[34rem]" role="img" aria-label={label}>
      <div className="device-shell absolute right-0 top-0 h-[72%] w-[92%] rotate-[-2deg] sm:w-[88%]" aria-hidden="true">
        <div className="device-screen flex h-full flex-col">
          <div className="flex h-8 items-center gap-1.5 border-b border-line px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="mx-auto h-3 w-24 bg-surface" />
          </div>
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <Brand compact eager />
            <div className="hidden gap-5 text-[0.5rem] font-semibold text-fg-muted sm:flex">
              <span>Design</span><span>Engineering</span><span>Contact</span>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2">
            <div className="flex flex-col justify-center p-5 sm:p-8">
              <p className="font-display text-2xl font-semibold leading-[0.95] tracking-[-0.05em] text-navy sm:text-4xl">
                Design que dá forma ao crescimento.
              </p>
              <span className="mt-6 h-7 w-24 bg-brand" />
            </div>
            <div className="relative overflow-hidden bg-surface">
              <div className="absolute inset-[16%] border border-brand" />
              <div className="absolute left-[18%] top-[20%] h-[58%] w-px rotate-[32deg] bg-brand" />
              <div className="absolute right-[22%] top-[15%] h-[68%] w-px rotate-[-26deg] bg-brand" />
              <div className="absolute bottom-[18%] left-[18%] h-px w-[64%] bg-brand" />
            </div>
          </div>
        </div>
      </div>

      <div className="device-shell absolute bottom-0 left-0 h-[49%] w-[60%] rotate-[1deg]" aria-hidden="true">
        <div className="device-screen h-full p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-line pb-3 text-[0.52rem] font-semibold text-fg-muted">
            <span>WebFusionLab</span><span>01 / 03</span>
          </div>
          <p className="mt-5 max-w-[9ch] font-display text-xl font-semibold leading-none tracking-[-0.045em] text-navy sm:text-3xl">
            Websites. Lojas online.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <span className="aspect-square border border-line bg-surface" />
            <span className="aspect-square border border-brand bg-brand-soft" />
            <span className="aspect-square border border-line bg-bg" />
          </div>
        </div>
      </div>

      <div className="device-shell absolute bottom-0 right-[3%] h-[43%] w-[28%] min-w-[7rem] rotate-[2deg] rounded-[18px] p-1.5" aria-hidden="true">
        <div className="device-screen flex h-full flex-col rounded-[13px] p-3">
          <span className="mx-auto h-1.5 w-8 rounded-full bg-fg" />
          <p className="mt-auto font-display text-lg font-semibold leading-none tracking-[-0.04em] text-navy sm:text-2xl">Produtos digitais.</p>
          <div className="mt-3 border-t border-line pt-2 text-[0.48rem] font-semibold uppercase tracking-[0.12em] text-brand">UI · UX · CODE</div>
        </div>
      </div>
    </div>
  );
}
