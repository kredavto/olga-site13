"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

import SectionHead from "../SectionHead";
import Photo from "../Photo";
import Reveal from "../Reveal";
import { cases } from "@/content/clinic";

/**
 * Before and after.
 *
 * A drag handle rather than two photos side by side: the comparison only works
 * when the visitor controls it, and the reveal is what makes the difference
 * legible. Keyboard users get arrow key control on the slider itself.
 */
function Comparison({
  before,
  after,
  label,
}: {
  before: { photo: string; seed: string };
  after: { photo: string; seed: string };
  label: string;
}) {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={ref}
      // Height is what has to fit, so height is what is set: the 4:5 ratio
      // then derives the width. Sizing by width instead would have needed a
      // wider crop, and the pairs are portrait, so a wider frame cuts through
      // the faces the comparison exists to show.
      className="relative aspect-[4/5] h-[min(52vh,560px)] w-auto touch-pan-y select-none overflow-hidden rounded-card bg-ivory"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Photo
        src={after.photo}
        seed={after.seed}
        spec="1200 x 900"
        label={`${label}. Кадр после курса процедур, тот же ракурс и свет`}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Photo
          src={before.photo}
          seed={before.seed}
          spec="1200 x 900"
          label={`${label}. Кадр до начала лечения`}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      <span className="u-meta pointer-events-none absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-warm-white backdrop-blur-md">
        До
      </span>
      <span className="u-meta pointer-events-none absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-warm-white backdrop-blur-md">
        После
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-warm-white/90"
        style={{ left: `${position}%` }}
      >
        <span className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white text-charcoal shadow-[0_10px_30px_-12px_rgba(29,29,29,0.7)]">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
            <path d="M5 1L1 6l4 5M11 1l4 5-4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Сравнение до и после: ${label}`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export default function Results() {
  const [index, setIndex] = useState(0);
  const active = cases[index];

  return (
    // One screen tall, content sitting at the top of it rather than centred.
    // The 1cm lift comes straight off the top padding, and that padding is
    // floored above the header's 73px: centring instead put the heading behind
    // the header bar on a 768 tall window, where the free space is too small to
    // absorb the lift.
    <section
      id="results"
      className="min-h-[100dvh] bg-warm-white pb-[clamp(2rem,5vh,5rem)] pt-[calc(clamp(8rem,12vh,10rem)-1cm)]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          align="wide"
          title={
            <>
              Результаты, которые можно <span className="italic">проверить</span>
            </>
          }
          titleClass="text-[min(clamp(2.1rem,4.4vw,3.7rem),4.5vh)]"
          bodyGapClass="mt-[clamp(0.75rem,2vh,1.5rem)]"
          // The colour carries "!" because the shared default sets charcoal at
          // 85% and two colour utilities on one element resolve by stylesheet
          // order, not by the order they are written here.
          bodyClass="text-[clamp(20px,2.4vh,24px)] text-charcoal! lg:text-[clamp(20px,2.4vh,24px)]"
          body="Каждый кейс описан полностью: что было, какой методикой работали, сколько процедур потребовалось и сколько заняло восстановление."
        />

        <div className="mt-[clamp(1.25rem,3vh,3rem)] grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-14">
          <Reveal kind="settle" className="mx-auto w-fit lg:mx-0">
            <Comparison
              before={{ photo: active.beforePhoto, seed: active.beforeSeed }}
              after={{ photo: active.afterPhoto, seed: active.afterSeed }}
              label={active.problem}
            />
          </Reveal>

          <div>
            <div className="flex gap-2">
              {cases.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className={`relative h-1 flex-1 overflow-hidden rounded-full transition-colors ${
                    i === index ? "bg-charcoal" : "bg-charcoal/15 hover:bg-charcoal/30"
                  }`}
                >
                  <span className="sr-only">Кейс {i + 1}</span>
                </button>
              ))}
            </div>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-[clamp(1rem,2.4vh,2rem)] max-w-[54rem]"
            >
              <h3 className="font-display text-[clamp(28px,3.8vh,36px)] leading-tight text-bronze-bright">
                {active.problem}
              </h3>

              <dl className="mt-[clamp(1rem,2.4vh,2rem)] space-y-[clamp(0.6rem,1.5vh,1.1rem)]">
                {[
                  ["Методика", active.method],
                  ["Препараты", active.drugs],
                  ["Количество процедур", active.sessions],
                  ["Результат", active.outcome],
                  ["Восстановление", active.recovery],
                ].map(([term, value]) => (
                  <div key={term} className="grid gap-1.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                    <dt className="u-meta-lg pt-1 text-charcoal/75">{term}</dt>
                    <dd className="text-[clamp(18px,2.2vh,22px)] leading-relaxed text-charcoal">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-[clamp(0.75rem,1.7vh,1.75rem)] border-t border-charcoal/10 pt-[clamp(0.75rem,1.6vh,1.25rem)] text-[clamp(14px,1.6vh,15px)] leading-relaxed text-charcoal/70">
                Результат индивидуален и зависит от исходного состояния, возраста и соблюдения
                рекомендаций врача. Фотографии публикуются с письменного согласия пациента.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
