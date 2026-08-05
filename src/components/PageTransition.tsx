"use client";

import { type ReactNode, useEffect, useRef, ViewTransition } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("#main-content")?.focus({
        preventScroll: true,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <ViewTransition
      key={pathname}
      name="page-content"
      share="page-change"
      enter="page-change"
      exit="page-change"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
