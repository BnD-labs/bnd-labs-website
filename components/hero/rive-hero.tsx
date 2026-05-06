"use client";

import dynamic from "next/dynamic";

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
          <RiveCanvas />
        </div>
      </div>
    </div>
  );
}
