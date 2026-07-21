"use client";

import { useCallback, useState } from "react";
import {
  HeroContent,
  HeroMediaLayer,
  ScrollCue,
  type HeroSlideContent,
} from "@/components/Hero";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * HeroCarousel — DESIGN.md §3.4 "Varian A-Homepage" rotating showcase.
 *
 * Wraps the same `HeroSlideContent` used by <Hero>. Slides cross-fade and
 * auto-advance; progress bars double as clickable indicators. Auto-advance is
 * disabled under reduced motion (DESIGN.md §5.8). Accessible as a labelled
 * carousel region with prev/next controls.
 */
export type HeroCarouselLabels = {
  region?: string;
  previous?: string;
  next?: string;
  /** Use "{number}" as a placeholder, e.g. "Go to slide {number}". */
  goToSlide?: string;
  scrollCue?: string;
};

export type HeroCarouselProps = {
  slides: HeroSlideContent[];
  /** Auto-advance interval in ms. Defaults to 7000. */
  interval?: number;
  height?: string;
  labels?: HeroCarouselLabels;
  className?: string;
};

export function HeroCarousel({
  slides,
  interval = 7000,
  height = "90vh",
  labels = {},
  className = "",
}: HeroCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  if (count === 0) return null;

  const goToSlideLabel = (n: number) =>
    (labels.goToSlide ?? "Go to slide {number}").replace("{number}", String(n));

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`.trim()}
      style={{ height, minHeight: "560px" }}
      aria-roledescription="carousel"
      aria-label={labels.region ?? "Highlights"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-hero ease-quart ${active ? "z-[1] opacity-100" : "z-0 opacity-0"}`}
            aria-hidden={!active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
          >
            <HeroMediaLayer media={slide.media} />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent"
            />
            <HeroContent {...slide} active={active} />
          </div>
        );
      })}

      {/* Prev / next controls */}
      {count > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-4 md:flex">
          <button
            type="button"
            onClick={prev}
            aria-label={labels.previous ?? "Previous slide"}
            className="flex h-11 w-11 items-center justify-center text-2xl text-white/80 transition-colors duration-micro ease-quart hover:text-gold"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={labels.next ?? "Next slide"}
            className="flex h-11 w-11 items-center justify-center text-2xl text-white/80 transition-colors duration-micro ease-quart hover:text-gold"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      )}

      {/* Progress indicators */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 mx-auto flex max-w-wide gap-2 px-4 md:px-6">
          {slides.map((_, i) => {
            const isActive = i === index;
            const isPast = i < index;
            // The active bar animates and acts as the single clock: pausing
            // freezes it in place (play-state), and its completion advances the
            // slide — so bar and slide can never drift or double-fire.
            const showAnim = isActive && !reducedMotion;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={goToSlideLabel(i + 1)}
                aria-current={isActive}
                className="relative h-[3px] flex-1 bg-white/30"
              >
                <span
                  // Re-key on index so the active fill restarts each slide.
                  key={isActive ? `run-${index}` : `idle-${i}`}
                  onAnimationEnd={showAnim ? next : undefined}
                  className="block h-full bg-white"
                  style={
                    showAnim
                      ? {
                          animation: `hero-progress ${interval}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : { width: isActive || isPast ? "100%" : "0%" }
                  }
                />
              </button>
            );
          })}
        </div>
      )}

      <ScrollCue label={labels.scrollCue ?? "Scroll down"} />
    </section>
  );
}
