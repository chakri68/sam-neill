/**
 * Little toy cutouts — Alan Grant figures, dinosaurs, the Jeep — perched on
 * card edges and corners around the site. Deterministic by seed (usually the
 * entry/card id): which toy, its tilt, flip, and drift delay all derive from
 * a hash, so placement is stable across builds and server/client renders.
 *
 * Purely decorative: aria-hidden, no pointer events, and gated off the
 * memorial moments entirely at the call sites.
 */

import { withBasePath } from "@/src/lib/site-url";

const CUTOUTS = [
  "alan-1",
  "alan-2",
  "alan-3",
  "alan-4",
  "alan-5",
  "alan-6",
  "alan-7",
  "alan-lego-1",
  "trike-alan",
  "ian-malcom",
  "trex-jp1",
  "raptor-jp1",
  "raptor-2-jp3",
  "trike-jp1",
  "dilo",
  "pterosaur",
  "barchiosaur",
  "cerato-jp3",
  "spino-jp-3",
  "jeep-jp-1",
  "jp-car",
  "dino-1",
  "dino-2",
] as const;

/** djb2 — stable, cheap, good enough spread for picking toys. */
export function hashSeed(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

export interface CutoutProps {
  /** Drives every random-looking choice. Use a stable id. */
  seed: string;
  /** Force a specific toy (file stem in /public/images/cutouts). */
  file?: string;
  /** Render only when hash(seed) % gate === 0 — sparse sprinkling. */
  gate?: number;
  /** Rendered width in px. Keep small; they're set dressing. */
  size?: number;
  /** Positioning utilities from the call site (absolute offsets etc.). */
  className?: string;
}

export function Cutout({ seed, file, gate, size = 56, className }: CutoutProps) {
  const h = hashSeed(seed);
  if (gate && h % gate !== 0) return null;
  const name = file ?? CUTOUTS[h % CUTOUTS.length];
  const rotate = ((h >> 3) % 25) - 12;
  const flip = ((h >> 7) & 1) === 1;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny decorative webp, no optimizer needed
    <img
      src={withBasePath(`/images/cutouts/${name}.webp`)}
      alt=""
      aria-hidden
      loading="lazy"
      className={["cutout", className ?? ""].filter(Boolean).join(" ")}
      style={{
        width: size,
        transform: `rotate(${rotate}deg)${flip ? " scaleX(-1)" : ""}`,
      }}
    />
  );
}

export default Cutout;
