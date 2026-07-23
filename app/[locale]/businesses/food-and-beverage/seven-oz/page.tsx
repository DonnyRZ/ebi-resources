import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { CafeBrandPage } from "@/components/businesses/CafeBrandPage";

/**
 * 7OZ Espresso — F&B brand page. Confirmed outlets: Mecca (Tashkent) and
 * Hadith (Samarkand). Hero leads with Mecca rooftop craft photography.
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

export default async function SevenOzFnBPage({
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
        outlets: [
          {
            detail: t("placement.outlets.mecca.detail"),
            label: t("placement.outlets.mecca.label"),
            href: "/businesses/hotels/mecca",
          },
          {
            detail: t("placement.outlets.hadith.detail"),
            label: t("placement.outlets.hadith.label"),
            href: "/businesses/hotels/hadith",
          },
          {
            detail: t("placement.outlets.meccaDining.detail"),
            label: t("placement.outlets.meccaDining.label"),
            href: "/businesses/food-and-beverage/mecca",
          },
        ],
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
            src: "/images/hadith/bar-lounge.jpg",
            alt: t("alt.galleryHadith"),
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
        backHref: "/businesses/food-and-beverage",
      }}
    />
  );
}
