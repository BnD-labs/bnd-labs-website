"use client";

import { useEffect } from "react";

/**
 * Publishes two things the hero's CSS reads: scroll position as `--sy`, and
 * pointer position over the hero as `--mx` / `--my`.
 *
 * Both are written from a single rAF callback rather than React state, since
 * scroll and pointer move far faster than React can usefully re-render.
 *
 * Deliberately not framer-motion's useAnimationFrame. That runs a loop every
 * frame for the lifetime of the page whether or not anything moved; this only
 * schedules a frame when an event actually fires, and the infinite grid drift
 * it would otherwise have driven is a CSS animation instead. On the phones
 * this audience uses, a permanently running rAF loop on the landing hero is
 * the same mistake as the WebGL animation that used to live here.
 *
 * Renders nothing, and controls nothing that affects whether content is
 * visible. With this script absent the hero is a complete static composition.
 */
export function HeroMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    let frame = 0;
    let lastY = -1;
    let px = 0;
    let py = 0;
    let pointerDirty = false;

    const write = () => {
      frame = 0;

      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        // One viewport past the hero is far enough; beyond that the planes
        // are off screen and their frozen transform is never seen.
        if (y <= window.innerHeight * 1.6) {
          root.style.setProperty("--sy", String(y));
        }
      }

      if (pointerDirty && hero) {
        pointerDirty = false;
        hero.style.setProperty("--mx", `${px}px`);
        hero.style.setProperty("--my", `${py}px`);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onScroll = () => schedule();

    const onPointerMove = (event: PointerEvent) => {
      // Touch drives scroll, not a spotlight. Reacting to it makes the
      // reveal flash under the thumb on every swipe.
      if (event.pointerType !== "mouse" || !hero) return;
      const rect = hero.getBoundingClientRect();
      px = event.clientX - rect.left;
      py = event.clientY - rect.top;
      pointerDirty = true;
      hero.dataset.spotlight = "on";
      schedule();
    };

    const onPointerLeave = () => {
      if (hero) delete hero.dataset.spotlight;
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    hero?.addEventListener("pointermove", onPointerMove, { passive: true });
    hero?.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      hero?.removeEventListener("pointermove", onPointerMove);
      hero?.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--sy");
    };
  }, []);

  return null;
}
