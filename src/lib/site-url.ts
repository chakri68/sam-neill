/**
 * Deploy-location facts, shared by metadata, robots, the sitemap, and asset
 * path prefixing so they can never disagree.
 *
 * - NEXT_PUBLIC_SITE_URL — full public URL of the site root, including any
 *   base path (e.g. https://chakri68.github.io/sam-neill). Drives canonical,
 *   Open Graph, and sitemap URLs.
 * - NEXT_PUBLIC_BASE_PATH — sub-path the site is served under (e.g.
 *   /sam-neill on GitHub project pages); empty when served from a domain
 *   root. Must match `basePath` in next.config.ts, which reads the same var.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Scheme + host only — the base against which prefixed paths resolve. */
export const siteOrigin = new URL(siteUrl).origin;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative asset path with the base path. Next rewrites its own
 * routes and next/link hrefs, but plain <img>/<audio> srcs, next/image srcs,
 * and CSS urls it leaves alone — so every path read from content JSON goes
 * through here. Absolute URLs and data: URIs pass through untouched.
 */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
