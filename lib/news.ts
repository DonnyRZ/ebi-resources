/**
 * News catalog — slugs, dates, and curated images.
 * Copy lives in messages (EN/UZ/RU). Do not render source host names in the UI.
 */

export const NEWS_SLUGS = [
  "gus-irfan-visits-hotel-kampoeng-indonesia",
  "hadith-hotel-soft-opening-samarkand",
  "hadith-hotel-near-imam-bukhari",
  "ambassador-meets-ceo-hadith-opening",
  "wahdah-islamiyah-visits-ebi-resources",
  "tabung-haji-chairman-hadith-hotel",
  "tabung-haji-four-hotels-uzbekistan",
  "hadith-hotel-hosts-ministers-islamic-forum",
  "hadith-hotel-official-accommodation-islamic-forum",
  "muzani-visits-hotel-kampoeng-indonesia",
  "kampoeng-indonesia-uzbekistan-national-certificate",
  "trade-vice-minister-visits-kampoeng-indonesia",
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
  {
    slug: "wahdah-islamiyah-visits-ebi-resources",
    publishedAt: "2026-07-22",
    image: "/images/news/wahdah-office-visit.jpg",
    sourceUrl:
      "https://egi-media.com/ketua-wahdah-islamiyah-kunjungi-egi-resources-bahas-investasi-dan-wisata-religi-uzbekistan/",
  },
  {
    slug: "tabung-haji-chairman-hadith-hotel",
    publishedAt: "2026-07-16",
    image: "/images/news/tabung-haji-chairman.jpg",
    sourceUrl:
      "https://egi-media.com/chairman-tabung-haji-malaysia-terkesan-dengan-hadith-hotel-egi-resources-jajaki-kerja-sama-wisata-religi-uzbekistan/",
  },
  {
    slug: "tabung-haji-four-hotels-uzbekistan",
    publishedAt: "2026-07-16",
    image: "/images/news/tabung-haji-four-hotels.jpg",
    sourceUrl:
      "https://egi-media.com/egi-resources-jajaki-kerja-sama-dengan-tabung-haji-malaysia-tawarkan-empat-hotel-di-uzbekistan/",
  },
  {
    slug: "hadith-hotel-hosts-ministers-islamic-forum",
    publishedAt: "2026-07-07",
    image: "/images/news/hadith-forum-ministers.jpg",
    sourceUrl:
      "https://egi-media.com/hadith-hotel-jadi-akomodasi-resmi-forum-islam-internasional-i-di-uzbekistan-tampung-delegasi-menteri-dari-7-negara/",
  },
  {
    slug: "hadith-hotel-official-accommodation-islamic-forum",
    publishedAt: "2026-07-06",
    image: "/images/news/hadith-forum-accommodation.jpg",
    sourceUrl:
      "https://egi-media.com/hadith-hotel-jadi-akomodasi-resmi-delegasi-forum-islam-internasional-di-uzbekistan-perkuat-posisi-investasi-indonesia-di-sektor-hospitality-premium/",
  },
  {
    slug: "muzani-visits-hotel-kampoeng-indonesia",
    publishedAt: "2026-07-04",
    image: "/images/news/muzani-kampoeng.jpg",
    sourceUrl:
      "https://egi-media.com/usai-ziarah-ke-makam-imam-bukhari-muzani-kunjungi-hotel-kampoeng-indonesia-di-samarkand/",
  },
  {
    slug: "kampoeng-indonesia-uzbekistan-national-certificate",
    publishedAt: "2026-06-25",
    image: "/images/news/kampoeng-certificate.jpg",
    sourceUrl:
      "https://egi-media.com/hotel-kampoeng-indonesia-samarkand-raih-sertifikat-kesesuaian-standar-nasional-uzbekistan/",
  },
  {
    slug: "trade-vice-minister-visits-kampoeng-indonesia",
    publishedAt: "2026-06-19",
    image: "/images/news/wamen-perdagangan-kampoeng.jpg",
    sourceUrl:
      "https://egi-media.com/wamen-perdagangan-dorong-ekspor-produk-ri-di-uzbekistan-hotel-kampoeng-indonesia-jadi-simbol-penguatan-bisnis/",
  },
];

export function isNewsSlug(slug: string): slug is NewsSlug {
  return (NEWS_SLUGS as readonly string[]).includes(slug);
}

export function getArticle(slug: string): NewsArticle | undefined {
  if (!isNewsSlug(slug)) return undefined;
  return ARTICLES.find((article) => article.slug === slug);
}

/** Newest first. */
export function getArticlesByDate(): NewsArticle[] {
  return [...ARTICLES].sort((a, b) => {
    const byDate = b.publishedAt.localeCompare(a.publishedAt);
    return byDate !== 0 ? byDate : a.slug.localeCompare(b.slug);
  });
}

/** Newest first; used on the homepage highlights strip. */
export function getLatestArticles(limit = 3): NewsArticle[] {
  return getArticlesByDate().slice(0, limit);
}

export function getRelatedArticles(slug: NewsSlug, limit = 2): NewsArticle[] {
  return getArticlesByDate()
    .filter((article) => article.slug !== slug)
    .slice(0, limit);
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
