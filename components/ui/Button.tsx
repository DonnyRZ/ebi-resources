import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Button — DESIGN.md §3.5.
 *
 * Variants:
 *  - "filled"  : solid fill (navy on light, white on dark).
 *  - "outline" : 1px ghost border — the most-used variant.
 *  - "text"    : gold text link with a trailing arrow that nudges on hover.
 *
 * Tone controls the palette so the same button reads correctly over light
 * sections ("navy") or over dark hero media ("light").
 *
 * Pass `href` to render a locale-aware <Link> (from @/i18n/navigation); omit it
 * to render a native <button>. Sharp corners + easeOutQuart micro-transition.
 */
export type ButtonVariant = "filled" | "outline" | "text";
export type ButtonTone = "navy" | "light";

const base =
  "inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.1em] transition-colors duration-micro ease-quart focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const padded = "px-[28px] py-[14px]";

const styles: Record<ButtonVariant, Record<ButtonTone, string>> = {
  filled: {
    navy: `${padded} border border-navy bg-navy text-white hover:bg-navy-footer`,
    light: `${padded} border border-white bg-white text-navy hover:bg-cream`,
  },
  outline: {
    navy: `${padded} border border-navy bg-transparent text-navy hover:bg-navy hover:text-white`,
    light: `${padded} border border-white bg-transparent text-white hover:bg-white hover:text-navy`,
  },
  text: {
    navy: "text-gold hover:text-bronze",
    light: "text-white hover:text-cream",
  },
};

type CommonProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  /** Show the trailing arrow. Defaults to true for the "text" variant. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="arrow inline-block transition-transform duration-micro ease-quart group-hover/btn:translate-x-1"
    >
      &rarr;
    </span>
  );
}

export function Button({
  variant = "outline",
  tone = "navy",
  arrow,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const showArrow = arrow ?? variant === "text";
  const classes = `group/btn ${base} ${styles[variant][tone]} ${className}`.trim();

  const content = (
    <>
      {children}
      {showArrow && <Arrow />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, prefetch, ...linkRest } = rest as ButtonAsLink;
    // Skip prefetch for routes that do not exist yet (Header PREFETCH_OFF).
    const skipPrefetch =
      prefetch === false || href === "/contact" || href === "/careers";
    return (
      <Link
        href={href}
        className={classes}
        prefetch={skipPrefetch ? false : prefetch}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  const { href: _href, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
