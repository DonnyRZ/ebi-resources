import Image from "next/image";

/**
 * Careers hero — DESIGN.md archetype (b) Editorial/Listing: 50/50 split.
 * Text left, landscape photo right. Solid header above (no transparent overlay).
 */

export type CareersHeroProps = {
  kicker: string;
  title: string;
  supporting: string;
  image: { src: string; alt: string };
};

export function CareersHero({
  kicker,
  title,
  supporting,
  image,
}: CareersHeroProps) {
  return (
    <section
      className="border-b border-border bg-cream"
      aria-label={title}
    >
      <div className="mx-auto grid max-w-wide grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-end px-4 py-14 md:px-6 md:py-20 lg:pr-12 lg:pl-6">
          <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {kicker}
          </p>
          <h1 className="max-w-[18ch] font-serif text-[clamp(2rem,4.2vw,3rem)] font-light leading-[1.15] text-navy">
            {title}
          </h1>
          <p className="mt-5 max-w-[42ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {supporting}
          </p>
        </div>
        <div className="relative min-h-[240px] aspect-[16/10] w-full lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
