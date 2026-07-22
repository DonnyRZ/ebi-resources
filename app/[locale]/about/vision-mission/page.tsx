import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PlaceholderNotice } from "@/components/about/PlaceholderNotice";

/**
 * About — Vision & Mission (`/about/vision-mission`).
 * Layout ready; body copy is clearly marked Lorem ipsum — not real claims.
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
          src: "/images/graha-nusantara/complex-night.jpg",
          alt: t("alt.hero"),
        }}
        height="58vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={a("scrollDown")}
      />

      <Section tone="white" width="normal">
        <Reveal>
          <PlaceholderNotice
            label={t("placeholder.label")}
            detail={t("placeholder.detail")}
          />
        </Reveal>
      </Section>

      {/* Two-column Vision | Mission — stacked on mobile */}
      <Section tone="cream" flush className="!py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Reveal>
            <div className="border-b border-border px-4 py-16 md:px-8 md:py-24 lg:border-b-0 lg:border-r lg:px-12 xl:px-16">
              <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                {t("vision.kicker")}
              </p>
              <h2 className="font-serif text-[clamp(1.875rem,3vw,2.5rem)] font-light leading-[1.15] text-navy">
                {t("vision.title")}
              </h2>
              <div className="mt-8 space-y-4 font-serif text-[17px] italic leading-[1.8] text-text-muted/80">
                <p>{t("vision.lorem1")}</p>
                <p>{t("vision.lorem2")}</p>
                <p>{t("vision.lorem3")}</p>
              </div>
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
              <div className="mt-8 space-y-4 font-serif text-[17px] italic leading-[1.8] text-text-muted/80">
                <p>{t("mission.lorem1")}</p>
                <p>{t("mission.lorem2")}</p>
                <p>{t("mission.lorem3")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" width="read">
        <Reveal className="text-center">
          <p className="font-sans text-[13px] leading-relaxed text-text-muted">
            {t("footerNote")}
          </p>
        </Reveal>
      </Section>
    </main>
  );
}
