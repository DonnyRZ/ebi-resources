import { pageMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AboutImageCarousel } from "@/components/about/AboutImageCarousel";
import { AboutPortfolioCarousel } from "@/components/about/AboutPortfolioCarousel";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { withoutGrahaNusantara } from "@/lib/features";

/**
 * About — Company Overview (`/about`).
 * Real factual content only (CONTENT-REFERENCE §A / §C). No fabricated
 * metrics, founding year, or scale figures. Photo patterns vary from homepage.
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
  const t = await getTranslations({ locale, namespace: "about.overview" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function AboutOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("about.overview");
  const a = await getTranslations("a11y");
  const common = await getTranslations("common");
  const homeT = await getTranslations("home");

  const pillars = [
    { key: "trusted" as const },
    { key: "crafted" as const },
    { key: "enduring" as const },
    { key: "innovative" as const },
  ];

  const portfolio = withoutGrahaNusantara([
    {
      key: "hadith",
      href: "/businesses/hotels/hadith",
      image: {
        src: "/images/about/portfolio/hadith.webp",
        alt: t("alt.hadithGolden"),
        width: 1672,
        height: 941,
      },
    },
    {
      key: "mecca",
      href: "/businesses/hotels/mecca",
      image: {
        src: "/images/about/portfolio/mecca.webp",
        alt: t("alt.mecca"),
        width: 1672,
        height: 941,
      },
    },
    {
      key: "graha",
      href: "/businesses/hotels/graha-nusantara",
      image: {
        src: "/images/graha-nusantara/villa-golden-hour.jpg",
        alt: t("alt.graha"),
        width: 1600,
        height: 900,
      },
    },
    {
      key: "kampoeng",
      href: "/businesses/hotels/kampoeng-indonesia",
      image: {
        src: "/images/about/portfolio/kampoeng.webp",
        alt: homeT("alt.kampoengFacadeDaylight"),
        width: 1920,
        height: 1280,
      },
    },
    {
      key: "sevenOz",
      href: "/businesses/food-and-beverage",
      image: {
        src: "/images/about/portfolio/sevenoz.webp",
        alt: t("alt.sevenOz"),
        width: 1672,
        height: 941,
      },
    },
  ] as const);
  const portfolioImages = portfolio.map((item) => ({
    ...item.image,
    href: item.href,
    kicker: t(`portfolio.${item.key}.kicker`),
    title: t(`portfolio.${item.key}.title`),
    description: t(`portfolio.${item.key}.description`),
  }));

  const heroImages = [
    {
      src: "/images/about/hero/01-hadith.png",
      alt: homeT("alt.hadithExterior"),
    },
    {
      src: "/images/about/hero/02-suite.png",
      alt: homeT("alt.hadithLobby"),
    },
    {
      src: "/images/about/hero/03-dining.png",
      alt: homeT("alt.hadithDining"),
    },
    {
      src: "/images/about/hero/04-kampoeng-dining.png",
      alt: homeT("alt.kampoengDining"),
    },
  ] as const;
  const heroSlides = heroImages.map(({ src, alt }) => ({
    kicker: t("hero.kicker"),
    title: t("hero.title"),
    supporting: t("hero.supporting"),
    media: { type: "image" as const, src, alt },
  }));
  const whoImages = [
    {
      src: "/images/about/who-we-are/hadith-suite.webp",
      alt: homeT("alt.hadithLobby"),
      width: 1536,
      height: 1024,
    },
    {
      src: "/images/about/who-we-are/hadith-dining.webp",
      alt: homeT("alt.hadithDining"),
      width: 1672,
      height: 941,
    },
    {
      src: "/images/about/who-we-are/sevenoz-cafe.webp",
      alt: homeT("alt.sevenOzInterior"),
      width: 1672,
      height: 941,
    },
  ];

  return (
    <main className="home-overview home-overview--about">
      <HeroCarousel
        slides={heroSlides}
        overlayHeader={false}
        labels={{
          region: t("hero.title"),
          previous: a("previousSlide"),
          next: a("nextSlide"),
          goToSlide: a.raw("goToSlide"),
          scrollCue: a("scrollDown"),
        }}
      />

      {/* Who We Are — centered editorial introduction. */}
      <Section tone="white" id="overview-content" width="read">
        <Reveal className="mx-auto text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("who.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("who.title")}
          </h2>
          <p className="mt-5 font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("who.body1")}
          </p>
          <p className="mt-4 font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("who.body2")}
          </p>
        </Reveal>
      </Section>

      {/* Our Proposition — concise copy beside the portfolio photo carousel. */}
      <Section tone="cream">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("value.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.2] text-navy">
              {t("value.title")}
            </h2>
            <p className="mt-5 max-w-[42ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("value.body")}
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <AboutImageCarousel
              images={whoImages}
              labels={{
                region: t("value.title"),
                previous: common("previous"),
                next: common("next"),
                previousAria: a("previousSlide"),
                nextAria: a("nextSlide"),
              }}
            />
          </Reveal>
        </div>
      </Section>

      {/* Brand pillars — editorial intro beside a compact numbered list. */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4 lg:pt-2">
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("pillars.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.2vw,2.75rem)] font-light leading-[1.15] text-navy">
              {t("pillars.title")}
            </h2>
            <p className="mt-5 max-w-[42ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("pillars.intro")}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <div className="divide-y divide-border border-y border-border">
              {pillars.map((pillar, i) => (
                <article
                  key={pillar.key}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-4 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-6 md:py-5"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1 font-sans text-[12px] font-semibold tracking-[0.12em] text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="grid gap-2 md:grid-cols-[minmax(9rem,0.8fr)_minmax(0,1.2fr)] md:items-baseline md:gap-8">
                    <h3 className="font-serif text-[clamp(1.5rem,2.4vw,1.875rem)] font-light leading-tight text-navy">
                      {t(`pillars.${pillar.key}.label`)}
                    </h3>
                    <p className="max-w-[44ch] font-sans text-[15px] leading-[1.7] text-text-muted">
                      {t(`pillars.${pillar.key}.text`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Our Portfolio — featured property with neighboring slide previews. */}
      <Section tone="white">
        <Reveal className="mb-8 text-left">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("portfolio.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.15] text-navy">
            {t("portfolio.title")}
          </h2>
          <p className="mt-5 max-w-[65ch] font-sans text-[16px] leading-relaxed text-text-muted">
            {t("portfolio.intro")}
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-[1100px]">
          <AboutPortfolioCarousel
            images={portfolioImages}
            labels={{
              region: t("portfolio.title"),
              previous: common("previous"),
              next: common("next"),
              discover: common("discover"),
              previousAria: a("previousSlide"),
              nextAria: a("nextSlide"),
            }}
          />
        </Reveal>
      </Section>

      {/* Closing CTA */}
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
