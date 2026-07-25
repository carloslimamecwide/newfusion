import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] items-center justify-center text-center">
      <div>
        <p className="font-display text-7xl font-bold text-line">404</p>
        <h1 className="mt-4 font-display text-xl font-semibold text-ink">
          Página não encontrada
        </h1>
        <p className="mt-2 text-sm text-muted">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
        >
          Voltar ao início
        </Link>
      </div>
    </Section>
  );
}
