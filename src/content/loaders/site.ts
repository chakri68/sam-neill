import siteData from "@/content/site.json";
import { siteSchema, type Site } from "../schemas/site";
import { validateConfig } from "@/src/lib/validation/validate";

/** Validated, normalized site content. Import `site` — never the raw JSON. */
export const site: Site = validateConfig(siteSchema, siteData, "site.json");

export type { Site, FeatureFlags } from "../schemas/site";

/** Convenience: is a given feature flag on? */
export function isFeatureEnabled(flag: keyof Site["features"]): boolean {
  return site.features[flag] === true;
}
