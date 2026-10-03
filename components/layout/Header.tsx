"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Header — DESIGN.md §3.1 & §5.3.
 *
 * Transparent over the hero (white wordmark/nav) → solid on scroll past ~80px
 * (ivory background, hair border, subtle shadow, navy wordmark/nav), transition
 * `duration-struct ease-quart`. Uses the EBI Resources logo with a white variant
 * over full-bleed imagery. Locale-aware nav + EN/UZ/RU language toggle. Fixed/
 * overlay so it sits over the hero; a full-screen overlay drives mobile navigation.
 *
 * `overHero` (default true) lets interior pages without a hero start in the
 * solid state.
 */

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "businesses", href: "/businesses" },
  { key: "news", href: "/news" },
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
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  /** Solid header on interior sections (About, Businesses, News, Careers, Contact). */
  const onInteriorSection =
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    pathname === "/businesses" ||
    pathname.startsWith("/businesses/") ||
    pathname === "/news" ||
    pathname.startsWith("/news/") ||
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
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || !effectiveOverHero;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const shouldPrefetch = (href: string) => !PREFETCH_OFF.includes(href);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-colors duration-struct ease-quart ${
        solid
          ? "border-b border-border bg-white text-navy shadow-hair"
          : "border-b border-transparent bg-transparent text-white"
      }`}
    >
      {/* Utility bar */}
      <div className="mx-auto grid h-[67px] max-w-wide grid-cols-[44px_minmax(0,1fr)_44px] items-center px-5 lg:flex lg:h-[77px] lg:justify-between lg:px-6">
        <div className="hidden flex-1 lg:block">
          <Link
            href="/contact"
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-micro ease-quart hover:text-gold"
          >
            {tHeader("partner")}
          </Link>
        </div>

        <Link
          href="/"
          className="col-start-2 row-start-1 flex items-center justify-center lg:flex-1"
          aria-label="EBI Resources — Home"
        >
          <Image
            src="/images/brand/ebi-resources-logo.png"
            alt=""
            width={1774}
            height={887}
            sizes="(max-width: 1023px) 88px, 108px"
            className={`site-header__logo h-[44px] w-[88px] object-contain lg:h-[54px] lg:w-[108px] ${solid ? "" : "brightness-0 drop-shadow-sm invert"}`}
          />
        </Link>

        <div className="col-start-3 row-start-1 flex items-center justify-end lg:flex-1">
          <div className="hidden lg:block">
            <LanguageToggle solid={solid} />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={tHeader("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center transition-colors hover:bg-cream lg:hidden"
          >
            <BurgerIcon />
          </button>
        </div>
      </div>

      {/* Main nav (desktop) */}
      <nav
        aria-label="Primary"
        className="mx-auto hidden h-[30px] max-w-wide items-center justify-center gap-8 px-4 lg:flex lg:px-6"
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

      {menuOpen && <MobileMenu onClose={closeMenu} isActive={isActive} />}
    </header>
  );
}

function BurgerIcon() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LanguageToggle({
  solid,
  dropdown = false,
}: {
  solid: boolean;
  dropdown?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const tHeader = useTranslations("header");

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  if (dropdown) {
    return (
      <label className="block max-w-sm">
        <span className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
          {tHeader("language")}
        </span>
        <span className="relative block">
          <select
            value={locale}
            onChange={(event) => switchTo(event.target.value as Locale)}
            disabled={isPending}
            className="min-h-12 w-full appearance-none border border-border bg-white px-4 pr-12 font-sans text-base text-navy focus:border-gold"
          >
            <option value="en" lang="en">
              English
            </option>
            <option value="uz" lang="uz">
              O‘zbekcha
            </option>
            <option value="ru" lang="ru">
              Русский
            </option>
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </label>
    );
  }

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
            className={`min-h-11 min-w-[32px] transition-colors duration-micro ease-quart hover:text-gold ${
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
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const items = menuRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), select:not([disabled])",
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (opener?.isConnected) opener.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label={tHeader("openMenu")}
      className="mobile-menu fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white text-navy lg:hidden"
    >
      <div className="sticky top-0 z-10 mx-auto grid h-[68px] w-full max-w-wide grid-cols-[44px_minmax(0,1fr)_44px] items-center border-b border-border bg-white px-5">
        <span className="col-start-2 row-start-1 flex justify-center">
          <Image
            src="/images/brand/ebi-resources-logo.png"
            alt="EBI Resources"
            width={1774}
            height={887}
            sizes="88px"
            className="h-[44px] w-[88px] object-contain"
          />
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={tHeader("closeMenu")}
          className="col-start-3 row-start-1 flex h-11 w-11 items-center justify-center transition-colors hover:bg-cream"
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="m5 5 14 14M19 5 5 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <nav
        aria-label="Mobile"
        className="mx-auto flex w-full max-w-wide flex-1 flex-col justify-center gap-3 px-6 py-8"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              prefetch={PREFETCH_OFF.includes(item.href) ? false : undefined}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`py-2 font-serif text-[clamp(1.4rem,6vw,1.75rem)] font-light leading-tight transition-colors duration-micro ease-quart hover:text-gold ${
                active ? "text-gold" : ""
              }`}
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border px-6 py-6">
        <LanguageToggle solid dropdown />
      </div>
    </div>
  );
}
