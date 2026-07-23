"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Header — DESIGN.md §3.1 & §5.3.
 *
 * Transparent over the hero (white wordmark/nav) → solid on scroll past ~80px
 * (ivory background, hair border, subtle shadow, navy wordmark/nav), transition
 * `duration-struct ease-quart`. Serif text wordmark "EBI RESOURCES" (no logo
 * image, deferred). Locale-aware nav + EN/UZ/RU language toggle. Fixed/overlay so
 * it sits over the hero; a full-screen overlay drives mobile navigation.
 *
 * `overHero` (default true) lets interior pages without a hero start in the
 * solid state.
 */

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "businesses", href: "/businesses" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

/** Routes without built pages — skip prefetch to avoid wasted work / latency. */
const PREFETCH_OFF: readonly string[] = [];

export type HeaderProps = {
  /** True when the header overlays a hero and should start transparent. */
  overHero?: boolean;
  /** Scroll distance (px) after which the solid state engages. */
  threshold?: number;
};

export function Header({ overHero = true, threshold = 80 }: HeaderProps) {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /** Solid header on interior sections (About, Businesses, Careers, Contact). */
  const onInteriorSection =
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    pathname === "/businesses" ||
    pathname.startsWith("/businesses/") ||
    pathname === "/careers" ||
    pathname.startsWith("/careers/") ||
    pathname === "/contact" ||
    pathname.startsWith("/contact/");
  const effectiveOverHero = overHero && !onInteriorSection;

  useEffect(() => {
    if (!effectiveOverHero) return;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [effectiveOverHero, threshold]);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Close the overlay after navigating.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || !effectiveOverHero;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const shouldPrefetch = (href: string) => !PREFETCH_OFF.includes(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-struct ease-quart ${
        solid
          ? "border-b border-border bg-white text-navy shadow-hair"
          : "border-b border-transparent bg-transparent text-white"
      }`}
    >
      {/* Utility bar */}
      <div className="mx-auto flex max-w-wide items-center justify-between px-4 py-3 md:px-6">
        <div className="hidden flex-1 md:block">
          <Link
            href="/contact"
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-micro ease-quart hover:text-gold"
          >
            {tHeader("partner")}
          </Link>
        </div>

        <Link
          href="/"
          className="font-serif text-[18px] font-light uppercase tracking-[0.28em] md:flex-1 md:text-center"
          aria-label="EBI Resources — Home"
        >
          EBI Resources
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <LanguageToggle solid={solid} />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={tHeader("openMenu")}
            aria-expanded={menuOpen}
            className="md:hidden"
          >
            <BurgerIcon />
          </button>
        </div>
      </div>

      {/* Main nav (desktop) */}
      <nav
        aria-label="Primary"
        className="mx-auto hidden max-w-wide items-center justify-center gap-8 px-4 pb-3 md:flex md:px-6"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              prefetch={shouldPrefetch(item.href) ? undefined : false}
              aria-current={active ? "page" : undefined}
              className={`relative font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-micro ease-quart hover:text-gold ${
                active ? "text-gold" : ""
              }`}
            >
              {t(item.key)}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full bg-gold transition-transform duration-micro ease-quart ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {menuOpen && (
        <MobileMenu onClose={() => setMenuOpen(false)} isActive={isActive} />
      )}
    </header>
  );
}

function BurgerIcon() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-[5px]">
      <span className="block h-px w-6 bg-current" />
      <span className="block h-px w-6 bg-current" />
      <span className="block h-px w-6 bg-current" />
    </span>
  );
}

function LanguageToggle({ solid }: { solid: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-pressed={loc === locale}
            className={`transition-colors duration-micro ease-quart hover:text-gold ${
              loc === locale ? "text-gold" : solid ? "text-navy" : "text-white"
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

function MobileMenu({
  onClose,
  isActive,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white text-navy md:hidden">
      <div className="mx-auto flex w-full max-w-wide items-center justify-between px-4 py-3">
        <span className="font-serif text-[18px] font-light uppercase tracking-[0.28em]">
          EBI Resources
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={tHeader("closeMenu")}
          className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] hover:text-gold"
        >
          {tHeader("close")}
        </button>
      </div>
      <nav
        aria-label="Mobile"
        className="mx-auto flex w-full max-w-wide flex-1 flex-col justify-center gap-6 px-4"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              prefetch={
                PREFETCH_OFF.includes(item.href) ? false : undefined
              }
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`font-serif text-[28px] font-light uppercase tracking-[0.1em] transition-colors duration-micro ease-quart hover:text-gold ${
                active ? "text-gold" : ""
              }`}
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
