import Image from "next/image";
import type { ContactPin } from "@/lib/contact/pins";

export type MapPinSealProps = {
  pin: ContactPin;
  ariaLabel: string;
  /** Stagger index for CSS enter (0-based). */
  index: number;
};

/**
 * Square photo seal — entire box is a native outbound Maps link (RSC-safe).
 * Hover/focus: gold hairline + Card-style image zoom. No client JS.
 */
export function MapPinSeal({ pin, ariaLabel, index }: MapPinSealProps) {
  const labelSide = pin.labelSide;
  const delayMs = index * 50;

  return (
    <a
      href={pin.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="atlas-pin-enter group absolute z-10 block size-11 border border-border bg-beige outline-offset-2 transition-colors duration-micro ease-quart hover:border-gold focus-visible:border-gold md:size-12"
      style={{
        left: `${pin.leftPct}%`,
        top: `${pin.topPct}%`,
        transform: "translate(-50%, -50%)",
        animationDelay: `${delayMs}ms`,
      }}
    >
      <span className="relative block size-full overflow-hidden">
        <Image
          src={pin.thumbSrc}
          alt=""
          width={96}
          height={96}
          sizes="48px"
          className="size-full scale-105 object-cover transition-transform duration-image ease-quart group-hover:scale-[1.12] group-focus-visible:scale-[1.12] motion-reduce:transition-none motion-reduce:group-hover:scale-105 motion-reduce:group-focus-visible:scale-105"
        />
      </span>

      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-navy opacity-0 transition-opacity duration-struct ease-quart md:block md:group-hover:opacity-100 md:group-focus-visible:opacity-100",
          labelSide === "right" ? "left-full ml-2" : "right-full mr-2",
        ].join(" ")}
      >
        {pin.shortLabel}
      </span>
    </a>
  );
}
