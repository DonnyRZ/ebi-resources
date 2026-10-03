/** Shared status chip used for pre-launch products and business lines. */
export function ComingSoonBadge({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-gold/35 bg-white/95 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-navy ${className}`.trim()}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      {label}
    </span>
  );
}
