/** Intentional, image-free teaser artwork for cards that are not launched yet. */
export function ComingSoonArtwork() {
  return (
    <div className="relative h-full w-full scale-105 overflow-hidden bg-gradient-to-br from-cream via-beige to-white transition-transform duration-image ease-quart group-hover:scale-[1.12]">
      <div
        aria-hidden="true"
        className="absolute -right-[16%] -top-[54%] aspect-square w-[76%] rounded-full border border-gold/15"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[7%] -top-[38%] aspect-square w-[58%] rounded-full border border-gold/20"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 640 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-gold/55"
        fill="none"
      >
        <path
          d="M-34 346C70 242 143 163 232 204c85 39 83 119 169 93 67-20 112-117 273-204"
          stroke="currentColor"
          strokeDasharray="3 10"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <circle cx="232" cy="204" r="22" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="401" cy="297" r="17" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="232" cy="204" r="3.5" fill="currentColor" />
        <circle cx="401" cy="297" r="3.5" fill="currentColor" />
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/15"
      />
    </div>
  );
}
