/**
 * Canonical site origin, shared by metadata, robots.txt, and the sitemap so
 * they can never disagree. Set NEXT_PUBLIC_SITE_URL at deploy time; the
 * localhost fallback exists because metadataBase requires an absolute URL
 * even for local builds.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
