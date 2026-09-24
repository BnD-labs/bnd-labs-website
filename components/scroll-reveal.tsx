"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** If true (default), reveals descendant RevealItems in sequence. */
  stagger?: boolean;
}

/**
 * Scroll-reveal wrapper.
 *
 * This was framer-motion with `initial="hidden"`, which server-rendered
 * `opacity:0` inline on every wrapped element — 33 of them in the built
 * homepage. The whole page below the fold stayed invisible until the bundle
 * downloaded, hydrated and ran, and never appeared at all if it failed. For an
 * audience on mid-range phones over mobile data that is the wrong trade for an
 * entrance animation.
 *
 * Now the hidden state lives behind the `js` class that layout.tsx sets before
 * first paint, so it only ever applies when JavaScript is present to undo it.
 * Without scripting, every section renders visible. IntersectionObserver adds
 * `is-visible`; if it is missing, everything is revealed immediately.
 *
 * The public API is unchanged — 11 call sites depend on it.
 */
export function ScrollReveal({
  children,
  className,
  stagger = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets: Element[] = stagger
      ? Array.from(root.querySelectorAll(".reveal"))
      : [root];

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={cn(!stagger && "reveal", className)}>
      {children}
    </div>
  );
}

/**
 * Wrap individual items inside ScrollReveal for staggered entry. Siblings are
 * offset from each other by nth-child rules in globals.css.
 */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
