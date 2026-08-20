"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@phosphor-icons/react";

import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { faq } from "@/content/clinic";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-pearl py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <SectionHead
            title={
              <>
                Вопросы, которые задают <span className="italic">чаще всего</span>
              </>
            }
          />

          <ul className="border-t border-taupe/70">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal as="li" key={item.q} delay={Math.min(index * 0.03, 0.2)}>
                  <div className="border-b border-taupe/70">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-display text-[21px] leading-snug lg:text-[24px]">
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-taupe"
                        >
                          <Plus size={14} />
                        </motion.span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[68ch] pb-7 pr-12 text-[15px] leading-relaxed text-warm-gray lg:text-[16px]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
