import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Contact route — solid header region (like About / Businesses).
 * Text-only hero sits under the fixed header; no SubNav.
 */
export default async function ContactLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return <div className="pt-[var(--site-header-height)]">{children}</div>;
}
