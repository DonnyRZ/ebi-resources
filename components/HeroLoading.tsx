/** Lightweight loading state using the same mobile media geometry as the hero. */
export function HeroLoading() {
  return (
    <div className="hero-loading bg-cream" aria-busy="true">
      <div className="hero-loading__media bg-navy/15" />
      <div className="hero-loading__copy mx-auto w-full max-w-wide">
        <div className="mb-4 h-3 w-[110px] bg-navy/10" />
        <div className="h-[32px] w-full max-w-[26rem] bg-navy/15" />
        <div className="mt-3 h-[32px] w-3/4 max-w-[20rem] bg-navy/15" />
        <div className="mt-4 h-4 w-full max-w-[24rem] bg-navy/10" />
      </div>
    </div>
  );
}
