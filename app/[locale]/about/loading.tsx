/**
 * Minimal About segment loader — no images, Hero, or Reveal.
 * Layout already supplies header offset + AboutSubNav; this only fills the page slot.
 */
export default function AboutLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="relative flex min-h-[60vh] items-end bg-navy px-4 pb-14 md:min-h-[62vh] md:px-6 md:pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gold/40"
        />
        <div className="mx-auto w-full max-w-wide">
          <div className="mb-4 h-3 w-28 bg-white/20" />
          <div className="h-10 w-[min(100%,28rem)] bg-white/25 md:h-12" />
          <div className="mt-4 h-4 w-[min(100%,20rem)] bg-white/15" />
        </div>
      </div>
    </div>
  );
}
