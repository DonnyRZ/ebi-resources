/**
 * Contact “Where we are” pin data — phase-1 hotels only.
 * Maps URLs from `.audit-tmp/map/pins.json` (M2). Plate % from
 * `uzbekistanPaths.ts` equirectangular projection of ISO UZ boundaries.
 * Samarkand-area seals share one locale — slight visual fan so they don’t stack.
 * Phase-2 `seven-oz-city-park` omitted until Product asks.
 */

import { UZBEKISTAN_ATLAS_CITIES } from "@/lib/contact/uzbekistanPaths";

export type ContactPinId =
  | "hadith"
  | "kampoeng-indonesia"
  | "graha-nusantara"
  | "mecca";

export type ContactPin = {
  id: ContactPinId;
  /** Brand-Latin short label for desktop micro (UPPERCASE in UI). */
  shortLabel: string;
  googleMapsUrl: string;
  thumbSrc: string;
  /** Stage position as % of atlas plate (geo-projected). */
  leftPct: number;
  topPct: number;
  /** Micro-label side so seals near the right edge stay on-plate. */
  labelSide: "left" | "right";
};

const hadith = UZBEKISTAN_ATLAS_CITIES.hadith;
const mecca = UZBEKISTAN_ATLAS_CITIES.mecca;

export const CONTACT_PINS: readonly ContactPin[] = [
  {
    id: "hadith",
    shortLabel: "Hadith",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=39.8149986,66.9444850",
    thumbSrc: "/images/hadith/facade-night-landscape.jpg",
    leftPct: hadith.leftPct,
    topPct: hadith.topPct,
    labelSide: "left",
  },
  {
    id: "kampoeng-indonesia",
    shortLabel: "Kampoeng",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel%20Kampoeng%20Indonesia%20Shokh%20street%2034%20Khuja%20Ismoil%20Payariq%20Samarkand%20Uzbekistan",
    thumbSrc: "/images/kampoeng-indonesia/facade-day.jpg",
    // Fan SE of Hadith cluster (same Imam Al-Bukhari locale)
    leftPct: hadith.leftPct + 3.2,
    topPct: hadith.topPct + 4.5,
    labelSide: "right",
  },
  {
    id: "graha-nusantara",
    shortLabel: "Graha",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=RW7X%2B297%20Xo%CA%BBja%20Ismoil%2C%20Uzbekistan",
    thumbSrc: "/images/graha-nusantara/exterior-day.jpg",
    // Fan SW of Hadith cluster
    leftPct: hadith.leftPct - 3.5,
    topPct: hadith.topPct + 5,
    labelSide: "left",
  },
  {
    id: "mecca",
    shortLabel: "Mecca",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Islamic+Civilization+Centre+Tashkent",
    thumbSrc: "/images/mecca/facade-boulevard.jpg",
    leftPct: mecca.leftPct,
    topPct: mecca.topPct,
    labelSide: "left",
  },
] as const;
