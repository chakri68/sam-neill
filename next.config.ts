import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React <ViewTransition> for the timeline → Memory Machine handoff (Phase 2).
    viewTransition: true,
  },
  images: {
    // Local images under /public work out of the box. When sourcing photos
    // from remote hosts, allow them explicitly here, e.g.:
    // remotePatterns: [{ protocol: "https", hostname: "upload.wikimedia.org" }],
    remotePatterns: [],
  },
};

export default nextConfig;
