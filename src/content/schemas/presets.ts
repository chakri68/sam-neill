import { z } from "zod";
import { TIMELINE_LAYOUTS } from "./timeline";

export const IMAGE_TREATMENTS = [
  "warm-archive",
  "cinematic",
  "monochrome",
  "none",
] as const;

export const TITLE_FONTS = ["display", "editorial", "ui"] as const;
export const YEAR_FONTS = ["display", "mono"] as const;

export const presetSchema = z.object({
  layout: z.enum(TIMELINE_LAYOUTS).catch("text-only").default("text-only"),
  background: z.string().default("charcoal"),
  imageTreatment: z.enum(IMAGE_TREATMENTS).catch("warm-archive").default("warm-archive"),
  titleFont: z.enum(TITLE_FONTS).catch("editorial").default("display"),
  yearFont: z.enum(YEAR_FONTS).catch("mono").default("display"),
  /**
   * Echo the year as a huge translucent glyph behind the image. Off by
   * default — opt in per preset here, or per entry via `ghostYear` in
   * timeline.json (the entry value wins).
   */
  ghostYear: z.boolean().default(false),
});

export type Preset = z.infer<typeof presetSchema>;

export const presetsSchema = z.object({
  presets: z.record(z.string(), presetSchema).default({}),
});

export type Presets = z.infer<typeof presetsSchema>;
