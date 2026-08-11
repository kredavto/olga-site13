import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  title: ReactNode;
  body?: string;
  /** Eyebrows are rationed across the page. Only three sections carry one. */
  eyebrow?: string;
  tone?: "dark" | "light";
  align?: "left" | "wide";
};

export default function SectionHead({ title, body, eyebrow, tone = "dark", align = "left" }: Props) {
  const heading = tone === "light" ? "text-warm-white" : "text-charcoal";
  const secondary = tone === "light" ? "text-warm-white/60" : "text-warm-gray";

  return (
    // Measure is set in rem, not ch. The `ch` unit resolves against this
    // wrapper's font (Manrope at 17px), not against the display serif inside
    // it, so a ch based cap squeezed every heading into four lines.
    <div className={`w-full ${align === "wide" ? "max-w-[52rem]" : "max-w-[38rem]"}`}>
      {eyebrow && (
        <Reveal>
          <p className={`u-meta mb-5 ${secondary}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal>
        <h2 className={`text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.08] ${heading}`}>{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.08}>
          <p className={`mt-6 max-w-[52ch] text-[17px] leading-relaxed ${secondary}`}>{body}</p>
        </Reveal>
      )}
    </div>
  );
}
