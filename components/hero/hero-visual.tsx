import Image from "next/image";

/**
 * The hero visual.
 *
 * This was a Rive/WebGL2 animation until it was measured. It cost 1.2MB — a
 * 2.3MB wasm runtime fetched from unpkg, plus a 442KB scene — and held the
 * main thread at roughly 90% for as long as the hero was on screen, on a site
 * whose audience browses on mid-range phones. For that it moved about 3% of
 * its pixels between frames, and it ignored prefers-reduced-motion.
 *
 * The still below is rendered from that same scene, so the hero looks the same
 * as it did once the animation had loaded. No client JavaScript is involved.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/*
        The artwork is oversized and shifted up inside this window to crop the
        scene's own text header; the mask softens the top and bottom edges into
        the surrounding gradient.
      */}
      <div
        className="relative aspect-[4/3] w-full max-h-[360px] overflow-hidden sm:max-h-none lg:aspect-[5/4] lg:-mt-8"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
        }}
      >
        <div
          className="absolute"
          style={{ top: "-32%", left: "-2%", width: "104%", height: "136%" }}
        >
          <Image
            src="/hero-poster.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
