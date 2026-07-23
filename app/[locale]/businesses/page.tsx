import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { isGrahaNusantaraVisible } from "@/lib/features";

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
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
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

  const lines = [
    {
      key: "hotels" as const,
      href: "/businesses/hotels",
      image: {
        src: "/images/hadith/facade-night-landscape.jpg",
        alt: t("alt.hotels"),
      },
    },
    {
      key: "fnb" as const,
      href: "/businesses/food-and-beverage",
      image: {
        src: "/images/hadith/restaurant-dining.jpg",
        alt: t("alt.fnb"),
      },
    },
    {
      key: "travel" as const,
      href: "/businesses/travel",
      image: undefined,
      comingSoon: true,
    },
    {
      key: "technology" as const,
      href: "/businesses/technology",
      image: undefined,
    },
  ];

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        media={{
          type: "image",
          src: isGrahaNusantaraVisible()
            ? "/images/graha-nusantara/exterior-day.jpg"
            : "/images/hadith/facade-night-landscape.jpg",
          alt: isGrahaNusantaraVisible() ? t("alt.hero") : t("alt.hotels"),
        }}
        height="62vh"
        minHeight="420px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      <Section tone="white" width="normal">
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
