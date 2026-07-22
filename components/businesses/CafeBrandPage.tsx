import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/about/PlaceholderNotice";

export type CafeGalleryImage = {
  src: string;
  alt: string;
};

export type CafeMenuCategory = {
  title: string;
  text: string;
};

export type CafeBrandPageProps = {
  hero: {
    kicker: string;
    title: string;
    supporting: string;
    image: CafeGalleryImage;
  };
  scrollCueLabel: string;
  brand: {
    kicker: string;
    title: string;
    body1: string;
    body2?: string;
  };
  placement: {
    kicker: string;
    title: string;
    body: string;
    note?: string;
    meccaLabel: string;
    meccaHref: string;
    restaurantsLabel?: string;
    restaurantsHref?: string;
  };
  products: {
    kicker: string;
    title: string;
    intro: string;
    categories: CafeMenuCategory[];
  };
  location: {
    kicker: string;
    title: string;
    body: string;
    address: string;
    addressLabel: string;
    /** Placement confirmed vs street-address identity still pending. */
    identityLabel?: string;
    identityDetail?: string;
    heritageNote?: string;
  };
  gallery: {
    kicker: string;
    title: string;
    images: CafeGalleryImage[];
  };
  contact: {
    kicker: string;
    title: string;
    phone?: string;
    email?: string;
    phoneLabel: string;
    emailLabel: string;
    websiteHref: string;
    websiteLabel: string;
    websiteNote?: string;
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
 * 7OZ Espresso brand page — Pattern B: Café line lands on the single brand.
 * Facts-only; excludes 7OZ site placeholder team/lorem/hours/store.
 */
export function CafeBrandPage({
  hero,
  scrollCueLabel,
  brand,
  placement,
  products,
  location,
  gallery,
  contact,
  cta,
}: CafeBrandPageProps) {
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

      {/* Brand profile — From Jakarta to Tashkent */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {brand.kicker}
            </p>
            <h2 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
              {brand.title}
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
              {brand.body1}
            </p>
            {brand.body2 ? (
              <p className="mt-4 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
                {brand.body2}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border-t border-navy/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                {placement.kicker}
              </p>
              <h3 className="font-serif text-[24px] font-light leading-snug text-navy">
                {placement.title}
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-text-muted">
                {placement.body}
              </p>
              {placement.note ? (
                <p className="mt-4 border-l-2 border-gold pl-4 font-sans text-[15px] leading-relaxed text-navy/80">
                  {placement.note}
                </p>
              ) : null}
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="text" href={placement.meccaHref}>
                  {placement.meccaLabel}
                </Button>
                {placement.restaurantsHref && placement.restaurantsLabel ? (
                  <Button variant="text" href={placement.restaurantsHref}>
                    {placement.restaurantsLabel}
                  </Button>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Menu categories — no prices, no full menus */}
      <Section tone="cream">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {products.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {products.title}
          </h2>
          <p className="mt-5 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {products.intro}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {products.categories.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
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

      {/* Location */}
      <Section tone="white" width="normal">
        <Reveal>
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {location.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {location.title}
          </h2>
          <p className="mt-5 max-w-[58ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {location.body}
          </p>
          {location.identityLabel && location.identityDetail ? (
            <div className="mt-8 max-w-[62ch]">
              <PlaceholderNotice
                label={location.identityLabel}
                detail={location.identityDetail}
              />
            </div>
          ) : null}
          <div className="mt-8 max-w-[48ch]">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              {location.addressLabel}
            </p>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-navy">
              {location.address}
            </p>
          </div>
          {location.heritageNote ? (
            <p className="mt-6 max-w-[52ch] border-l-2 border-gold pl-4 font-sans text-[14px] leading-relaxed text-text-muted">
              {location.heritageNote}
            </p>
          ) : null}
        </Reveal>
      </Section>

      {/* Gallery */}
      <Section tone="beige">
        <Reveal className="mb-10 max-w-normal">
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {gallery.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {gallery.title}
          </h2>
        </Reveal>

        <CafeGallery images={gallery.images} />
      </Section>

      {/* Contact + 7OZ website */}
      <Section tone="white" width="normal">
        <Reveal>
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {contact.kicker}
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light text-navy">
            {contact.title}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {contact.phone ? (
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                  {contact.phoneLabel}
                </p>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="mt-2 inline-block font-sans text-[15px] text-navy underline-offset-4 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            ) : null}
            {contact.email ? (
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                  {contact.emailLabel}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 inline-block font-sans text-[15px] text-navy underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <a
              href={contact.websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold transition-colors duration-micro ease-quart hover:text-bronze"
            >
              {contact.websiteLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-micro ease-quart group-hover/btn:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            {contact.websiteNote ? (
              <p className="mt-2 max-w-[48ch] font-sans text-[13px] leading-relaxed text-text-muted">
                {contact.websiteNote}
              </p>
            ) : null}
          </div>
        </Reveal>
      </Section>

      {/* Partnership CTA */}
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
            <Button variant="outline" tone="navy" href="/businesses">
              {cta.backLabel}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

function CafeGallery({ images }: { images: CafeGalleryImage[] }) {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
        {rest.slice(0, 2).map((img, i) => (
          <Reveal key={img.src} delay={(i + 1) * 70}>
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[160px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
