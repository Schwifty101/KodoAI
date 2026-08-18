import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/caseStudies";
import { solutions } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kodoai.xyz";

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${baseUrl}/${s.slug}`,
    lastModified: new Date("2026-08-18"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

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
    ...solutionRoutes,
    ...caseStudyRoutes,
  ];
}
