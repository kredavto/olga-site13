"use client";

import Reveal from "../Reveal";
import Photo from "../Photo";
import Cta from "../Cta";
import { useBooking } from "../BookingProvider";
import { advantages } from "@/content/clinic";

/**
 * Reasons to trust the clinic, laid out as a constellation.
 *
 * The composition follows the reference the brand supplied: a dark ground with
 * a faint technical grid, one statement and one action held in the centre, and
 * the supporting points scattered around them as photo cards with a caption
 * panel tucked into the corner of each frame.
 *
 * Two cards sit on each side and one above and below the statement, so the six
 * points genuinely ring the centre instead of forming two tall stacks. Frames
 * alternate between portrait and landscape and carry a small individual tilt,
 * because an evenly spaced ring of identical boxes reads as a diagram.
 *
 * It is built from a three column grid with per-card offsets rather than
 * absolute coordinates. Absolute placement looks right at exactly one width and
 * collides at every other, and this section carries six blocks of Russian body
 * copy whose height is not knowable in advance.
 *
 * Below lg the scatter carries no meaning, so it collapses to one column with
 * the statement first and the cards stacked under it.
 */

type Shape = "portrait" | "landscape";

const cards: { shape: Shape; tilt: string; shot: string }[] = [
  {
    shape: "portrait",
    tilt: "lg:-rotate-[1.4deg]",
    shot: "Врач-дерматолог в халате на приёме, дипломы на стене за спиной",
  },
  {
    shape: "landscape",
    tilt: "lg:rotate-[1.1deg]",
    shot: "Медицинская лицензия в рамке на стене клиники, крупный план",
  },
  {
    shape: "landscape",
    tilt: "lg:-rotate-[0.9deg]",
    shot: "Руки врача вскрывают запечатанную упаковку препарата при пациенте",
  },
  {
    shape: "portrait",
    tilt: "lg:rotate-[1.2deg]",
    shot: "Панель управления аппарата крупным планом, маркировка производителя",
  },
  {
    shape: "landscape",
    tilt: "lg:-rotate-[1.1deg]",
    shot: "Диагностика кожи дерматоскопом, лицо пациента в мягком фокусе",
  },
  {
    shape: "landscape",
    tilt: "lg:rotate-[0.8deg]",
    shot: "Врач и пациент за столом на консультации, разговор без процедуры",
  },
];

function Card({ index, className = "" }: { index: number; className?: string }) {
  const item = advantages[index];
  const card = cards[index];

  return (
    <Reveal
      as="figure"
      kind="settle"
      delay={(index % 3) * 0.07}
      className={`mx-auto w-full max-w-[248px] ${card.tilt} ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[14px] bg-charcoal ${
          card.shape === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]"
        }`}
      >
        <Photo
          seed={`advantage-${index}`}
          tone="dark"
          spec={card.shape === "portrait" ? "720 x 900" : "900 x 675"}
          label={card.shot}
          sizes="248px"
          className="object-cover"
        />
      </div>

      {/* The caption sits under the frame and overlaps it, the way the
          reference tucks its label cards into the corner of each photo. */}
      <figcaption className="relative -mt-8 ml-4 mr-[-0.6rem] rounded-[12px] border border-white/10 bg-graphite/85 px-4 py-3.5 backdrop-blur-md">
        <h3 className="font-sans text-[14px] font-semibold leading-snug text-gold">
          {item.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-warm-white/60">{item.body}</p>
      </figcaption>
    </Reveal>
  );
}

export default function Advantages() {
  const { open } = useBooking();

  return (
    <section className="u-grain relative overflow-hidden bg-graphite py-24 lg:py-28">
      <div className="u-grid-lines absolute inset-0" aria-hidden />
      {/* Light pooled behind the centre so the statement sits on its own glow
          rather than on a flat field. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,97,0.1),transparent_66%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid items-center gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-x-8">
          {/* Centre column: one card above the statement, one below. */}
          <div className="order-1 flex flex-col items-center gap-12 lg:order-2 lg:gap-10">
            {/* The statement leads in the markup so the section heading is
                what a screen reader and a crawler meet first. The card above it
                is placed visually with order, not by sitting earlier in the DOM. */}
            <div className="order-1 text-center lg:order-2">
              <Reveal>
                <h2 className="mx-auto max-w-[16ch] text-[clamp(2rem,3.5vw,3rem)] leading-[1.14] text-warm-white">
                  Мы ищем причину, а не <span className="italic text-gold">маскируем</span>{" "}
                  следствие
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mx-auto mt-6 max-w-[40ch] text-[17px] leading-relaxed text-warm-white/70 lg:text-[18px]">
                  Эстетический дефект почти всегда имеет медицинское объяснение. Прежде чем
                  предложить процедуру, врач разбирается, что происходит с кожей и почему.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 flex justify-center">
                  <Cta variant="onDark" size="lg" onClick={() => open()}>
                    Записаться на консультацию
                  </Cta>
                </div>
              </Reveal>
            </div>

            <Card index={2} className="order-2 lg:order-1 xl:-translate-x-24" />
            <Card index={5} className="order-3 xl:translate-x-24" />
          </div>

          {/* Left arm. Follows the statement on small screens. */}
          <div className="order-2 flex flex-col gap-12 sm:flex-row sm:gap-8 lg:order-1 lg:flex-col lg:gap-14">
            <Card index={0} className="lg:translate-x-2" />
            <Card index={1} className="lg:-translate-x-6" />
          </div>

          <div className="order-3 flex flex-col gap-12 sm:flex-row sm:gap-8 lg:flex-col lg:gap-14">
            <Card index={3} className="lg:-translate-x-1" />
            <Card index={4} className="lg:translate-x-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
