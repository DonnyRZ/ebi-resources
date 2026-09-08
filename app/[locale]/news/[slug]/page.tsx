import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { NewsSourceLink } from "@/components/news/NewsSourceLink";
import {
  ARTICLES,
  NEWS_SLUGS,
  formatNewsDate,
  getArticle,
  type NewsSlug,
} from "@/lib/news";

export function generateStaticParams() {
  return NEWS_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!hasLocale(routing.locales, locale) || !article) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: `${t(`articles.${article.slug}.title`)} — EBI Resources`,
    description: t(`articles.${article.slug}.excerpt`),
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const article = getArticle(slug);
  if (!article) {
    notFound();
  }
  setRequestLocale(locale);

  const newsSlug: NewsSlug = article.slug;
  const t = await getTranslations("news");
  const body = t.raw(`articles.${newsSlug}.body`) as string[];
  const related = ARTICLES.filter((item) => item.slug !== newsSlug).slice(0, 2);

  return (
    <main>
      <section className="border-b border-border bg-cream">
        <div className="mx-auto max-w-wide px-4 py-12 md:px-6 md:py-16">
          <Link
            href="/news"
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-micro ease-quart hover:text-bronze"
          >
            ← {t("back")}
          </Link>
          <p className="mt-8 mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t(`articles.${newsSlug}.location`)}
            <span className="mx-2 opacity-40" aria-hidden="true">
              ·
            </span>
            {formatNewsDate(article.publishedAt, locale)}
          </p>
          <h1 className="max-w-[28ch] font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.15] text-navy">
            {t(`articles.${newsSlug}.title`)}
          </h1>
        </div>
      </section>

      <Section tone="white" width="read">
        <div className="relative mb-10 aspect-[16/10] w-full max-h-[360px] overflow-hidden bg-navy/10">
          <Image
            src={article.image}
            alt={t(`articles.${newsSlug}.alt`)}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          {body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="font-sans text-[17px] leading-[1.8] text-navy"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10">
          <NewsSourceLink href={article.sourceUrl} label={t("sourceCta")} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="cream">
          <p className="mb-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("hero.title")}
          </p>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/news/${item.slug}`}
                  className="group block"
                >
                  <h2 className="font-serif text-[1.35rem] font-light leading-snug text-navy transition-colors duration-micro ease-quart group-hover:text-gold">
                    {t(`articles.${item.slug}.title`)}
                  </h2>
                  <p className="mt-2 font-sans text-[15px] leading-relaxed text-text-muted">
                    {t(`articles.${item.slug}.excerpt`)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
