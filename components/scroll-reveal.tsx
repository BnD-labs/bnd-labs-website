"use client";

import { type ReactNode } from "react";
import { m, type Variants } from "framer-motion";


const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** If true, staggers direct children that have data-reveal-item */
  stagger?: boolean;
}

/**
 * Scroll-reveal wrapper powered by framer-motion.
 *
 * - With `data-reveal-item` children: staggers them in sequence.
 * - Without: fades up the entire container as one unit.
 */
export function ScrollReveal({
  children,
  className,
  stagger = true,
}: ScrollRevealProps) {
  return (
    <m.div
      variants={stagger ? containerVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/**
 * Wrap individual items inside ScrollReveal for staggered entry.
 */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div variants={itemVariants} className={className}>
      {children}
    </m.div>
  );
}
