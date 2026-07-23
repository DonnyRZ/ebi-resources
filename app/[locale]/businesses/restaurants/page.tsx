import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Legacy restaurants line hub → Food & Beverage. */
export default async function RestaurantsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  redirect({ href: "/businesses/food-and-beverage", locale });
}
