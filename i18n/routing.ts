import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config — single source of truth for supported locales.
 * EN is the default (English-first), ID is the secondary locale.
 */
export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
