"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Reading progress. The page is long and mostly photographic, so the hairline
 * is the only cue about how much is left. Champagne is used here as a
 * material, matching the rules under the wordmark.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="u-rule-champagne fixed left-0 top-0 z-[70] h-px w-full origin-left"
    />
  );
}
