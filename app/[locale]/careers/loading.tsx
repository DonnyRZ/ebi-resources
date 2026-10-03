/** Match the careers list so loading does not flash the removed photographic hero. */
export default function CareersLoading() {
  return (
    <div
      aria-busy="true"
      className="mx-auto max-w-wide px-5 py-16 md:px-6 md:py-24"
    >
      <div className="mb-6 h-[32px] w-3/4 max-w-[24rem] bg-navy/15" />
      <div className="mb-10 h-11 w-full border-y border-border bg-cream" />
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="border-b border-border py-8">
          <div className="h-6 w-3/4 bg-navy/15" />
          <div className="mt-4 h-4 w-1/2 bg-navy/10" />
          <div className="mt-4 h-4 w-full bg-navy/10" />
          <div className="mt-6 h-11 w-[180px] border border-border" />
        </div>
      ))}
    </div>
  );
}
