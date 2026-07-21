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
            sizes="(max-width: 768px) 100vw, 33vw"
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

      <div className="flex flex-1 flex-col pt-3">
        {kicker && (
          <span className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
            {kicker}
          </span>
        )}
        <h3 className="font-serif text-[22px] font-light leading-snug text-navy">
          {title}
        </h3>
        {text && (
          <p className="mt-2 font-sans text-[15px] leading-relaxed text-text-muted">
            {text}
          </p>
        )}
        {cta && (
          <span className="mt-3 inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-gold transition-colors duration-micro ease-quart group-hover:text-bronze">
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
      <Link href={href} className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
        {inner}
      </Link>
    );
  }

  return inner;
}
