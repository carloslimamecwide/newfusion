"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type NavigationItem =
  | { href: "/portfolio" | "/servicos" | "/precos" | "/sobre"; label: string; native?: false }
  | { href: string; label: string; native: true };

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams<{ slug?: string | string[] }>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const other: Locale = locale === "pt" ? "en" : "pt";

  const links: NavigationItem[] = [
    { href: "/portfolio", label: t("work") },
    { href: "/servicos", label: t("services") },
    { href: `/${locale}#processo`, label: t("process"), native: true },
    { href: "/precos", label: t("pricing") },
    { href: "/sobre", label: t("studio") },
  ];

  function switchLocale() {
    setOpen(false);
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    if (pathname === "/servicos/[slug]") {
      if (slug) router.replace({ pathname: "/servicos/[slug]", params: { slug } }, { locale: other });
      return;
    }
    if (pathname === "/portfolio/[slug]") {
      if (slug) router.replace({ pathname: "/portfolio/[slug]", params: { slug } }, { locale: other });
      return;
    }
    router.replace(pathname, { locale: other });
  }

  function openMenu() {
    setOpen(true);
    requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
  }

  function closeMenu(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-line bg-bg"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) closeMenu(true);
      }}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[var(--container)] items-center justify-between gap-5 px-5 sm:px-8">
        <Link href="/" aria-label={t("homeLabel")} className="flex min-h-12 shrink-0 items-center">
          <Brand eager highPriority />
        </Link>

        <nav className="hidden h-full items-center gap-8 lg:flex" aria-label={t("mainNavigation")}>
          {links.map((item) => {
            const active = !item.native && pathname === item.href;
            const className = `relative flex h-full items-center text-[0.82rem] font-semibold text-fg transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-brand after:transition-transform hover:text-brand ${
              active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
            }`;

            return item.native ? (
              <a key={item.href} href={item.href} className={className}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            onClick={switchLocale}
            className="flex min-h-12 min-w-12 items-center justify-center border-b border-brand px-2 text-xs font-semibold uppercase text-brand"
            aria-label={t("switchLanguage", { language: other.toUpperCase() })}
          >
            {other}
          </button>
          <Link href="/contacto" className="button-primary">
            {t("cta")}
            <Icon name="arrow" size={17} />
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center border border-line text-fg lg:hidden"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => (open ? closeMenu() : openMenu())}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="border-t border-line bg-bg px-5 py-4 lg:hidden" aria-label={t("mobileNavigation")}>
          <div className="mx-auto flex max-w-[var(--container)] flex-col">
            {links.map((item, index) => {
              const shared = "flex min-h-14 items-center justify-between border-b border-line text-lg font-semibold text-fg";
              return item.native ? (
                <a
                  key={item.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  onClick={() => closeMenu()}
                  className={shared}
                >
                  {item.label}
                  <Icon name="arrow" size={17} className="text-brand" />
                </a>
              ) : (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  onClick={() => closeMenu()}
                  className={shared}
                >
                  {item.label}
                  <Icon name="arrow" size={17} className="text-brand" />
                </Link>
              );
            })}
            <div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
              <button
                type="button"
                onClick={switchLocale}
                className="min-h-12 border border-line px-4 text-xs font-semibold uppercase text-brand"
              >
                {other}
              </button>
              <Link href="/contacto" onClick={() => closeMenu()} className="button-primary">
                {t("cta")}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
