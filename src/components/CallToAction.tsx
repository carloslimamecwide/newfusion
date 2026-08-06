import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";
import { AnimatedText } from "@/components/AnimatedText";

export function CallToAction({ title, text, button }: { title: string; text: string; button: string }) {
  return (
    <Section className="bg-ink text-paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="section-title text-paper" data-reveal="words"><AnimatedText text={title} mode="words" /></h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-xl text-lg leading-relaxed text-paper/70" data-reveal="rise" data-reveal-index="1">{text}</p>
          <Link href="/contacto" className="button-inverse mt-8" data-reveal="rise" data-reveal-index="2">
            {button}<Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
