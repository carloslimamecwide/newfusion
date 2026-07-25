"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-700">{t("name")}</span>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-600/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-700">{t("email")}</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-600/30 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">{t("company")}</span>
        <input
          name="company"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-600/30 focus:ring-2"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">{t("service")}</span>
        <select
          name="service"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-600/30 focus:ring-2"
          defaultValue=""
        >
          <option value="">{t("servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s[locale].title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-slate-700">{t("message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-blue-600/30 focus:ring-2"
        />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? t("sending") : t("submit")}
      </button>
      {status === "ok" && (
        <p className="text-sm font-medium text-emerald-700">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{t("error")}</p>
      )}
    </form>
  );
}
