import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Travel — Coming Soon.
 * Brand: PT EGI Travel Buana. Destinations only (no mode of travel named).
 * Sole curated asset: logo under Assets/Travel → public/images/travel/logo.png.
 */

const DESTINATION_KEYS = ["tashkentSamarkand", "jakarta", "denpasar"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "businesses.travel" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TravelLinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.travel");
  const a = await getTranslations("a11y");
  const common = await getTranslations("common");
  const shared = await getTranslations("businesses.shared");

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        height="58vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      {/* Brand + Coming Soon */}
      <Section tone="white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[280px] items-center justify-center bg-cream p-8 lg:mx-0 lg:max-w-none">
              <Image
                src="/images/travel/logo.png"
                alt={t("alt.logo")}
                width={1173}
                height={1600}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 280px, 36vw"
                priority
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={80}>
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {common("comingSoon")}
            </p>
            <p className="mb-2 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-navy/50">
              {t("brand.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
              {t("brand.title")}
            </h2>
            <p className="mt-6 max-w-[54ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("brand.body1")}
            </p>
            <p className="mt-4 max-w-[54ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("brand.body2")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Destinations — names only, no transport modes */}
      <Section tone="cream">
        <Reveal className="mb-12 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("destinations.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("destinations.title")}
          </h2>
          <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-relaxed text-text-muted">
            {t("destinations.intro")}
          </p>
        </Reveal>

        <div className="border-t border-border">
          {DESTINATION_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 70}>
              <article className="grid grid-cols-1 gap-3 border-b border-border py-10 md:grid-cols-12 md:items-end md:gap-8 md:py-12">
                <div className="md:col-span-1">
                  <span
                    aria-hidden="true"
                    className="font-sans text-[13px] font-semibold tracking-[0.08em] text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-7">
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[2px] w-8 bg-gold"
                  />
                  <h3 className="font-serif text-[clamp(1.5rem,2.8vw,2.125rem)] font-light leading-snug text-navy">
                    {t(`destinations.items.${key}.title`)}
                  </h3>
                </div>
                <div className="md:col-span-4 md:pb-1">
                  <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-navy/45">
                    {t(`destinations.items.${key}.region`)}
                  </p>
                  <p className="mt-2 max-w-[36ch] font-sans text-[15px] leading-[1.7] text-text-muted">
                    {t(`destinations.items.${key}.text`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Status + CTA */}
      <Section tone="navy" width="normal">
        <Reveal className="mx-auto max-w-read text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("status.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-white">
            {t("status.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] font-sans text-[16px] leading-[1.75] text-white/80">
            {t("status.body")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="filled" tone="light" href="/contact" prefetch={false}>
              {t("status.primary")}
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
