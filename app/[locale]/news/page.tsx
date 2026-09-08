import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CareersHero } from "@/components/careers/CareersHero";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { NewsSourceLink } from "@/components/news/NewsSourceLink";
import { ARTICLES, formatNewsDate } from "@/lib/news";

/**
 * News listing — editorial/listing archetype (DESIGN.md §6b).
 * Stories adapted from supplied press; public copy uses EBI Resources only.
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
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const common = await getTranslations("common");

  return (
    <main>
      <CareersHero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        supporting={t("hero.supporting")}
        image={{
          src: "/images/hadith/facade-night-landscape.jpg",
          alt: t("alt.hero"),
        }}
      />

      <Section tone="white">
        {ARTICLES.length === 0 ? (
          <p className="font-sans text-[16px] leading-[1.75] text-text-muted">
            {t("empty")}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {ARTICLES.map((article) => (
              <li key={article.slug} className="flex h-full flex-col">
                <Card
                  href={`/news/${article.slug}`}
                  title={t(`articles.${article.slug}.title`)}
                  kicker={`${t(`articles.${article.slug}.location`)} · ${formatNewsDate(article.publishedAt, locale)}`}
                  text={t(`articles.${article.slug}.excerpt`)}
                  image={{
                    src: article.image,
                    alt: t(`articles.${article.slug}.alt`),
                  }}
                  aspect="16 / 10"
                  cta={common("readMore")}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="mt-4">
                  <NewsSourceLink
                    href={article.sourceUrl}
                    label={t("sourceCta")}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}
