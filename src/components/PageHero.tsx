import { Section } from "@/components/Section";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <Section className="border-b border-line bg-bg pb-20 pt-16 sm:pb-28 sm:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="page-title lg:col-span-8">{title}</h1>
        <p className="body-copy lg:col-span-4">{subtitle}</p>
      </div>
    </Section>
  );
}
