import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { drugPromise, drugs } from "@/content/clinic";

/**
 * Preparations.
 *
 * Split composition: the catalogue on the left, the handling promise on the
 * right. The promise is the part that actually reduces anxiety, so it gets its
 * own column rather than being a footnote under the list.
 */
export default function Drugs() {
  const groups = Array.from(new Set(drugs.map((d) => d.group)));

  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHead
              align="wide"
              title={
                <>
                  Препараты с <span className="italic">прослеживаемым</span> происхождением
                </>
              }
            />

            <div className="mt-12 space-y-10">
              {groups.map((group) => (
                <Reveal key={group}>
                  <h3 className="u-meta text-warm-gray">{group}</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {drugs
                      .filter((d) => d.group === group)
                      .map((drug) => (
                        <div
                          key={drug.name}
                          className="rounded-card border border-charcoal/10 bg-milk p-5 transition-colors duration-300 hover:border-sage/50"
                        >
                          <p className="font-display text-[22px] leading-none">{drug.name}</p>
                          <p className="mt-3 text-[14px] leading-relaxed text-warm-gray">
                            {drug.note}
                          </p>
                        </div>
                      ))}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Registration numbers are clinic specific and must be verified
                against the state register before publication. */}
            <p className="mt-10 text-[13px] leading-relaxed text-warm-gray">
              Все препараты применяются в соответствии с инструкцией производителя и имеют
              регистрацию в Российской Федерации. Регистрационное удостоверение на конкретный
              препарат администратор предоставляет по запросу.
            </p>
          </div>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-card bg-sage-wash p-8 lg:p-10">
              <ShieldCheck size={30} weight="thin" className="text-sage-deep" />
              <h3 className="mt-6 font-display text-[28px] leading-tight">
                Как мы обращаемся с препаратом
              </h3>
              <ul className="mt-7 space-y-5">
                {drugPromise.map((item) => (
                  <li key={item} className="flex gap-4 text-[15px] leading-relaxed">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
