import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Legacy Mecca restaurants route → F&B venue. */
export default async function MeccaRestaurantsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  redirect({ href: "/businesses/food-and-beverage/mecca", locale });
}
