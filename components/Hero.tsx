"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Hero — DESIGN.md §3.4 Varian A (full-bleed media + scrim).
 *
 * A flexible media slot (image OR video) that renders cleanly with NO media yet
 * (token placeholder). A restrained text block sits bottom-left (~40–50% width):
 * kicker + serif headline + one supporting line + a primary CTA (+ optional
 * secondary). Height ~85–100vh with a scroll cue. Respects reduced motion.
 *
 * The rotating showcase variant lives in `HeroCarousel`, which composes the same
 * `HeroSlide` content type.
 */

export type HeroCta = { label: string; href: string };

export type HeroMedia =
  | { type: "image"; src: string; alt: string; objectPosition?: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

export type HeroSlideContent = {
  kicker?: string;
  title: string;
  supporting?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  media?: HeroMedia;
};

export type HeroProps = HeroSlideContent & {
  /** CSS height, e.g. "90vh" or "100vh". Defaults to "90vh". */
  height?: string;
  /** CSS min-height. Defaults to "560px"; interior pages may use a lower floor. */
  minHeight?: string;
  showScrollCue?: boolean;
  scrollCueLabel?: string;
  className?: string;
  /**
   * When true (default), reserve top padding for a transparent header over the
   * hero. Interior pages under a solid header + SubNav should pass false.
   */
  overlayHeader?: boolean;
};

/** Full-bleed media (image, video, or token placeholder) with a base ken-burns scale. */
export function HeroMediaLayer({
  media,
  priority = false,
  active = true,
}: {
  media?: HeroMedia;
  priority?: boolean;
  active?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const kenBurns = active ? "scale-105" : "scale-100";

  if (!media) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-footer"
      />
    );
  }

  if (media.type === "video") {
    // Under reduced motion, fall back to the poster still (no autoplay).
    if (reducedMotion) {
      return media.poster ? (
        <Image
          src={media.poster}
          alt={media.alt ?? ""}
          fill
          priority={priority}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-footer"
        />
      );
    }
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${kenBurns}`}
        autoPlay
        muted
        loop
        playsInline
        poster={media.poster}
        aria-label={media.alt}
      >
        <source src={media.src} />
      </video>
    );
  }

  const objectPosition = media.objectPosition;

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      sizes="100vw"
      className={`${kenBurns} object-cover`}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}

/** Scrim + bottom-left text block. Shared by Hero and HeroCarousel. */
export function HeroContent({
  kicker,
  title,
  supporting,
  primaryCta,
  secondaryCta,
  active = true,
  overlayHeader = true,
}: HeroSlideContent & { active?: boolean; overlayHeader?: boolean }) {
  const topPad = overlayHeader ? "pt-24 md:pt-32" : "pt-10 md:pt-12";

  return (
    <div
      className={`relative z-10 flex h-full flex-col justify-end ${topPad}`}
    >
      <div className="mx-auto w-full max-w-wide px-4 pb-14 md:px-6 md:pb-16">
        <div className="max-w-full md:max-w-[50%]">
          {kicker && (
            <p
              className={`mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-opacity duration-struct ease-quart ${active ? "opacity-100" : "opacity-0"}`}
            >
              {kicker}
            </p>
          )}
          {/* Always a real h1 — animate visibility with opacity only (never swap to <p>). */}
          <h1
            className={`font-serif text-[clamp(2rem,5vw,3.25rem)] font-light leading-[1.15] text-white transition-opacity duration-struct ease-quart ${active ? "opacity-100" : "opacity-0"}`}
          >
            {title}
          </h1>
          {supporting && (
            <p
              className={`mt-4 max-w-[46ch] font-sans text-[16px] leading-relaxed text-white/85 transition-opacity duration-struct ease-quart ${active ? "opacity-100" : "opacity-0"}`}
            >
              {supporting}
            </p>
          )}
          {active && (primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {primaryCta && (
                <Button variant="filled" tone="light" href={primaryCta.href}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" tone="light" href={secondaryCta.href}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Bottom-center scroll cue chevron. */
export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="animate-bounce text-2xl leading-none text-white/80 motion-reduce:animate-none"
      >
        &#8964;
      </span>
    </div>
  );
}

export function Hero({
  kicker,
  title,
  supporting,
  primaryCta,
  secondaryCta,
  media,
  height = "90vh",
  minHeight = "560px",
  showScrollCue = true,
  scrollCueLabel = "Scroll down",
  className = "",
  overlayHeader = true,
}: HeroProps) {
  // Start entered so SSR / first paint always exposes a visible h1.
  // Soft fade still applies on client remounts when reduced motion is off.
  const [entered, setEntered] = useState(true);
  useEffect(() => {
    // Re-affirm visible after hydration; keeps carousel-style opacity class stable.
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`.trim()}
      style={{ height, minHeight }}
      aria-label={title}
    >
      <HeroMediaLayer media={media} priority />
      {/* Scrim: gradient concentrated toward the bottom-left text area, not a full darkening. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent"
      />
      <HeroContent
        kicker={kicker}
        title={title}
        supporting={supporting}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        active={entered}
        overlayHeader={overlayHeader}
      />
      {showScrollCue && <ScrollCue label={scrollCueLabel} />}
    </section>
  );
}
