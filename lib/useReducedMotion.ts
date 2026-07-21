"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion. Starts `false`
 * (matching SSR) and updates after mount so we never autoplay video / carousels
 * against the user's preference. DESIGN.md §5.8.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
