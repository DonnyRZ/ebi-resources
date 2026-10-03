"use client";

import { useRef, type TouchEvent } from "react";

/** Keep vertical page scrolling; advance only for a deliberate horizontal swipe. */
export function useCarouselSwipe(previous: () => void, next: () => void) {
  const origin = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart(event: TouchEvent<HTMLElement>) {
      const touch = event.touches[0];
      origin.current =
        event.touches.length === 1 && touch
          ? { x: touch.clientX, y: touch.clientY }
          : null;
    },
    onTouchEnd(event: TouchEvent<HTMLElement>) {
      const start = origin.current;
      origin.current = null;
      const touch = event.changedTouches[0];
      if (!start || !touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx > 0) previous();
      else next();
    },
    onTouchCancel() {
      origin.current = null;
    },
  };
}
