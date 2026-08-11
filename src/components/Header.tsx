"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";

import Cta from "./Cta";
import Wordmark from "./Wordmark";
import { categories, contacts, legal, navItems, servicesByCategory } from "@/content/clinic";
import { useBooking } from "./BookingProvider";

export default function Header() {
  const { open } = useBooking();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setCondensed(value > 80);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      {/* Practical strip. Required for a physical clinic: how to reach it and
          under which licence it operates. Folds away once the visitor scrolls. */}
      <motion.div
        aria-hidden={condensed}
        animate={{ height: condensed ? 0 : 36, opacity: condensed ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-charcoal text-warm-white"
      >
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
          <p className="u-meta min-w-0 truncate text-warm-white/70">
            <span className="md:hidden">{contacts.addressShort}</span>
            <span className="hidden md:inline">{contacts.address}</span>
          </p>
          <div className="hidden shrink-0 items-center gap-6 md:flex">
            <span className="u-meta text-warm-white/70">
              Метро {contacts.metro}, {contacts.metroWalk}
            </span>
            <span className="u-meta text-warm-white/45">
              Лицензия {legal.license}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          backgroundColor: condensed ? "rgba(252,252,250,0.82)" : "rgba(252,252,250,0)",
          borderColor: condensed ? "rgba(43,43,43,0.10)" : "rgba(43,43,43,0)",
        }}
        transition={{ duration: 0.4 }}
        className={`border-b backdrop-blur-xl ${condensed ? "text-charcoal" : "text-warm-white"}`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-8 px-5 lg:px-10">
          <a href="#hero" className="shrink-0" aria-label="На главную">
            <Wordmark tone={condensed ? "dark" : "light"} />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
            <button
              type="button"
              className="flex items-center gap-1.5 text-[15px] opacity-80 transition-opacity hover:opacity-100"
              onMouseEnter={() => setMegaOpen(true)}
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
            >
              Услуги
              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <CaretDown size={13} weight="bold" />
              </motion.span>
            </button>
            {navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[15px] opacity-80 transition-opacity hover:opacity-100"
                onMouseEnter={() => setMegaOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${contacts.phoneHref}`}
              className="hidden text-[15px] font-medium tabular-nums xl:block"
            >
              {contacts.phone}
            </a>
            <span className="hidden md:block">
              <Cta
                variant={condensed ? "secondary" : "ghost"}
                className="px-5 py-2.5 text-sm"
                onClick={open}
              >
                Записаться
              </Cta>
            </span>
            <button
              type="button"
              className={`flex size-11 items-center justify-center rounded-full border lg:hidden ${
                condensed ? "border-charcoal/20" : "border-white/30 bg-black/25 backdrop-blur-md"
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Открыть меню"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Mega menu. Categories carry a one line explanation so the visitor
            picks by problem rather than by procedure name they may not know. */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="hidden border-t border-charcoal/10 bg-warm-white/95 text-charcoal backdrop-blur-xl lg:block"
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-10 px-10 py-10">
                {categories.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-display text-[22px] leading-tight">{category.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-warm-gray">{category.blurb}</p>
                    <ul className="mt-5 space-y-2.5">
                      {servicesByCategory(category.id).map((service) => (
                        <li key={service.slug}>
                          <a
                            href={`/uslugi/${service.slug}`}
                            className="text-[15px] text-charcoal/75 transition-colors hover:text-sage-deep"
                          >
                            {service.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-warm-white lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Wordmark />
              <button
                type="button"
                className="flex size-11 items-center justify-center rounded-full border border-charcoal/20"
                onClick={() => setMobileOpen(false)}
                aria-label="Закрыть меню"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="px-5 pt-6" aria-label="Мобильная навигация">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                  className="block border-b border-charcoal/10 py-5 font-display text-[30px] leading-none"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-5 pt-8">
              <Cta
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  open();
                }}
              >
                Записаться на консультацию
              </Cta>
              <a
                href={`tel:${contacts.phoneHref}`}
                className="mt-4 block text-center text-lg font-medium tabular-nums"
              >
                {contacts.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
