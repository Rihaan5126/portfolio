import type { CSSProperties } from "react";

/**
 * Elements with the `reveal` class fade and rise in once they scroll into view
 * (see RevealObserver). This sets the stagger delay for one of them.
 */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

/** Typed helper for setting CSS custom properties through the style prop. */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}
