"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const other: Locale = locale === "pt" ? "en" : "pt";

  function switchLocale() {
    window.location.href = `/${other}${pathname}`;
  }

  const links = [
    { href: "/servicos" as const, label: t("services") },
    { href: "/portfolio" as const, label: t("portfolio") },
    { href: "/sobre" as const, label: t("about") },
    { href: "/contacto" as const, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="WebFusionLab" className="flex items-center">
          <Image
            src="/brand/logo-full.webp"
            alt="WebFusionLab"
            width={1709}
            height={231}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={switchLocale}
            className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-faint transition hover:bg-surface-2 hover:text-ink"
            aria-label={`Switch to ${other}`}
          >
            {other}
          </button>
          <Link
            href="/contacto"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
          >
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-2"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  switchLocale();
                }}
                className="rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-faint"
              >
                {other}
              </button>
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
