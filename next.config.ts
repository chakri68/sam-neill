import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React <ViewTransition> for the timeline → Memory Machine handoff (Phase 2).
    viewTransition: true,
  },
  images: {
    // Next 16 restricts optimization to these quality levels; TributeImage
    // uses 78 (normal) and 45 (reduced-data), so both must be listed.
    qualities: [45, 75, 78],
    // Local images under /public work out of the box. Remote hosts must be
    // allowed explicitly — i.ytimg.com serves the YouTube video posters.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
