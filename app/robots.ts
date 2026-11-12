import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/portfolio";

// Served at /robots.txt — lets search engines crawl everything and points them to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
