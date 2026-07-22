"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

/**
 * Light general-inquiry form — non-transmitting until HQ email is real.
 * Keeps sharp inputs + outline CTA (DESIGN Contact archetype).
 */
export function InquiryForm() {
  const t = useTranslations("contact.inquiry");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const fieldClass =
    "mt-2 w-full border border-border bg-white px-4 py-3 font-sans text-[15px] text-navy placeholder:text-text-muted/70 transition-colors duration-micro ease-quart focus-visible:border-gold";

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6" noValidate={false}>
      <div>
        <label
          htmlFor="contact-name"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted"
        >
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted"
        >
          {t("emailLabel")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-organisation"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted"
        >
          {t("organisationLabel")}
        </label>
        <input
          id="contact-organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          placeholder={t("organisationPlaceholder")}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <p className="font-sans text-[13px] leading-relaxed text-text-muted">
        {t("notice")}
      </p>

      <Button type="submit" variant="outline" tone="navy">
        {t("submit")}
      </Button>

      {submitted ? (
        <p
          role="status"
          className="font-sans text-[14px] leading-relaxed text-navy"
        >
          {t("submitted")}
        </p>
      ) : null}
    </form>
  );
}
