import Reveal from "../Reveal";
import { advantages } from "@/content/clinic";

/**
 * The reassurance block, directly under the hero.
 *
 * Deliberately typographic rather than a card grid: the visitor has just seen
 * a photograph fill their screen, and six more boxes would flatten the page.
 * A two column editorial list with hairlines carries the same content and lets
 * the page breathe before the services gallery.
 */
export default function Advantages() {
  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.12]">
              Мы ищем причину, а не{" "}
              <span className="italic">маскируем</span> следствие
            </h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-warm-gray">
              Эстетический дефект почти всегда имеет медицинское объяснение. Прежде чем предложить
              процедуру, врач разбирается, что происходит с кожей и почему.
            </p>
          </Reveal>

          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {advantages.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.06}>
                <div className="u-rule-champagne h-px w-10" />
                <h3 className="mt-5 font-sans text-[17px] font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-warm-gray">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
