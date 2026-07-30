import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="hero-grid flex min-h-[70vh] items-center border-b border-line">
      <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow">Erro 404</p>
          <h1 className="page-title mt-6">Esta página saiu do mapa.</h1>
        </div>
        <div className="lg:col-span-4">
          <p className="leading-relaxed text-fg-muted">The page you are looking for does not exist or is no longer available.</p>
          <Link href="/" className="button-primary mt-7">Voltar ao início</Link>
        </div>
      </div>
    </Section>
  );
}
