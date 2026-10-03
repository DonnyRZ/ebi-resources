import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

// Keep this aligned with the public production domain, including in build environments.
const configuredUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://ebiresources.com",
);
if (!["http:", "https:"].includes(configuredUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP or HTTPS URL.");
}
export const SITE_URL = configuredUrl.origin;
export const BRAND_NAME = "EBI Resources";
export const BRAND_LOGO = "/images/brand/ebi-resources-logo.png";
export const SOCIAL_IMAGE = "/images/brand/ebi-resources-social.png";

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function localizedUrl(locale: Locale, path = ""): string {
  return absoluteUrl(`/${locale}${path === "/" ? "" : path}`);
}

export function languageAlternates(path = ""): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    ),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

type PageMetadataOptions = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  article?: { publishedTime: string };
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = SOCIAL_IMAGE,
  imageAlt = BRAND_NAME,
  article,
}: PageMetadataOptions): Metadata {
  const url = localizedUrl(locale, path);
  const socialImage = {
    url: absoluteUrl(image),
    alt: imageAlt,
    ...(image === SOCIAL_IMAGE ? { width: 1200, height: 630 } : {}),
  };
  const social = {
    title,
    description,
    url,
    siteName: BRAND_NAME,
    locale: { en: "en_GB", uz: "uz_UZ", ru: "ru_RU" }[locale],
    alternateLocale: routing.locales
      .filter((language) => language !== locale)
      .map((language) => ({ en: "en_GB", uz: "uz_UZ", ru: "ru_RU" })[language]),
    images: [socialImage],
  };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: article
      ? { ...social, type: "article", publishedTime: article.publishedTime }
      : { ...social, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: imageAlt }],
    },
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: BRAND_NAME,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_LOGO),
      contentUrl: absoluteUrl(BRAND_LOGO),
      width: 1774,
      height: 887,
      caption: BRAND_NAME,
    },
    email: "secretary@ebiresources.com",
    telephone: "+62 21 3062 9515",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Complex of Imam Al Bukhari",
      addressLocality: "Samarkand",
      addressCountry: "UZ",
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: BRAND_NAME,
    url: absoluteUrl("/"),
    inLanguage: [...routing.locales],
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
