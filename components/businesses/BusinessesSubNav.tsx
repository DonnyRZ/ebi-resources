"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Our Businesses secondary nav — same quiet-luxury strip language as AboutSubNav.
 * Overview = hub; remaining items = four business lines (F&B merges restaurants + café).
 */
const ITEMS = [
  { key: "overview", href: "/businesses" },
  { key: "hotels", href: "/businesses/hotels" },
  { key: "fnb", href: "/businesses/food-and-beverage" },
  { key: "travel", href: "/businesses/travel" },
  { key: "technology", href: "/businesses/technology" },
] as const;

export function BusinessesSubNav() {
  const t = useTranslations("businesses.subnav");
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className="border-b border-border bg-white"
    >
      <div className="mx-auto flex max-w-wide flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 md:px-6">
        {ITEMS.map((item) => {
          const active =
            item.href === "/businesses"
              ? pathname === "/businesses"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              prefetch={false}
              aria-current={active ? "page" : undefined}
              className={`relative font-sans text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-micro ease-quart hover:text-gold ${
                active ? "text-gold" : "text-navy"
              }`}
            >
              {t(item.key)}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-px w-full bg-gold transition-transform duration-micro ease-quart ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
