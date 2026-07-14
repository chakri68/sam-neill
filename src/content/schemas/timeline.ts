import { z } from "zod";
import { imageAssetSchema } from "./image";

export const TIMELINE_ENTRY_TYPES = [
  "life",
  "career",
  "film",
  "television",
  "award",
  "personal",
  "tribute",
] as const;

export const TIMELINE_LAYOUTS = [
  "image-left",
  "image-right",
  "full-image",
  "text-only",
  "gallery",
  "quote",
] as const;

export const ANIMATION_INTENSITIES = ["subtle", "normal", "cinematic"] as const;

/**
 * Unknown `type` / `layout` / `intensity` values fall back to safe defaults
 * via `.catch()` rather than rejecting the entry — so a typo in the JSON
 * degrades one field, it doesn't drop the whole event.
 */
export const timelineEntrySchema = z.object({
  id: z.string().min(1),
  order: z.number().optional(),
  date: z.string(),
  displayDate: z.string().optional(),
  endDate: z.string().optional(),
  type: z.enum(TIMELINE_ENTRY_TYPES).catch("life"),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().default(""),
  longDescription: z.string().optional(),
  layout: z.enum(TIMELINE_LAYOUTS).catch("text-only").default("text-only"),
  images: z.array(imageAssetSchema).default([]),
  quote: z
    .object({
      text: z.string(),
      attribution: z.string().optional(),
    })
    .optional(),
  relatedMovies: z.array(z.string()).default([]),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
        type: z
          .enum(["article", "video", "interview", "external"])
          .catch("external")
          .optional(),
      }),
    )
    .default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  hidden: z.boolean().default(false),
  theme: z
    .object({
      background: z.string().optional(),
      foreground: z.string().optional(),
      accent: z.string().optional(),
    })
    .optional(),
  animation: z
    .object({
      preset: z.string().optional(),
      intensity: z.enum(ANIMATION_INTENSITIES).catch("normal").optional(),
    })
    .optional(),
});

export type TimelineEntry = z.infer<typeof timelineEntrySchema>;

export const timelineSchema = z.object({
  version: z.number().default(1),
  title: z.string(),
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
  }),
  entries: z.array(z.unknown()),
});

/** Root shape after per-entry validation has run (entries are typed). */
export type Timeline = Omit<z.infer<typeof timelineSchema>, "entries"> & {
  entries: TimelineEntry[];
};
