"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Brand } from "@/components/Brand";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type NavigationItem =
  | {
      href: "/portfolio" | "/servicos" | "/precos" | "/sobre";
      label: string;
      native?: false;
    }
  | {
      href: string;
      label: string;
      native: true;
    };

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "pt" ? "en" : "pt";

  const links: NavigationItem[] = [
    { href: "/portfolio" as const, label: t("work") },
    { href: "/servicos" as const, label: t("services") },
    { href: `/${locale}#processo`, label: t("process"), native: true },
    { href: "/precos" as const, label: t("pricing") },
    { href: "/sobre" as const, label: t("studio") },
  ];

  function switchLocale() {
    window.location.href = `/${other}${pathname}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95">
      <div className="mx-auto flex h-[4.5rem] max-w-[var(--container)] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="WebFusionLab, início" className="shrink-0">
          <Brand />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t("mainNavigation")}>
          {links.map((item) =>
            item.native ? (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={switchLocale}
            className="min-h-12 min-w-12 rounded-md px-3 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            aria-label={t("switchLanguage", { language: other.toUpperCase() })}
          >
            {other}
          </button>
          <Link href="/contacto" className="button-primary">
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-line text-fg lg:hidden"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-line bg-surface px-5 py-5 lg:hidden"
          aria-label={t("mobileNavigation")}
        >
          <div className="mx-auto flex max-w-[var(--container)] flex-col">
            {links.map((item) =>
              item.native ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-base font-semibold text-fg"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-base font-semibold text-fg"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  switchLocale();
                }}
                className="min-h-12 rounded-md border border-line px-4 text-xs font-semibold uppercase tracking-[0.12em] text-fg"
              >
                {other}
              </button>
              <Link href="/contacto" onClick={() => setOpen(false)} className="button-primary">
                {t("cta")}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
