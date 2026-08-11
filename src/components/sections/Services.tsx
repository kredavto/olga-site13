"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react";

import SectionHead from "../SectionHead";
import Photo from "../Photo";
import Reveal from "../Reveal";
import {
  categories,
  formatPrice,
  services,
  type Service,
  type ServiceCategory,
} from "@/content/clinic";

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);

  // Tilt on pointer position. Motion values keep this off the render path.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 20 });
  const sheenX = useMotionValue(50);
  const sheenLeft = useTransform(sheenX, (v) => `${v}%`);

  const onMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    ry.set((nx - 0.5) * 9);
    rx.set((0.5 - ny) * 9);
    sheenX.set(nx * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    sheenX.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative w-[82vw] shrink-0 snap-start sm:w-[400px]"
    >
      <Link href={`/uslugi/${service.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-ivory">
          <Photo
            seed={service.photoSeed}
            tone="dark"
            spec="900 x 1120"
            label={`${service.title}: процедура крупным планом, руки врача в кадре`}
            sizes="(max-width: 640px) 82vw, 400px"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent" />

          {/* Glass reflection sweeping with the pointer. */}
          <motion.div
            aria-hidden
            style={{ left: sheenLeft }}
            className="pointer-events-none absolute top-0 h-full w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-display text-[26px] leading-tight text-warm-white">
              {service.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-warm-white/70">
              {service.summary}
            </p>
          </div>

          <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-warm-white backdrop-blur-md transition-colors duration-300 group-hover:bg-warm-white group-hover:text-charcoal">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
          <div>
            <dt className="text-warm-gray">Стоимость</dt>
            <dd className="mt-1 font-medium tabular-nums">от {formatPrice(service.priceFrom)} ₽</dd>
          </div>
          <div>
            <dt className="text-warm-gray">Длительность</dt>
            <dd className="mt-1 font-medium">{service.duration}</dd>
          </div>
          <div>
            <dt className="text-warm-gray">Восстановление</dt>
            <dd className="mt-1 font-medium">{service.recovery.split(",")[0]}</dd>
          </div>
        </dl>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const [active, setActive] = useState<ServiceCategory | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory = active === "all" || service.category === active;
      const matchesQuery =
        !term ||
        service.title.toLowerCase().includes(term) ||
        service.summary.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <section id="services" className="bg-pearl py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Направления"
            title={
              <>
                Что мы <span className="italic">делаем</span>
              </>
            }
          />

          <Reveal delay={0.1}>
            <label className="relative block w-full lg:w-[320px]">
              <span className="sr-only">Поиск по услугам</span>
              <MagnifyingGlass
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти услугу"
                className="h-12 w-full rounded-full border border-charcoal/15 bg-warm-white pl-11 pr-4 text-[15px] outline-none transition-colors placeholder:text-warm-gray focus:border-sage"
              />
            </label>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
            {[{ id: "all" as const, label: "Все направления" }, ...categories].map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 ${
                    isActive ? "text-warm-white" : "text-charcoal/70 hover:text-charcoal"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-tab"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-charcoal"
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {visible.length === 0 ? (
        <div className="mx-auto mt-16 max-w-[1400px] px-5 lg:px-10">
          <p className="max-w-[46ch] font-display text-[26px] leading-snug">
            По запросу ничего не нашлось.
          </p>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-warm-gray">
            Позвоните администратору или запишитесь на консультацию: врач подберёт методику под
            задачу, даже если у неё нет привычного названия.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="mt-6 text-[15px] underline underline-offset-4 transition-colors hover:text-sage-deep"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex snap-x snap-mandatory gap-6 px-5 lg:px-10">
            {visible.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
            <div className="w-1 shrink-0" aria-hidden />
          </div>
        </div>
      )}
    </section>
  );
}
