// -----------------------------------------------------------------------------
// SOLUTIONS: registry
// The ordered list drives the homepage SolutionsTeaser columns, the sitemap and
// the cross-links in each solution page's header. Adding a vertical means adding
// a data file here plus its route folder under src/app/<slug>/.
// -----------------------------------------------------------------------------

import type { NavLink } from "@/lib/content";
import type { Solution } from "@/lib/solutions/types";
import { legalIntake } from "@/lib/solutions/legalIntake";
import { medSpa } from "@/lib/solutions/medSpa";

export type { Solution } from "@/lib/solutions/types";

export const solutions: Solution[] = [legalIntake, medSpa];

// Homepage section (#solutions): one heading over the two columns.
export const solutionsTeaser = {
  eyebrow: "// SOLUTIONS",
  heading: "SYSTEMS WE HAVE ALREADY BUILT END TO END",
  intro:
    "Two verticals, one idea. Narrow agents do the gathering; the decision stays with the people licensed to make it.",
  cta: "SHOW US YOUR WORKFLOW",
};

/**
 * Header nav for a solution page: HOME, then every other solution. Keeps both
 * pages one click apart without a second nav pattern (the case study pages use
 * the same slim HOME-only header).
 */
export function solutionNav(slug: string): NavLink[] {
  return [
    { label: "HOME", href: "/" },
    ...solutions
      .filter((s) => s.slug !== slug)
      .map((s) => ({ label: s.navLabel, href: `/${s.slug}` })),
  ];
}
