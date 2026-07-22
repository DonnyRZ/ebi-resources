import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BusinessesSubNav } from "@/components/businesses/BusinessesSubNav";

/**
 * Our Businesses route group — hub + five lines + hotel property details.
 * Sub-nav mounts in layout for early prefetch; Header stays solid on this section.
 */
export default async function BusinessesLayout({
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
    <div className="pt-[var(--site-header-height)]">
      <BusinessesSubNav />
      {children}
    </div>
  );
}
