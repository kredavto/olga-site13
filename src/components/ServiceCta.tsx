"use client";

import Cta from "./Cta";
import { useBooking } from "./BookingProvider";

/**
 * Booking trigger for a service page, prefilled with the procedure the visitor
 * is reading about. One label for one intent: the page never offers "Записаться"
 * next to "Оставить заявку".
 */
export default function ServiceCta({
  service,
  tone = "dark",
}: {
  service: string;
  tone?: "dark" | "light";
}) {
  const { open } = useBooking();

  return (
    <Cta
      variant={tone === "dark" ? "onDark" : "primary"}
      className={tone === "dark" ? "" : "w-full"}
      onClick={() => open({ service })}
    >
      Записаться на консультацию
    </Cta>
  );
}
