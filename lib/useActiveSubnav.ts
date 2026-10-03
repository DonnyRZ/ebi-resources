"use client";

import { useEffect, useRef } from "react";

/** Bring the active item into a horizontally scrolling subnav without moving the page. */
export function useActiveSubnav(pathname: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = ref.current;
    const active = track?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!track || !active || track.scrollWidth <= track.clientWidth) return;
    const item = active.getBoundingClientRect();
    const bounds = track.getBoundingClientRect();
    if (item.right > bounds.right - 20)
      track.scrollLeft += item.right - bounds.right + 20;
    else if (item.left < bounds.left + 20)
      track.scrollLeft += item.left - bounds.left - 20;
  }, [pathname]);
  return ref;
}
