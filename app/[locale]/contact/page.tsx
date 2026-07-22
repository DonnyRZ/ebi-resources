import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WhereWeAreSection } from "@/components/contact/WhereWeAreSection";
import { InquiryForm } from "./InquiryForm";

/**
 * Contact — quiet-luxury shell (DESIGN archetype c).
 * Corporate placeholders, light inquiry form, WhereWeAre atlas slot (M6),
 * property directory with website hedges. No Maps JS / payments / CMS.
 */

const DIRECTORY = [
  {
    key: "hadith" as const,
    href: "https://hadith-hotel.com",
    mode: "pending" as const,
  },
  {
    key: "kampoeng" as const,
    href: "https://hotel-kampoengindonesia.com",
    mode: "confirm" as const,
  },
  {
    key: "graha" as const,
    href: "https://grahanusantara-samarkand.com",
    mode: "confirm" as const,
  },
  {
    key: "mecca" as const,
    href: "https://mecca-hotel.com",
    mode: "pending" as const,
  },
  {
    key: "sevenOz" as const,
    href: "https://7oz-espresso.com/",
    mode: "confirm" as const,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <main>
      {/* Varian B — text-only centered hero under solid header */}
      <section className="bg-cream">
        <div className="mx-auto flex min-h-[42vh] max-w-wide flex-col items-center justify-center px-4 py-16 text-center md:min-h-[48vh] md:px-6 md:py-24">
          <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("hero.kicker")}
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.15] text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-[42ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("hero.supporting")}
          </p>
        </div>
      </section>

      {/* Corporate HQ — placeholders only */}
      <Section tone="white" width="read">
        <Reveal durationClass="duration-struct">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("corporate.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("corporate.title")}
          </h2>
          <p className="mt-4 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("corporate.supporting")}
          </p>

          <dl className="mt-10 space-y-8 border-t border-border pt-10">
            <div>
              <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {t("corporate.emailLabel")}
              </dt>
              <dd className="mt-2 font-sans text-[18px] text-navy">
                {t("corporate.email")}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {t("corporate.phoneLabel")}
              </dt>
              <dd className="mt-2 font-sans text-[18px] text-navy">
                {t("corporate.phone")}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {t("corporate.addressLabel")}
              </dt>
              <dd className="mt-2 font-sans text-[18px] text-navy">
                {t("corporate.address")}
              </dd>
            </div>
          </dl>
        </Reveal>
      </Section>

      {/* General inquiry — narrow column (~800px / max-w-read) */}
      <Section tone="beige" width="read">
        <Reveal durationClass="duration-struct">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("inquiry.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("inquiry.title")}
          </h2>
          <p className="mt-4 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("inquiry.supporting")}
          </p>
          <InquiryForm />
        </Reveal>
      </Section>

      {/* ★ WHERE WE ARE — M6 Silk Road Atlas (reserved slot) */}
      <WhereWeAreSection />

      {/* Property directory — websites + hedges; no junk Hadith phone/email */}
      <Section tone="white" width="normal">
        <Reveal className="mb-10" durationClass="duration-struct">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("directory.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("directory.title")}
          </h2>
          <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("directory.supporting")}
          </p>
        </Reveal>

        <Reveal durationClass="duration-struct">
          <ul className="divide-y divide-border border-y border-border">
            {DIRECTORY.map((item) => (
              <li key={item.key} className="py-6 md:py-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div>
                    <h3 className="font-serif text-[22px] font-light text-navy">
                      {t(`directory.properties.${item.key}.name`)}
                    </h3>
                    <p className="mt-1 font-sans text-[14px] text-text-muted">
                      {t(`directory.properties.${item.key}.city`)}
                    </p>
                    {item.key === "sevenOz" ? (
                      <p className="mt-2 max-w-[48ch] font-sans text-[13px] leading-relaxed text-text-muted">
                        {t("directory.properties.sevenOz.note")}
                      </p>
                    ) : null}
                    <p className="mt-3 max-w-[48ch] font-sans text-[13px] leading-relaxed text-text-muted">
                      {item.mode === "pending"
                        ? t("directory.hedgePending")
                        : t("directory.hedgeConfirm")}
                    </p>
                  </div>
                  <div className="shrink-0 md:text-right">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold transition-colors duration-micro ease-quart hover:text-bronze"
                    >
                      {t(`directory.properties.${item.key}.websiteLabel`)}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-micro ease-quart group-hover/btn:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </a>
                    <p className="mt-2 max-w-[36ch] font-sans text-[12px] leading-relaxed text-text-muted md:ml-auto">
                      {t("directory.hedgeWebsite")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </main>
  );
}
