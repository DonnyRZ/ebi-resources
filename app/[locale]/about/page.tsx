import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
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
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
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

  const pillars = [
    { key: "trusted" as const },
    { key: "crafted" as const },
    { key: "enduring" as const },
    { key: "innovative" as const },
  ];

  const portfolio = withoutGrahaNusantara([
    {
      key: "hadith",
      image: { src: "/images/hadith/exterior-night.jpg", alt: t("alt.hadith") },
    },
    {
      key: "mecca",
      image: { src: "/images/mecca/facade-dusk.jpg", alt: t("alt.mecca") },
    },
    {
      key: "graha",
      image: {
        src: "/images/graha-nusantara/villa-golden-hour.jpg",
        alt: t("alt.graha"),
      },
    },
    {
      key: "kampoeng",
      image: {
        src: "/images/kampoeng-indonesia/facade-night.jpg",
        alt: t("alt.kampoeng"),
      },
    },
    {
      key: "sevenOz",
      image: {
        src: "/images/seven-oz/cafe-interior.jpg",
        alt: t("alt.sevenOz"),
      },
    },
  ] as const);

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        media={{
          type: "image",
          src: "/images/hadith/facade-golden.jpg",
          alt: t("alt.hero"),
        }}
        height="62vh"
        minHeight="420px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      {/* Editorial split — text | staggered horizontal photos (§4 #8d / #2) */}
      <Section tone="white">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {t("who.kicker")}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
              {t("who.title")}
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("who.body1")}
            </p>
            <p className="mt-4 max-w-[52ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {t("who.body2")}
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="relative grid grid-cols-12 gap-3 md:gap-4">
              <div className="col-span-7 aspect-[4/5] overflow-hidden md:translate-y-6">
                <Image
                  src="/images/hadith/facade-night-landscape.jpg"
                  alt={t("alt.hadithGolden")}
                  width={720}
                  height={900}
                  sizes="(max-width: 1024px) 58vw, 35vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-3 md:gap-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/mecca/rooftop-winter.jpg"
                    alt={t("alt.meccaRooftop")}
                    width={480}
                    height={640}
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/seven-oz/rooftop-sunset.jpg"
                    alt={t("alt.sevenOzRooftop")}
                    width={480}
                    height={360}
                    sizes="(max-width: 1024px) 40vw, 22vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Value proposition — read-width cream band */}
      <Section tone="cream" width="read">
        <Reveal className="text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("value.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.2] text-navy">
            {t("value.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("value.body")}
          </p>
        </Reveal>
      </Section>

      {/* Brand pillars — hairline list, typography-led (not homepage mosaic clone) */}
      <Section tone="white">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("pillars.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("pillars.title")}
          </h2>
          <p className="mt-4 max-w-read font-sans text-[16px] leading-relaxed text-text-muted">
            {t("pillars.intro")}
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <article
                key={pillar.key}
                className={`border-b border-border py-8 md:px-6 lg:px-8 ${
                  i % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mb-4 block h-[2px] w-8 bg-gold"
                />
                <h3 className="font-serif text-[clamp(1.5rem,2.4vw,1.875rem)] font-light text-navy">
                  {t(`pillars.${pillar.key}.label`)}
                </h3>
                <p className="mt-3 max-w-[44ch] font-sans text-[15px] leading-relaxed text-text-muted">
                  {t(`pillars.${pillar.key}.text`)}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Portfolio filmstrip — horizontal equal cards (§4 #8a) */}
      <Section tone="beige">
        <Reveal className="mb-8 text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("portfolio.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("portfolio.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-read font-sans text-[16px] leading-relaxed text-text-muted">
            {t("portfolio.intro")}
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {portfolio.map((item) => (
              <article key={item.key} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="scale-105 object-cover transition-transform duration-image ease-quart group-hover:scale-[1.12]"
                  />
                </div>
                <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                  {t(`portfolio.${item.key}.kicker`)}
                </p>
                <h3 className="mt-1 font-serif text-[18px] font-light leading-snug text-navy">
                  {t(`portfolio.${item.key}.title`)}
                </h3>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-10 text-center">
          <Button variant="outline" tone="navy" href="/businesses">
            {t("portfolio.cta")}
          </Button>
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
