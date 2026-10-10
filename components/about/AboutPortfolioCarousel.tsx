"use client";

import { PropertySpotlightCarousel } from "@/components/PropertySpotlightCarousel";

export type AboutPortfolioSlide = {
  src: string;
  alt: string;
  href: string;
  description: string;
  kicker: string;
  title: string;
  width: number;
  height: number;
};

type AboutPortfolioCarouselProps = {
  images: AboutPortfolioSlide[];
  labels: {
    region: string;
    previous: string;
    next: string;
    discover: string;
    previousAria: string;
    nextAria: string;
  };
};

/** Share the homepage portfolio layout and its mobile image / card stack. */
export function AboutPortfolioCarousel({
  images,
  labels,
}: AboutPortfolioCarouselProps) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <PropertySpotlightCarousel
        labels={labels}
        slides={images.map((image) => ({
          key: image.src,
          image: {
            src: image.src,
            alt: image.alt,
            aspectRatio: image.width / image.height,
            fit: "contain",
          },
          href: image.href,
          city: image.kicker,
          title: image.title,
          text: image.description,
          cta: labels.discover,
        }))}
      />
    </div>
  );
}
