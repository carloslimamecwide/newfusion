"use client";

import { type FormEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import type { Locale } from "@/i18n/routing";

const lineFieldClass =
  "min-h-12 w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none";
const boxFieldClass =
  "min-h-36 w-full resize-y rounded-none border border-line-strong bg-bg px-4 py-3 text-base text-fg placeholder:text-fg-subtle focus:border-brand focus:outline-none";

type Choice = { value: string; label: string };
type FieldName = "name" | "email" | "company" | "projectType" | "budget" | "timeline" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "loading" | "ok" | "error";

function ChoiceGroup({
  name,
  legend,
  choices,
  error,
  onChange,
}: {
  name: "projectType" | "budget" | "timeline";
  legend: string;
  choices: Choice[];
  error?: string;
  onChange: () => void;
}) {
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="text-sm font-semibold text-navy">{legend} <span className="text-danger" aria-hidden="true">*</span></legend>
      <div className="mt-3 divide-y divide-line border-y border-line">
        {choices.map((choice) => (
          <label key={choice.value} className="flex min-h-12 cursor-pointer items-center gap-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg has-[:checked]:text-navy">
            <input className="h-5 w-5 shrink-0 accent-brand" type="radio" name={name} value={choice.value} required onChange={onChange} />
            <span>{choice.label}</span>
          </label>
        ))}
      </div>
      {error ? <p id={errorId} className="mt-2 text-sm text-danger">{error}</p> : null}
    </fieldset>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
  minLength,
  maxLength,
  error,
  onInput,
}: {
  id: string;
  name: "name" | "email" | "company";
  label: string;
  type?: "text" | "email";
  autoComplete: string;
  required?: boolean;
  minLength?: number;
  maxLength: number;
  error?: string;
  onInput: () => void;
}) {
  const errorId = `${id}-error`;

  return (
    <label className="grid gap-1 text-sm font-semibold text-navy" htmlFor={id}>
      <span>{label} {required ? <span className="text-danger" aria-hidden="true">*</span> : null}</span>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={type === "email" ? "email" : undefined}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={lineFieldClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onInput={onInput}
      />
      {error ? <span id={errorId} className="mt-1 font-normal text-danger">{error}</span> : null}
    </label>
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const inFlight = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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

  function clearField(name: FieldName) {
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    if (status !== "loading") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function validate(form: HTMLFormElement, data: FormData) {
    const errors: FieldErrors = {};
    const name = String(data.get("name") || "").trim();
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const message = String(data.get("message") || "").trim();

    if (name.length < 2) errors.name = t("validationName");
    if (!email.value || !email.validity.valid) errors.email = t("validationEmail");
    if (!data.get("projectType")) errors.projectType = t("validationChoice");
    if (!data.get("budget")) errors.budget = t("validationChoice");
    if (!data.get("timeline")) errors.timeline = t("validationChoice");
    if (message.length < 20) errors.message = t("validationMessage");
    return errors;
  }

  function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
    const first = Object.keys(errors)[0] as FieldName | undefined;
    if (!first) return;
    requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const clientErrors = validate(form, data);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("error");
      setStatusMessage(t("validationSummary"));
      focusFirstError(form, clientErrors);
      return;
    }

    inFlight.current = true;
    setFieldErrors({});
    setStatus("loading");
    setStatusMessage("");

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
      const body = await response.json().catch(() => ({}));

      if (response.status === 400 && body.fieldErrors) {
        const serverErrors = Object.keys(body.fieldErrors).reduce<FieldErrors>((errors, field) => {
          if (["name", "email", "company", "projectType", "budget", "timeline", "message"].includes(field)) {
            errors[field as FieldName] = t("validationInvalid");
          }
          return errors;
        }, {});
        setFieldErrors(serverErrors);
        setStatus("error");
        setStatusMessage(t("validationSummary"));
        focusFirstError(form, serverErrors);
        return;
      }

      if (response.status === 429) {
        setStatus("error");
        setStatusMessage(t("rateLimit"));
        return;
      }

      if (!response.ok) throw new Error("contact_failed");

      form.reset();
      setStatus("ok");
      setStatusMessage(t("success"));
    } catch {
      setStatus("error");
      setStatusMessage(t("error"));
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form action="/api/contact" method="post" onSubmit={onSubmit} className="space-y-10" noValidate>
      <div className="grid gap-8 md:grid-cols-2">
        <TextField id="contact-name" name="name" label={t("name")} autoComplete="name" minLength={2} maxLength={100} required error={fieldErrors.name} onInput={() => clearField("name")} />
        <TextField id="contact-email" name="email" label={t("email")} type="email" autoComplete="email" maxLength={200} required error={fieldErrors.email} onInput={() => clearField("email")} />
      </div>

      <TextField id="contact-company" name="company" label={t("company")} autoComplete="organization" maxLength={120} error={fieldErrors.company} onInput={() => clearField("company")} />

      <div className="grid gap-10 lg:grid-cols-2">
        <ChoiceGroup name="projectType" legend={t("projectType")} choices={projectChoices} error={fieldErrors.projectType} onChange={() => clearField("projectType")} />
        <ChoiceGroup name="budget" legend={t("budget")} choices={budgetChoices} error={fieldErrors.budget} onChange={() => clearField("budget")} />
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <ChoiceGroup name="timeline" legend={t("timeline")} choices={timelineChoices} error={fieldErrors.timeline} onChange={() => clearField("timeline")} />
        <label className="grid content-start gap-2 text-sm font-semibold text-navy" htmlFor="contact-message">
          <span>{t("message")} <span className="text-danger" aria-hidden="true">*</span></span>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={20}
            maxLength={5000}
            rows={6}
            className={boxFieldClass}
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={fieldErrors.message ? "contact-message-error" : "message-hint"}
            onInput={() => clearField("message")}
          />
          {fieldErrors.message ? <span id="contact-message-error" className="font-normal text-danger">{fieldErrors.message}</span> : <span id="message-hint" className="font-normal text-fg-subtle">{t("messageHint")}</span>}
        </label>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-6 border-t border-line pt-7 sm:grid-cols-[1fr_auto] sm:items-center">
        <p className="max-w-md text-xs leading-relaxed text-fg-subtle">{t("privacyHint")}</p>
        <button type="submit" disabled={status === "loading"} className="button-primary disabled:cursor-wait disabled:opacity-60">
          {status === "loading" ? t("sending") : t("submit")}
          <Icon name="arrow" size={18} />
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {statusMessage ? (
          <p role={status === "error" ? "alert" : "status"} className={`border p-4 text-sm font-semibold ${status === "ok" ? "border-success/40 bg-success/5 text-success" : "border-danger/40 bg-danger/5 text-danger"}`}>
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
