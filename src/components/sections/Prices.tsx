"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { DownloadSimple, MagnifyingGlass } from "@phosphor-icons/react";

import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import Cta from "../Cta";
import { useBooking } from "../BookingProvider";
import { categories, formatPrice, services, type ServiceCategory } from "@/content/clinic";

/**
 * PLACEHOLDER: sample promotion. Set `endsAt` from the clinic's real campaign,
 * or delete the block entirely. A countdown that resets forever is a dark
 * pattern, so this one simply disappears when the date passes.
 */
const promo = {
  title: "Курс биоревитализации Profhilo",
  wasPrice: 65600,
  nowPrice: 54900,
  endsAt: "2026-09-30T21:00:00+03:00",
};

/** Russian plural selection: 1 час, 2 часа, 5 часов. */
function plural(n: number, forms: [string, string, string]) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  const mod10 = n % 10;
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left === null || left <= 0) return null;

  return {
    days: Math.floor(left / 86_400_000),
    hours: Math.floor((left % 86_400_000) / 3_600_000),
    minutes: Math.floor((left % 3_600_000) / 60_000),
  };
}

export default function Prices() {
  const { open } = useBooking();
  const [tab, setTab] = useState<ServiceCategory>("injection");
  const [query, setQuery] = useState("");
  const countdown = useCountdown(promo.endsAt);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return services.filter((service) => {
      if (term) return service.title.toLowerCase().includes(term);
      return service.category === tab;
    });
  }, [tab, query]);

  return (
    <section id="prices" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Стоимость"
            title={
              <>
                Цены без <span className="italic">звёздочек</span>
              </>
            }
          />
          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center gap-3">
              <label className="relative block w-full sm:w-[260px]">
                <span className="sr-only">Поиск по прайсу</span>
                <MagnifyingGlass
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти в прайсе"
                  className="h-12 w-full rounded-full border border-taupe bg-warm-white pl-11 pr-4 text-[15px] outline-none transition-colors placeholder:text-warm-gray focus:border-sage"
                />
              </label>
              {/* TODO: generate the PDF from this same data at build time. */}
              <a
                href="/price.pdf"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-taupe px-5 text-[15px] transition-colors hover:border-terracotta"
              >
                <DownloadSimple size={17} />
                Прайс в PDF
              </a>
            </div>
          </Reveal>
        </div>

        {!query && (
          <Reveal delay={0.1}>
            <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => {
                const isActive = tab === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setTab(category.id)}
                    aria-pressed={isActive}
                    className={`relative shrink-0 rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 ${
                      isActive ? "text-warm-white" : "text-charcoal/85 hover:text-charcoal"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="price-tab"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-terracotta"
                      />
                    )}
                    <span className="relative">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            {rows.length === 0 ? (
              <p className="max-w-[46ch] leading-relaxed text-warm-gray">
                В прайсе такой позиции нет. Возможно, услуга называется иначе. Позвоните
                администратору, он подскажет.
              </p>
            ) : (
              <ul className="divide-y divide-taupe/70 border-t border-taupe/70">
                {rows.map((service, index) => (
                  <Reveal as="li" key={service.slug} delay={Math.min(index * 0.04, 0.24)}>
                    <div className="grid gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-10">
                      <div>
                        <h3 className="font-display text-[24px] leading-tight">{service.title}</h3>
                        <p className="mt-2.5 max-w-[56ch] text-[15px] leading-relaxed text-warm-gray">
                          {service.summary}
                        </p>

                        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
                          <div className="flex gap-2">
                            <dt className="text-warm-gray">Длительность</dt>
                            <dd>{service.duration}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-warm-gray">Анестезия</dt>
                            <dd>{service.anesthesia}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-warm-gray">Восстановление</dt>
                            <dd>{service.recovery}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex items-center gap-5 sm:flex-col sm:items-end sm:gap-3">
                        <p className="whitespace-nowrap font-display text-[26px] leading-none tabular-nums">
                          от {formatPrice(service.priceFrom)} ₽
                        </p>
                        <button
                          type="button"
                          onClick={() => open({ service: service.title })}
                          className="whitespace-nowrap rounded-full border border-taupe px-5 py-2.5 text-[14px] transition-colors hover:border-terracotta hover:bg-charcoal/[0.04]"
                        >
                          Записаться
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>

          <Reveal delay={0.14}>
            <div className="sticky top-28 space-y-6">
              {countdown && (
                <div className="rounded-card bg-ink p-7 text-warm-white">
                  <p className="u-meta text-warm-white/50">Действует до конца месяца</p>
                  <h3 className="mt-4 font-display text-[26px] leading-tight">{promo.title}</h3>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-[30px] tabular-nums">
                      {formatPrice(promo.nowPrice)} ₽
                    </span>
                    <span className="text-[17px] tabular-nums text-warm-white/60 line-through">
                      {formatPrice(promo.wasPrice)} ₽
                    </span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    {(
                      [
                        [countdown.days, ["день", "дня", "дней"]],
                        [countdown.hours, ["час", "часа", "часов"]],
                        [countdown.minutes, ["минута", "минуты", "минут"]],
                      ] as [number, [string, string, string]][]
                    ).map(([value, forms]) => (
                      <div key={forms[0]} className="rounded-full bg-white/10 px-4 py-3 text-center">
                        <p className="font-display text-[22px] leading-none tabular-nums">{value}</p>
                        <p className="mt-1.5 text-[11px] text-warm-white/50">{plural(value, forms)}</p>
                      </div>
                    ))}
                  </div>
                  <Cta
                    variant="onDark"
                    className="mt-6 w-full"
                    onClick={() => open({ service: promo.title })}
                  >
                    Забронировать цену
                  </Cta>
                </div>
              )}

              <div className="rounded-card border border-taupe/70 p-7">
                <h3 className="font-display text-[22px] leading-tight">Что входит в стоимость</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-warm-gray">
                  Цена включает работу врача, препарат или расходный материал и постпроцедурный
                  уход. Контрольный осмотр после процедуры бесплатный.
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-warm-gray">
                  Окончательная стоимость определяется на консультации: она зависит от объёма
                  препарата и количества зон.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
