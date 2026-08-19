import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  title: ReactNode;
  body?: string;
  /** Eyebrows are rationed across the page. Only three sections carry one. */
  eyebrow?: string;
  tone?: "dark" | "light";
  /** Section headings are metal by default and resolve by ground: the hero's
   *  gold on dark, bronze on light. No true gold survives on near white, where
   *  the bright value measures 1.5:1 against the 3:1 a heading needs. Pass
   *  "ink" for a heading that should stay charcoal. */
  titleTone?: "ink" | "metal";
  align?: "left" | "wide";
  /** Extra classes for the body line, for a section that needs it set louder
   *  than the shared default. Appended last, and it has to carry its own `lg:`
   *  variant to beat the default's: two font sizes on one element resolve by
   *  stylesheet order, not by the order they are written. */
  bodyClass?: string;
  /** Extra classes for the heading, same contract as bodyClass. */
  titleClass?: string;
  /** Extra classes for the gap above the body line. */
  bodyGapClass?: string;
  /** Extra classes for the block itself, normally its measure. */
  wrapperClass?: string;
};

export default function SectionHead({
  title,
  body,
  eyebrow,
  tone = "dark",
  titleTone = "metal",
  align = "left",
  bodyClass = "",
  titleClass = "",
  bodyGapClass = "mt-6",
  wrapperClass = "",
}: Props) {
  const heading =
    titleTone === "metal"
      ? tone === "light"
        ? "text-gold"
        : "text-bronze"
      : tone === "light"
        ? "text-warm-white"
        : "text-charcoal";
  const secondary = tone === "light" ? "text-warm-white/60" : "text-warm-gray";
  /* Body copy over a dark ground needs more presence than over a light one.
     At 60% white and 17px it read as a caption under a display heading rather
     than as the section's opening line, so on dark it runs at full white and a
     size up. Light sections keep the quieter grey, which has plenty of contrast
     against warm white already. */
  const bodyTone =
    tone === "light"
      ? "text-warm-white text-[19px] lg:text-[20px]"
      : "text-charcoal/85 text-[19px] lg:text-[20px]";

  return (
    // Measure is set in rem, not ch. The `ch` unit resolves against this
    // wrapper's font (Manrope at 17px), not against the display serif inside
    // it, so a ch based cap squeezed every heading into four lines.
    <div className={`w-full ${align === "wide" ? "max-w-[52rem]" : "max-w-[38rem]"} ${wrapperClass}`}>
      {eyebrow && (
        <Reveal>
          <p className={`u-meta mb-5 ${secondary}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal>
        <h2 className={`text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.08] ${heading} ${titleClass}`}>{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.08}>
          <p className={`${bodyGapClass} max-w-[52ch] leading-relaxed ${bodyTone} ${bodyClass}`}>{body}</p>
        </Reveal>
      )}
    </div>
  );
}
