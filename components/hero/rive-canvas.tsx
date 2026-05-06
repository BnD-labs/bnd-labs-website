"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-webgl2";

export function RiveCanvas() {
  const { RiveComponent } = useRive({
    src: "/hero-animation.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent />;
}
