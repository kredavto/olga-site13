"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Record<string, Variants> = {
  /** Content arriving from below. The default for body blocks. */
  rise: {
    hidden: { opacity: 0, y: 28 },
    shown: { opacity: 1, y: 0 },
  },
  /** Media arriving with a slight settle, used on photography. */
  settle: {
    hidden: { opacity: 0, y: 40, scale: 1.02 },
    shown: { opacity: 1, y: 0, scale: 1 },
  },
  /** Focus pull. Reserved for single hero-weight statements. */
  focus: {
    hidden: { opacity: 0, filter: "blur(14px)" },
    shown: { opacity: 1, filter: "blur(0px)" },
  },
};

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article" | "figure";
  kind?: keyof typeof variants;
  delay?: number;
  className?: string;
};

/**
 * Scroll reveal. One shared component so timing is identical across the page,
 * which is what keeps a long scroll feeling composed rather than twitchy.
 * Motion respects prefers-reduced-motion internally and renders the shown
 * state directly.
 */
export default function Reveal({
  children,
  as = "div",
  kind = "rise",
  delay = 0,
  className,
}: Props) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={variants[kind]}
      transition={{
        duration: kind === "focus" ? 0.9 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
