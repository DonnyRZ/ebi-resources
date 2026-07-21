"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Reveal — a light scroll-in animation (fade + short translate-up) driven by
 * IntersectionObserver (DESIGN.md §5.2 / §5.9). Honors prefers-reduced-motion:
 * when reduced, content renders immediately with no transform.
 *
 * Keep motion disciplined — one easeOutQuart curve, ~0.7s, no bounce.
 */
export type RevealProps = {
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
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

  return (
    <Tag
      ref={ref}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-[700ms] ease-quart motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
