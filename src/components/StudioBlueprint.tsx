import Image from "next/image";
import type { Locale } from "@/i18n/routing";

export function StudioBlueprint({ locale }: { locale: Locale }) {
  const stages = locale === "pt"
    ? ["Estratégia", "Design", "Engenharia", "Lançamento"]
    : ["Strategy", "Design", "Engineering", "Launch"];

  return (
    <div className="studio-blueprint p-5 sm:p-7" role="img" aria-label={locale === "pt" ? "Poster técnico do processo WebFusionLab" : "Technical poster of the WebFusionLab process"}>
      <div className="relative z-10 flex items-start justify-between text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-navy" aria-hidden="true">
        <span>WebFusionLab<br /><span className="text-brand">Design &amp; Engineering</span></span>
        <span>01<br />Studio</span>
      </div>
      <div className="absolute inset-x-[12%] top-[18%] z-10 flex justify-center" aria-hidden="true">
        <Image src="/brand/logo-mark.webp" alt="" width={377} height={231} className="h-auto w-[72%] opacity-95" />
      </div>
      <div className="absolute bottom-6 left-6 z-10 space-y-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-fg-muted sm:left-8" aria-hidden="true">
        {stages.map((stage, index) => (
          <p key={stage}><span className="mr-4 text-brand">0{index + 1}</span>{stage}</p>
        ))}
      </div>
      <div className="absolute bottom-7 right-7 z-10 h-20 w-28 border border-brand bg-bg p-2" aria-hidden="true">
        <div className="h-2 w-10 bg-brand" />
        <div className="mt-2 h-px w-full bg-line" />
        <div className="mt-2 h-px w-2/3 bg-line" />
        <div className="mt-5 ml-auto h-3 w-10 bg-brand" />
      </div>
    </div>
  );
}
