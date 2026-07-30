import Image from "next/image";
import { cases } from "@/content/portfolio";
import type { Locale } from "@/i18n/routing";

export function ProjectMosaic({ locale }: { locale: Locale }) {
  const published = cases.filter((item) => item.published).slice(0, 3);

  if (published.length > 0) {
    return (
      <div className="grid min-h-[32rem] grid-cols-12 gap-2 sm:gap-3">
        {published.map((item, index) => (
          <div
            key={item.slug}
            className={`relative overflow-hidden rounded-xl border border-line bg-surface ${
              index === 0
                ? "col-span-12 row-span-2 min-h-64 md:col-span-6 md:min-h-[32rem]"
                : "col-span-12 min-h-56 sm:col-span-6 md:col-span-3"
            }`}
          >
            <Image
              src={item.cover.src}
              alt={item.cover[locale].alt}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
              className="object-cover transition duration-500 ease-out hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-bg/90 p-5">
              <p className="text-sm font-semibold text-fg">{item[locale].title}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid min-h-[32rem] grid-cols-12 gap-2 sm:gap-3"
      role="img"
      aria-label={
        locale === "pt"
          ? "Composição abstrata de website, loja online e aplicação web"
          : "Abstract composition of a website, online store, and web application"
      }
    >
      <div className="relative col-span-12 overflow-hidden rounded-xl border border-line bg-surface p-5 sm:p-7 md:col-span-6 md:row-span-2">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="ml-auto text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
            Web
          </span>
        </div>
        <div className="mt-8 max-w-md">
          <p className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-fg sm:text-6xl">
            Design que ganha atenção.
          </p>
          <div className="mt-8 h-2 w-24 rounded-full bg-brand" />
          <div className="mt-3 h-2 w-40 rounded-full bg-line-strong" />
        </div>
        <div className="absolute inset-x-7 bottom-7 grid grid-cols-3 gap-2">
          <div className="h-20 rounded-md border border-line bg-bg" />
          <div className="h-20 rounded-md border border-line bg-surface-2" />
          <div className="h-20 rounded-md border border-line bg-bg" />
        </div>
      </div>

      <div className="col-span-12 overflow-hidden rounded-xl border border-line bg-surface-2 p-5 sm:col-span-6 md:col-span-3">
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">Shop</span>
          <span className="h-8 w-8 rounded-full bg-brand" />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3">
          <div className="aspect-square rounded-md bg-bg" />
          <div className="aspect-square rounded-md border border-line bg-surface" />
        </div>
      </div>

      <div className="col-span-12 overflow-hidden rounded-xl border border-line bg-bg p-5 sm:col-span-6 md:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">Systems</p>
        <div className="mt-9 flex items-end gap-2">
          {["h-12", "h-[4.75rem]", "h-[3.625rem]", "h-24", "h-[5.25rem]"].map((heightClass, index) => (
            <span
              key={heightClass}
              className={`${heightClass} w-full rounded-sm ${index === 3 ? "bg-brand" : "bg-surface-2"}`}
            />
          ))}
        </div>
      </div>

      <div className="col-span-12 flex min-h-52 flex-col justify-between rounded-xl border border-line bg-brand p-6 text-bg sm:col-span-12 md:col-span-6">
        <span className="text-xs font-bold uppercase tracking-[0.16em]">WebFusionLab</span>
        <p className="max-w-md font-display text-3xl font-semibold leading-none tracking-[-0.045em]">
          {locale === "pt" ? "Design e engenharia, na mesma mesa." : "Design and engineering, at the same table."}
        </p>
      </div>
    </div>
  );
}
