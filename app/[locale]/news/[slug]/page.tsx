import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/Section";
import { NewsSourceLink } from "@/components/news/NewsSourceLink";
import { StructuredData } from "@/components/StructuredData";
import {
  absoluteUrl,
  localizedUrl,
  organizationSchema,
  pageMetadata,
} from "@/lib/seo";
import {
  NEWS_SLUGS,
  formatNewsDate,
  getArticle,
  getRelatedArticles,
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
  return pageMetadata({
    locale,
    path: `/news/${article.slug}`,
    title: `${t(`articles.${article.slug}.title`)} — EBI Resources`,
    description: t(`articles.${article.slug}.excerpt`),
    image: article.image,
    imageAlt: t(`articles.${article.slug}.alt`),
    article: { publishedTime: article.publishedAt },
  });
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
  const gallery = article.gallery ?? [];
  const galleryAlts = gallery.length
    ? (t.raw(`articles.${newsSlug}.galleryAlt`) as string[])
    : [];
  const related = getRelatedArticles(newsSlug, 2);

  return (
    <main>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "@id": `${localizedUrl(locale, `/news/${newsSlug}`)}#article`,
          mainEntityOfPage: localizedUrl(locale, `/news/${newsSlug}`),
          headline: t(`articles.${newsSlug}.title`),
          description: t(`articles.${newsSlug}.excerpt`),
          image: [article.image, ...(article.gallery ?? [])].map(absoluteUrl),
          datePublished: article.publishedAt,
          inLanguage: locale,
          publisher: organizationSchema(),
          ...(article.sourceUrl ? { isBasedOn: article.sourceUrl } : {}),
        }}
      />
      <section className="border-b border-border bg-cream">
        <div className="mx-auto max-w-wide px-4 py-12 md:px-6 md:py-16">
          <Link
            href="/news"
            className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-micro ease-quart hover:text-bronze"
          >
            ← {t("back")}
          </Link>
          <p className="mb-3 mt-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
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
        <div
          className={`relative mb-10 w-full overflow-hidden bg-navy/10 ${
            article.imageAspect === "square"
              ? "mx-auto aspect-square max-w-[560px]"
              : article.imageAspect === "photo"
                ? "mx-auto aspect-[4/3] max-w-[800px]"
                : "aspect-[16/10] max-h-[360px]"
          }`}
        >
          <Image
            src={article.image}
            alt={t(`articles.${newsSlug}.alt`)}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            className={
              article.imageAspect === "photo"
                ? "object-contain"
                : "object-cover"
            }
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
        {gallery.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <figure
                key={image}
                className="relative aspect-[4/3] overflow-hidden bg-cream"
              >
                <Image
                  src={image}
                  alt={galleryAlts[index] ?? t(`articles.${newsSlug}.alt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                />
              </figure>
            ))}
          </div>
        )}
        {article.sourceUrl && (
          <div className="mt-10">
            <NewsSourceLink href={article.sourceUrl} label={t("sourceCta")} />
          </div>
        )}
      </Section>

      {related.length > 0 && (
        <Section tone="cream">
          <p className="mb-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {t("hero.title")}
          </p>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="group block">
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
