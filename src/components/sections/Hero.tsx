"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import Cta from "../Cta";
import Photo from "../Photo";
import { useBooking } from "../BookingProvider";
import { brand } from "@/content/clinic";

/**
 * Full bleed opener.
 *
 * The composition follows the reference set: a single photograph holding the
 * viewport, the statement set in display serif with one italic word carrying
 * the emphasis, and the functional text pinned to the corners rather than
 * stacked in the centre. Parallax is slight on purpose. The photograph should
 * feel like it is behind glass, not like it is sliding.
 *
 * ASSET SLOT: replace the still with the clinic's own footage.
 * Set `videoSrc` to a 1920x1080 H.264 file (target under 4 MB, muted, looping)
 * and the still below becomes its poster frame. See docs/PHOTOGRAPHY.md.
 */
const videoSrc: string | null = null;

export default function Hero() {
  const { open } = useBooking();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Ambient light that tracks the pointer. Motion values only, so pointer
  // movement never re-renders anything.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.4);
  const glowX = useSpring(px, { stiffness: 40, damping: 20 });
  const glowY = useSpring(py, { stiffness: 40, damping: 20 });
  const glowLeft = useTransform(glowX, (v) => `${v * 100}%`);
  const glowTop = useTransform(glowY, (v) => `${v * 100}%`);

  const trackPointer = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    px.set(event.clientX / window.innerWidth);
    py.set(event.clientY / window.innerHeight);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={trackPointer}
      className="relative min-h-[100dvh] overflow-hidden bg-graphite"
    >
      {/* The parallax layer is oversized so there is room to travel. Scaling
          from the centre spent half that headroom above the frame and cut the
          top of the photograph, which is where the subject's hair is. Anchoring
          the origin to the top keeps the first row of the image flush with the
          top of the section and sends the whole 16% downward, into the dark
          floor where nothing is lost. The layer only ever travels down, so the
          top edge stays covered while the hero is on screen. */}
      <motion.div style={{ y: mediaY }} className="absolute inset-0 origin-top scale-[1.16]">
        {videoSrc ? (
          <video className="size-full object-cover" autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Photo
            src="/photo/hero.jpg"
            seed="hero"
            tone="dark"
            spec="2752 x 1536"
            label="Пациентка в холле клиники, врач в глубине кадра"
            priority
            sizes="100vw"
            /* The frame is composed left to right: a deep shadowed wall, then the
               subject, then bright windows. Landscape keeps the whole run. In
               portrait the crop is pushed right so the subject stays in frame
               instead of being sliced by the centre default. */
            className="object-cover object-[64%_center] md:object-center"
          />
        )}
      </motion.div>

      {/* Scrim, tuned to this photograph rather than applied flat.
          The left third of the frame is already a shadowed wall, so the
          horizontal wash only has to carry the text column and is gone by the
          midpoint, leaving the subject and the window light untouched. The
          vertical layers are thin: enough for the header over bright glass at
          the top and for the CTAs at the very bottom. */}
      <div className="absolute inset-0 bg-gradient-to-r from-graphite/85 via-graphite/45 to-transparent md:from-graphite/80 md:via-graphite/25 md:to-transparent" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-graphite/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-graphite/90 via-graphite/45 to-transparent md:h-64 md:from-graphite/70 md:via-transparent" />

      <motion.div
        aria-hidden
        style={{ left: glowLeft, top: glowTop }}
        className="pointer-events-none absolute size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-soft-light"
      >
        <div className="size-full rounded-full bg-[radial-gradient(circle,rgba(231,220,198,0.55),transparent_62%)]" />
      </motion.div>

      {/* Two slow drifting blooms. This is the whole of the ambient motion:
          enough to keep the frame alive, quiet enough to read as light. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(200,179,146,0.22),transparent_65%)] blur-2xl"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Warm only. The photograph's light is amber and cream, so the second
          bloom is champagne rather than the sage used for interactive states:
          a cool halo over this frame reads as a colour cast. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-1/4 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(231,220,198,0.16),transparent_65%)] blur-2xl"
        animate={{ x: [0, -50, 0], y: [0, 36, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="u-grain absolute inset-0" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 lg:px-10 lg:pb-28"
      >
        {/* The copy column stops before the subject starts. Capping it at 54%
            on wide screens is what keeps the type inside the shadowed part of
            the frame instead of running across her jacket. */}
        <div className="lg:w-[54%]">
        {/* Two explicit lines. Russian compounds are long, so letting the
            headline wrap on its own produced four lines at desktop. Emphasis is
            the italic of the same family, never a second typeface.

            Set for this photograph: leading opened from 1.08 to 1.14 and a
            touch of positive tracking, because tight Didone spacing reads hard
            against a soft, warm, shallow depth of field image. */}
        <h1 className="max-w-[26ch] text-[clamp(2rem,4.05vw,3.65rem)] leading-[1.14] tracking-[0.005em] text-cream">
          {[
            [{ text: "Естественная", italic: false }, { text: "красота,", italic: false }],
            [{ text: "доказательная", italic: true }, { text: "медицина", italic: false }],
          ].map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((word, wordIndex) => (
                <motion.span
                  key={word.text}
                  initial={{ opacity: 0, y: "0.32em", filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.14 + (lineIndex * 2 + wordIndex) * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block pr-[0.24em] ${
                    word.italic ? "pb-[0.06em] italic leading-[1.14]" : ""
                  }`}
                >
                  {word.text}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-7 max-w-[38ch] text-[16px] leading-relaxed text-cream/70 lg:text-[17px]"
        >
          Врачи-дерматологи с опытом от 7 лет, оригинальные препараты и сертифицированное
          оборудование. Программа под вашу кожу.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Cta variant="onDark" onClick={() => open()}>
            Записаться на консультацию
          </Cta>
          <Cta variant="ghost" href="#results">
            Посмотреть результаты
          </Cta>
        </motion.div>
        </div>
      </motion.div>

      <span className="sr-only">{brand.descriptor}</span>
    </section>
  );
}
