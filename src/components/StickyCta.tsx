"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Phone } from "@phosphor-icons/react";

import Cta from "./Cta";
import { contacts } from "@/content/clinic";
import { useBooking } from "./BookingProvider";

/**
 * Persistent booking affordance. Appears only after the visitor has moved past
 * the hero, where a floating button would compete with the hero's own CTA.
 * On mobile it becomes a full width bar, which is the reachable position.
 */
export default function StickyCta() {
  const { open } = useBooking();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setVisible(value > 900);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[65] flex items-center gap-3 border-t border-charcoal/10 bg-warm-white/90 p-4 backdrop-blur-xl md:inset-x-auto md:bottom-8 md:right-8 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none"
        >
          <a
            href={`tel:${contacts.phoneHref}`}
            aria-label={`Позвонить ${contacts.phone}`}
            className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-charcoal/20 bg-warm-white text-charcoal transition-colors hover:bg-charcoal hover:text-warm-white"
          >
            <Phone size={19} />
          </a>
          <Cta className="flex-1 md:flex-none md:shadow-[0_18px_40px_-20px_rgba(43,43,43,0.55)]" onClick={() => open()}>
            Записаться на консультацию
          </Cta>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
