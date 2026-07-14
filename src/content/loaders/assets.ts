import assetsData from "@/content/assets.json";
import { assetsSchema, type Assets } from "../schemas/assets";
import type { ImageAsset, TextureAsset } from "../schemas/image";
import { validateConfig } from "@/src/lib/validation/validate";

const assets: Assets = validateConfig(assetsSchema, assetsData, "assets.json");

const isDev = process.env.NODE_ENV !== "production";

/**
 * Resolve a registry image by key. A missing key is not fatal — it returns a
 * neutral placeholder asset and warns in dev, so a bad reference degrades to
 * TributeImage's fallback instead of throwing.
 */
export function getImage(key: string): ImageAsset {
  const asset = assets.images[key];
  if (asset) return asset;
  if (isDev) console.warn(`[assets] unknown image key "${key}" — using placeholder`);
  return { src: "", alt: "" };
}

/** Resolve a registry texture by key, or `null` if it isn't defined. */
export function getTexture(key: string): TextureAsset | null {
  return assets.textures[key] ?? null;
}

export { assets };
