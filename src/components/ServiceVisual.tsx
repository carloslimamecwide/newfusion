import { Icon, type IconName } from "@/components/Icon";

export function ServiceVisual({ icon, title, label }: { icon: IconName; title: string; label: string }) {
  return (
    <div className="relative min-h-[24rem] overflow-hidden border border-line bg-surface sm:min-h-[32rem]" role="img" aria-label={label} data-reveal="media">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, index) => <span key={index} className="border-b border-r border-line/70" />)}
      </div>
      <div className="absolute inset-x-[8%] top-[12%] flex items-center justify-between border-b border-brand pb-4 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-brand" aria-hidden="true">
        <span>WebFusionLab</span><span>Design &amp; Engineering</span>
      </div>
      <div className="absolute bottom-[12%] left-[8%] right-[8%] z-10 grid gap-8 sm:grid-cols-[5rem_1fr_auto] sm:items-end" aria-hidden="true">
        <span className="flex h-16 w-16 items-center justify-center border border-brand bg-bg text-brand">
          <Icon name={icon} size={30} />
        </span>
        <p className="max-w-[12ch] font-display text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-navy sm:text-6xl">{title}</p>
        <div className="hidden h-28 w-28 border border-brand sm:block">
          <div className="m-4 h-20 border border-line bg-bg" />
        </div>
      </div>
    </div>
  );
}
