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
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          align="wide"
          title={
            <>
              Оборудование, а не <span className="italic">обещания</span>
            </>
          }
          body="Каждая платформа имеет регистрационное удостоверение и проходит плановое сервисное обслуживание. Мы называем производителя и страну, потому что это проверяемо."
        />

        <div className="mt-14 grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {devices.map((device, index) => {
            const isLead = index === 0;
            return (
              <Reveal
                as="article"
                kind="settle"
                key={device.name}
                delay={index * 0.05}
                className={`${cellSpans[index]} group relative overflow-hidden rounded-card bg-charcoal`}
              >
                <Photo
                  src={device.photo}
                  seed={device.photoSeed}
                  tone="dark"
                  spec={isLead ? "1200 x 900" : "800 x 600"}
                  label={`${device.name}: аппарат в кабинете, деталь панели крупным планом`}
                  sizes={isLead ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className={`object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
                    device.photoPosition === "top" ? "object-top" : "object-center"
                  }`}
                />

                {/* The platforms are white and grey machines under clinical
                    light, so these cards are the brightest photography on the
                    page. The scrim reaches further up the frame than a bottom
                    edge gradient would, and the type carries a halo on top: a
                    gradient strong enough on its own to hold a caption over a
                    lit panel would have blacked out the machine. */}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/94 via-graphite/62 to-graphite/12" />

                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3
                    className={`u-on-photo-strong font-display leading-tight text-warm-white ${
                      isLead ? "text-[34px] lg:text-[44px]" : "text-[24px]"
                    }`}
                  >
                    {device.name}
                  </h3>
                  <p className="u-on-photo-strong mt-2 text-[14px] text-warm-white/80">
                    {device.maker}, {device.country}
                  </p>
                  <p className="u-on-photo-strong mt-4 max-w-[42ch] text-[14px] leading-relaxed text-warm-white">
                    {device.purpose}
                  </p>
                  <p className="u-on-photo-strong mt-2 max-w-[42ch] text-[13px] leading-relaxed text-warm-white/75">
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
