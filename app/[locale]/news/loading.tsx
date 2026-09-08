/**
 * Minimal News segment loader — no images, Hero, or Reveal.
 */
export default function NewsLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="border-b border-border bg-cream">
        <div className="mx-auto grid max-w-wide grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-end px-4 py-14 md:px-6 md:py-20">
            <div className="mb-4 h-3 w-36 bg-navy/10" />
            <div className="h-10 w-[min(100%,22rem)] bg-navy/15 md:h-12" />
            <div className="mt-5 h-4 w-[min(100%,18rem)] bg-navy/10" />
          </div>
          <div className="min-h-[240px] bg-navy/20 lg:min-h-[420px]" />
        </div>
      </div>
    </div>
  );
}
