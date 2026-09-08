/**
 * News catalog — slugs, dates, and curated images.
 * Copy lives in messages (EN/UZ/RU). Do not render source host names in the UI.
 */

export const NEWS_SLUGS = [
  "gus-irfan-visits-hotel-kampoeng-indonesia",
  "hadith-hotel-soft-opening-samarkand",
  "hadith-hotel-near-imam-bukhari",
  "ambassador-meets-ceo-hadith-opening",
] as const;

export type NewsSlug = (typeof NEWS_SLUGS)[number];

export type NewsArticle = {
  slug: NewsSlug;
  publishedAt: string;
  image: string;
  sourceUrl: string;
};

export const ARTICLES: NewsArticle[] = [
  {
    slug: "gus-irfan-visits-hotel-kampoeng-indonesia",
    publishedAt: "2026-09-05",
    image: "/images/news/kampoeng-gus-irfan.jpg",
    sourceUrl:
      "https://egi-media.com/gus-irfan-kunjungi-hotel-kampoeng-indonesia-samarkand/",
  },
  {
    slug: "hadith-hotel-soft-opening-samarkand",
    publishedAt: "2026-09-05",
    image: "/images/news/hadith-soft-opening.jpg",
    sourceUrl:
      "https://egi-media.com/egi-resources-tancapkan-jejak-global-hadith-hotel-resmi-soft-opening-di-samarkand/",
  },
  {
    slug: "hadith-hotel-near-imam-bukhari",
    publishedAt: "2026-09-05",
    image: "/images/news/hadith-imam-bukhari.jpg",
    sourceUrl:
      "https://egi-media.com/egi-resources-soft-opening-hadith-hotel-samarkand-uzbekistan/",
  },
  {
    slug: "ambassador-meets-ceo-hadith-opening",
    publishedAt: "2026-08-31",
    image: "/images/news/ambassador-ceo-meeting.jpg",
    sourceUrl:
      "https://egi-media.com/egi-resources-investasi-uzbekistan-peresmian-hotel-hadith-kerja-sama-indonesia-uzbekistan/",
  },
];

export function isNewsSlug(slug: string): slug is NewsSlug {
  return (NEWS_SLUGS as readonly string[]).includes(slug);
}

export function getArticle(slug: string): NewsArticle | undefined {
  if (!isNewsSlug(slug)) return undefined;
  return ARTICLES.find((article) => article.slug === slug);
}

const DATE_LOCALES: Record<string, string> = {
  en: "en-GB",
  uz: "uz-Latn",
  ru: "ru-RU",
};

export function formatNewsDate(isoDate: string, locale: string): string {
  const tag = DATE_LOCALES[locale] ?? "en-GB";
  return new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));
}
