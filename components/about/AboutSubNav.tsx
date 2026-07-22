"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * About secondary nav — quiet luxury hairline strip (DESIGN.md §3.1 language).
 * Uppercase 12px tracking; active item = gold + underline.
 */
const ITEMS = [
  { key: "overview", href: "/about" },
  { key: "visionMission", href: "/about/vision-mission" },
  { key: "board", href: "/about/board" },
] as const;

export function AboutSubNav() {
  const t = useTranslations("about.subnav");
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className="border-b border-border bg-white"
    >
      <div className="mx-auto flex max-w-wide flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 md:px-6">
        {ITEMS.map((item) => {
          const active =
            item.href === "/about"
              ? pathname === "/about"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
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
