"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Card } from "@/components/Card";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type PropertyCarouselSlide = {
  key: string;
  href: string;
  image: { src: string; alt: string };
  kicker: string;
  title: string;
  text: string;
  cta: string;
};

export type PropertyCarouselLabels = {
  region: string;
  previous: string;
  next: string;
  /** ICU-style "{number}" placeholder filled here. */
  goToSlide: string;
};

type PropertyCarouselProps = {
  slides: PropertyCarouselSlide[];
  labels: PropertyCarouselLabels;
  className?: string;
};

const navBtnClass =
  "flex size-9 shrink-0 items-center justify-center rounded-full border border-navy/20 bg-cream/90 text-navy shadow-sm backdrop-blur-sm transition-colors duration-micro ease-quart hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-30 disabled:hover:border-navy/20 disabled:hover:text-navy md:size-10";

/**
 * Quiet horizontal filmstrip for hotel properties (DESIGN.md §3.7 spirit).
 * Compact card height for laptop viewports; side arrows sit beside the media
 * so swipe controls stay in view without scrolling past the copy.
 */
export function PropertyCarousel({
  slides,
  labels,
  className = "",
}: PropertyCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const count = slides.length;

  const scrollTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const clamped = ((next % count) + count) % count;
      const el = track.children[clamped] as HTMLElement | undefined;
      if (!el) return;
      el.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
      setIndex(clamped);
    },
    [count, reducedMotion],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children).filter(
      (el) => el.getAttribute("aria-roledescription") === "slide",
    ) as HTMLElement[];
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { i: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = items.indexOf(entry.target as HTMLElement);
          if (i < 0) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { i, ratio: entry.intersectionRatio };
          }
        }
        if (best) setIndex(best.i);
      },
      { root: track, threshold: [0.45, 0.6, 0.75] },
    );

    for (const el of items) observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(index + 1);
    }
  };

  if (count === 0) return null;

  const goToLabel = (n: number) =>
    labels.goToSlide.replace("{number}", String(n));

  const prevBtn = (
    <button
      type="button"
      onClick={() => scrollTo(index - 1)}
      aria-label={labels.previous}
      disabled={index === 0}
      className={navBtnClass}
    >
      <span aria-hidden="true" className="text-base leading-none md:text-lg">
        &larr;
      </span>
    </button>
  );

  const nextBtn = (
    <button
      type="button"
      onClick={() => scrollTo(index + 1)}
      aria-label={labels.next}
      disabled={index === count - 1}
      className={navBtnClass}
    >
      <span aria-hidden="true" className="text-base leading-none md:text-lg">
        &rarr;
      </span>
    </button>
  );

  return (
    <div
      className={`relative ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-start gap-2 md:gap-3">
        {/* Align to ~mid of 16:9 media on laptop */}
        <div className="mt-[4.25rem] hidden md:block">{prevBtn}</div>

        <div
          ref={trackRef}
          tabIndex={0}
          className="flex min-w-0 flex-1 snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold [-ms-overflow-style:none] [scrollbar-width:none] motion-reduce:scroll-auto md:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              className="w-[min(78vw,17.5rem)] shrink-0 snap-start sm:w-[min(46vw,19rem)] lg:w-[min(32vw,20.5rem)]"
            >
              <Card
                href={slide.href}
                prefetch={false}
                image={slide.image}
                aspect="16 / 9"
                compact
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 21rem"
                kicker={slide.kicker}
                title={slide.title}
                text={slide.text}
                cta={slide.cta}
                className="!h-auto"
              />
            </div>
          ))}
          <div
            aria-hidden="true"
            className="w-3 shrink-0 snap-end sm:w-4 md:w-6"
          />
        </div>

        <div className="mt-[4.25rem] hidden md:block">{nextBtn}</div>
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-4 md:mt-4">
          <div className="flex md:hidden">{prevBtn}</div>

          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                aria-label={goToLabel(i + 1)}
                aria-current={i === index ? "true" : undefined}
                onClick={() => scrollTo(i)}
                className={`h-[3px] transition-[width,background-color] duration-struct ease-quart ${
                  i === index
                    ? "w-7 bg-navy"
                    : "w-2.5 bg-navy/25 hover:bg-navy/45"
                }`}
              />
            ))}
          </div>

          <div className="flex md:hidden">{nextBtn}</div>
        </div>
      )}
    </div>
  );
}
