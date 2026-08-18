// -----------------------------------------------------------------------------
// SOLUTIONS: shared shape
// A "solution" is a vertical KodoAI has already built end to end and sells as a
// system: /legal-intake, /med-spa. Every one renders through the same
// components (solutions/SolutionView.tsx, FlowDiagram.tsx, TestimonialStrip.tsx)
// and appears as one column in the homepage SolutionsTeaser, so the shape below
// is the contract between the data files and those components.
//
// Copy for these lives here rather than in content.ts for the same reason
// projects.ts / caseStudies.ts do: large, self-contained blocks, not sitewide
// chrome copy.
// -----------------------------------------------------------------------------

import type { CSHeading } from "@/lib/caseStudies";

export type SolutionCapability = { num: string; title: string; description: string };
export type SolutionRow = { stage: string; whatHappens: string; controlPoint: string };
export type SolutionIndustry = { title: string; description: string };
export type FlowNode = { title: string; detail: string };
export type FlowStage = { num: string; title: string; caption: string; nodes: FlowNode[] };
export type SolutionTestimonial = { quote: string; name: string; role: string; location: string };

/**
 * The agent perimeter drawn by FlowDiagram.tsx: inbound demand → agent stages →
 * one unified record → across the boundary into the client's own core system.
 */
export type SolutionFlow = {
  eyebrow: string;
  heading: CSHeading;
  intro: string;
  caption: string; // visually hidden <figcaption>
  source: { label: string; items: string[] };
  stages: FlowStage[];
  loop: { label: string; detail: string };
  record: { eyebrow: string; title: string; detail: string };
  core: { eyebrow: string; steps: string[]; detail: string };
};

export type Solution = {
  slug: string; // route: /<slug>
  navLabel: string; // header link on the *other* solution's page
  meta: { title: string; description: string };

  // One column of the homepage SolutionsTeaser. Deliberately short: the column
  // is a pointer to the page, not a summary of it.
  teaser: {
    eyebrow: string;
    title: string;
    body: string;
    capabilities: string[];
    cta: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    titleSub: string;
    ambient: string; // giant ghost background word
    lead: string;
    primaryCta: string;
    secondaryCta: string;
  };

  capabilitiesEyebrow: string;
  capabilitiesHeading: CSHeading;
  capabilities: SolutionCapability[];

  orchestration: {
    eyebrow: string;
    heading: CSHeading;
    columns: { stage: string; whatHappens: string; controlPoint: string };
    rows: SolutionRow[];
  };

  flow: SolutionFlow;

  fit: {
    eyebrow: string;
    intro: string;
    industries: SolutionIndustry[];
    notRightFit: string;
  };

  testimonials: {
    eyebrow: string;
    heading: CSHeading;
    items: SolutionTestimonial[];
  };

  cta: {
    heading: CSHeading;
    body: string;
    label: string;
  };
};
