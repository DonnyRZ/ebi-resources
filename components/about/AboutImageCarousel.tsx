"use client";

import Image from "next/image";
import { useCallback, useState, type KeyboardEvent } from "react";
import { useCarouselSwipe } from "@/lib/useCarouselSwipe";

export type AboutCarouselImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kicker?: string;
  title?: string;
};

type AboutImageCarouselProps = {
  images: AboutCarouselImage[];
  labels: {
    region: string;
    previous: string;
    next: string;
    previousAria: string;
    nextAria: string;
  };
};

/** One large, uncropped portfolio photo with compact manual carousel controls. */
export function AboutImageCarousel({
  images,
  labels,
}: AboutImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;

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

  const current = images[index]!;
  const previous = images[wrap(index - 1)]!;
  const next = images[wrap(index + 1)]!;
  const progress = ((index + 1) / count) * 100;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className="w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...swipe}
    >
      <div
        key={current.src}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} / ${count}`}
        aria-live="polite"
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="block h-auto w-full"
        />
        {current.kicker && current.title ? (
          <div className="mt-3">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
              {current.kicker}
            </p>
            <h3 className="mt-1 font-serif text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-snug text-navy">
              {current.title}
            </h3>
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 text-navy sm:mt-4 sm:gap-x-4">
          <button
            type="button"
            onClick={goPrevious}
            aria-label={`${labels.previousAria}: ${previous.alt}`}
            className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:gap-2 sm:tracking-[0.14em]"
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
            aria-label={`${labels.nextAria}: ${next.alt}`}
            className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:gap-2 sm:tracking-[0.14em]"
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
