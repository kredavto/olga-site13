"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import Photo from "../Photo";
import Reveal from "../Reveal";
import { advantages } from "@/content/clinic";

/**
 * The reassurance block, directly under the hero.
 *
 * The ground is black silk, so this is the one section on the page where gold
 * has real room: the fabric never rises above mid grey, and the type sits at
 * better than 10:1 without needing the heavy wash the lobby photograph did.
 *
 * Everything here is set in cards. Each carries a pointer driven tilt, a gold
 * light wave that sweeps across on hover, and a mark in the corner with its own
 * idle motion, one per card, so the six read as a set rather than as one card
 * repeated. All of it is motion values and CSS transforms, so a pointer moving
 * across the grid never triggers a React render.
 */

/** The six corner marks. Index keyed so each card keeps its own signature. */
function CardMark({ index, still }: { index: number; still: boolean }) {
  const loop = (duration: number) =>
    still ? undefined : { duration, repeat: Infinity, ease: "easeInOut" as const };

  switch (index) {
    case 0: // a hairline drawing itself out and back
      return (
        <motion.span
          aria-hidden
          className="block h-px w-10 origin-left bg-gradient-to-r from-gold to-transparent"
          animate={still ? undefined : { scaleX: [0.45, 1, 0.45] }}
          transition={loop(5.5)}
        />
      );
    case 1: // a single point breathing
      return (
        <motion.span
          aria-hidden
          className="block size-[7px] rounded-full bg-gold"
          animate={still ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.85, 1.15, 0.85] }}
          transition={loop(4.2)}
        />
      );
    case 2: // a ring opening outward
      return (
        <motion.span
          aria-hidden
          className="block size-[13px] rounded-full border border-gold"
          animate={still ? undefined : { scale: [0.7, 1.05, 0.7], opacity: [0.5, 1, 0.5] }}
          transition={loop(6)}
        />
      );
    case 3: // a quarter arc turning
      return (
        <motion.span
          aria-hidden
          className="block size-[14px] rounded-full border border-transparent border-t-gold border-r-gold"
          animate={still ? undefined : { rotate: [0, 180, 360] }}
          transition={still ? undefined : { duration: 14, repeat: Infinity, ease: "linear" }}
        />
      );
    case 4: // a diamond tipping on its axis
      return (
        <motion.span
          aria-hidden
          className="block size-[10px] rotate-45 border border-gold"
          animate={still ? undefined : { rotate: [45, 135, 45], opacity: [0.55, 1, 0.55] }}
          transition={loop(7)}
        />
      );
    default: // two rules crossing
      return (
        <span aria-hidden className="relative block size-[14px]">
          <motion.span
            className="absolute left-0 top-1/2 h-px w-full bg-gold"
            animate={still ? undefined : { scaleX: [1, 0.35, 1] }}
            transition={loop(5)}
          />
          <motion.span
            className="absolute left-1/2 top-0 h-full w-px bg-gold"
            animate={still ? undefined : { scaleY: [0.35, 1, 0.35] }}
            transition={loop(5)}
          />
        </span>
      );
  }
}

/**
 * One card. The tilt is read from the pointer's position inside the card, the
 * wave is a rotated gold band swept across the face, and the content sits on a
 * forward Z plane so the tilt reads as depth rather than as a skew.
 */
function AdvantageCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const still = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 170, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 170, damping: 18 });

  // The glow follows the pointer across the face, which is what sells the tilt
  // as a lit surface rather than as a rotating rectangle.
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glowX = useSpring(gx, { stiffness: 90, damping: 20 });
  const glowY = useSpring(gy, { stiffness: 90, damping: 20 });
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(230,200,126,0.20), transparent 62%)`,
  );

  const onMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || still) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    ry.set((nx - 0.5) * 9);
    rx.set((0.5 - ny) * 9);
    gx.set(nx * 100);
    gy.set(ny * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <Reveal as="li" delay={index * 0.07} className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-card border border-gold/15 bg-white/[0.045] p-[clamp(1.05rem,2.3vh,1.75rem)] backdrop-blur-[6px] transition-colors duration-500 hover:border-gold/40"
      >
        {/* Pointer glow. */}
        <motion.span
          aria-hidden
          style={{ backgroundImage: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* The gold wave, swept once per hover. See .u-gold-wave. */}
        <span
          aria-hidden
          className="u-gold-wave pointer-events-none absolute -inset-y-16 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(230,200,126,0.18),rgba(252,240,208,0.66),rgba(230,200,126,0.18),transparent)] blur-[2px]"
        />

        {/* Content rides forward on Z so the tilt separates it from the face. */}
        <div style={{ transform: "translateZ(38px)" }} className="relative">
          <CardMark index={index} still={still} />
          <h3 className="mt-[clamp(0.6rem,1.5vh,1.25rem)] font-sans text-[clamp(19px,2.45vh,25px)] font-bold leading-[1.2] tracking-tight text-gold">
            {title}
          </h3>
          <p className="mt-[clamp(0.4rem,0.9vh,0.75rem)] text-[clamp(16px,1.85vh,19px)] leading-[1.5] text-gold/80">{body}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Advantages() {
  return (
    // The section is one screen tall and its content is centred in it, so the
    // whole set of cards is visible without scrolling. Everything inside is
    // sized against viewport height rather than in fixed pixels: a fixed size
    // only ever fits one laptop, and this has to hold from a 768 tall window up.
    // Below lg the cards stack into a single column and the section grows past
    // the screen, which is the honest outcome: seven cards cannot be read on a
    // phone at any type size worth setting.
    <section className="u-grain relative flex min-h-[100dvh] items-center overflow-hidden bg-graphite py-[clamp(4.5rem,7vh,7rem)]">
      <Photo
        src="/photo/section-silk.jpg"
        seed="silk"
        tone="dark"
        spec="1448 x 1086"
        label="Чёрный шёлк крупным планом, мягкие складки"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* The silk is already dark, so this is a light hold rather than a wash:
          enough to settle the brightest folds under the cards, not enough to
          flatten the fabric into a black field. */}
      <div className="absolute inset-0 bg-graphite/30" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-[clamp(0.75rem,1.7vh,1.5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[clamp(1rem,2vh,2rem)]">
          <Reveal className="[perspective:1200px]">
            <div className="h-full rounded-card border border-gold/20 bg-white/[0.05] p-[clamp(1.25rem,3vh,2.5rem)] backdrop-blur-[6px]">
              <span aria-hidden className="u-rule-champagne block h-px w-14" />
              <h2 className="mt-[clamp(0.75rem,2vh,1.5rem)] text-[min(clamp(2rem,3.6vw,3rem),5.2vh)] leading-[1.12] text-gold">
                Мы ищем причину, а не <span className="italic">маскируем</span> следствие
              </h2>
              <p className="mt-[clamp(0.75rem,2vh,1.5rem)] max-w-[44ch] text-[clamp(16px,2vh,20px)] leading-[1.55] text-gold/80">
                Эстетический дефект почти всегда имеет медицинское объяснение. Прежде чем предложить
                процедуру, врач разбирается, что происходит с кожей и почему.
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-[clamp(0.75rem,1.7vh,1.5rem)] sm:grid-cols-2">
            {advantages.map((item, index) => (
              <AdvantageCard key={item.title} index={index} title={item.title} body={item.body} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
