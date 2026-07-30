"use client";

import { type FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";

const fieldClass =
  "min-h-12 w-full rounded-md border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-subtle transition-colors hover:border-line-strong focus:border-brand focus:outline-none";

type Choice = { value: string; label: string };

function ChoiceGroup({
  name,
  legend,
  choices,
}: {
  name: string;
  legend: string;
  choices: Choice[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-fg">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {choices.map((choice) => (
          <label key={choice.value} className="cursor-pointer">
            <input className="peer sr-only" type="radio" name={name} value={choice.value} required />
            <span className="flex min-h-12 items-center rounded-md border border-line bg-surface px-4 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:text-fg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {choice.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const projectChoices: Choice[] = [
    { value: "website", label: t("projectWebsite") },
    { value: "ecommerce", label: t("projectEcommerce") },
    { value: "web-app", label: t("projectWebApp") },
    { value: "other", label: t("projectOther") },
  ];
  const budgetChoices: Choice[] = [
    { value: "1500-2999", label: t("budget1") },
    { value: "3000-5999", label: t("budget2") },
    { value: "6000-14999", label: t("budget3") },
    { value: "15000-plus", label: t("budget4") },
    { value: "unsure", label: t("budgetUnsure") },
  ];
  const timelineChoices: Choice[] = [
    { value: "asap", label: t("timeline1") },
    { value: "1-3-months", label: t("timeline2") },
    { value: "3-6-months", label: t("timeline3") },
    { value: "flexible", label: t("timeline4") },
  ];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || status === "loading") return;

    setStatus("loading");
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      projectType: String(data.get("projectType") || ""),
      budget: String(data.get("budget") || ""),
      timeline: String(data.get("timeline") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
      locale,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("contact_failed");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action="/api/contact" method="post" onSubmit={onSubmit} className="space-y-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-fg" htmlFor="contact-name">
          {t("name")}
          <input id="contact-name" name="name" autoComplete="name" minLength={2} maxLength={100} required className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-fg" htmlFor="contact-email">
          {t("email")}
          <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={200} required className={fieldClass} />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-fg" htmlFor="contact-company">
        {t("company")}
        <input id="contact-company" name="company" autoComplete="organization" maxLength={120} className={fieldClass} />
      </label>

      <ChoiceGroup name="projectType" legend={t("projectType")} choices={projectChoices} />
      <ChoiceGroup name="budget" legend={t("budget")} choices={budgetChoices} />
      <ChoiceGroup name="timeline" legend={t("timeline")} choices={timelineChoices} />

      <label className="grid gap-2 text-sm font-semibold text-fg" htmlFor="contact-message">
        {t("message")}
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          className={`${fieldClass} resize-y`}
          aria-describedby="message-hint"
        />
        <span id="message-hint" className="text-xs font-normal text-fg-subtle">{t("messageHint")}</span>
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-fg-subtle">{t("privacyHint")}</p>
        <button type="submit" disabled={status === "loading"} className="button-primary shrink-0 disabled:cursor-wait disabled:opacity-60">
          {status === "loading" ? t("sending") : t("submit")}
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {status === "ok" && <p className="rounded-md border border-success/40 bg-success/10 p-4 text-sm font-semibold text-success">{t("success")}</p>}
        {status === "error" && <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 p-4 text-sm font-semibold text-danger">{t("error")}</p>}
      </div>
    </form>
  );
}
