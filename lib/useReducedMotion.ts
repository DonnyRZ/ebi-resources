"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true when the user has requested reduced motion. SSR snapshot is
 * `false`; the client store updates after hydration so we never autoplay
 * video / carousels against the user's preference. DESIGN.md §5.8.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
