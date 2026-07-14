import { z } from "zod";
import { imageAssetSchema } from "./image";

/**
 * The photo archive. Entries are generated from the source folder (src +
 * measured aspectRatio), so the masonry can rely on every image knowing its
 * own shape.
 */
export const gallerySchema = z.object({
  version: z.number().default(1),
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
  }),
  images: z.array(imageAssetSchema).default([]),
});

export type Gallery = z.infer<typeof gallerySchema>;
