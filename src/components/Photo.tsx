import Image from "next/image";

/**
 * Photography slot.
 *
 * The clinic's own photography does not exist yet, and this project has no
 * image generation available, so every slot renders a labelled placeholder
 * instead of a stock face. That is deliberate: a premium medical brand cannot
 * ship a stock model, and a silent grey box hides what still has to be shot.
 *
 * To fill a slot, drop the file into /public/photo and pass `src`. The
 * placeholder disappears with no other change. docs/PHOTOGRAPHY.md lists every
 * slot on the site with its subject and target dimensions.
 */

type Props = {
  /** Real asset path under /public once photography exists. */
  src?: string;
  /** What has to be in this frame. Shown on the placeholder, used as alt text. */
  label: string;
  /** Stable string so a given slot always gets the same placeholder tone. */
  seed: string;
  /** Intended pixel size, printed on the placeholder for the photographer. */
  spec?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Renders the placeholder in the dark palette for use over dark sections. */
  tone?: "light" | "dark";
};

const lightTones = [
  ["#f2f0ec", "#dccfc2"],
  ["#ede8e1", "#d8d6d1"],
  ["#f7f6f3", "#eaeee7"],
  ["#f2f0ec", "#e7dcc6"],
];

const darkTones = [
  ["#2b2b2b", "#1d1d1d"],
  ["#31332f", "#1d1d1d"],
  ["#2f2c28", "#1d1d1d"],
  ["#282c2b", "#1d1d1d"],
];

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

export default function Photo({
  src,
  label,
  seed,
  spec,
  sizes,
  priority,
  className = "",
  tone = "light",
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={label}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  const palette = tone === "dark" ? darkTones : lightTones;
  const [from, to] = palette[hash(seed) % palette.length];
  const angle = (hash(seed) % 60) + 110;
  const ink = tone === "dark" ? "#faf9f7" : "#2b2b2b";

  return (
    <div
      role="img"
      aria-label={label}
      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(${angle}deg, ${from}, ${to})` }}
    >
      <div className="u-grain absolute inset-0" />
      <div
        className="relative max-w-[80%] text-center"
        style={{ color: ink }}
      >
        <p className="u-meta opacity-45">Слот под съёмку</p>
        <p className="mt-2.5 text-[15px] leading-snug opacity-80">{label}</p>
        {spec && <p className="u-meta mt-3 tabular-nums opacity-35">{spec}</p>}
      </div>
    </div>
  );
}
