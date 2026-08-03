import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kodoai.xyz";

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-study/${cs.slug}`,
    lastModified: new Date("2026-08-02"),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...caseStudyRoutes,
  ];
}
