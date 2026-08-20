"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import Photo from "../Photo";
import Reveal from "../Reveal";
import { advantages } from "@/content/clinic";

/**
 * The reassurance block, directly under the hero.
 *
 * The ground is a bright warm still life, so the whole section reads dark on
 * light rather than light on dark. That is the right way round for this design
 * system: terracotta is a seal meant for a light ground, where it measures
 * 4.6:1, and here it can carry the headings directly instead of standing in
 * with the pale end of its own gradient.
 *
 * The photograph is busy as well as bright, so the cards are near opaque
 * parchment rather than glass. Type needs a settled ground; a translucent card
 * over travertine and shell would put a different colour behind every line.
 *
 * The section heading takes the seal at 4.5:1, which is fine at its size. The
 * card headings take the deep end of the accent instead: they fall below the
 * 24px where the large text threshold applies, and the seal clears the 4.5:1
 * they then need by a hundredth. The deep value holds 6.3:1 on the same card.
 *
 * Everything here is set in cards. Each carries a pointer driven tilt, an
 * accent wave that sweeps across on hover, and a mark in the corner with its own
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
          className="block h-px w-10 origin-left bg-gradient-to-r from-terracotta to-transparent"
          animate={still ? undefined : { scaleX: [0.45, 1, 0.45] }}
          transition={loop(5.5)}
        />
      );
    case 1: // a single point breathing
      return (
        <motion.span
          aria-hidden
          className="block size-[7px] rounded-full bg-terracotta"
          animate={still ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.85, 1.15, 0.85] }}
          transition={loop(4.2)}
        />
      );
    case 2: // a ring opening outward
      return (
        <motion.span
          aria-hidden
          className="block size-[13px] rounded-full border border-terracotta"
          animate={still ? undefined : { scale: [0.7, 1.05, 0.7], opacity: [0.5, 1, 0.5] }}
          transition={loop(6)}
        />
      );
    case 3: // a quarter arc turning
      return (
        <motion.span
          aria-hidden
          className="block size-[14px] rounded-full border border-transparent border-t-terracotta border-r-terracotta"
          animate={still ? undefined : { rotate: [0, 180, 360] }}
          transition={still ? undefined : { duration: 14, repeat: Infinity, ease: "linear" }}
        />
      );
    case 4: // a diamond tipping on its axis
      return (
        <motion.span
          aria-hidden
          className="block size-[10px] rotate-45 border border-terracotta"
          animate={still ? undefined : { rotate: [45, 135, 45], opacity: [0.55, 1, 0.55] }}
          transition={loop(7)}
        />
      );
    default: // two rules crossing
      return (
        <span aria-hidden className="relative block size-[14px]">
          <motion.span
            className="absolute left-0 top-1/2 h-px w-full bg-terracotta"
            animate={still ? undefined : { scaleX: [1, 0.35, 1] }}
            transition={loop(5)}
          />
          <motion.span
            className="absolute left-1/2 top-0 h-full w-px bg-terracotta"
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
      `radial-gradient(circle at ${x}% ${y}%, rgba(176,90,54,0.13), transparent 62%)`,
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
        className="group relative h-full overflow-hidden rounded-card border border-taupe bg-warm-white/92 p-[clamp(1.05rem,2.3vh,1.75rem)] shadow-[0_12px_32px_-18px_rgba(42,43,47,0.28)] backdrop-blur-[3px] transition-colors duration-500 hover:border-terracotta"
      >
        {/* Pointer glow. */}
        <motion.span
          aria-hidden
          style={{ backgroundImage: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* The accent wave, swept once per hover. See .u-accent-wave. */}
        <span
          aria-hidden
          className="u-accent-wave pointer-events-none absolute -inset-y-16 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(176,90,54,0.10),rgba(176,90,54,0.28),rgba(176,90,54,0.10),transparent)] blur-[3px]"
        />

        {/* Content rides forward on Z so the tilt separates it from the face. */}
        <div style={{ transform: "translateZ(38px)" }} className="relative">
          <CardMark index={index} still={still} />
          <h3 className="mt-[clamp(0.6rem,1.5vh,1.25rem)] font-display text-[clamp(20px,2.6vh,27px)] leading-[1.15] text-terracotta-deep">
            {title}
          </h3>
          <p className="mt-[clamp(0.4rem,0.9vh,0.75rem)] text-[clamp(16px,1.85vh,19px)] leading-[1.5] text-charcoal">{body}</p>
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
    <section className="u-grain relative flex min-h-[100dvh] items-center overflow-hidden bg-warm-white py-[clamp(4.5rem,7vh,7rem)]">
      <Photo
        src="/photo/section-stone.jpg"
        seed="stone"
        tone="light"
        spec="1024 x 1536"
        label="Телефон с заставкой клиники на створке раковины, травертин, мягкий солнечный свет"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* A parchment wash, not a dark one. It pulls the frame's range together
          so the cards sit on one surface instead of on a bright stone edge in
          one corner and a black phone in the middle, and it ties the
          photograph to the parchment the rest of the page is built on. */}
      <div className="absolute inset-0 bg-warm-white/55" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 lg:px-10">
        <div className="grid gap-[clamp(0.75rem,1.7vh,1.5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[clamp(1rem,2vh,2rem)]">
          <Reveal className="[perspective:1200px]">
            <div className="h-full rounded-card border border-taupe bg-warm-white/92 p-[clamp(1.25rem,3vh,2.5rem)] shadow-[0_12px_32px_-18px_rgba(42,43,47,0.28)] backdrop-blur-[3px]">
              <span aria-hidden className="u-rule-champagne block h-px w-14" />
              <h2 className="mt-[clamp(0.75rem,2vh,1.5rem)] text-[min(clamp(2rem,3.6vw,3rem),5.2vh)] leading-[1.12] text-terracotta">
                Мы ищем причину, а не <span className="italic">маскируем</span> следствие
              </h2>
              <p className="mt-[clamp(0.75rem,2vh,1.5rem)] max-w-[34ch] text-[clamp(24px,3vh,30px)] leading-[1.4] text-charcoal">
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
