import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Card — property / business-line card (DESIGN.md §3.6 `card/image`).
 *
 * Anatomy: media (image or token placeholder) with a slow zoom on hover
 * (`scale(1.05)` → `scale(1.12)`, `overflow-hidden`, `duration-image`), optional
 * uppercase kicker, serif title, short supporting text, and an optional
 * "READ MORE →" affordance. Sharp corners throughout.
 *
 * If `href` is passed the whole card becomes a locale-aware link; media is
 * optional so the card renders cleanly before photography is added.
 */
export type CardProps = {
  title: string;
  href?: string;
  kicker?: string;
  text?: string;
  image?: { src: string; alt: string };
  /** Aspect ratio of the media box. Defaults to 4/3. */
  aspect?: string;
  /** Optional badge, e.g. "COMING SOON". */
  badge?: string;
  /** Label for the read-more affordance; omit to hide it. */
  cta?: ReactNode;
  /** Responsive image sizes hint; defaults to a 3-col card layout. */
  sizes?: string;
  /**
   * When `href` is set, forwarded to the locale Link.
   * Pass `false` on dense Businesses grids to avoid prefetch storms.
   */
  prefetch?: boolean;
  /** Tighter type + 2-line clamp — for filmstrips on short viewports. */
  compact?: boolean;
  className?: string;
};

export function Card({
  title,
  href,
  kicker,
  text,
  image,
  aspect = "4 / 3",
  badge,
  cta,
  sizes = "(max-width: 768px) 100vw, 33vw",
  prefetch,
  compact = false,
  className = "",
}: CardProps) {
  const inner = (
    <article className={`group flex h-full flex-col ${className}`.trim()}>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspect }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="scale-105 object-cover transition-transform duration-image ease-quart group-hover:scale-[1.12]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full scale-105 bg-gradient-to-br from-navy to-navy-footer transition-transform duration-image ease-quart group-hover:scale-[1.12]"
          />
        )}
        {badge && (
          <span className="absolute left-3 top-3 bg-navy px-2 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
            {badge}
          </span>
        )}
      </div>

      <div className={`flex flex-col ${compact ? "pt-2.5" : "pt-3"}`}>
        {kicker && (
          <span
            className={`font-sans font-semibold uppercase tracking-[0.12em] text-gold ${
              compact ? "mb-1.5 text-[10px]" : "mb-2 text-[11px]"
            }`}
          >
            {kicker}
          </span>
        )}
        <h3
          className={`font-serif font-light leading-snug text-navy ${
            compact ? "text-[18px] md:text-[20px]" : "text-[22px]"
          }`}
        >
          {title}
        </h3>
        {text && (
          <p
            className={`font-sans leading-relaxed text-text-muted ${
              compact
                ? "mt-1.5 line-clamp-2 text-[13px] md:text-[14px]"
                : "mt-2 text-[15px]"
            }`}
          >
            {text}
          </p>
        )}
        {cta && (
          <span
            className={`inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold transition-colors duration-micro ease-quart group-hover:text-bronze ${
              compact ? "mt-2" : "mt-3"
            }`}
          >
            {cta}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-micro ease-quart group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
