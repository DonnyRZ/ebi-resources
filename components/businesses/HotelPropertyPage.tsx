import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

export type HotelGalleryImage = {
  src: string;
  alt: string;
};

export type HotelHighlight = {
  title: string;
  text: string;
};

export type HotelContact = {
  phone?: string;
  emails?: string[];
  address?: string;
  /** Outbound property site — only when listed in CONTENT-REFERENCE. */
  websiteHref?: string;
  websiteLabel: string;
  /** Caveat under outbound website link (confirm / to-be-confirmed). */
  websiteNote?: string;
  /** Shown when property contacts are absent from sources — or to frame listed contacts. */
  toBeProvided?: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
};

export type HotelPropertyPageProps = {
  hero: {
    kicker: string;
    title: string;
    supporting: string;
    image: HotelGalleryImage;
  };
  scrollCueLabel: string;
  concept: {
    kicker: string;
    title: string;
    body1: string;
    body2?: string;
  };
  place: {
    kicker: string;
    title: string;
    body: string;
    landmark?: string;
  };
  highlights: {
    kicker: string;
    title: string;
    items: HotelHighlight[];
  };
  gallery: {
    kicker: string;
    title: string;
    /** Visual rhythm — vary across properties. */
    variant?: "mosaic" | "strip" | "editorial";
    images: HotelGalleryImage[];
  };
  contact: {
    kicker: string;
    title: string;
    details?: HotelContact;
  };
  cta: {
    kicker: string;
    title: string;
    body: string;
    backLabel: string;
    partnerLabel: string;
  };
};

/**
 * Shared hotel property detail template — quiet luxury, facts-only sections.
 * Used by Hadith / Mecca / Graha Nusantara / Kampoeng Indonesia.
 */
export function HotelPropertyPage({
  hero,
  scrollCueLabel,
  concept,
  place,
  highlights,
  gallery,
  contact,
  cta,
}: HotelPropertyPageProps) {
  const variant = gallery.variant ?? "strip";
  const details = contact.details;
  const hasDirectContact =
    Boolean(details?.phone) ||
    Boolean(details?.emails?.length) ||
    Boolean(details?.address);

  return (
    <main>
      <Hero
        kicker={hero.kicker}
        title={hero.title}
        supporting={hero.supporting}
        media={{ type: "image", src: hero.image.src, alt: hero.image.alt }}
        height="60vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={scrollCueLabel}
      />

      {/* Concept + place — editorial split */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {concept.kicker}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
              {concept.title}
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {concept.body1}
            </p>
            {concept.body2 ? (
              <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
                {concept.body2}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border-t border-navy/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                {place.kicker}
              </p>
              <h3 className="font-serif text-[24px] font-light leading-snug text-navy">
                {place.title}
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-muted">
                {place.body}
              </p>
              {place.landmark ? (
                <p className="mt-4 border-l-2 border-gold pl-4 font-sans text-[15px] leading-relaxed text-navy/80">
                  {place.landmark}
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Highlights — documented facts only */}
      <Section tone="cream">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {highlights.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {highlights.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {highlights.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full border-t border-navy/15 pt-5">
                <span
                  aria-hidden="true"
                  className="mb-4 block h-[2px] w-8 bg-gold"
                />
                <h3 className="font-serif text-[20px] font-light leading-snug text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section tone="white">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {gallery.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {gallery.title}
          </h2>
        </Reveal>

        {variant === "mosaic" ? (
          <GalleryMosaic images={gallery.images} />
        ) : variant === "editorial" ? (
          <GalleryEditorial images={gallery.images} />
        ) : (
          <GalleryStrip images={gallery.images} />
        )}
      </Section>

      {/* Contact */}
      <Section tone="beige" width="normal">
        <Reveal>
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {contact.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {contact.title}
          </h2>

          <div className="mt-8 space-y-8">
            {details?.toBeProvided ? (
              <p className="max-w-[52ch] font-sans text-[15px] leading-relaxed text-text-muted">
                {details.toBeProvided}
              </p>
            ) : null}

            {hasDirectContact && details ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {details.address ? (
                  <div>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                      {details.addressLabel}
                    </p>
                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-navy">
                      {details.address}
                    </p>
                  </div>
                ) : null}
                {details.phone ? (
                  <div>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                      {details.phoneLabel}
                    </p>
                    <a
                      href={`tel:${details.phone.replace(/\s+/g, "")}`}
                      className="mt-2 inline-block font-sans text-[15px] text-navy underline-offset-4 hover:underline"
                    >
                      {details.phone}
                    </a>
                  </div>
                ) : null}
                {details.emails?.length ? (
                  <div>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                      {details.emailLabel}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {details.emails.map((email) => (
                        <li key={email}>
                          <a
                            href={`mailto:${email}`}
                            className="font-sans text-[15px] text-navy underline-offset-4 hover:underline"
                          >
                            {email}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            {details?.websiteHref ? (
              <div>
                <a
                  href={details.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold transition-colors duration-micro ease-quart hover:text-bronze"
                >
                  {details.websiteLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-micro ease-quart group-hover/btn:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
                {details.websiteNote ? (
                  <p className="mt-2 max-w-[48ch] font-sans text-[13px] leading-relaxed text-text-muted">
                    {details.websiteNote}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </Reveal>
      </Section>

      {/* Back + partner CTA */}
      <Section tone="cream" width="normal">
        <Reveal className="mx-auto max-w-read text-center">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {cta.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {cta.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="filled" tone="navy" href="/contact">
              {cta.partnerLabel}
            </Button>
            <Button variant="outline" tone="navy" href="/businesses/hotels">
              {cta.backLabel}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function GalleryStrip({ images }: { images: HotelGalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {images.map((img, i) => (
        <Reveal key={img.src} delay={i * 70}>
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function GalleryMosaic({ images }: { images: HotelGalleryImage[] }) {
  const [lead, ...rest] = images;
  if (!lead) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
      <Reveal className="lg:col-span-7">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
        {rest.slice(0, 3).map((img, i) => (
          <Reveal key={img.src} delay={(i + 1) * 70}>
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[140px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 33vw, 30vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function GalleryEditorial({ images }: { images: HotelGalleryImage[] }) {
  return (
    <div className="flex flex-col gap-5">
      {images[0] ? (
        <Reveal>
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      ) : null}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {images.slice(1, 4).map((img, i) => (
          <Reveal key={img.src} delay={(i + 1) * 70}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
