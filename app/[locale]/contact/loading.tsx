/**
 * Minimal Contact segment loader — no images, Hero, or Reveal.
 * Matches text-only hero + cream atlas band height for soft-nav stability.
 */
export default function ContactLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="flex min-h-[42vh] items-center justify-center bg-cream px-4 py-16 md:min-h-[48vh] md:px-6 md:py-24">
        <div className="mx-auto w-full max-w-read text-center">
          <div className="mx-auto mb-4 h-3 w-24 bg-navy/10" />
          <div className="mx-auto h-10 w-[min(100%,20rem)] bg-navy/15 md:h-12" />
          <div className="mx-auto mt-5 h-4 w-[min(100%,28rem)] bg-navy/10" />
        </div>
      </div>
      <div className="bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-read space-y-4">
          <div className="h-3 w-28 bg-navy/10" />
          <div className="h-8 w-[min(100%,18rem)] bg-navy/15" />
          <div className="mt-8 h-4 w-full max-w-[40ch] bg-navy/10" />
          <div className="h-4 w-full max-w-[36ch] bg-navy/10" />
        </div>
      </div>
      <div className="bg-cream px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-wide">
          <div className="mb-10 h-8 w-[min(100%,22rem)] bg-navy/15" />
          <div className="aspect-[16/10] max-h-[75vh] min-h-[420px] border border-border bg-beige" />
        </div>
      </div>
    </div>
  );
}
