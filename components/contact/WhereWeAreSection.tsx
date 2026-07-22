import { getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";
import { CONTACT_PINS, type ContactPinId } from "@/lib/contact/pins";
import { LocationsList, type LocationRowCopy } from "./LocationsList";
import { SilkRoadAtlas } from "./SilkRoadAtlas";

/**
 * Contact “Where we are” — Silk Road Atlas (M5 Direction A × M1 #1).
 * Server Component: cream section + dotted UZ plate + 4 hotel seals + list.
 * Mount below Contact hero / form: `<WhereWeAreSection />`.
 */
export async function WhereWeAreSection() {
  const t = await getTranslations("contact.whereWeAre");

  const pinAria = Object.fromEntries(
    CONTACT_PINS.map((pin) => [pin.id, t(`pins.${pin.id}.aria`)]),
  ) as Record<ContactPinId, string>;

  const rows = Object.fromEntries(
    CONTACT_PINS.map((pin) => [
      pin.id,
      {
        name: t(`pins.${pin.id}.name`),
        city: t(`pins.${pin.id}.city`),
        aria: t(`pins.${pin.id}.aria`),
      } satisfies LocationRowCopy,
    ]),
  ) as Record<ContactPinId, LocationRowCopy>;

  return (
    <Section tone="cream" width="wide" id="where-we-are">
      <header className="mb-10 max-w-[52ch]">
        <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
          {t("kicker")}
        </p>
        <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
          {t("title")}
        </h2>
        <p className="mt-4 font-sans text-[16px] leading-[1.75] text-text-muted">
          {t("supporting")}
        </p>
      </header>

      <SilkRoadAtlas
        citySamarkand={t("cities.samarkand")}
        cityTashkent={t("cities.tashkent")}
        pinAria={pinAria}
      />

      <LocationsList heading={t("listHeading")} rows={rows} />
    </Section>
  );
}
