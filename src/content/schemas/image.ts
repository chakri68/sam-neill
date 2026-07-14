import { z } from "zod";

/**
 * The universal image contract. Every image on the site — hero, timeline,
 * posters, textures — is described by this shape so no component ever
 * imports a specific file. `alt` defaults to "" (decorative); meaningful
 * images should supply their own.
 */
export const imageAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string().default(""),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  focalPoint: z
    .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
    .optional(),
  objectPosition: z.string().optional(),
  /**
   * CSS aspect-ratio for this image's frame, e.g. "3 / 4". Overrides the
   * layout's default frame so portrait sources aren't cropped into landscape.
   */
  aspectRatio: z
    .string()
    .regex(/^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/)
    .optional(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  creditUrl: z.string().optional(),
  blurDataUrl: z.string().optional(),
});

export type ImageAsset = z.infer<typeof imageAssetSchema>;

/** A decorative texture: an image plus the opacity it should render at. */
export const textureAssetSchema = z.object({
  src: z.string().min(1),
  opacity: z.number().min(0).max(1).default(0.06),
  alt: z.string().default(""),
});

export type TextureAsset = z.infer<typeof textureAssetSchema>;

/**
 * Numeric value of a "W / H" `aspectRatio` string ("3 / 4" → 0.75), or null
 * when the asset doesn't declare one.
 */
export function aspectRatioValue(
  asset: Pick<ImageAsset, "aspectRatio">,
): number | null {
  if (!asset.aspectRatio) return null;
  const [w, h] = asset.aspectRatio.split("/").map((part) => Number.parseFloat(part));
  return w > 0 && h > 0 ? w / h : null;
}

/**
 * Resolve a `focalPoint` or `objectPosition` into a CSS object-position
 * string. focalPoint wins when both are present; falls back to "center".
 */
export function resolveObjectPosition(asset: Pick<ImageAsset, "focalPoint" | "objectPosition">): string {
  if (asset.focalPoint) {
    return `${asset.focalPoint.x * 100}% ${asset.focalPoint.y * 100}%`;
  }
  return asset.objectPosition ?? "center";
}
