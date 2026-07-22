/**
 * Visually distinct notice that placeholder / lorem copy is not final fact.
 * Keeps Vision & Mission and Board pages from reading as shipped corporate claims.
 */
export function PlaceholderNotice({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) {
  return (
    <aside
      role="note"
      className="border border-dashed border-bronze/50 bg-beige px-5 py-4 md:px-6 md:py-5"
    >
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-bronze">
        {label}
      </p>
      <p className="mt-2 max-w-[62ch] font-sans text-[14px] leading-relaxed text-text-muted">
        {detail}
      </p>
    </aside>
  );
}
