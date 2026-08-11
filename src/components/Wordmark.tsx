import { brand } from "@/content/clinic";

/**
 * The wordmark is set type, not a drawn logo: the display serif at wide
 * tracking with the champagne hairline underneath. Same construction the
 * reference sites use, and it stays crisp at any size without an asset.
 */
export default function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-warm-white" : "text-charcoal";

  return (
    <span className={`inline-block ${color}`}>
      <span className="block font-display text-[26px] leading-none tracking-[0.28em]">
        {brand.name}
      </span>
      <span className="u-rule-champagne mt-1.5 block h-px w-full" />
    </span>
  );
}
