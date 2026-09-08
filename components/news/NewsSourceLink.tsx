/**
 * External source CTA — opens the original press piece.
 * Compact outline, site navy/gold — not a full-width bar.
 */
export function NewsSourceLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-2 border border-navy px-4 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors duration-micro ease-quart hover:bg-navy hover:text-white"
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M6 3.5H3.5A1.5 1.5 0 0 0 2 5v7.5A1.5 1.5 0 0 0 3.5 14H11a1.5 1.5 0 0 0 1.5-1.5V10" />
        <path d="M9 2h5v5M8 8l6-6" />
      </svg>
    </a>
  );
}
