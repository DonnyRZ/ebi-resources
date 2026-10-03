import { pageMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";

/**
 * Our Businesses hub — intro + four line cards (CONTENT-REFERENCE §C / §D).
 * Organized by business line first; F&B merges restaurants + café.
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
  const t = await getTranslations({ locale, namespace: "businesses.hub" });
  return pageMetadata({
    locale,
    path: "/businesses",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function BusinessesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.hub");
  const common = await getTranslations("common");
  const a = await getTranslations("a11y");
  const homeT = await getTranslations("home");

  const lines = [
    {
      key: "hotels" as const,
      href: "/businesses/hotels",
      mediaVariant: undefined,
      image: {
        src: "/images/hadith/hotel-exterior.webp",
        alt: t("alt.hotels"),
      },
    },
    {
      key: "fnb" as const,
      href: "/businesses/food-and-beverage",
      mediaVariant: undefined,
      image: {
        src: "/images/hadith/resto-1.jpg",
        alt: t("alt.fnb"),
      },
    },
    {
      key: "travel" as const,
      href: "/businesses/travel",
      image: undefined,
      mediaVariant: "travel" as const,
      comingSoon: true,
    },
    {
      key: "technology" as const,
      href: "/businesses/technology",
      image: undefined,
      mediaVariant: "technology" as const,
      comingSoon: true,
    },
  ];

  const heroImages = [
    {
      src: "/images/businesses/overview/hero/01-hadith-golden-hour.webp",
      alt: homeT("alt.hadithGolden"),
    },
    {
      src: "/images/businesses/overview/hero/02-mecca-facade-dusk.webp",
      alt: homeT("alt.meccaFacade"),
    },
    {
      src: "/images/businesses/overview/hero/03-kampoeng-facade-daylight.webp",
      alt: homeT("alt.kampoengFacadeDaylight"),
    },
    {
      src: "/images/businesses/overview/hero/04-hadith-restaurant.webp",
      alt: t("alt.fnb"),
    },
    {
      src: "/images/businesses/overview/hero/05-sevenoz-cafe.webp",
      alt: homeT("alt.sevenOzInterior"),
    },
  ];
  const heroSlides = heroImages.map(({ src, alt }) => ({
    kicker: t("hero.kicker"),
    title: t("hero.title"),
    supporting: t("hero.supporting"),
    media: { type: "image" as const, src, alt },
  }));

  return (
    <main className="home-overview home-overview--businesses">
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

      <Section tone="white" width="normal" id="overview-content">
        <Reveal>
          <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("intro.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {t("intro.title")}
          </h2>
          <p className="mt-6 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("intro.body")}
          </p>
        </Reveal>
      </Section>

      <Section tone="cream">
        <Reveal className="mb-8 text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("lines.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("lines.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lines.map((line, i) => (
            <Reveal key={line.key} delay={i * 80}>
              <Card
                href={line.href}
                prefetch={false}
                image={line.image}
                mediaVariant={line.mediaVariant}
                aspect="4 / 3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
    </main>
  );
}
