import type { MetadataRoute } from "next";
import { siteUrl } from "@/src/lib/site-url";

// Required under `output: "export"` — emits a build-time robots.txt file.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
