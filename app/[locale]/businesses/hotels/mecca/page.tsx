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
    namespace: "businesses.hotels.properties.mecca",
  });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function MeccaHotelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.hotels.properties.mecca");
  const d = await getTranslations("businesses.hotels.propertyDetail");
  const a = await getTranslations("a11y");

  const highlightKeys = [
    "rooms",
    "indonesiaResto",
    "europeResto",
    "rooftop",
    "services",
    "rating",
  ] as const;

  return (
    <HotelPropertyPage
      scrollCueLabel={a("scrollDown")}
      hero={{
        kicker: t("hero.kicker"),
        title: t("hero.title"),
        supporting: t("hero.supporting"),
        image: {
          src: "/images/mecca/facade-dusk.jpg",
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
        variant: "strip",
        images: [
          { src: "/images/mecca/facade-boulevard.jpg", alt: t("alt.g1") },
          { src: "/images/mecca/lobby.jpg", alt: t("alt.g2") },
          { src: "/images/mecca/dining.jpg", alt: t("alt.g3") },
          // Finished winter rooftop — unfinished rooftop-terrace.jpg removed.
          { src: "/images/mecca/rooftop-winter.jpg", alt: t("alt.g4") },
        ],
      }}
      contact={{
        kicker: d("contactKicker"),
        title: d("contactTitle"),
        details: {
          toBeProvided: t("contact.toBeProvided"),
          websiteHref: "https://mecca-hotel.com",
          websiteLabel: d("visitWebsite"),
          websiteNote: d("websiteNote"),
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
