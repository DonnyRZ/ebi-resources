import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config — single source of truth for supported locales.
 * EN is the default (English-first); UZ (Uzbek, Latin) and RU (Russian) are additional.
 */
export const routing = defineRouting({
  locales: ["en", "uz", "ru"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
