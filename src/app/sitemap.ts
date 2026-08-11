import type { MetadataRoute } from "next";

import { brand, services } from "@/content/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: brand.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...services.map((service) => ({
      url: `${brand.url}/uslugi/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
