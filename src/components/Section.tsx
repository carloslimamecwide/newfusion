import type { ReactNode } from "react";

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
    <section id={id} className={`scroll-mt-20 px-5 py-[var(--section-y)] sm:px-8 ${className}`}>
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
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="body-copy mt-6">{subtitle}</p>}
    </div>
  );
}
