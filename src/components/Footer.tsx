import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
              W
            </span>
            WebFusionLab
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{t("services")}</h3>
          <ul className="mt-3 space-y-2">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={{ pathname: "/servicos/[slug]", params: { slug: s.slug } }}
                  className="text-sm text-slate-600 hover:text-blue-700"
                >
                  {s[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{t("company")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/portfolio" className="text-slate-600 hover:text-blue-700">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="text-slate-600 hover:text-blue-700">
                {locale === "pt" ? "Sobre" : "About"}
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-slate-600 hover:text-blue-700">
                {locale === "pt" ? "Contacto" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {year} WebFusionLab. {t("rights")} · {t("built")}
      </div>
    </footer>
  );
}
