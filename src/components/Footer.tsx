import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Brand } from "@/components/Brand";
import type { Locale } from "@/i18n/routing";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[var(--container)] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="WebFusionLab, início" className="inline-flex">
              <Brand />
            </Link>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">{t("tagline")}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <h3 className="eyebrow text-fg-subtle">{t("explore")}</h3>
              <ul className="mt-5 space-y-3">
                <li><Link href="/portfolio" className="text-sm text-fg-muted hover:text-fg">{nav("work")}</Link></li>
                <li><Link href="/servicos" className="text-sm text-fg-muted hover:text-fg">{nav("services")}</Link></li>
                <li><Link href="/precos" className="text-sm text-fg-muted hover:text-fg">{nav("pricing")}</Link></li>
                <li><Link href="/sobre" className="text-sm text-fg-muted hover:text-fg">{nav("studio")}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-fg-subtle">{t("start")}</h3>
              <ul className="mt-5 space-y-3">
                <li><Link href="/contacto" className="text-sm text-fg-muted hover:text-fg">{nav("cta")}</Link></li>
                <li><a href={`/${locale}#processo`} className="text-sm text-fg-muted hover:text-fg">{nav("process")}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} WebFusionLab. {t("rights")}</p>
          <p>{t("location")}</p>
        </div>
      </div>
    </footer>
  );
}
