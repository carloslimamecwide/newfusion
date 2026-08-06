import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "@/components/Wordmark";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();
  const other: Locale = locale === "pt" ? "en" : "pt";

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" aria-label={nav("homeLabel")} className="site-logo"><Wordmark /></Link>
        <p>© {year} WebFusionLab. {t("rights")}</p>
        <div className="footer-links">
          <Link href="/servicos">{nav("services")}</Link>
          <Link href="/precos">{nav("pricing")}</Link>
          <a href={`/${other}`} lang={other}>{other.toUpperCase()}</a>
          <a href="#main-content" className="back-to-top" aria-label={t("backToTop")}><Icon name="arrow" size={15} /></a>
        </div>
      </div>
    </footer>
  );
}
