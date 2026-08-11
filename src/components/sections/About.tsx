"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import Reveal from "../Reveal";
import Photo from "../Photo";
import Cta from "../Cta";
import { useBooking } from "../BookingProvider";
import { brand } from "@/content/clinic";

/**
 * The clinic itself.
 *
 * A single pinned photograph with the narrative moving over it. The section
 * exists to slow the page down after the density of equipment and preparations,
 * so it holds one statement and one action, nothing else.
 */
export default function About() {
  const { open } = useBooking();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-graphite">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Photo
          seed="interior"
          tone="dark"
          spec="1920 x 1200"
          label="Интерьер клиники: зона ожидания или процедурный кабинет, естественный свет"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/80 to-graphite/40" />
      <div className="u-grain absolute inset-0" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-28 lg:px-10 lg:py-40">
        <div className="max-w-[62ch]">
          <Reveal kind="focus">
            <p className="font-display text-[clamp(1.75rem,3.2vw,2.8rem)] leading-[1.28] text-warm-white">
              {brand.name} это центр медицинской косметологии и дерматологии, где естественная
              красота сочетается с научными технологиями.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-warm-white/65">
              Мы не устраняем эстетический недостаток изолированно. Врач разбирается, почему кожа
              повела себя так, и уже из этого собирает план: иногда это курс процедур, иногда
              обследование у смежного специалиста, а иногда изменение домашнего ухода.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-warm-white/65">
              Такой подход занимает больше времени на входе и почти всегда экономит его дальше.
              Пациент понимает, за что платит, и видит, из чего складывается результат.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Cta variant="onDark" onClick={() => open()}>
                Записаться на консультацию
              </Cta>
              <p className="text-[14px] text-warm-white/50">
                Первая консультация занимает около 40 минут
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
