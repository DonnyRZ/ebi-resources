import { useTranslations } from "next-intl";

/**
 * Footer — SIMPLIFIED / DEFERRED per DESIGN.md §3.14.
 *
 * For now this is intentionally minimal: the serif "EBI RESOURCES" wordmark
 * plus a small muted baseline. The full 5-column links / social / legal /
 * copyright footer is deferred until content and assets are ready.
 */
export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-wide flex-col items-center gap-3 px-4 py-7 text-center md:px-6">
        <span className="font-serif text-[20px] font-light uppercase tracking-[0.28em] text-navy">
          EBI Resources
        </span>
        <p className="font-sans text-[12px] tracking-[0.04em] text-text-muted">
          &copy; {year} EBI Resources. {t("tagline")}
        </p>
      </div>
    </footer>
  );
}
