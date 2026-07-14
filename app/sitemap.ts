import type { MetadataRoute } from "next";
import { siteUrl } from "@/src/lib/site-url";

// Single-page site: one URL. lastModified stamps build time, which is also
// the last time the content could have changed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
