import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/about/PlaceholderNotice";

/**
 * IT & Technology — single capabilities page (CONTENT-REFERENCE §C / §D.4).
 * Editorial / typographic layout. No product photos in public/images — navy
 * atmosphere hero only. No invented case studies, clients, or metrics.
 */

const CAPABILITY_KEYS = [
  "controlSystems",
  "cybersecurity",
  "ai",
  "blockchain",
  "dataIntegration",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({
    locale,
    namespace: "businesses.technology",
  });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TechnologyLinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.technology");
  const a = await getTranslations("a11y");
  const shared = await getTranslations("businesses.shared");

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        primaryCta={{
          label: t("hero.cta"),
          href: "/contact",
        }}
        height="62vh"
        minHeight="420px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      {/* Overview / services intro */}
      <Section tone="white" width="normal">
        <Reveal>
          <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("overview.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("overview.title")}
          </h2>
          <p className="mt-6 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("overview.body1")}
          </p>
          <p className="mt-4 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("overview.body2")}
          </p>
        </Reveal>
      </Section>

      {/* Five capabilities — typographic editorial blocks (§D.4) */}
      <Section tone="cream">
        <Reveal className="mb-12 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("capabilities.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("capabilities.title")}
          </h2>
          <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-relaxed text-text-muted">
            {t("capabilities.intro")}
          </p>
        </Reveal>

        <div className="border-t border-border">
          {CAPABILITY_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 60}>
              <article className="grid grid-cols-1 gap-4 border-b border-border py-10 md:grid-cols-12 md:gap-8 md:py-12">
                <div className="md:col-span-1">
                  <span
                    aria-hidden="true"
                    className="font-sans text-[13px] font-semibold tracking-[0.08em] text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[2px] w-8 bg-gold"
                  />
                  <h3 className="font-serif text-[clamp(1.375rem,2.2vw,1.75rem)] font-light leading-snug text-navy">
                    {t(`capabilities.items.${key}.title`)}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="max-w-[54ch] font-sans text-[15px] leading-[1.75] text-text-muted md:pt-1">
                    {t(`capabilities.items.${key}.body`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Application areas + target clients — hedged pending client input */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("applications.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-light text-navy">
              {t("applications.title")}
            </h2>
            <p className="mt-4 max-w-[48ch] font-sans text-[15px] leading-[1.75] text-text-muted">
              {t("applications.body")}
            </p>
            <div className="mt-6">
              <PlaceholderNotice
                label={t("applications.hedgeLabel")}
                detail={t("applications.hedgeDetail")}
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("clients.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-light text-navy">
              {t("clients.title")}
            </h2>
            <p className="mt-4 max-w-[48ch] font-sans text-[15px] leading-[1.75] text-text-muted">
              {t("clients.body")}
            </p>
            <div className="mt-6">
              <PlaceholderNotice
                label={t("clients.hedgeLabel")}
                detail={t("clients.hedgeDetail")}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Business contact → group Contact (IT-specific details still pending) */}
      <Section tone="navy" width="normal">
        <Reveal className="mx-auto max-w-read text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("contact.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-white">
            {t("contact.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] font-sans text-[16px] leading-[1.75] text-white/80">
            {t("contact.body")}
          </p>
          <p className="mx-auto mt-4 max-w-[48ch] font-sans text-[13px] leading-relaxed text-white/55">
            {t("contact.note")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="filled" tone="light" href="/contact" prefetch={false}>
              {t("contact.primary")}
            </Button>
            <Button variant="outline" tone="light" href="/businesses">
              {shared("backToHub")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
