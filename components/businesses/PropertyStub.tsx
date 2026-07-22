import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PlaceholderNotice } from "@/components/about/PlaceholderNotice";
import { Button } from "@/components/ui/Button";

/**
 * Minimal Wave-1 property detail shell — no hero gallery (Wave 2).
 */
export function PropertyStub({
  kicker,
  title,
  location,
  placeholderLabel,
  placeholderDetail,
  body,
  backLabel,
}: {
  kicker: string;
  title: string;
  location: string;
  placeholderLabel: string;
  placeholderDetail: string;
  body: string;
  backLabel: string;
}) {
  return (
    <main>
      <Section tone="cream" width="normal" className="!pt-12 md:!pt-16">
        <Reveal>
          <p className="mb-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
            {kicker}
          </p>
          <h1 className="font-serif text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.15] text-navy">
            {title}
          </h1>
          <p className="mt-3 font-sans text-[15px] text-text-muted">{location}</p>
        </Reveal>
      </Section>

      <Section tone="white" width="normal">
        <Reveal>
          <PlaceholderNotice
            label={placeholderLabel}
            detail={placeholderDetail}
          />
          <p className="mt-8 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-text-muted">
            {body}
          </p>
          <div className="mt-10">
            <Button variant="text" href="/businesses/hotels">
              {backLabel}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
