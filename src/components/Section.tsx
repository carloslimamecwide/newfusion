import type { ReactNode } from "react";
import { AnimatedText } from "@/components/AnimatedText";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-[var(--gutter)] py-[var(--section-y)] ${className}`}>
      <div className="mx-auto max-w-[var(--container)]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-14 max-w-4xl sm:mb-20 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && <p className="eyebrow mb-7" data-reveal="fade">{eyebrow}</p>}
      <h2 className="section-title" data-reveal="words" data-reveal-index={eyebrow ? "1" : undefined}>
        <AnimatedText text={title} mode="words" />
      </h2>
      {subtitle && <p className="body-copy mt-6" data-reveal="rise" data-reveal-index="2">{subtitle}</p>}
    </div>
  );
}
