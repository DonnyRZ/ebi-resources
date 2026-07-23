import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";

export type RestaurantGalleryImage = {
  src: string;
  alt: string;
  /** Optional object-position for non-ideal hero ratios (e.g. 4:3 in wide heroes). */
  objectPosition?: string;
};

export type RestaurantHighlight = {
  title: string;
  text: string;
};

export type RestaurantVenueBlock = {
  kicker?: string;
  title: string;
  text: string;
  /** Optional outbound / in-site link (e.g. Café line for 7OZ). */
  linkHref?: string;
  linkLabel?: string;
};

export type RestaurantContact = {
  phone?: string;
  emails?: string[];
  address?: string;
  websiteHref?: string;
  websiteLabel: string;
  websiteNote?: string;
  toBeProvided?: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
};

export type RestaurantVenuePageProps = {
  hero: {
    kicker: string;
    title: string;
    supporting: string;
    image: RestaurantGalleryImage;
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
  /** Named dining concepts — omit or empty when the outlet is unnamed. */
  venues?: {
    kicker: string;
    title: string;
    items: RestaurantVenueBlock[];
  };
  highlights?: {
    kicker: string;
    title: string;
    items: RestaurantHighlight[];
  };
  gallery: {
    kicker: string;
    title: string;
    images: RestaurantGalleryImage[];
  };
  contact: {
    kicker: string;
    title: string;
    details?: RestaurantContact;
  };
  related?: {
    kicker: string;
    title: string;
    body: string;
    href: string;
    label: string;
  };
  cta: {
    kicker: string;
    title: string;
    body: string;
    backLabel: string;
    partnerLabel: string;
    /** Defaults to Food & Beverage line hub. */
    backHref?: string;
  };
};

/**
 * Shared dining-venue detail template for the Restaurants line.
 * Mirrors HotelPropertyPage section language; adds optional venue blocks + related link.
 */
export function RestaurantVenuePage({
  hero,
  scrollCueLabel,
  concept,
  place,
  venues,
  highlights,
  gallery,
  contact,
  related,
  cta,
}: RestaurantVenuePageProps) {
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
        media={{
          type: "image",
          src: hero.image.src,
          alt: hero.image.alt,
          objectPosition: hero.image.objectPosition,
        }}
        height="60vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={scrollCueLabel}
      />

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

      {venues && venues.items.length > 0 ? (
        <Section tone="cream">
          <Reveal className="mb-10 max-w-normal">
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {venues.kicker}
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
              {venues.title}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {venues.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="h-full border-t border-navy/15 pt-5">
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[2px] w-8 bg-gold"
                  />
                  {item.kicker ? (
                    <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                      {item.kicker}
                    </p>
                  ) : null}
                  <h3 className="font-serif text-[22px] font-light leading-snug text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                  {item.linkHref && item.linkLabel ? (
                    <div className="mt-5">
                      <Button variant="text" href={item.linkHref}>
                        {item.linkLabel}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {highlights && highlights.items.length > 0 ? (
        <Section tone={venues ? "white" : "cream"}>
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
      ) : null}

      <Section tone="white">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {gallery.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {gallery.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {gallery.images.map((img, i) => (
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
      </Section>

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

      {related ? (
        <Section tone="white" width="normal">
          <Reveal className="mx-auto max-w-read text-center">
            <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {related.kicker}
            </p>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] font-light leading-[1.2] text-navy">
              {related.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] font-sans text-[15px] leading-relaxed text-text-muted">
              {related.body}
            </p>
            <div className="mt-6">
              <Button variant="outline" tone="navy" href={related.href}>
                {related.label}
              </Button>
            </div>
          </Reveal>
        </Section>
      ) : null}

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
            <Button
              variant="outline"
              tone="navy"
              href={cta.backHref ?? "/businesses/food-and-beverage"}
            >
              {cta.backLabel}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
