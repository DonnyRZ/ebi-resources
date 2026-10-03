"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useCallback, useState } from "react";
import { useCarouselSwipe } from "@/lib/useCarouselSwipe";

export type PropertySpotlightSlide = {
  key: string;
  href?: string;
  city: string;
  image: {
    src: string;
    alt: string;
    aspectRatio?: number;
    fit?: "cover" | "contain";
  };
  title: string;
  text: string;
  cta?: string;
};

export type PropertySpotlightLabels = {
  region: string;
  previous: string;
  next: string;
  previousAria: string;
  nextAria: string;
};

type PropertySpotlightCarouselProps = {
  slides: PropertySpotlightSlide[];
  labels: PropertySpotlightLabels;
  size?: "default" | "large";
};

export function PropertySpotlightCarousel({
  slides,
  labels,
  size = "default",
}: PropertySpotlightCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const wrap = useCallback(
    (value: number) => ((value % count) + count) % count,
    [count],
  );
  const goPrevious = useCallback(
    () => setIndex((current) => wrap(current - 1)),
    [wrap],
  );
  const goNext = useCallback(
    () => setIndex((current) => wrap(current + 1)),
    [wrap],
  );
  const swipe = useCarouselSwipe(goPrevious, goNext);

  if (count === 0) return null;

  const previous = slides[wrap(index - 1)]!;
  const current = slides[index]!;
  const next = slides[wrap(index + 1)]!;
  const progress = ((index + 1) / count) * 100;

  const preview = (
    slide: PropertySpotlightSlide,
    direction: "previous" | "next",
  ) => (
    <button
      type="button"
      onClick={direction === "previous" ? goPrevious : goNext}
      aria-label={`${direction === "previous" ? labels.previousAria : labels.nextAria}: ${slide.title}`}
      className="group hidden min-w-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:block"
    >
      <span className="relative block aspect-square overflow-hidden bg-white opacity-90 transition-opacity duration-200 group-hover:opacity-100">
        <Image
          src={slide.image.src}
          alt=""
          fill
          sizes="(max-width: 1280px) 25vw, 24vw"
          className="object-cover"
        />
      </span>
    </button>
  );

  return (
    <div
      className={`property-spotlight ${size === "large" ? "property-spotlight--large" : ""} mx-auto w-full max-w-[1920px] px-4 lg:px-0`}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
      {...swipe}
    >
      <div
        className={`grid grid-cols-1 items-center gap-4 lg:gap-0 ${
          size === "large"
            ? "lg:grid-cols-[minmax(0,0.55fr)_minmax(0,3.8fr)_minmax(0,0.55fr)]"
            : "lg:grid-cols-[minmax(0,1fr)_minmax(0,2.15fr)_minmax(0,1fr)]"
        }`}
      >
        {preview(previous, "previous")}

        <article
          key={current.key}
          className="relative z-10 min-w-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${count}`}
          aria-live="polite"
        >
          <div
            className="property-spotlight__image relative overflow-hidden bg-white"
            style={{ aspectRatio: current.image.aspectRatio ?? 16 / 9 }}
          >
            <Image
              src={current.image.src}
              alt={current.image.alt}
              fill
              sizes={
                size === "large"
                  ? "(max-width: 1023px) 100vw, (max-width: 1280px) 74vw, 76vw"
                  : "(max-width: 1023px) 100vw, (max-width: 1280px) 52vw, 54vw"
              }
              className={
                current.image.fit === "cover"
                  ? "object-cover"
                  : "object-contain"
              }
            />
          </div>

          <div
            className={`property-spotlight__card relative z-20 mx-0 mt-4 border border-gold/25 bg-white text-center sm:mx-8 lg:absolute lg:right-[3%] lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2 ${
              size === "large"
                ? "px-4 py-4 lg:w-[min(230px,25%)] lg:px-4 lg:py-4 xl:w-[min(250px,23%)]"
                : "px-5 py-5 lg:w-[min(280px,44%)] lg:px-5 lg:py-5 xl:w-[min(300px,38%)]"
            }`}
          >
            <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              {current.city}
            </p>
            <h3
              className={`mt-2.5 font-serif font-light leading-tight text-navy ${
                size === "large"
                  ? "text-[clamp(1.125rem,1.55vw,1.5rem)]"
                  : "text-[clamp(1.25rem,2vw,1.7rem)]"
              }`}
            >
              {current.title}
            </h3>
            <p
              className={`mx-auto mt-2 line-clamp-2 max-w-[38ch] font-sans leading-relaxed text-text-muted ${
                size === "large" ? "text-[11px]" : "text-[12px]"
              }`}
            >
              {current.text}
            </p>
            {current.href && current.cta ? (
              /^https?:\/\//i.test(current.href) ? (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-4 inline-flex items-center gap-2 border-b border-navy/50 pb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {current.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              ) : (
                <Link
                  href={current.href}
                  prefetch={false}
                  className="group/link mt-4 inline-flex items-center gap-2 border-b border-navy/50 pb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {current.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              )
            ) : null}
          </div>
        </article>

        {preview(next, "next")}
      </div>

      {count > 1 ? (
        <div className="mx-auto mt-3 grid max-w-[1120px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 text-navy sm:gap-x-4">
          <button
            type="button"
            onClick={goPrevious}
            aria-label={labels.previousAria}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span aria-hidden="true">‹</span> {labels.previous}
          </button>

          <div
            className="relative h-[2px] bg-navy/15"
            role="progressbar"
            aria-label={labels.region}
            aria-valuemin={1}
            aria-valuemax={count}
            aria-valuenow={index + 1}
          >
            <span
              className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label={labels.nextAria}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {labels.next} <span aria-hidden="true">›</span>
          </button>

          <p
            className="col-start-2 row-start-2 m-0 text-center font-sans text-[10px] tracking-[0.16em] text-text-muted"
            aria-live="polite"
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
