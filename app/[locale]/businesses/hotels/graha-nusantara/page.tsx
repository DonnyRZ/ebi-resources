import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { HotelPropertyPage } from "@/components/businesses/HotelPropertyPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({
    locale,
    namespace: "businesses.hotels.properties.graha",
  });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function GrahaNusantaraHotelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.hotels.properties.graha");
  const d = await getTranslations("businesses.hotels.propertyDetail");
  const a = await getTranslations("a11y");

  const highlightKeys = [
    "format",
    "dining",
    "amenities",
    "services",
  ] as const;

  const emails = t("contact.emails")
    .split("|")
    .map((e) => e.trim())
    .filter(Boolean);

  return (
    <HotelPropertyPage
      scrollCueLabel={a("scrollDown")}
      hero={{
        kicker: t("hero.kicker"),
        title: t("hero.title"),
        supporting: t("hero.supporting"),
        image: {
          src: "/images/graha-nusantara/exterior-day.jpg",
          alt: t("alt.hero"),
        },
      }}
      concept={{
        kicker: t("concept.kicker"),
        title: t("concept.title"),
        body1: t("concept.body1"),
        body2: t("concept.body2"),
      }}
      place={{
        kicker: t("place.kicker"),
        title: t("place.title"),
        body: t("place.body"),
        landmark: t("place.landmark"),
      }}
      highlights={{
        kicker: t("highlights.kicker"),
        title: t("highlights.title"),
        items: highlightKeys.map((key) => ({
          title: t(`highlights.${key}.title`),
          text: t(`highlights.${key}.text`),
        })),
      }}
      gallery={{
        kicker: d("galleryKicker"),
        title: d("galleryTitle"),
        variant: "editorial",
        images: [
          {
            src: "/images/graha-nusantara/villa-golden-hour.jpg",
            alt: t("alt.g1"),
          },
          {
            src: "/images/graha-nusantara/complex-night.jpg",
            alt: t("alt.g2"),
          },
          {
            src: "/images/graha-nusantara/compound-interior.jpg",
            alt: t("alt.g3"),
          },
          {
            src: "/images/graha-nusantara/exterior-day.jpg",
            alt: t("alt.g4"),
          },
        ],
      }}
      contact={{
        kicker: d("contactKicker"),
        title: d("contactTitle"),
        details: {
          address: t("contact.address"),
          phone: t("contact.phone"),
          emails,
          websiteHref: "https://grahanusantara-samarkand.com",
          websiteLabel: d("visitWebsite"),
          websiteNote: d("websiteNote"),
          toBeProvided: t("contact.toBeConfirmed"),
          phoneLabel: d("phone"),
          emailLabel: d("email"),
          addressLabel: d("address"),
        },
      }}
      cta={{
        kicker: d("ctaKicker"),
        title: d("ctaTitle"),
        body: d("ctaBody"),
        backLabel: d("back"),
        partnerLabel: d("partner"),
      }}
    />
  );
}
