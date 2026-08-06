"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Wordmark } from "@/components/Wordmark";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

type NavigationItem =
  | { href: "/servicos" | "/sobre"; label: string; native?: false }
  | { href: string; label: string; native: true };

type MenuState = "closed" | "open" | "closing";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams<{ slug?: string | string[] }>();
  const router = useRouter();
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const other: Locale = locale === "pt" ? "en" : "pt";
  const open = menuState === "open";

  const links: NavigationItem[] = [
    { href: `/${locale}#trabalho`, label: t("work"), native: true },
    { href: "/servicos", label: t("services") },
    { href: "/sobre", label: t("studio") },
    { href: `/${locale}#processo`, label: t("process"), native: true },
    { href: `/${locale}/contacto#faq`, label: t("faq"), native: true },
  ];

  useEffect(() => {
    if (!open) return;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    document.body.dataset.menuOpen = "true";

    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  function switchLocale() {
    closeMenu();
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
    setMenuState("open");
    requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
  }

  function closeMenu(restoreFocus = false) {
    if (menuState === "closed") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMenuState(reducedMotion ? "closed" : "closing");
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab" || !mobileNavRef.current) return;
    const focusable = Array.from(
      mobileNavRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" aria-label={t("homeLabel")} className="site-logo">
          <Wordmark />
        </Link>

        <nav className="desktop-nav" aria-label={t("mainNavigation")}>
          {links.map((item) =>
            item.native ? (
              <a key={item.href} href={item.href} className="site-nav-link">{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href} className="site-nav-link" aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="desktop-actions">
          <button type="button" onClick={switchLocale} className="language-switch" aria-label={t("switchLanguage", { language: other.toUpperCase() })}>
            {locale.toUpperCase()} / {other.toUpperCase()}
          </button>
          <Link href="/contacto" className="button-primary button-compact">
            {t("cta")}<span className="button-dot" aria-hidden="true">•</span>
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-trigger"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => (open ? closeMenu() : openMenu())}
          data-menu-open={open}
        >
          <span className="menu-toggle-icon"><Icon name={open ? "close" : "menu"} size={21} /></span>
        </button>
      </div>

      {menuState !== "closed" ? (
        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          className="mobile-menu-panel"
          aria-label={t("mobileNavigation")}
          aria-hidden={!open}
          inert={!open}
          data-state={menuState}
          onKeyDown={handleMenuKeyDown}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && menuState === "closing") setMenuState("closed");
          }}
        >
          <div className="mobile-menu-inner">
            {links.map((item, index) => {
              const style = { "--menu-index": index } as CSSProperties;
              return item.native ? (
                <a key={item.href} ref={index === 0 ? firstMobileLinkRef : undefined} href={item.href} onClick={() => closeMenu()} className="mobile-menu-item" style={style}>
                  {item.label}<Icon name="arrow" size={18} />
                </a>
              ) : (
                <Link key={item.href} ref={index === 0 ? firstMobileLinkRef : undefined} href={item.href} onClick={() => closeMenu()} className="mobile-menu-item" style={style}>
                  {item.label}<Icon name="arrow" size={18} />
                </Link>
              );
            })}
            <div className="mobile-menu-actions" style={{ "--menu-index": links.length } as CSSProperties}>
              <button type="button" onClick={switchLocale} className="language-switch">{locale.toUpperCase()} / {other.toUpperCase()}</button>
              <Link href="/contacto" onClick={() => closeMenu()} className="button-primary">{t("cta")}<Icon name="arrow" size={17} /></Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
