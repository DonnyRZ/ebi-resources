/** Approved image revision catalog, audited against revisi-gambar on 10 October 2026.
 * Shared photographs use the same versioned asset throughout the site.
 * Alt keys are localized under home.alt (EN/UZ/RU). See IMAGE-REVISIONS.md.
 */
export const REVISED_MEDIA = {
  hadithSunset: {
    src: "/images/portfolio/2026-10/hadith-sunset.webp",
    width: 1672,
    height: 941,
    altKey: "hadithGolden",
  },
  kampoengFacade: {
    src: "/images/portfolio/2026-10/kampoeng-facade.webp",
    width: 1920,
    height: 1280,
    altKey: "kampoengFacadeDaylight",
  },
  sevenOzTerrace: {
    src: "/images/portfolio/2026-10/sevenoz-terrace.webp",
    width: 1448,
    height: 1086,
    altKey: "sevenOzTerrace",
  },
  sajiDining: {
    src: "/images/portfolio/2026-10/saji-nusantara-dining.webp",
    width: 1672,
    height: 941,
    altKey: "sajiDining",
  },
  suiteLounge: {
    src: "/images/portfolio/2026-10/suite-lounge.webp",
    width: 1672,
    height: 941,
    altKey: "suiteLounge",
  },
  balcony: {
    src: "/images/portfolio/2026-10/hotel-balcony.webp",
    width: 1536,
    height: 1024,
    altKey: "hotelBalcony",
  },
  kampoengAtrium: {
    src: "/images/portfolio/2026-10/kampoeng-dining-atrium.webp",
    width: 1672,
    height: 941,
    altKey: "kampoengDining",
  },
  pool: {
    src: "/images/portfolio/2026-10/indoor-pool.webp",
    width: 1672,
    height: 941,
    altKey: "indoorPool",
  },
  hammam: {
    src: "/images/portfolio/2026-10/hammam.webp",
    width: 1674,
    height: 940,
    altKey: "hammam",
  },
  bedroom: {
    src: "/images/portfolio/2026-10/guest-bedroom.webp",
    width: 1672,
    height: 941,
    altKey: "guestBedroom",
  },
  roomDetails: {
    src: "/images/portfolio/2026-10/guest-room-details.webp",
    width: 1448,
    height: 1086,
    altKey: "guestRoomDetails",
  },
  privateDining: {
    src: "/images/portfolio/2026-10/private-dining.webp",
    width: 1674,
    height: 940,
    altKey: "privateDining",
  },
  hadithNight: {
    src: "/images/portfolio/2026-10/hadith-night.webp",
    width: 1672,
    height: 941,
    altKey: "hadithExterior",
  },
  kampoengWide: {
    src: "/images/portfolio/2026-10/kampoeng-wide-facade.webp",
    width: 1920,
    height: 1280,
    altKey: "kampoengFacadeDaylight",
  },
  coffeeInterior: {
    src: "/images/portfolio/2026-10/coffee-interior.webp",
    width: 1672,
    height: 941,
    altKey: "sevenOzInterior",
  },
  loungeInterior: {
    src: "/images/portfolio/2026-10/lounge-interior.webp",
    width: 1448,
    height: 1086,
    altKey: "hadithLounge",
  },
} as const;

export const HOME_HERO_ITEMS = [
  { image: REVISED_MEDIA.hadithSunset, copyKey: "hadith" },
  { image: REVISED_MEDIA.kampoengFacade, copyKey: "kampoeng" },
  { image: REVISED_MEDIA.sevenOzTerrace, copyKey: "cafe" },
  { image: REVISED_MEDIA.sajiDining, copyKey: "dining" },
  { image: REVISED_MEDIA.suiteLounge, copyKey: "suite" },
  { image: REVISED_MEDIA.balcony, copyKey: "balcony" },
  { image: REVISED_MEDIA.kampoengAtrium, copyKey: "kampoengDining" },
  { image: REVISED_MEDIA.pool, copyKey: "pool" },
  { image: REVISED_MEDIA.hammam, copyKey: "hammam" },
  { image: REVISED_MEDIA.bedroom, copyKey: "bedroom" },
  { image: REVISED_MEDIA.roomDetails, copyKey: "roomDetails" },
  { image: REVISED_MEDIA.privateDining, copyKey: "privateDining" },
] as const;

export const ABOUT_HERO_IMAGES = [
  REVISED_MEDIA.hadithNight,
  REVISED_MEDIA.kampoengWide,
  REVISED_MEDIA.sevenOzTerrace,
  REVISED_MEDIA.kampoengAtrium,
] as const;

export const BUSINESS_HERO_IMAGES = [
  REVISED_MEDIA.hadithSunset,
  REVISED_MEDIA.kampoengFacade,
  REVISED_MEDIA.sevenOzTerrace,
  REVISED_MEDIA.sajiDining,
  REVISED_MEDIA.coffeeInterior,
] as const;

export const HOTEL_HERO_IMAGES = [
  REVISED_MEDIA.hadithSunset,
  REVISED_MEDIA.kampoengFacade,
] as const;

export const FNB_HERO_IMAGES = [
  REVISED_MEDIA.sajiDining,
  REVISED_MEDIA.sevenOzTerrace,
  REVISED_MEDIA.coffeeInterior,
  REVISED_MEDIA.loungeInterior,
  REVISED_MEDIA.kampoengAtrium,
] as const;
