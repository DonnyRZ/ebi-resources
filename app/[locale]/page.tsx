import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import {
  isGrahaNusantaraVisible,
  withoutGrahaNusantara,
} from "@/lib/features";

/**
 * EBI Resources — Homepage.
 *
 * Section flow (CONTENT-REFERENCE §F): rotating hero showcase → group intro
 * (overlapping collage) → business-lines overview (card row) → featured
 * properties (card row) → brand pillars (asymmetric mosaic + serif labels) →
 * qualitative credibility band → partnership / investor CTA.
 *
 * Photo presentation deliberately varies per section (DESIGN.md §4) and copy is
 * grounded — no fabricated metrics, no numeric stat-band (see decisions).
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const common = await getTranslations("common");
  const a = await getTranslations("a11y");

  const heroCta = { label: t("hero.cta"), href: "/businesses" };

  const slidesAll = [
    {
      kicker: t("hero.cafe.kicker"),
      title: t("hero.cafe.title"),
      supporting: t("hero.cafe.supporting"),
      primaryCta: heroCta,
      media: {
        type: "image" as const,
        src: "/images/seven-oz/rooftop-sunset.jpg",
        alt: t("alt.sevenOzRooftop"),
      },
    },
    {
      kicker: t("hero.hadith.kicker"),
      title: t("hero.hadith.title"),
      supporting: t("hero.hadith.supporting"),
      primaryCta: heroCta,
      media: {
        type: "image" as const,
        src: "/images/hadith/facade-night-landscape.jpg",
        alt: t("alt.hadithGolden"),
      },
    },
    {
      key: "graha" as const,
      kicker: t("hero.graha.kicker"),
      title: t("hero.graha.title"),
      supporting: t("hero.graha.supporting"),
      primaryCta: heroCta,
      media: {
        type: "image" as const,
        src: "/images/graha-nusantara/villa-golden-hour.jpg",
        alt: t("alt.grahaVilla"),
      },
    },
    {
      kicker: t("hero.kampoeng.kicker"),
      title: t("hero.kampoeng.title"),
      supporting: t("hero.kampoeng.supporting"),
      primaryCta: heroCta,
      media: {
        type: "image" as const,
        src: "/images/kampoeng-indonesia/facade-night.jpg",
        alt: t("alt.kampoengFacade"),
      },
    },
    {
      kicker: t("hero.dining.kicker"),
      title: t("hero.dining.title"),
      supporting: t("hero.dining.supporting"),
      primaryCta: heroCta,
      media: {
        type: "image" as const,
        src: "/images/hadith/restaurant.jpg",
        alt: t("alt.hadithRestaurant"),
      },
    },
  ];

  const slides = withoutGrahaNusantara(slidesAll).map(
    ({ key: _key, ...slide }) => slide,
  );

  const lines = [
    {
      key: "hotels",
      href: "/businesses/hotels",
      image: { src: "/images/hadith/facade-night-landscape.jpg", alt: t("alt.hadithGolden") },
    },
    {
      key: "fnb",
      href: "/businesses/food-and-beverage",
      image: { src: "/images/hadith/restaurant-dining.jpg", alt: t("alt.hadithDining") },
    },
    { key: "travel", href: "/businesses/travel", image: undefined, comingSoon: true },
    { key: "tech", href: "/businesses/technology", image: undefined },
  ] as const;

  const properties = withoutGrahaNusantara([
    {
      key: "hadith",
      href: "/businesses/hotels/hadith",
      city: "Samarkand",
      image: { src: "/images/hadith/exterior-night.jpg", alt: t("alt.hadithExterior") },
    },
    {
      key: "mecca",
      href: "/businesses/hotels/mecca",
      city: "Tashkent",
      image: { src: "/images/mecca/facade-dusk.jpg", alt: t("alt.meccaFacade") },
    },
    {
      key: "graha",
      href: "/businesses/hotels/graha-nusantara",
      city: "Samarkand",
      image: { src: "/images/graha-nusantara/villa-golden-hour.jpg", alt: t("alt.grahaVilla") },
    },
    {
      key: "kampoeng",
      href: "/businesses/hotels/kampoeng-indonesia",
      city: "Samarkand",
      image: { src: "/images/kampoeng-indonesia/facade-night.jpg", alt: t("alt.kampoengFacade") },
    },
  ] as const);

  const pillars = [
    {
      key: "trusted",
      span: "lg:col-span-7",
      image: { src: "/images/hadith/grand-lobby.jpg", alt: t("alt.hadithLobby") },
    },
    {
      key: "crafted",
      span: "lg:col-span-5",
      image: { src: "/images/mecca/rooftop-winter.jpg", alt: t("alt.meccaRooftop") },
    },
    {
      key: "enduring",
      span: "lg:col-span-5",
      image: isGrahaNusantaraVisible()
        ? {
            src: "/images/graha-nusantara/complex-night.jpg",
            alt: t("alt.grahaNight"),
          }
        : {
            src: "/images/kampoeng-indonesia/facade-night.jpg",
            alt: t("alt.kampoengFacade"),
          },
    },
    {
      key: "innovative",
      span: "lg:col-span-7",
      image: { src: "/images/hadith/night-fountain.jpg", alt: t("alt.hadithNight") },
    },
  ] as const;

  const credibility = ["locations", "certification", "tiers", "positioning"] as const;

  return (
    <main>
      <HeroCarousel
        slides={slides}
        height="92vh"
        labels={{
          region: a("highlights"),
          previous: a("previousSlide"),
          next: a("nextSlide"),
          goToSlide: a.raw("goToSlide"),
          scrollCue: a("scrollDown"),
        }}
      />

      {/* 2 — Group intro: text + overlapping collage (DESIGN.md §4 pattern #2) */}
      <Section tone="white">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-9">
          <Reveal className="order-2 lg:order-1">
            <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("intro.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
              {t("intro.title")}
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("intro.body1")}
            </p>
            <p className="mt-4 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("intro.body2")}
            </p>
            <div className="mt-7">
              <Button variant="text" href="/about">
                {t("intro.cta")}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
              <div className="absolute right-0 top-0 h-[74%] w-[82%] overflow-hidden">
                <Image
                  src={
                    isGrahaNusantaraVisible()
                      ? "/images/graha-nusantara/complex-night.jpg"
                      : "/images/hadith/facade-night-landscape.jpg"
                  }
                  alt={
                    isGrahaNusantaraVisible()
                      ? t("alt.grahaNight")
                      : t("alt.hadithGolden")
                  }
                  fill
                  sizes="(max-width: 1024px) 82vw, 40vw"
                  className="object-cover -scale-x-100"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[54%] w-[56%] overflow-hidden border-[6px] border-white bg-white shadow-hair">
                <Image
                  src="/images/seven-oz/cafe-interior.jpg"
                  alt={t("alt.sevenOzInterior")}
                  fill
                  sizes="(max-width: 1024px) 56vw, 26vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 3 — Business lines: four compact cards (DESIGN.md §4 pattern #8a) */}
      <Section tone="cream">
        <Reveal className="mb-8 text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("lines.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("lines.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-read font-sans text-[16px] leading-relaxed text-text-muted">
            {t("lines.intro")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lines.map((line, i) => (
            <Reveal key={line.key} delay={i * 80}>
              <Card
                href={line.href}
                image={line.image}
                aspect="4 / 3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                title={t(`lines.${line.key}.title`)}
                text={t(`lines.${line.key}.text`)}
                badge={"comingSoon" in line && line.comingSoon ? common("comingSoon") : undefined}
                cta={common("learnMore")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — Featured properties: curated card row (DESIGN.md §4 pattern #8a) */}
      <Section tone="white">
        <Reveal className="mb-8 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("featured.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("featured.title")}
          </h2>
          <p className="mt-4 max-w-read font-sans text-[16px] leading-relaxed text-text-muted">
            {t("featured.intro")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <Card
                href={p.href}
                image={p.image}
                aspect="3 / 4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                kicker={p.city}
                title={t(`featured.${p.key}.title`)}
                text={t(`featured.${p.key}.positioning`)}
                cta={common("discover")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Brand pillars: asymmetric mosaic + single-word serif labels (§4 #3) */}
      <Section tone="beige">
        <Reveal className="mb-8 text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("pillars.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("pillars.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.key} delay={i * 90} className={pillar.span}>
              <article className="group relative h-full min-h-[280px] overflow-hidden md:min-h-[340px]">
                <Image
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                  className="scale-105 object-cover transition-transform duration-image ease-quart group-hover:scale-[1.1]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] font-light text-white">
                    {t(`pillars.${pillar.key}.label`)}
                  </h3>
                  <p className="mt-2 max-w-[42ch] font-sans text-[14px] leading-relaxed text-white/85">
                    {t(`pillars.${pillar.key}.text`)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — Credibility band: QUALITATIVE proof only, no numeric stat-band */}
      <Section tone="navy">
        <Reveal className="mb-8 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("credibility.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-white">
            {t("credibility.title")}
          </h2>
          <p className="mt-4 max-w-read font-sans text-[16px] leading-relaxed text-white/70">
            {t("credibility.intro")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {credibility.map((key, i) => (
            <Reveal key={key} delay={i * 80}>
              <div className="h-full border-t border-white/20 pt-5">
                <span aria-hidden="true" className="mb-4 block h-[2px] w-8 bg-gold" />
                <h3 className="font-serif text-[20px] font-light leading-snug text-white">
                  {t(`credibility.${key}.title`)}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/70">
                  {t(`credibility.${key}.text`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — Partnership / investor CTA */}
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
            <Button variant="outline" tone="navy" href="/careers">
              {t("cta.secondary")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
