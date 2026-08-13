import Reveal from "../Reveal";
import Photo from "../Photo";
import { advantages } from "@/content/clinic";

/**
 * The reassurance block, directly under the hero.
 *
 * The clinic's own interior carries the section. The photograph is bright and
 * busy, so it sits under a heavy wash: enough of the green marble, brass and
 * warm wood survives to read as a real room, while the type keeps the contrast
 * it needs. Headings take the same champagne gold as the hero, body copy is
 * white rather than a grey wash, since neither would hold on a photograph.
 */
export default function Advantages() {
  return (
    // Both columns sit 2cm higher than the symmetric padding would place them.
    // The centimetre comes off the top and goes back on at the bottom, so the
    // type moves without the photographic band changing height.
    <section className="u-grain relative overflow-hidden bg-graphite pb-[calc(6rem+2cm)] pt-[calc(6rem-2cm)] lg:pb-[calc(8rem+2cm)] lg:pt-[calc(8rem-2cm)]">
      <Photo
        src="/photo/section-lobby.jpg"
        seed="lobby"
        tone="dark"
        spec="736 x 736"
        label="Ресепшн клиники: зелёный мрамор, латунь, мягкий свет"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Two layers. A flat wash sets the floor for contrast across the whole
          section, and a left weighted gradient adds the extra depth the
          statement needs without darkening the room any further on the right. */}
      <div className="absolute inset-0 bg-graphite/52" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite/62 via-graphite/16 to-graphite/26" />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <h2 className="u-on-photo text-[clamp(2rem,3.6vw,3rem)] leading-[1.12] text-gold">
              Мы ищем причину, а не <span className="italic">маскируем</span> следствие
            </h2>
            <p className="u-on-photo mt-6 max-w-[44ch] text-[19px] leading-relaxed text-warm-white lg:text-[20px]">
              Эстетический дефект почти всегда имеет медицинское объяснение. Прежде чем предложить
              процедуру, врач разбирается, что происходит с кожей и почему.
            </p>
          </Reveal>

          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {advantages.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.06}>
                <div className="u-rule-champagne h-px w-10" />
                <h3 className="u-on-photo mt-5 font-sans text-[28px] font-bold leading-[1.2] tracking-tight text-gold">
                  {item.title}
                </h3>
                <p className="u-on-photo mt-3 text-[19px] leading-relaxed text-warm-white">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
