"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCarouselSwipe } from "@/lib/useCarouselSwipe";

export type GroupGalleryImage = {
  src: string;
  alt: string;
};

export type GroupGalleryCarouselLabels = {
  region: string;
  previous: string;
  next: string;
  previousAria: string;
  nextAria: string;
  expand: string;
  close: string;
};

type GroupGalleryCarouselProps = {
  images: GroupGalleryImage[];
  labels: GroupGalleryCarouselLabels;
};

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function GroupGalleryCarousel({
  images,
  labels,
}: GroupGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Tab") {
        const buttons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (opener?.isConnected) opener.focus();
    };
  }, [expanded, goNext, goPrevious]);

  if (count === 0) return null;

  const previous = images[wrap(index - 1)]!;
  const current = images[index]!;
  const next = images[wrap(index + 1)]!;
  const progress = ((index + 1) / count) * 100;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  const preview = (image: GroupGalleryImage, side: "previous" | "next") => (
    <button
      type="button"
      onClick={side === "previous" ? goPrevious : goNext}
      aria-label={`${side === "previous" ? labels.previousAria : labels.nextAria}: ${image.alt}`}
      className="group hidden min-w-0 cursor-pointer md:block md:opacity-80 md:transition-opacity md:duration-200 md:hover:opacity-100"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-[#eeeae2]">
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(max-width: 1024px) 20vw, 24vw"
          className="object-contain"
        />
      </span>
    </button>
  );

  return (
    <>
      <div
        className="w-full"
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.region}
        {...swipe}
      >
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)_minmax(0,1fr)] md:gap-3 lg:gap-5">
          {preview(previous, "previous")}

          <div
            key={current.src}
            className="relative min-w-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count}`}
            aria-live="polite"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#eeeae2] md:aspect-[16/10]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 56vw, 62vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label={labels.expand}
                className="absolute right-3 top-3 flex size-11 items-center justify-center bg-white/90 text-navy transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <ExpandIcon />
              </button>
            </div>
          </div>

          {preview(next, "next")}
        </div>

        {count > 1 ? (
          <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 text-navy md:mt-6 md:gap-x-6">
            <button
              type="button"
              onClick={goPrevious}
              aria-label={labels.previousAria}
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
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
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {labels.next} <span aria-hidden="true">›</span>
            </button>

            <p className="col-start-2 row-start-2 m-0 text-center font-sans text-[10px] tracking-[0.16em] text-text-muted">
              {counter}
            </p>
          </div>
        ) : null}
      </div>

      {expanded ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) setExpanded(false);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setExpanded(false)}
            aria-label={labels.close}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center text-3xl text-white/90 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div
            className="relative h-[min(80dvh,900px)] w-full max-w-[1440px]"
            {...swipe}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
            <button
              type="button"
              onClick={goPrevious}
              aria-label={labels.previousAria}
              className="flex size-11 items-center justify-center border border-white/40"
            >
              ←
            </button>
            <p className="text-xs tracking-widest" aria-live="polite">
              {counter}
            </p>
            <button
              type="button"
              onClick={goNext}
              aria-label={labels.nextAria}
              className="flex size-11 items-center justify-center border border-white/40"
            >
              →
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
