import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" aria-label="WebFusionLab" className="inline-flex">
            <Image
              src="/brand/logo-full.webp"
              alt="WebFusionLab"
              width={1709}
              height={231}
              className="h-7 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">{t("services")}</h3>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={{ pathname: "/servicos/[slug]", params: { slug: s.slug } }}
                  className="text-sm text-muted transition hover:text-brand"
                >
                  {s[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">{t("company")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/portfolio" className="text-muted transition hover:text-brand">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="text-muted transition hover:text-brand">
                {locale === "pt" ? "Sobre" : "About"}
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-muted transition hover:text-brand">
                {locale === "pt" ? "Contacto" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-faint">
        © {year} WebFusionLab. {t("rights")}
      </div>
    </footer>
  );
}
