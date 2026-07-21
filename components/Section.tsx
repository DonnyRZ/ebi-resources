import type { ElementType, ReactNode } from "react";

/**
 * Section — layout wrapper enforcing the "quiet luxury" whitespace rhythm
 * (DESIGN.md §2.3). Generous vertical padding from the 8px scale, a centered
 * container capped at a chosen max-width, and an optional background tone.
 *
 * Use this to standardize section spacing across the site instead of hand-
 * rolling paddings/containers per page.
 */
export type SectionTone = "white" | "cream" | "beige" | "navy";
export type SectionWidth = "wide" | "normal" | "read";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white text-navy",
  cream: "bg-cream text-navy",
  beige: "bg-beige text-navy",
  navy: "bg-navy text-white",
};

const widthClasses: Record<SectionWidth, string> = {
  wide: "max-w-wide",
  normal: "max-w-normal",
  read: "max-w-read",
};

export type SectionProps = {
  as?: ElementType;
  tone?: SectionTone;
  width?: SectionWidth;
  /** Remove the default vertical padding (e.g. for full-bleed content). */
  flush?: boolean;
  /** Remove the horizontal container so children can go edge-to-edge. */
  bleed?: boolean;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  as: Tag = "section",
  tone = "white",
  width = "wide",
  flush = false,
  bleed = false,
  id,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const padding = flush ? "" : "py-16 md:py-24";
  return (
    <Tag id={id} className={`${toneClasses[tone]} ${padding} ${className}`.trim()}>
      {bleed ? (
        children
      ) : (
        <div
          className={`mx-auto w-full px-4 md:px-6 ${widthClasses[width]} ${containerClassName}`.trim()}
        >
          {children}
        </div>
      )}
    </Tag>
  );
}
