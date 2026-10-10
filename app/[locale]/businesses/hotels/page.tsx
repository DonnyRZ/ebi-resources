import { pageMetadata } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { PropertyCarousel } from "@/components/businesses/PropertyCarousel";
import { isGrahaNusantaraVisible, withoutGrahaNusantara } from "@/lib/features";
import { HOTEL_WEBSITES } from "@/lib/hotel-websites";
import { HOTEL_HERO_IMAGES, REVISED_MEDIA } from "@/lib/revised-media";

/**
 * Hotels line — quiet-luxury portfolio page (CONTENT-REFERENCE §D.1 / §E).
 * Property cards link directly to each hotel's official website.
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
  return pageMetadata({
    locale,
    path: "/businesses/hotels",
    title: t("meta.title"),
    description: t("meta.description"),
  });
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
  const homeT = await getTranslations("home");
  const common = await getTranslations("common");
  const a = await getTranslations("a11y");

  const properties = withoutGrahaNusantara([
    {
      key: "hadith" as const,
      href: HOTEL_WEBSITES.hadith,
      image: {
        src: REVISED_MEDIA.hadithSunset.src,
        alt: t("alt.hadith"),
      },
    },
    {
      key: "graha" as const,
      href: HOTEL_WEBSITES.grahaNusantara,
      image: {
        src: "/images/graha-nusantara/villa-golden-hour.jpg",
        alt: t("alt.graha"),
      },
    },
    {
      key: "kampoeng" as const,
      href: HOTEL_WEBSITES.kampoengIndonesia,
      image: {
        src: REVISED_MEDIA.kampoengFacade.src,
        alt: homeT("alt.kampoengFacadeDaylight"),
      },
    },
  ]);

  const proof = ["landmarks", "tiers", "hospitality"] as const;
  const heroSlides = HOTEL_HERO_IMAGES.map(({ src, altKey }) => ({
    kicker: t("hero.kicker"),
    title: t("hero.title"),
    supporting: t("hero.supporting"),
    media: { type: "image" as const, src, alt: homeT(`alt.${altKey}`) },
  }));

  return (
    <main className="home-overview home-overview--businesses">
      <HeroCarousel
        slides={heroSlides}
        overlayHeader={false}
        labels={{ region: t("hero.title"), scrollCue: a("scrollDown") }}
      />

      {/* Line intro — editorial split, one job */}
      <Section id="overview-content" tone="white">
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
                src={
                  isGrahaNusantaraVisible()
                    ? "/images/graha-nusantara/complex-night.jpg"
                    : REVISED_MEDIA.kampoengWide.src
                }
                alt={
                  isGrahaNusantaraVisible()
                    ? t("alt.intro")
                    : homeT("alt.kampoengFacadeDaylight")
                }
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Property filmstrip — horizontal scroll, peek next card */}
      <Section tone="cream" id="properties">
        <Reveal className="mb-6 max-w-normal md:mb-8">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("grid.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("grid.title")}
          </h2>
          <p className="mt-3 max-w-[58ch] font-sans text-[15px] leading-relaxed text-text-muted md:mt-4 md:text-[16px]">
            {t("grid.intro")}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <PropertyCarousel
            labels={{
              region: t("grid.carouselLabel"),
              previous: a("previousSlide"),
              next: a("nextSlide"),
              goToSlide: a.raw("goToSlide"),
            }}
            slides={properties.map((p) => ({
              key: p.key,
              href: p.href,
              image: p.image,
              kicker: t(`properties.${p.key}.kicker`),
              title: t(`properties.${p.key}.title`),
              text: t(`properties.${p.key}.text`),
              cta: common("discover"),
            }))}
          />
        </Reveal>
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
