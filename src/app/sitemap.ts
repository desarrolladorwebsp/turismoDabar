import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { TRAVEL_PRODUCTS } from "@/lib/travel-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/planes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...TRAVEL_PRODUCTS.map((product) => ({
      url: `${SITE_URL}/planes/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
