/**
 * Feature flags for temporarily hiding unfinished / deferred portfolio items.
 * Flip to `true` to restore public listing + detail routes without undeleting code.
 */
export const SHOW_GRAHA_NUSANTARA = false;

export function isGrahaNusantaraVisible(): boolean {
  return SHOW_GRAHA_NUSANTARA;
}

/** Drop list items keyed `graha` / id `graha-nusantara` while Graha is hidden. */
export function withoutGrahaNusantara<
  T extends { key?: string; id?: string },
>(items: readonly T[]): T[] {
  if (SHOW_GRAHA_NUSANTARA) return [...items];
  return items.filter((item) => {
    const key = item.key;
    const id = item.id;
    return key !== "graha" && id !== "graha" && id !== "graha-nusantara";
  });
}
