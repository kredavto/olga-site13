"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import SectionHead from "../SectionHead";
import Photo from "../Photo";
import Reveal from "../Reveal";
import Cta from "../Cta";
import { useBooking } from "../BookingProvider";
import { doctors } from "@/content/clinic";

/**
 * The team.
 *
 * Portraits carry this section, so the grid is built around them: full bleed
 * photography with the credentials arriving on a glass panel over the lower
 * half. Diplomas open in a panel rather than a new page, because a visitor who
 * wants to check a certificate is mid decision and should not be sent away.
 */
export default function Doctors() {
  const { open } = useBooking();
  const [openDiplomas, setOpenDiplomas] = useState<string | null>(null);

  return (
    <section id="doctors" className="u-grain relative overflow-hidden bg-graphite py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1280px] px-5 lg:px-10">
        <SectionHead
          tone="light"
          align="wide"
          title={
            <>
              Врачи, которые могут <span className="italic">отказать</span>
            </>
          }
          body="Каждый специалист клиники имеет медицинское образование и действующий сертификат. Если процедура вам не нужна, вы услышите об этом на консультации."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {doctors.map((doctor, index) => (
            <Reveal as="article" kind="settle" key={doctor.slug} delay={index * 0.07}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-card bg-ink">
                <Photo
                  src={doctor.photo}
                  seed={doctor.photoSeed}
                  tone="dark"
                  spec="800 x 1066"
                  label={`Портрет: ${doctor.name}, ${doctor.role}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
                    doctor.photoPosition === "top" ? "object-top" : "object-center"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-[25px] leading-tight text-warm-white">
                    {doctor.name}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-snug text-warm-white/70">{doctor.role}</p>
                  <p className="mt-3 text-[13px] text-warm-white/50">{doctor.experience}</p>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-[13px] leading-relaxed text-warm-white/65">
                        {doctor.focus}
                      </p>
                      <p className="pt-3 text-[12px] leading-relaxed text-warm-white/65">
                        {doctor.education}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => setOpenDiplomas(doctor.slug)}
                          className="rounded-full border border-white/25 px-3.5 py-2 text-[12px] text-warm-white transition-colors hover:bg-white/10"
                        >
                          Дипломы
                        </button>
                        <button
                          type="button"
                          onClick={() => open({ doctor: doctor.name })}
                          className="rounded-full bg-warm-white px-3.5 py-2 text-[12px] text-charcoal transition-colors hover:bg-sand"
                        >
                          Записаться
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openDiplomas && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center p-5"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute inset-0 bg-graphite/70 backdrop-blur-sm"
              onClick={() => setOpenDiplomas(null)}
            />
            {doctors
              .filter((d) => d.slug === openDiplomas)
              .map((doctor) => (
                <motion.div
                  key={doctor.slug}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[520px] rounded-card bg-warm-white p-8"
                >
                  <h3 className="font-display text-[28px] leading-tight text-bronze-bright">{doctor.name}</h3>
                  <p className="mt-1.5 text-[15px] text-warm-gray">{doctor.role}</p>

                  <div className="u-rule-champagne mt-6 h-px w-full" />

                  <p className="mt-6 text-[15px] leading-relaxed">{doctor.education}</p>

                  <ul className="mt-5 space-y-3">
                    {doctor.credentials.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-warm-gray">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-sage" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Scans of the actual documents belong here. See
                      docs/CONTENT-CHECKLIST.md. */}
                  <p className="mt-6 rounded-full bg-sage-wash px-4 py-3 text-[13px] leading-relaxed text-sage-deep">
                    Оригиналы дипломов и сертификатов находятся в клинике. Администратор покажет их
                    по вашей просьбе.
                  </p>

                  <div className="mt-7 flex gap-3">
                    <Cta
                      onClick={() => {
                        setOpenDiplomas(null);
                        open({ doctor: doctor.name });
                      }}
                    >
                      Записаться к врачу
                    </Cta>
                    <Cta variant="secondary" onClick={() => setOpenDiplomas(null)}>
                      Закрыть
                    </Cta>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
