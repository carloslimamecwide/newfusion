"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function LivePreview({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className: string;
  label: string;
}) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = true;

    const syncPlayback = () => {
      preview.dataset.playback = isVisible && !document.hidden && !motionPreference.matches
        ? "running"
        : "paused";
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            syncPlayback();
          },
          { threshold: 0.08 },
        )
      : null;

    observer?.observe(preview);
    document.addEventListener("visibilitychange", syncPlayback);
    motionPreference.addEventListener("change", syncPlayback);
    syncPlayback();

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motionPreference.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <div
      ref={previewRef}
      className={`live-preview ${className}`}
      data-playback="running"
      role="img"
      aria-label={label}
    >
      <div aria-hidden="true">{children}</div>
    </div>
  );
}
