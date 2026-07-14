import { z } from "zod";
import { imageAssetSchema } from "./image";
import { withBasePath } from "@/src/lib/site-url";

export const TIMELINE_ENTRY_TYPES = [
  "life",
  "career",
  "film",
  "television",
  "documentary",
  "award",
  "honour",
  "personal",
  "tribute",
] as const;

export const TIMELINE_LAYOUTS = [
  "image-left",
  "image-right",
  "full-image",
  "split-image",
  "text-only",
  "minimal",
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
  // Absent → undefined (so a preset can supply the layout); invalid → safe
  // fallback; valid → itself. Order matters: optional() before catch().
  layout: z.enum(TIMELINE_LAYOUTS).optional().catch("text-only"),
  /** Echo the year behind the image. Overrides the preset when set. */
  ghostYear: z.boolean().optional(),
  images: z.array(imageAssetSchema).default([]),
  // Optional decorative mark (e.g. a film logo) rendered as a small corner
  // badge over the entry. Path into /public; transparent PNG expected.
  badge: z.string().transform(withBasePath).optional(),
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
  /** Where the entry's claims come from — rendered as a small ⓘ popover. */
  sources: z
    .array(
      z.object({
        title: z.string(),
        publisher: z.string().optional(),
        url: z.string(),
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
