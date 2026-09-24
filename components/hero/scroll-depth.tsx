"use client";

import { useEffect } from "react";

/**
 * Publishes scroll position as a single CSS custom property, `--sy`, on the
 * document element. The hero's planes read it and translate at different
 * rates, which is what produces depth: separation comes from things moving
 * at visibly different speeds, not from stacking them.
 *
 * Deliberately not a React state update. Scroll fires far faster than React
 * can usefully re-render, so this writes one property from a rAF callback and
 * lets the compositor do the rest. Nothing here renders markup, and nothing
 * here controls whether content is visible — remove the script and the hero
 * is a complete static composition, which is the point.
 *
 * Stops writing once the hero has left the viewport, so the rest of the page
 * costs nothing.
 */
export function ScrollDepth() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let last = -1;

    const write = () => {
      frame = 0;
      const y = window.scrollY;
      if (y === last) return;
      last = y;
      // One viewport past the hero is far enough; beyond that the planes are
      // off screen and their frozen transform is never seen.
      if (y <= window.innerHeight * 1.6) {
        root.style.setProperty("--sy", String(y));
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--sy");
    };
  }, []);

  return null;
}
