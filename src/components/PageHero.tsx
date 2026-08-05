import { Section } from "@/components/Section";
import { AnimatedText } from "@/components/AnimatedText";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <Section className="border-b border-line bg-bg pb-20 pt-16 sm:pb-28 sm:pt-24">
      <p className="eyebrow hero-sequence-item hero-sequence-eyebrow">{eyebrow}</p>
      <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="page-title lg:col-span-8" data-reveal="words">
          <AnimatedText text={title} mode="words" />
        </h1>
        <p className="body-copy hero-sequence-item hero-sequence-copy lg:col-span-4">{subtitle}</p>
      </div>
    </Section>
  );
}
