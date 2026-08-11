"use client";

import { useId, useMemo, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";

import Cta from "./Cta";
import { doctors, legal, services } from "@/content/clinic";

type Fields = {
  name: string;
  phone: string;
  service: string;
  doctor: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

/** Russian mobile format. Permissive about separators, strict about digits. */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  const rest = digits.startsWith("7") ? digits.slice(1) : digits;
  const parts = [rest.slice(0, 3), rest.slice(3, 6), rest.slice(6, 8), rest.slice(8, 10)];
  let out = "+7";
  for (const part of parts) if (part) out += ` ${part}`;
  return out;
}

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) {
    errors.name = "Укажите имя, чтобы администратор знал, как к вам обращаться";
  }
  if (fields.phone.replace(/\D/g, "").length !== 11) {
    errors.phone = "Нужен полный номер, 11 цифр вместе с кодом страны";
  }
  if (!fields.consent) {
    errors.consent = "Без согласия мы не можем обработать заявку";
  }
  return errors;
}

const inputBase =
  "h-12 w-full min-w-0 rounded-input border bg-milk px-4 text-[16px] outline-none transition-colors placeholder:text-warm-gray/80";

export type BookingFormProps = {
  preset?: { service?: string; doctor?: string };
  /** Compact drops the intro copy, used where a section already explains itself. */
  compact?: boolean;
  onDone?: () => void;
};

/**
 * Booking form. Validation runs on every keystroke but errors only surface
 * once a field has been left, so the visitor is never scolded mid typing.
 */
export default function BookingForm({ preset, compact, onDone }: BookingFormProps) {
  // The form renders twice on the home page: inline in the contacts section and
  // inside the booking dialog. Fixed ids would collide and point every label at
  // whichever input mounted first.
  const uid = useId();
  const [fields, setFields] = useState<Fields>({
    name: "",
    phone: "",
    service: preset?.service ?? "",
    doctor: preset?.doctor ?? "",
    consent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const errors = useMemo(() => validate(fields), [fields]);
  const showError = (key: keyof Fields) => (touched[key] ? errors[key] : undefined);
  const set = (key: keyof Fields, value: string | boolean) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, phone: true, consent: true });
    if (Object.keys(errors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <CheckCircle size={44} weight="thin" className="mx-auto text-sage" />
        <h3 className="mt-5 font-display text-[30px] leading-tight">Заявка принята</h3>
        <p className="mx-auto mt-3 max-w-[38ch] leading-relaxed text-warm-gray">
          Администратор перезвонит в течение рабочего дня, чтобы подобрать врача и время.
        </p>
        {onDone && (
          <Cta className="mt-7" onClick={onDone}>
            Понятно
          </Cta>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {!compact && (
        <p className="mb-7 text-[15px] leading-relaxed text-warm-gray">
          Консультация длится около 40 минут. Вы уходите с письменным планом, даже если решите
          ничего не делать сейчас.
        </p>
      )}

      <div className="space-y-5">
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${uid}-name`} className="u-meta text-charcoal/70">
            Имя
          </label>
          <input
            id={`${uid}-name`}
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? `${uid}-name-err` : undefined}
            className={`${inputBase} ${
              showError("name") ? "border-[#b4453c]" : "border-charcoal/15 focus:border-sage"
            }`}
          />
          {showError("name") && (
            <p id={`${uid}-name-err`} className="text-[13px] text-[#9b3a32]">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid min-w-0 gap-2">
          <label htmlFor={`${uid}-phone`} className="u-meta text-charcoal/70">
            Телефон
          </label>
          <input
            id={`${uid}-phone`}
            inputMode="tel"
            value={fields.phone}
            onChange={(e) => set("phone", formatPhone(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="+7 900 000 00 00"
            aria-invalid={Boolean(showError("phone"))}
            aria-describedby={showError("phone") ? `${uid}-phone-err` : undefined}
            className={`${inputBase} tabular-nums ${
              showError("phone") ? "border-[#b4453c]" : "border-charcoal/15 focus:border-sage"
            }`}
          />
          {showError("phone") && (
            <p id={`${uid}-phone-err`} className="text-[13px] text-[#9b3a32]">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="grid min-w-0 gap-5 sm:grid-cols-2 sm:gap-4">
          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${uid}-service`} className="u-meta text-charcoal/70">
              Интересует
            </label>
            <select
              id={`${uid}-service`}
              value={fields.service}
              onChange={(e) => set("service", e.target.value)}
              className={`${inputBase} border-charcoal/15 px-3.5 focus:border-sage`}
            >
              <option value="">Пока не знаю</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid min-w-0 gap-2">
            <label htmlFor={`${uid}-doctor`} className="u-meta text-charcoal/70">
              Врач
            </label>
            <select
              id={`${uid}-doctor`}
              value={fields.doctor}
              onChange={(e) => set("doctor", e.target.value)}
              className={`${inputBase} border-charcoal/15 px-3.5 focus:border-sage`}
            >
              <option value="">Любой свободный</option>
              {doctors.map((doctor) => (
                <option key={doctor.slug} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={fields.consent}
              onChange={(e) => set("consent", e.target.checked)}
              onBlur={() => setTouched((t) => ({ ...t, consent: true }))}
              className="mt-0.5 size-[18px] shrink-0 accent-[#6e7c6b]"
            />
            <span className="text-[13px] leading-relaxed text-warm-gray">
              Согласен на обработку персональных данных в соответствии с{" "}
              <a href="/legal/consent" className="text-charcoal underline underline-offset-2">
                политикой клиники
              </a>
              .
            </span>
          </label>
          {showError("consent") && (
            <p className="mt-1.5 text-[13px] text-[#9b3a32]">{errors.consent}</p>
          )}
        </div>
      </div>

      {status === "failed" && (
        <p className="mt-5 rounded-input bg-[#fbeceb] px-4 py-3 text-[14px] leading-relaxed text-[#9b3a32]">
          Не получилось отправить заявку. Позвоните нам, мы запишем вас вручную.
        </p>
      )}

      <Cta type="submit" className="mt-7 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем" : "Записаться"}
      </Cta>

      <p className="mt-5 text-[12px] leading-relaxed text-warm-gray">{legal.warning}</p>
    </form>
  );
}
