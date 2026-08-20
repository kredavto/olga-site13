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
    <section className="u-grain relative flex min-h-[100dvh] items-center overflow-hidden bg-warm-white py-[clamp(2.25rem,4.5vh,5.5rem)]">
      {/* The frame is contained rather than cropped, so the whole still life is
          on the page: the shell, the phone and the shadow across the travertine
          all read. Contained means the portrait source no longer fills a
          landscape band, so it takes the right of the section and the column
          takes the left, instead of the two sharing one surface.

          Below lg there is no room for that pairing. There the photograph sits
          behind the text at low opacity, still whole, as a warm ground. */}
      <div className="absolute inset-y-0 right-0 w-full opacity-25 lg:w-[46%] lg:opacity-100">
        <Photo
          src="/photo/section-stone.jpg"
          seed="stone"
          tone="light"
          spec="1024 x 1536"
          label="Телефон с заставкой клиники на створке раковины, травертин, мягкий солнечный свет"
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-contain object-center brightness-[1.06] saturate-[1.04] lg:object-right"
        />
      </div>

      {/* Only the edge of the photograph needs softening now: the type sits on
          parchment, not on the image. The band is narrow and one sided, so the
          contained frame does not end in a hard vertical seam. */}
      <div className="absolute inset-y-0 right-0 hidden w-[52%] bg-gradient-to-r from-warm-white via-warm-white/25 to-transparent lg:block" />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 lg:px-10 lg:pr-[calc((100vw+min(100vw,1280px))/2-54vw+3rem)]">
        <div className="max-w-[46rem] lg:max-w-none">
          <Reveal>
            <span aria-hidden className="u-rule-champagne block h-px w-14" />
            <h2 className="mt-[clamp(0.5rem,1.5vh,1.25rem)] text-[min(clamp(2.1rem,3.8vw,3.3rem),5vh)] leading-[1.12] text-terracotta">
              Мы ищем причину, а не <span className="italic">маскируем</span> следствие
            </h2>
            <p className="mt-[clamp(0.5rem,1.3vh,1.1rem)] lg:max-w-none max-w-[54ch] text-[clamp(18px,2.2vh,23px)] leading-[1.5] text-charcoal">
              Эстетический дефект почти всегда имеет медицинское объяснение. Прежде чем предложить
              процедуру, врач разбирается, что происходит с кожей и почему.
            </p>
          </Reveal>

          <dl className="mt-[clamp(0.85rem,1.9vh,1.75rem)] space-y-[clamp(0.45rem,1.05vh,1rem)]">
            {advantages.map((item, index) => (
              <Reveal key={item.title} delay={0.06 + index * 0.05}>
                <dt className="font-display text-[clamp(19px,2.4vh,26px)] leading-[1.2] text-terracotta-deep">
                  {item.title}
                </dt>
                <dd className="mt-[clamp(0.1rem,0.4vh,0.35rem)] lg:max-w-none max-w-[60ch] text-[clamp(16px,1.85vh,20px)] leading-[1.5] text-charcoal">
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
