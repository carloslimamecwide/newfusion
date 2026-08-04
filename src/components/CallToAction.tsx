import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { Icon } from "@/components/Icon";

export function CallToAction({ title, text, button }: { title: string; text: string; button: string }) {
  return (
    <Section className="bg-brand text-white">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <h2 className="section-title !text-white">{title}</h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white">{text}</p>
        </div>
        <Link href="/contacto" className="button-inverse lg:col-span-3 lg:col-start-10">
          {button}<Icon name="arrow" size={18} />
        </Link>
      </div>
    </Section>
  );
}
