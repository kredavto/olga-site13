import SectionHead from "../SectionHead";
import Photo from "../Photo";
import Reveal from "../Reveal";
import { devices } from "@/content/clinic";

/**
 * Platforms.
 *
 * A bento with exactly six cells for six devices. The lead cell is the SMAS
 * platform because that is the procedure most visitors arrive for. Every cell
 * carries a real photograph, which is what stops a specification grid from
 * reading as six text boxes.
 */
const cellSpans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export default function Equipment() {
  return (
    <section id="equipment" className="bg-pearl py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <SectionHead
          align="wide"
          title={
            <>
              Оборудование, а не <span className="italic">обещания</span>
            </>
          }
          body="Каждая платформа имеет регистрационное удостоверение и проходит плановое сервисное обслуживание. Мы называем производителя и страну, потому что это проверяемо."
        />

        <div className="mt-14 grid auto-rows-[minmax(300px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {devices.map((device, index) => {
            const isLead = index === 0;
            return (
              <Reveal
                as="article"
                kind="settle"
                key={device.name}
                delay={index * 0.05}
                className={`${cellSpans[index]} group relative overflow-hidden rounded-card bg-ink`}
              >
                {/* The frame is contained and given its own band at the top of
                    the cell, so the whole platform is visible and the caption
                    sits under it on the ink rather than across it. A cover crop
                    cut the console, the screen or the handpiece off every card;
                    containing it without reserving the space put the type over
                    the machine instead. */}
                <div
                  className={`absolute inset-x-4 top-4 ${
                    isLead ? "bottom-[46%]" : "bottom-[58%]"
                  }`}
                >
                  <Photo
                    src={device.photo}
                    seed={device.photoSeed}
                    tone="dark"
                    spec={isLead ? "1200 x 900" : "800 x 600"}
                    label={`${device.name}: аппарат в кабинете, деталь панели крупным планом`}
                    sizes={isLead ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-contain object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3
                    className={`font-display leading-tight text-warm-white ${
                      isLead ? "text-[34px] lg:text-[44px]" : "text-[24px]"
                    }`}
                  >
                    {device.name}
                  </h3>
                  <p className="mt-2 text-[14px] text-warm-white/80">
                    {device.maker}, {device.country}
                  </p>
                  <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-warm-white">
                    {device.purpose}
                  </p>
                  <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-warm-white/75">
                    {device.advantage}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
