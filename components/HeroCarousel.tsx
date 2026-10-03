"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import {
  HeroContent,
  HeroMediaLayer,
  ScrollCue,
  type HeroCornerCta,
  type HeroSlideContent,
} from "@/components/Hero";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCarouselSwipe } from "@/lib/useCarouselSwipe";

/**
 * HeroCarousel — DESIGN.md §3.4 full-bleed rotating showcase, shared by the
 * homepage and portfolio hubs.
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
  labels?: HeroCarouselLabels;
  className?: string;
  overlayHeader?: boolean;
  cornerCta?: HeroCornerCta;
};

export function HeroCarousel({
  slides,
  interval = 7000,
  labels = {},
  className = "",
  overlayHeader = true,
  cornerCta,
}: HeroCarouselProps) {
  const a11y = useTranslations("a11y");
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
  const swipe = useCarouselSwipe(prev, next);

  if (count === 0) return null;

  const goToSlidePattern =
    labels.goToSlide ?? (a11y.raw("goToSlide") as string);
  const goToSlideLabel = (n: number) =>
    goToSlidePattern.replace("{number}", String(n));

  return (
    <section
      className={`hero-carousel relative w-full overflow-hidden ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={labels.region ?? a11y("highlights")}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      {...swipe}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        const prevIdx = (index - 1 + count) % count;
        const nextIdx = (index + 1) % count;
        const nearby = active || i === prevIdx || i === nextIdx;
        return (
          <div
            key={i}
            className={`hero-carousel__slide absolute inset-0 ${active ? "z-[1] opacity-100" : "z-0 opacity-0"}`}
            aria-hidden={!active}
            inert={!active ? true : undefined}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
          >
            <div className="hero-visual absolute inset-0">
              {nearby ? (
                <HeroMediaLayer
                  media={slide.media}
                  priority={i === 0}
                  active={active}
                  zoom={false}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-footer"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/25 to-transparent"
              />
            </div>
            <HeroContent
              {...slide}
              active={active}
              overlayHeader={overlayHeader}
            />
          </div>
        );
      })}

      {cornerCta ? (
        <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6 lg:right-8">
          <a
            href={cornerCta.href}
            target={cornerCta.external ? "_blank" : undefined}
            rel={cornerCta.external ? "noopener noreferrer" : undefined}
            className="shadow-sm inline-flex items-center gap-2 border border-white/80 bg-white/95 px-5 py-3 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-navy backdrop-blur-sm transition-colors duration-micro ease-quart hover:border-white hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-6 md:py-3.5 md:text-[12px]"
          >
            {cornerCta.label}
            {cornerCta.external ? <span aria-hidden="true">↗</span> : null}
          </a>
        </div>
      ) : null}

      {/* Prev / next controls */}
      {count > 1 && (
        <div className="hero-carousel__controls pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-7">
          <button
            type="button"
            onClick={prev}
            aria-label={labels.previous ?? a11y("previousSlide")}
            className="shadow-sm pointer-events-auto flex h-10 w-10 items-center justify-center border border-white/50 bg-white/80 text-navy backdrop-blur-sm transition-colors duration-micro ease-quart hover:border-gold hover:bg-white hover:text-gold md:h-11 md:w-11"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={labels.next ?? a11y("nextSlide")}
            className="shadow-sm pointer-events-auto flex h-10 w-10 items-center justify-center border border-white/50 bg-white/80 text-navy backdrop-blur-sm transition-colors duration-micro ease-quart hover:border-gold hover:bg-white hover:text-gold md:h-11 md:w-11"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Progress indicators */}
      {count > 1 && (
        <div className="hero-carousel__progress absolute inset-x-0 bottom-14 z-20 mx-auto flex max-w-wide gap-2 px-4 md:bottom-16 md:px-6">
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
                className="relative flex h-11 flex-1 items-center before:absolute before:inset-x-0 before:top-1/2 before:h-[3px] before:-translate-y-1/2 before:bg-white/30"
              >
                <span
                  // Re-key on index so the active fill restarts each slide.
                  key={isActive ? `run-${index}` : `idle-${i}`}
                  onAnimationEnd={showAnim ? next : undefined}
                  className="relative block h-[3px] bg-white"
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

      <ScrollCue
        label={labels.scrollCue ?? "Scroll down"}
        variant="double"
        href="#overview-content"
      />
    </section>
  );
}
