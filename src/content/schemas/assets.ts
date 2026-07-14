import { z } from "zod";
import { imageAssetSchema, textureAssetSchema } from "./image";

/**
 * The central asset registry. Shared images live under `images` keyed by a
 * stable name (e.g. "heroPortrait"); replaceable textures live under
 * `textures`. Components reference assets by key, never by path.
 */
export const assetsSchema = z.object({
  images: z.record(z.string(), imageAssetSchema).default({}),
  textures: z.record(z.string(), textureAssetSchema).default({}),
});

export type Assets = z.infer<typeof assetsSchema>;
export type AssetKey = string;
