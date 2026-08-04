import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();
  const other: Locale = locale === "pt" ? "en" : "pt";
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[var(--container)] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={nav("homeLabel")} className="inline-flex min-h-12 items-center">
              <Brand />
            </Link>
            <p className="mt-6 max-w-xs leading-relaxed text-fg-muted">{t("tagline")}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:col-start-6">
            <div>
              <h2 className="text-xs font-semibold text-fg-subtle">{t("explore")}</h2>
              <ul className="mt-2">
                <li><Link href="/portfolio" className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">{nav("work")}</Link></li>
                <li><Link href="/servicos" className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">{nav("services")}</Link></li>
                <li><Link href="/precos" className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">{nav("pricing")}</Link></li>
                <li><Link href="/sobre" className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">{nav("studio")}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-fg-subtle">{t("start")}</h2>
              <ul className="mt-2">
                <li><Link href="/contacto" className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">{nav("cta")}</Link></li>
                <li><a href={`/${locale}#processo`} className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">{nav("process")}</a></li>
                {whatsAppUrl ? (
                  <li><a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center text-sm text-fg hover:text-brand">WhatsApp</a></li>
                ) : null}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-11 lg:text-right">
            <a href={`/${other}`} className="editorial-link uppercase">
              {other}
              <Icon name="arrow" size={16} />
            </a>
            <p className="mt-16 text-sm leading-relaxed text-fg-muted">{t("location")}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} WebFusionLab. {t("rights")}</p>
          <p>Design &amp; Engineering</p>
        </div>
      </div>
    </footer>
  );
}
