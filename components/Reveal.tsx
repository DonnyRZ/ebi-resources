"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Reveal — a light scroll-in animation (fade + short translate-up) driven by
 * IntersectionObserver (DESIGN.md §5.2 / §5.9). Honors prefers-reduced-motion:
 * when reduced, content renders immediately with no transform.
 *
 * Keep motion disciplined — one easeOutQuart curve, ~0.7s, no bounce.
 * SSR / above-fold content starts visible; only below-fold nodes hide then
 * reveal on intersection (avoids a blank first paint).
 */
export type RevealProps = {
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  /**
   * Transition duration class. Default keeps homepage/businesses at 700ms.
   * Prefer `duration-struct` (~350ms) on interior soft-nav surfaces (Contact/Careers).
   */
  durationClass?: "duration-[700ms]" | "duration-struct";
  className?: string;
  children: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  durationClass = "duration-[700ms]",
  className = "",
  children,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  // null = not measured yet (SSR / first paint stays visible).
  const [intersecting, setIntersecting] = useState<boolean | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIntersecting(entry.isIntersecting);
          if (entry.isIntersecting) {
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const visible = reducedMotion || intersecting !== false;

  return (
    <Tag
      ref={ref}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] ${durationClass} ease-quart motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
