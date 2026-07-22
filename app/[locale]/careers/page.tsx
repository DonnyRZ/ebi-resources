import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CareersHero } from "@/components/careers/CareersHero";
import {
  CareersListing,
  type JobCardCopy,
} from "@/components/careers/CareersListing";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  JOBS,
  type CareerFilter,
} from "@/lib/careers";

/**
 * Careers listing — editorial/listing archetype (DESIGN.md §6b / §7).
 * Filter tabs by EBI business line; job rows; PREV/NEXT when needed.
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
  const t = await getTranslations({ locale, namespace: "careers" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("careers");

  const filterLabels: Record<CareerFilter, string> = {
    all: t("filters.all"),
    hospitality: t("filters.hospitality"),
    restaurants: t("filters.restaurants"),
    cafe: t("filters.cafe"),
    corporate: t("filters.corporate"),
  };

  const cards: Record<string, JobCardCopy> = {};
  for (const job of JOBS) {
    cards[job.slug] = {
      slug: job.slug,
      title: t(`jobs.${job.slug}.title`),
      lineLabel: t(`lines.${job.line}`),
      location: t(`jobs.${job.slug}.location`),
      type: t(`jobs.${job.slug}.type`),
      level: t(`jobs.${job.slug}.level`),
      summary: t(`jobs.${job.slug}.summary`),
    };
  }

  return (
    <main>
      <CareersHero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        image={{
          src: "/images/hadith/grand-lobby.jpg",
          alt: t("alt.hero"),
        }}
      />

      <Section tone="white" width="normal">
        <Reveal className="mb-10" durationClass="duration-struct">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("listing.kicker")}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {t("listing.title")}
          </h2>
          <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("listing.body")}
          </p>
        </Reveal>

        <CareersListing
          jobs={JOBS}
          cards={cards}
          filterLabels={filterLabels}
          filterAria={t("filters.aria")}
          empty={t("listing.empty")}
          viewRole={t("listing.viewRole")}
          applyLabel={t("listing.apply")}
          prevLabel={t("listing.prev")}
          nextLabel={t("listing.next")}
        />
      </Section>
    </main>
  );
}
