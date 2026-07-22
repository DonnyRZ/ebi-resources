import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AboutSubNav } from "@/components/about/AboutSubNav";

/**
 * About EBI route group — Pattern B (no thin hub).
 * Sub-nav mounts early in the layout; Header stays solid on About.
 */
export default async function AboutLayout({
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
      <AboutSubNav />
      {children}
    </div>
  );
}
