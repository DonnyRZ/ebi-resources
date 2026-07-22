import { Hero } from "@/components/Hero";
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
  return (
    <main>
      <Hero
        kicker={kicker}
        title={title}
        supporting={supporting}
        media={
          heroMedia
            ? { type: "image", src: heroMedia.src, alt: heroMedia.alt }
            : undefined
        }
        height="58vh"
        minHeight="400px"
        overlayHeader={false}
        showScrollCue
        scrollCueLabel={scrollCueLabel}
      />

      <Section tone="white" width="normal">
        <Reveal>
          {badge && (
            <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
              {badge}
            </p>
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
