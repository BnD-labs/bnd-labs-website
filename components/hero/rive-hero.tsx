"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const RiveCanvas = dynamic(
  () => import("./rive-canvas").then((m) => m.RiveCanvas),
  { ssr: false },
);

export function RiveHero({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/*
        Canvas oversized & shifted up to crop the .riv text header.
        Top mask hides remaining top artifacts while leaving
        left/right sides fully visible for the icon cubes.
        Mobile: smaller with tighter crop. Desktop: original sizing.
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
          style={{
            top: "-32%",
            left: "-2%",
            width: "104%",
            height: "136%",
          }}
        >
          {/*
            Still frame of the same scene. It is server-rendered, so it shows
            before the client bundle arrives and stays put if Rive never paints:
            no WebGL2, a blocked CDN (the ~2.3MB runtime is fetched from unpkg),
            or a connection too slow for the 442KB scene. Without it the right
            half of the hero is simply blank. The scene draws its own opaque
            background, so the canvas covers this once it loads.
          */}
          <Image
            src="/hero-poster.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="relative h-full w-full">
            <RiveCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}
