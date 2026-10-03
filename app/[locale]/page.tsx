import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { PropertySpotlightCarousel } from "@/components/PropertySpotlightCarousel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { isGrahaNusantaraVisible, withoutGrahaNusantara } from "@/lib/features";
import { formatNewsDate, getLatestArticles } from "@/lib/news";
import { HOTEL_WEBSITES } from "@/lib/hotel-websites";
import { organizationSchema, pageMetadata, websiteSchema } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

/**
 * EBI Resources — Homepage.
 *
 * Section flow (CONTENT-REFERENCE §F): rotating hero showcase → group intro
 * (overlapping collage) → business-lines overview (card row) → featured
 * properties (spotlight carousel) → brand pillars (asymmetric mosaic + serif labels) →
 * qualitative credibility band → news highlights → partnership / investor CTA.
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
  const newsT = await getTranslations("news");
  const common = await getTranslations("common");
  const a = await getTranslations("a11y");
  const latestNews = getLatestArticles(3);

  const slides = [
    {
      kicker: t("hero.hadith.kicker"),
      title: t("hero.hadith.title"),
      supporting: t("hero.hadith.supporting"),
      media: {
        type: "image" as const,
        src: "/images/homepage/hero/01-hadith.png",
        alt: t("alt.hadithGolden"),
        mobileObjectPosition: "50% 52%",
      },
    },
    {
      kicker: t("hero.mecca.kicker"),
      title: t("hero.mecca.title"),
      supporting: t("hero.mecca.supporting"),
      media: {
        type: "image" as const,
        src: "/images/homepage/hero/02-mecca.png",
        alt: t("alt.meccaFacade"),
      },
    },
    {
      kicker: t("hero.kampoeng.kicker"),
      title: t("hero.kampoeng.title"),
      supporting: t("hero.kampoeng.supporting"),
      media: {
        type: "image" as const,
        src: "/images/homepage/hero/03-kampoeng.jpg",
        alt: t("alt.kampoengFacadeDaylight"),
      },
    },
    {
      kicker: t("hero.dining.kicker"),
      title: t("hero.dining.title"),
      supporting: t("hero.dining.supporting"),
      media: {
        type: "image" as const,
        src: "/images/homepage/hero/04-dining.png",
        alt: t("alt.hadithDining"),
        mobileObjectPosition: "50% 52%",
      },
    },
    {
      kicker: t("hero.cafe.kicker"),
      title: t("hero.cafe.title"),
      supporting: t("hero.cafe.supporting"),
      media: {
        type: "image" as const,
        src: "/images/homepage/hero/05-cafe.png",
        alt: t("alt.sevenOzInterior"),
      },
    },
  ];

  const lines = [
    {
      key: "hotels",
      href: "/businesses/hotels",
      mediaVariant: undefined,
      image: {
        src: "/images/hadith/hotel-exterior.webp",
        alt: t("alt.hadithGolden"),
      },
    },
    {
      key: "fnb",
      href: "/businesses/food-and-beverage",
      mediaVariant: undefined,
      image: { src: "/images/hadith/resto-1.jpg", alt: t("alt.hadithDining") },
    },
    {
      key: "travel",
      href: "/businesses/travel",
      image: undefined,
      mediaVariant: "travel",
      comingSoon: true,
    },
    {
      key: "tech",
      href: "/businesses/technology",
      image: undefined,
      mediaVariant: "technology",
      comingSoon: true,
    },
  ] as const;

  const properties = withoutGrahaNusantara([
    {
      key: "hadith",
      href: HOTEL_WEBSITES.hadith,
      city: "Samarkand",
      image: {
        src: "/images/homepage/hero/01-hadith.png",
        alt: t("alt.hadithGolden"),
        aspectRatio: 1672 / 941,
      },
    },
    {
      key: "mecca",
      href: HOTEL_WEBSITES.mecca,
      city: "Tashkent",
      image: {
        src: "/images/homepage/hero/02-mecca.png",
        alt: t("alt.meccaFacade"),
        aspectRatio: 16 / 9,
      },
    },
    {
      key: "graha",
      href: HOTEL_WEBSITES.grahaNusantara,
      city: "Samarkand",
      image: {
        src: "/images/graha-nusantara/villa-golden-hour.jpg",
        alt: t("alt.grahaVilla"),
      },
    },
    {
      key: "kampoeng",
      href: HOTEL_WEBSITES.kampoengIndonesia,
      city: "Samarkand",
      image: {
        src: "/images/homepage/hero/03-kampoeng.jpg",
        alt: t("alt.kampoengFacadeDaylight"),
        aspectRatio: 2560 / 1707,
      },
    },
  ] as const);

  const pillars = ["trusted", "crafted", "enduring", "innovative"] as const;

  const credibility = [
    "locations",
    "certification",
    "tiers",
    "positioning",
  ] as const;

  return (
    <main className="home-overview">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [organizationSchema(), websiteSchema()],
        }}
      />
      <HeroCarousel
        slides={slides}
        labels={{
          region: a("highlights"),
          previous: a("previousSlide"),
          next: a("nextSlide"),
          goToSlide: a.raw("goToSlide"),
          scrollCue: a("scrollDown"),
        }}
      />

      {/* 2 — Group intro: text + overlapping collage (DESIGN.md §4 pattern #2) */}
      <Section tone="white" id="overview-content">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-9">
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
                      : "/images/homepage/hero/02-mecca.png"
                  }
                  alt={
                    isGrahaNusantaraVisible()
                      ? t("alt.grahaNight")
                      : t("alt.meccaFacade")
                  }
                  fill
                  sizes="(max-width: 1024px) 82vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[54%] w-[56%] overflow-hidden shadow-hair">
                <Image
                  src="/images/homepage/hero/05-cafe.png"
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
                mediaVariant={line.mediaVariant}
                aspect="4 / 3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                title={t(`lines.${line.key}.title`)}
                text={t(`lines.${line.key}.text`)}
                badge={
                  "comingSoon" in line && line.comingSoon
                    ? common("comingSoon")
                    : undefined
                }
                cta={common("learnMore")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — Featured properties: unique, editorial spotlight carousel */}
      <Section tone="white" bleed>
        <Reveal className="mx-auto mb-4 w-full max-w-wide px-4 md:px-6">
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

        <Reveal>
          <PropertySpotlightCarousel
            labels={{
              region: t("featured.title"),
              previous: common("previous"),
              next: common("next"),
              previousAria: a("previousSlide"),
              nextAria: a("nextSlide"),
            }}
            slides={properties.map((p) => ({
              key: p.key,
              href: p.href,
              city: p.city,
              image: p.image,
              title: t(`featured.${p.key}.title`),
              text: t(`featured.${p.key}.positioning`),
              cta: common("discover"),
            }))}
          />
        </Reveal>
      </Section>

      {/* 5 — Brand pillars: compact text-only editorial list */}
      <Section tone="beige" flush containerClassName="py-8 md:py-10">
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.6fr)] md:gap-x-10">
          <Reveal className="max-w-[22rem]">
            <p className="mb-2 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("pillars.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.375rem)] font-light leading-[1.08] text-navy">
              {t("pillars.title")}
            </h2>
          </Reveal>

          <Reveal>
            <dl className="border-t border-navy/15">
              {pillars.map((key, i) => (
                <div
                  key={key}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-b border-navy/15 py-3 md:grid-cols-[2rem_minmax(8rem,0.75fr)_minmax(0,1.25fr)] md:items-baseline md:gap-x-4 md:py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="font-sans text-[11px] font-semibold tracking-[0.08em] text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="font-serif text-[21px] font-light leading-tight text-navy">
                    {t(`pillars.${key}.label`)}
                  </dt>
                  <dd className="col-start-2 mt-1 font-sans text-[14px] leading-[1.5] text-text-muted md:col-start-3 md:mt-0">
                    {t(`pillars.${key}.text`)}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
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
                <span
                  aria-hidden="true"
                  className="mb-4 block h-[2px] w-8 bg-gold"
                />
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

      {/* 7 — News & Highlights (DESIGN.md §6a) */}
      <Section tone="white">
        <Reveal className="mb-8 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("news.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("news.title")}
          </h2>
          <p className="mt-4 max-w-read font-sans text-[16px] leading-relaxed text-text-muted">
            {t("news.intro")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80}>
              <Card
                href={`/news/${article.slug}`}
                title={newsT(`articles.${article.slug}.title`)}
                kicker={`${newsT(`articles.${article.slug}.location`)} · ${formatNewsDate(article.publishedAt, locale)}`}
                text={newsT(`articles.${article.slug}.excerpt`)}
                image={{
                  src: article.image,
                  alt: newsT(`articles.${article.slug}.alt`),
                  fit: article.imageAspect === "square" ? "contain" : "cover",
                }}
                aspect={article.imageAspect === "square" ? "1 / 1" : "16 / 10"}
                compact
                cta={common("readMore")}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button variant="text" tone="navy" href="/news">
            {t("news.viewAll")}
          </Button>
        </Reveal>
      </Section>

      {/* 8 — Partnership / investor CTA */}
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
