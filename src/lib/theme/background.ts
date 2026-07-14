/** Map a theme colour name (as used in presets / entry.theme) to its CSS var. */
const NAME_TO_VAR: Record<string, string> = {
  black: "--color-black",
  charcoal: "--color-charcoal",
  deepGreen: "--color-deep-green",
  forest: "--color-forest",
  bone: "--color-bone",
  night: "--color-night",
  nightBlue: "--color-night-blue",
  // Memory Machine / night-sky aliases used in content
  midnight: "--color-night-blue",
  spaceBlack: "--color-night",
};

/** Resolve a colour name to a `var(--color-…)` string, defaulting to charcoal. */
export function backgroundVar(name: string | undefined): string {
  const key = name && NAME_TO_VAR[name] ? NAME_TO_VAR[name] : "--color-charcoal";
  return `var(${key})`;
}
