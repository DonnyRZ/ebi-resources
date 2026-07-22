import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Hotels line — quiet-luxury portfolio page (CONTENT-REFERENCE §D.1 / §E).
 * Property cards link through to full detail pages (Wave 2).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "businesses.hotels" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function HotelsLinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.hotels");
  const common = await getTranslations("common");
  const a = await getTranslations("a11y");

  const properties = [
    {
      key: "hadith" as const,
      href: "/businesses/hotels/hadith",
      image: {
        src: "/images/hadith/facade-night-landscape.jpg",
        alt: t("alt.hadith"),
      },
    },
    {
      key: "mecca" as const,
      href: "/businesses/hotels/mecca",
      image: {
        src: "/images/mecca/facade-dusk.jpg",
        alt: t("alt.mecca"),
      },
    },
    {
      key: "graha" as const,
      href: "/businesses/hotels/graha-nusantara",
      image: {
        src: "/images/graha-nusantara/villa-golden-hour.jpg",
        alt: t("alt.graha"),
      },
    },
    {
      key: "kampoeng" as const,
      href: "/businesses/hotels/kampoeng-indonesia",
      image: {
        src: "/images/kampoeng-indonesia/facade-night.jpg",
        alt: t("alt.kampoeng"),
      },
    },
  ];

  const proof = ["landmarks", "tiers", "hospitality"] as const;

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        media={{
          type: "image",
          src: "/images/mecca/facade-boulevard.jpg",
          alt: t("alt.hero"),
        }}
        height="58vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      {/* Line intro — editorial split, one job */}
      <Section tone="white">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("intro.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
              {t("intro.title")}
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("intro.body")}
            </p>
            <p className="mt-4 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("intro.body2")}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/graha-nusantara/complex-night.jpg"
                alt={t("alt.intro")}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Property grid — 2×2 for breathing room */}
      <Section tone="cream" id="properties">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("grid.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("grid.title")}
          </h2>
          <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-relaxed text-text-muted">
            {t("grid.intro")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12">
          {properties.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <Card
                href={p.href}
                prefetch={false}
                image={p.image}
                aspect="3 / 2"
                sizes="(max-width: 640px) 100vw, 50vw"
                kicker={t(`properties.${p.key}.kicker`)}
                title={t(`properties.${p.key}.title`)}
                text={t(`properties.${p.key}.text`)}
                cta={common("discover")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Qualitative proof — no numeric stat-band */}
      <Section tone="navy">
        <Reveal className="mb-8 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("proof.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-white">
            {t("proof.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {proof.map((key, i) => (
            <Reveal key={key} delay={i * 80}>
              <div className="h-full border-t border-white/20 pt-5">
                <span
                  aria-hidden="true"
                  className="mb-4 block h-[2px] w-8 bg-gold"
                />
                <h3 className="font-serif text-[20px] font-light leading-snug text-white">
                  {t(`proof.${key}.title`)}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/70">
                  {t(`proof.${key}.text`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Partnership CTA → /contact */}
      <Section tone="cream" width="normal">
        <Reveal className="mx-auto max-w-read text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("cta.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("cta.body")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="filled" tone="navy" href="/contact">
              {t("cta.primary")}
            </Button>
            <Button variant="outline" tone="navy" href="/businesses">
              {t("cta.secondary")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
