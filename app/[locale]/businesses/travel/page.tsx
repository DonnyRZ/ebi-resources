import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { LineStub } from "@/components/businesses/LineStub";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "businesses.travel" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TravelLinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("businesses.travel");
  const a = await getTranslations("a11y");
  const common = await getTranslations("common");
  const shared = await getTranslations("businesses.shared");

  return (
    <LineStub
      kicker={t("hero.kicker")}
      title={t("hero.title")}
      supporting={t("hero.supporting")}
      scrollCueLabel={a("scrollDown")}
      badge={common("comingSoon")}
      body={t("body")}
      backLabel={shared("backToHub")}
    />
  );
}
