import { HeroCarousel } from "@/components/HeroCarousel";
import { ComingSoonBadge } from "@/components/ComingSoonBadge";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PlaceholderNotice } from "@/components/about/PlaceholderNotice";
import { Button } from "@/components/ui/Button";

/**
 * Shared shell for non-Hotels line stubs (Restaurants, Café, Technology, Travel).
 * One optional landscape hero max; body stays clearly incomplete where needed.
 */
export function LineStub({
  kicker,
  title,
  supporting,
  heroMedia,
  scrollCueLabel,
  placeholderLabel,
  placeholderDetail,
  body,
  badge,
  backLabel,
}: {
  kicker: string;
  title: string;
  supporting: string;
  heroMedia?: { src: string; alt: string };
  scrollCueLabel: string;
  placeholderLabel?: string;
  placeholderDetail?: string;
  body: string;
  badge?: string;
  backLabel: string;
}) {
  const heroSlides = [
    {
      kicker,
      title,
      supporting,
      media: heroMedia
        ? { type: "image" as const, src: heroMedia.src, alt: heroMedia.alt }
        : undefined,
    },
  ];

  return (
    <main className="home-overview home-overview--businesses">
      <HeroCarousel
        slides={heroSlides}
        overlayHeader={false}
        labels={{ region: title, scrollCue: scrollCueLabel }}
      />

      <Section id="overview-content" tone="white" width="normal">
        <Reveal>
          {badge && (
            <ComingSoonBadge label={badge} className="mb-4" />
          )}
          {placeholderLabel && placeholderDetail && (
            <PlaceholderNotice
              label={placeholderLabel}
              detail={placeholderDetail}
            />
          )}
          <p
            className={`max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted ${
              placeholderLabel ? "mt-8" : ""
            }`}
          >
            {body}
          </p>
          <div className="mt-10">
            <Button variant="text" href="/businesses">
              {backLabel}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
