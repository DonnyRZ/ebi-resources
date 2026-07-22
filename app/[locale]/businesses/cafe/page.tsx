import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CafeBrandPage } from "@/components/businesses/CafeBrandPage";

/**
 * Café line — Pattern B: single brand page for 7OZ Espresso at `/businesses/cafe`.
 * No child `/7oz` route; structure nests 7oz under Café as content, not a separate hub.
 *
 * Hero uses finished rooftop craft (seven-oz/rooftop-sunset.jpg, ~1.33) over
 * mecca/rooftop-terrace.jpg (unfinished storage/equipment). Gallery leads with
 * rooftop shots; café-interior (murals / identifiable barista) is omitted.
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
  const t = await getTranslations({ locale, namespace: "businesses.cafe" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function CafeLinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.cafe");
  const a = await getTranslations("a11y");

  const categoryKeys = [
    "espresso",
    "brew",
    "matchaChocolate",
    "tea",
    "refreshments",
    "juices",
  ] as const;

  return (
    <CafeBrandPage
      scrollCueLabel={a("scrollDown")}
      hero={{
        kicker: t("hero.kicker"),
        title: t("hero.title"),
        supporting: t("hero.supporting"),
        image: {
          src: "/images/seven-oz/rooftop-sunset.jpg",
          alt: t("alt.hero"),
        },
      }}
      brand={{
        kicker: t("brand.kicker"),
        title: t("brand.title"),
        body1: t("brand.body1"),
        body2: t("brand.body2"),
      }}
      placement={{
        kicker: t("placement.kicker"),
        title: t("placement.title"),
        body: t("placement.body"),
        note: t("placement.note"),
        meccaLabel: t("placement.meccaLabel"),
        meccaHref: "/businesses/hotels/mecca",
        restaurantsLabel: t("placement.restaurantsLabel"),
        restaurantsHref: "/businesses/restaurants/mecca",
      }}
      products={{
        kicker: t("products.kicker"),
        title: t("products.title"),
        intro: t("products.intro"),
        categories: categoryKeys.map((key) => ({
          title: t(`products.categories.${key}.title`),
          text: t(`products.categories.${key}.text`),
        })),
      }}
      location={{
        kicker: t("location.kicker"),
        title: t("location.title"),
        body: t("location.body"),
        address: t("location.address"),
        addressLabel: t("location.addressLabel"),
        identityLabel: t("location.identityLabel"),
        identityDetail: t("location.identityDetail"),
        heritageNote: t("location.heritageNote"),
      }}
      gallery={{
        kicker: t("gallery.kicker"),
        title: t("gallery.title"),
        images: [
          {
            src: "/images/seven-oz/rooftop-sunset.jpg",
            alt: t("alt.galleryRooftop"),
          },
          {
            src: "/images/mecca/rooftop-winter.jpg",
            alt: t("alt.galleryWinter"),
          },
          {
            src: "/images/mecca/facade-boulevard.jpg",
            alt: t("alt.galleryFacade"),
          },
        ],
      }}
      contact={{
        kicker: t("contact.kicker"),
        title: t("contact.title"),
        phone: t("contact.phone"),
        email: t("contact.email"),
        phoneLabel: t("contact.phoneLabel"),
        emailLabel: t("contact.emailLabel"),
        websiteHref: "https://7oz-espresso.com/",
        websiteLabel: t("contact.websiteLabel"),
        websiteNote: t("contact.websiteNote"),
      }}
      cta={{
        kicker: t("cta.kicker"),
        title: t("cta.title"),
        body: t("cta.body"),
        backLabel: t("cta.back"),
        partnerLabel: t("cta.partner"),
      }}
    />
  );
}
