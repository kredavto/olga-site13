"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type Variant = "primary" | "onDark" | "secondary" | "ghost";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors duration-300";

/** Size is a prop, not a className override: padding and label size have to
 *  move together, and two font-size utilities on one element resolve by
 *  stylesheet order rather than by the order they appear in the markup. */
const sizes = {
  md: "px-7 py-3.5 text-[15px]",
  lg: "px-8 py-4 text-[16px]",
} as const;

/**
 * Fill and label always travel together in the same variant. Never override a
 * button's background through className: the label colour has to move with it,
 * and a one sided override is how a white button ends up with a white label.
 */
const styles: Record<Variant, string> = {
  // Charcoal on a light section. Label contrast 12.6:1.
  primary: "bg-charcoal text-warm-white hover:bg-graphite",
  // The inverse, for light type on dark sections. Label contrast 12.6:1.
  onDark: "bg-warm-white text-charcoal hover:bg-sand",
  // Outlined, for light sections.
  secondary:
    "border border-charcoal/25 text-charcoal hover:border-charcoal/60 hover:bg-charcoal/[0.04]",
  // Over photography, always with its own scrim so the label stays legible.
  ghost:
    "border border-white/40 bg-black/35 text-warm-white backdrop-blur-md hover:bg-black/50",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * The page's only button. Magnetic pull is driven by motion values rather than
 * state, so pointer movement never re-renders the tree.
 */
export default function Cta({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const labelX = useTransform(x, (v) => v * 0.35);
  const labelY = useTransform(y, (v) => v * 0.35);

  const handleMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    my.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <motion.span style={{ x: labelX, y: labelY }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const shared = {
    className: `${base} ${sizes[size]} ${styles[variant]} ${className}`,
    style: { x, y },
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    whileTap: { scale: 0.97 },
  } as const;

  if (href) {
    return (
      <motion.a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...shared}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...shared}
    >
      {inner}
    </motion.button>
  );
}
