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
function Comparison({ before, after, label }: { before: string; after: string; label: string }) {
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
      className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-card bg-ivory"
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
        seed={after}
        spec="1200 x 900"
        label={`${label}. Кадр после курса процедур, тот же ракурс и свет`}
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Photo
          seed={before}
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
    <section id="results" className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          align="wide"
          title={
            <>
              Результаты, которые можно <span className="italic">проверить</span>
            </>
          }
          body="Каждый кейс описан полностью: что было, какой методикой работали, сколько процедур потребовалось и сколько заняло восстановление."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal kind="settle">
            <Comparison before={active.beforeSeed} after={active.afterSeed} label={active.problem} />
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
              className="mt-8"
            >
              <h3 className="font-display text-[28px] leading-tight lg:text-[32px]">
                {active.problem}
              </h3>

              <dl className="mt-8 space-y-6">
                {[
                  ["Методика", active.method],
                  ["Препараты", active.drugs],
                  ["Количество процедур", active.sessions],
                  ["Результат", active.outcome],
                  ["Восстановление", active.recovery],
                ].map(([term, value]) => (
                  <div key={term} className="grid gap-1.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                    <dt className="u-meta pt-1 text-warm-gray">{term}</dt>
                    <dd className="leading-relaxed">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10 border-t border-charcoal/10 pt-5 text-[13px] leading-relaxed text-warm-gray">
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
