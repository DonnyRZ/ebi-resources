import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * About — Vision & Mission (`/about/vision-mission`).
 * Editorial two-column layout; copy grounded in group positioning (no invented metrics).
 */

const MISSION_KEYS = ["holding", "hospitality", "growth", "connection"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "about.visionMission" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function VisionMissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("about.visionMission");
  const a = await getTranslations("a11y");

  return (
    <main>
      <Hero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        media={{
          type: "image",
          src: "/images/mecca/balcony.jpg",
          alt: t("alt.hero"),
          objectPosition: "center 40%",
        }}
        height="58vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      {/* Two-column Vision | Mission */}
      <Section tone="cream" flush className="!py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col border-b border-border px-4 py-16 md:px-8 md:py-24 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
              <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                {t("vision.kicker")}
              </p>
              <h2 className="font-serif text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-[1.15] text-navy">
                {t("vision.title")}
              </h2>
              <p className="mt-10 font-serif text-[clamp(1.25rem,2.2vw,1.5rem)] font-light italic leading-[1.55] text-navy">
                {t("vision.lead")}
              </p>
              <p className="mt-8 max-w-[42ch] font-sans text-[16px] leading-[1.75] text-text-muted">
                {t("vision.body")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-beige/60 px-4 py-16 md:px-8 md:py-24 lg:px-12 xl:px-16">
              <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                {t("mission.kicker")}
              </p>
              <h2 className="font-serif text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-[1.15] text-navy">
                {t("mission.title")}
              </h2>
              <ol className="mt-10 space-y-8">
                {MISSION_KEYS.map((key, i) => (
                  <li key={key} className="grid grid-cols-[auto_1fr] gap-4">
                    <span
                      aria-hidden="true"
                      className="pt-1 font-sans text-[12px] font-semibold tracking-[0.08em] text-gold"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span
                        aria-hidden="true"
                        className="mb-3 block h-[2px] w-7 bg-gold"
                      />
                      <p className="font-serif text-[clamp(1.125rem,1.8vw,1.25rem)] font-light leading-snug text-navy">
                        {t(`mission.items.${key}.title`)}
                      </p>
                      <p className="mt-2 max-w-[40ch] font-sans text-[15px] leading-[1.7] text-text-muted">
                        {t(`mission.items.${key}.text`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" width="normal">
        <Reveal className="mx-auto max-w-read text-center">
          <p className="font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("closing")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline" href="/contact">
              {t("ctaContact")}
            </Button>
            <Button variant="text" href="/about">
              {t("ctaAbout")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
