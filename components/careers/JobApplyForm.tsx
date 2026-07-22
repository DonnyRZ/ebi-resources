"use client";

import { useState, type FormEvent } from "react";
import { buildApplyMailto } from "@/lib/careers";

/**
 * Apply MVP — light fields compose a mailto (no upload, no server POST).
 * Recipient stays empty until the client provides a recruiting inbox;
 * copy tells applicants to send to [careers-email].
 *
 * `noValidate` + custom checks: native HTML5 would still run with required,
 * but we compose mailto ourselves and need aria-invalid / inline errors
 * before opening the mail client.
 */

export type JobApplyFormProps = {
  roleTitle: string;
  labels: {
    title: string;
    intro: string;
    name: string;
    email: string;
    phone: string;
    phoneHint: string;
    coverNote: string;
    coverHint: string;
    cvLink: string;
    cvHint: string;
    submit: string;
    mailtoNote: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
  };
};

type FieldErrors = {
  name?: string;
  email?: string;
};

function isValidEmail(value: string) {
  // Practical check — mailto compose, not full RFC.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function JobApplyForm({ roleTitle, labels }: JobApplyFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const next: FieldErrors = {};

    if (!trimmedName) {
      next.name = labels.nameRequired;
    }
    if (!trimmedEmail) {
      next.email = labels.emailRequired;
    } else if (!isValidEmail(trimmedEmail)) {
      next.email = labels.emailInvalid;
    }

    if (next.name || next.email) {
      setErrors(next);
      return;
    }

    setErrors({});

    const cover = [coverNote.trim(), cvLink.trim() ? `CV / portfolio: ${cvLink.trim()}` : ""]
      .filter(Boolean)
      .join("\n\n");
    const href = buildApplyMailto({
      roleTitle,
      name: trimmedName,
      email: trimmedEmail,
      phone: phone.trim() || undefined,
      coverNote: cover || undefined,
    });
    window.location.href = href;
  };

  const field =
    "w-full border border-border bg-white px-4 py-3 font-sans text-[15px] text-navy outline-none transition-colors duration-micro ease-quart placeholder:text-text-muted/60 focus:border-navy";
  const fieldInvalid = "border-navy";

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5" noValidate>
      <div>
        <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-light text-navy">
          {labels.title}
        </h2>
        <p className="mt-3 font-sans text-[15px] leading-[1.7] text-text-muted">
          {labels.intro}
        </p>
      </div>

      <div>
        <label className="block" htmlFor="apply-name">
          <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
            {labels.name}
          </span>
          <input
            id="apply-name"
            required
            name="name"
            autoComplete="name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "apply-name-error" : undefined}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={`${field} ${errors.name ? fieldInvalid : ""}`}
          />
        </label>
        {errors.name ? (
          <p
            id="apply-name-error"
            role="alert"
            className="mt-2 font-sans text-[13px] text-navy"
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label className="block" htmlFor="apply-email">
          <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
            {labels.email}
          </span>
          <input
            id="apply-email"
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "apply-email-error" : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`${field} ${errors.email ? fieldInvalid : ""}`}
          />
        </label>
        {errors.email ? (
          <p
            id="apply-email-error"
            role="alert"
            className="mt-2 font-sans text-[13px] text-navy"
          >
            {errors.email}
          </p>
        ) : null}
      </div>

      <label className="block" htmlFor="apply-phone">
        <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
          {labels.phone}
          <span className="ml-2 font-normal normal-case tracking-normal text-text-muted">
            {labels.phoneHint}
          </span>
        </span>
        <input
          id="apply-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={field}
        />
      </label>

      <label className="block" htmlFor="apply-cover">
        <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
          {labels.coverNote}
        </span>
        <textarea
          id="apply-cover"
          name="coverNote"
          rows={4}
          placeholder={labels.coverHint}
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          className={`${field} resize-y`}
        />
      </label>

      <label className="block" htmlFor="apply-cv">
        <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
          {labels.cvLink}
        </span>
        <input
          id="apply-cv"
          type="url"
          name="cvLink"
          placeholder={labels.cvHint}
          value={cvLink}
          onChange={(e) => setCvLink(e.target.value)}
          className={field}
        />
      </label>

      <p className="font-sans text-[13px] leading-relaxed text-text-muted">
        {labels.mailtoNote}
      </p>

      <button
        type="submit"
        className="inline-flex items-center gap-2 border border-navy px-[28px] py-[14px] font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors duration-micro ease-quart hover:bg-navy hover:text-white"
      >
        {labels.submit}
      </button>
    </form>
  );
}
