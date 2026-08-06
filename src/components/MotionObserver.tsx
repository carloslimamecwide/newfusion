"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter((element) => !element.dataset.revealState);

    if (elements.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.revealState = "visible";
      });
      return;
    }

    elements.forEach((element) => {
      element.dataset.revealState = "pending";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    let revealFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      const revealEdge = window.innerHeight * 0.92;
      const positions = elements.map((element) => ({
        element,
        top: element.getBoundingClientRect().top,
      }));

      positions.forEach(({ element, top }) => {
        if (top < revealEdge) {
          revealFrame = window.requestAnimationFrame(() => {
            element.dataset.revealState = "visible";
          });
          return;
        }
        observer.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(revealFrame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
