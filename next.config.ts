import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/assets to /out, which
  // any static host (GitHub Pages) serves as-is. `next start` no longer applies.
  output: "export",
  // Sub-path the site is served under — /<repo> on GitHub project pages,
  // unset locally. src/lib/site-url.ts reads the same var to prefix asset
  // paths, so the two can't drift.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  experimental: {
    // React <ViewTransition> for the timeline → Memory Machine handoff (Phase 2).
    viewTransition: true,
  },
  images: {
    // Static export has no optimizer server; originals are served as-is.
    unoptimized: true,
    // Inert while unoptimized — kept for a server-hosted future. Next 16
    // restricts optimization to these quality levels; TributeImage uses 78
    // (normal) and 45 (reduced-data). i.ytimg.com serves the video posters.
    qualities: [45, 75, 78],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
