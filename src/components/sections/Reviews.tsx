import { Star } from "@phosphor-icons/react/dist/ssr";

import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { ratings, reviews } from "@/content/clinic";

/**
 * Reviews.
 *
 * Ratings from the three platforms Russian patients actually check sit in a
 * rail on the left, individual quotes stagger down the right. Quotes are kept
 * to three lines: a landing page quote is a glance, not a full review.
 */
export default function Reviews() {
  return (
    <section className="bg-warm-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <SectionHead
              title={
                <>
                  Что говорят <span className="italic">пациенты</span>
                </>
              }
            />

            <div className="mt-10 space-y-px overflow-hidden rounded-card bg-taupe">
              {ratings.map((item) => (
                <Reveal key={item.source}>
                  <div className="flex items-baseline justify-between gap-4 bg-warm-white px-6 py-5">
                    <span className="text-[15px]">{item.source}</span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-[26px] leading-none tabular-nums">
                        {item.value}
                      </span>
                      <span className="text-[13px] text-warm-gray">{item.count}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Live widgets from the three platforms mount here once the clinic
                profiles exist. See docs/CONTENT-CHECKLIST.md. */}
            <p className="mt-6 text-[13px] leading-relaxed text-warm-gray">
              Оценки приведены по открытым профилям клиники. Отзывы не редактируются и не
              удаляются по просьбе клиники.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {reviews.map((review, index) => (
              <Reveal
                as="li"
                key={review.author}
                delay={index * 0.07}
                className={index % 2 === 1 ? "sm:mt-12" : undefined}
              >
                <figure className="h-full rounded-card border border-taupe/70 bg-milk p-7">
                  <div className="flex gap-1 text-sage" aria-label={`Оценка ${review.rating} из 5`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={13} weight="fill" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-[15px] leading-relaxed">
                    «{review.text}»
                  </blockquote>
                  <figcaption className="mt-6 text-[13px] text-warm-gray">
                    {review.author}
                    <br />
                    {review.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
