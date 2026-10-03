import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { NEWS_SLUGS } from "@/lib/news";
import { JOB_SLUGS } from "@/lib/careers";
import { languageAlternates, localizedUrl } from "@/lib/seo";

// Actual content pages only; former property/venue URLs now redirect elsewhere.
const PAGE_PATHS = [
  "",
  "/about",
  "/about/vision-mission",
  "/about/board",
  "/businesses",
  "/businesses/hotels",
  "/businesses/food-and-beverage",
  "/businesses/travel",
  "/businesses/technology",
  "/news",
  "/careers",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...PAGE_PATHS,
    ...NEWS_SLUGS.map((slug) => `/news/${slug}`),
    ...JOB_SLUGS.map((slug) => `/careers/${slug}`),
  ];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
