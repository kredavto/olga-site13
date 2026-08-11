"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";

import BookingForm from "./BookingForm";

type Preset = { service?: string; doctor?: string };

type BookingContext = { open: (preset?: Preset) => void };

const Ctx = createContext<BookingContext>({ open: () => {} });

export const useBooking = () => useContext(Ctx);

/**
 * Owns the booking dialog so any CTA on the page can open it prefilled with the
 * service or doctor the visitor was looking at. The form itself lives in
 * BookingForm and is shared with the inline form in the contacts section.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<Preset | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [instance, setInstance] = useState(0);

  const open = useCallback((next?: Preset) => {
    setPreset(next);
    setInstance((n) => n + 1);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Запись на консультацию"
          >
            <button
              type="button"
              aria-label="Закрыть форму"
              className="absolute inset-0 bg-graphite/45 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] bg-warm-white p-6 sm:max-w-[520px] sm:rounded-card sm:p-9"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть"
                className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-charcoal/5 hover:text-charcoal"
              >
                <X size={17} />
              </button>

              <h2 className="mb-2.5 pr-10 font-display text-[30px] leading-tight sm:text-[34px]">
                Запись на консультацию
              </h2>

              <BookingForm
                key={instance}
                preset={preset}
                onDone={() => setIsOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
