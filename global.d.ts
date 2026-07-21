import type messages from "./messages/en.json";
import type { routing } from "./i18n/routing";

// Type-safe next-intl: message keys and locales are inferred from the source
// catalog and routing config. See https://next-intl.dev/docs/workflows/typescript
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
    Locale: (typeof routing.locales)[number];
  }
}
