import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { RestaurantVenuePage } from "@/components/businesses/RestaurantVenuePage";

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
    namespace: "businesses.restaurants.mecca",
  });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function MeccaRestaurantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.restaurants.mecca");
  const d = await getTranslations("businesses.restaurants.venueDetail");
  const a = await getTranslations("a11y");

  return (
    <RestaurantVenuePage
      scrollCueLabel={a("scrollDown")}
      hero={{
        kicker: t("hero.kicker"),
        title: t("hero.title"),
        supporting: t("hero.supporting"),
        image: {
          src: "/images/mecca/dining.jpg",
          alt: t("alt.hero"),
          // 1280×960 (1.33) — no wider Mecca dining master in Assets/public;
          // bias crop toward tables/chandeliers (not floor). Do not swap to bar-lounge.
          objectPosition: "center 38%",
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
      venues={{
        kicker: t("venues.kicker"),
        title: t("venues.title"),
        items: [
          {
            kicker: t("venues.indonesia.kicker"),
            title: t("venues.indonesia.title"),
            text: t("venues.indonesia.text"),
          },
          {
            kicker: t("venues.europe.kicker"),
            title: t("venues.europe.title"),
            text: t("venues.europe.text"),
          },
          {
            kicker: t("venues.rooftop.kicker"),
            title: t("venues.rooftop.title"),
            text: t("venues.rooftop.text"),
            linkHref: "/businesses/cafe",
            linkLabel: t("venues.rooftop.link"),
          },
        ],
      }}
      gallery={{
        kicker: d("galleryKicker"),
        title: d("galleryTitle"),
        images: [
          { src: "/images/mecca/dining.jpg", alt: t("alt.g1") },
          { src: "/images/mecca/lobby.jpg", alt: t("alt.g2") },
          // Finished winter rooftop — unfinished rooftop-terrace.jpg removed until a
          // finished terrace master exists.
          { src: "/images/mecca/rooftop-winter.jpg", alt: t("alt.g3") },
          { src: "/images/mecca/facade-boulevard.jpg", alt: t("alt.g4") },
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
      related={{
        kicker: t("related.kicker"),
        title: t("related.title"),
        body: t("related.body"),
        href: "/businesses/hotels/mecca",
        label: t("related.label"),
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
