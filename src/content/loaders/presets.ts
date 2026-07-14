import presetsData from "@/content/presets.json";
import { presetsSchema, presetSchema, type Preset } from "../schemas/presets";
import { validateConfig } from "@/src/lib/validation/validate";
import type { TimelineEntry } from "../schemas/timeline";

const { presets } = validateConfig(presetsSchema, presetsData, "presets.json");

/** A hard fallback so an unknown/missing preset never yields undefined. */
const DEFAULT_PRESET: Preset = presetSchema.parse({});

export function getPreset(name: string | undefined): Preset {
  if (!name) return DEFAULT_PRESET;
  return presets[name] ?? DEFAULT_PRESET;
}

/**
 * Resolve the effective visual config for a timeline entry. Precedence:
 * explicit entry fields > the entry's preset > global default. This is the
 * one place that decides how an entry looks, so components stay dumb.
 */
export function resolveEntryVisual(entry: TimelineEntry): Preset {
  const preset = getPreset(entry.animation?.preset);
  return {
    layout: entry.layout ?? preset.layout,
    background: entry.theme?.background ?? preset.background,
    imageTreatment: preset.imageTreatment,
    titleFont: preset.titleFont,
    yearFont: preset.yearFont,
    ghostYear: entry.ghostYear ?? preset.ghostYear,
  };
}

export type { Preset } from "../schemas/presets";
export { presets };
