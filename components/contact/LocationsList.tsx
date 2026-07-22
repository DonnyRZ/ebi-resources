import type { ContactPinId } from "@/lib/contact/pins";
import { CONTACT_PINS } from "@/lib/contact/pins";

export type LocationRowCopy = {
  name: string;
  city: string;
  aria: string;
};

export type LocationsListProps = {
  heading: string;
  rows: Record<ContactPinId, LocationRowCopy>;
};

/**
 * Always-visible text list under the atlas — primary on mobile, a11y duplicate on desktop.
 */
export function LocationsList({ heading, rows }: LocationsListProps) {
  return (
    <div className="mt-10">
      <h3 className="sr-only">{heading}</h3>
      <ul className="divide-y divide-border border-t border-border">
        {CONTACT_PINS.map((pin) => {
          const row = rows[pin.id];
          return (
            <li key={pin.id}>
              <a
                href={pin.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={row.aria}
                className="group flex min-h-11 items-center justify-between gap-4 py-3 outline-offset-2 transition-colors duration-micro ease-quart"
              >
                <span className="font-sans text-[15px] text-navy">
                  {row.name}
                  <span className="text-text-muted"> · {row.city}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold transition-colors duration-micro ease-quart group-hover:text-bronze"
                >
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
