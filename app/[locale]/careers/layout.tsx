import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Careers route group — listing + job detail.
 * Header stays solid on this section (see Header onInteriorSection).
 */
export default async function CareersLayout({
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

  return (
    <div className="pt-[var(--site-header-height)]">{children}</div>
  );
}
