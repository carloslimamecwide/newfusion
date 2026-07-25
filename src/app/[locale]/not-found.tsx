import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] items-center justify-center bg-white text-center">
      <div>
        <p className="text-6xl font-bold text-slate-200">404</p>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Página não encontrada</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Voltar ao início
        </Link>
      </div>
    </Section>
  );
}
