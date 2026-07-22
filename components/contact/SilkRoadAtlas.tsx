import {
  UZBEKISTAN_ATLAS_CITIES,
  UZBEKISTAN_ATLAS_PATHS,
  UZBEKISTAN_ATLAS_VIEWBOX,
} from "@/lib/contact/uzbekistanPaths";
import { CONTACT_PINS, type ContactPinId } from "@/lib/contact/pins";
import { MapPinSeal } from "./MapPinSeal";

export type SilkRoadAtlasProps = {
  citySamarkand: string;
  cityTashkent: string;
  pinAria: Record<ContactPinId, string>;
};

/**
 * Cream/beige dotted Uzbekistan atlas — land silhouette from public ISO UZ
 * boundary data (equirectangular), square photo seals at geo-derived positions.
 * Pure RSC — no Maps JS / MapLibre / WebGL.
 */
export function SilkRoadAtlas({
  citySamarkand,
  cityTashkent,
  pinAria,
}: SilkRoadAtlasProps) {
  const samarkand = UZBEKISTAN_ATLAS_CITIES.samarkand;
  const tashkent = UZBEKISTAN_ATLAS_CITIES.tashkent;

  return (
    <div className="relative mx-auto w-full max-h-[75vh] max-w-[1200px] overflow-hidden border border-border bg-beige aspect-[3/2] md:aspect-[16/10]">
      <SilkRoadAtlasSvg />

      {/* City micro-labels — placed from real lon/lat projection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted md:text-[11px]"
        style={{
          left: `${samarkand.leftPct}%`,
          top: `${Math.max(8, samarkand.topPct - 8)}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        {citySamarkand}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted md:text-[11px]"
        style={{
          left: `${tashkent.leftPct}%`,
          top: `${Math.max(8, tashkent.topPct - 8)}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        {cityTashkent}
      </span>

      {CONTACT_PINS.map((pin, index) => (
        <MapPinSeal
          key={pin.id}
          pin={pin}
          ariaLabel={pinAria[pin.id]}
          index={index}
        />
      ))}
    </div>
  );
}

function SilkRoadAtlasSvg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={UZBEKISTAN_ATLAS_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="atlas-dot-field"
          x="0"
          y="0"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.7" fill="#5A6570" fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="1200" height="750" fill="url(#atlas-dot-field)" />

      {/* Neighbor hints — faint arcs only, not fake borders */}
      <g
        fill="none"
        stroke="#5A6570"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeDasharray="1.5 4"
        strokeLinejoin="round"
      >
        <path d="M80 120 C280 70, 520 55, 780 90" />
        <path d="M60 420 C200 520, 360 580, 520 620" />
        <path d="M980 180 C1080 220, 1140 300, 1160 400" />
      </g>

      <g
        className="atlas-land"
        fill="#FBF8F3"
        fillOpacity="0.9"
        stroke="#2A2B4E"
        strokeOpacity="0.38"
        strokeWidth="1.2"
        strokeDasharray="2.5 3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {UZBEKISTAN_ATLAS_PATHS.map((d, i) => (
          <path key={`uz-ring-${i}`} d={d} />
        ))}
      </g>
    </svg>
  );
}
