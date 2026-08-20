import Photo from "../Photo";
import Reveal from "../Reveal";
import { advantages } from "@/content/clinic";

/**
 * The reassurance block, directly under the hero.
 *
 * Set as plain type on the photograph: no panels, no grid, one column reading
 * top to bottom. Without a card to sit on, the photograph itself becomes the
 * ground, so the wash over it goes to 82% parchment. That leaves the shell, the
 * travertine and the warm shadow reading as a texture behind the words rather
 * than as a picture competing with them, and it puts every line on one settled
 * ground instead of on whatever happens to fall under it.
 *
 * The measure is capped well short of the container. A single column across
 * 1280px would run past 120 characters a line, which is unreadable at any size;
 * capping it also leaves the right of the frame open, so the photograph is
 * visible rather than merely implied.
 *
 * The tilt, the accent wave and the six corner marks went with the cards. They
 * were card behaviours: there is nothing left for a pointer to tilt.
 */
export default function Advantages() {
  return (
    // One screen tall with the column centred in it. Sizes are set against
    // viewport height rather than in pixels: this has to hold from a 768 tall
    // window up, and a fixed size only ever fits one laptop. Below lg the
    // section grows past the screen, which is the honest outcome for seven
    // blocks of text on a phone.
    <section className="u-grain relative flex min-h-[100dvh] items-center overflow-hidden bg-warm-white py-[clamp(3.25rem,5.5vh,6rem)]">
      <Photo
        src="/photo/section-stone.jpg"
        seed="stone"
        tone="light"
        spec="1024 x 1536"
        label="Телефон с заставкой клиники на створке раковины, травертин, мягкий солнечный свет"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Heavier than it was under the cards, for the reason above. The second
          layer is weighted to the left, where the column sits, so the right of
          the frame keeps more of the photograph. */}
      <div className="absolute inset-0 bg-warm-white/82" />
      <div className="absolute inset-0 bg-gradient-to-r from-warm-white/70 via-warm-white/20 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 lg:px-10">
        <div className="max-w-[46rem]">
          <Reveal>
            <span aria-hidden className="u-rule-champagne block h-px w-14" />
            <h2 className="mt-[clamp(0.75rem,2vh,1.5rem)] text-[min(clamp(1.85rem,3.4vw,2.9rem),4.4vh)] leading-[1.12] text-terracotta">
              Мы ищем причину, а не <span className="italic">маскируем</span> следствие
            </h2>
            <p className="mt-[clamp(0.5rem,1.3vh,1.1rem)] max-w-[54ch] text-[clamp(16px,1.95vh,20px)] leading-[1.5] text-charcoal">
              Эстетический дефект почти всегда имеет медицинское объяснение. Прежде чем предложить
              процедуру, врач разбирается, что происходит с кожей и почему.
            </p>
          </Reveal>

          <dl className="mt-[clamp(1rem,2.4vh,2rem)] space-y-[clamp(0.5rem,1.35vh,1.15rem)]">
            {advantages.map((item, index) => (
              <Reveal key={item.title} delay={0.06 + index * 0.05}>
                <dt className="font-display text-[clamp(17px,2.1vh,23px)] leading-[1.2] text-terracotta-deep">
                  {item.title}
                </dt>
                <dd className="mt-[clamp(0.1rem,0.4vh,0.35rem)] max-w-[60ch] text-[clamp(14px,1.6vh,17px)] leading-[1.5] text-charcoal">
                  {item.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
