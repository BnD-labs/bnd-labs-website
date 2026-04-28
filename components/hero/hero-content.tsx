"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay, ease },
  }),
};

export function HeroContent() {
  return (
    <div className="max-w-2xl">
      <m.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="text-sm font-semibold uppercase tracking-widest text-primary"
      >
        Growth Systems Architects
      </m.p>

      <m.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
        className="mt-4 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
      >
        We Build Systems That{" "}
        <span className="text-primary">Generate Leads</span>
      </m.h1>

      <m.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
      >
        BND Labs helps established Zambian businesses generate consistent,
        predictable leads through digital infrastructure — not freelancer
        work.
      </m.p>

      <m.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.45}
        className="mt-10 flex flex-col gap-4 sm:flex-row"
      >
        <Button size="lg" render={<Link href="/contact" />}>
          Book a Discovery Call
          <ArrowRight className="ml-1" aria-hidden="true" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/services" />}
        >
          View Our Services
        </Button>
      </m.div>
    </div>
  );
}
