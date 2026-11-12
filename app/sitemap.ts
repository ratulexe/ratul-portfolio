import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/portfolio";

// Served at /sitemap.xml — tells search engines which pages exist.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
