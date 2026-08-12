// -----------------------------------------------------------------------------
// LEGAL INTAKE
// Homepage teaser (LegalIntakeTeaser.tsx) + the full /legal-intake subpage
// (LegalIntakeView.tsx). Distilled from KodoAI-Landing-Page-Copy.md's
// "Featured solution: legal intake" section. Lives outside content.ts for the
// same reason projects.ts/caseStudies.ts do: a large, self-contained block,
// not sitewide chrome copy.
// -----------------------------------------------------------------------------

import type { CSHeading } from "@/lib/caseStudies";
import { CTA_BODY } from "@/lib/caseStudies";

export type LegalIntakeCapability = { num: string; title: string; description: string };
export type LegalIntakeRow = { stage: string; whatHappens: string; controlPoint: string };
export type LegalIntakeIndustry = { title: string; description: string };

export const legalIntakeTeaser = {
  eyebrow: "// LEGAL OPERATIONS",
  heading: "HIGH-VOLUME LEAD ROUTING AND GOVERNED INTAKE",
  body: [
    "When a valuable inquiry arrives, speed matters. So do conflict procedures, qualification standards and the firm's authority to accept the matter. Most intake stacks solve one part of that journey and leave staff to reconcile the rest by hand.",
    "KodoAI builds the integration and decision-governance layer between the firm's AI receptionist, practice-management system, conflict records and engagement workflow. For standard inquiries, the system can prepare a matter for conflict-ready review in as little as 10 minutes, subject to the firm's own conflict procedures and attorney approval.",
  ],
  capabilities: [
    "MINIMAL PRE-CONFLICT CAPTURE",
    "CONFLICT-READY PREPARATION",
    "DETERMINISTIC ROUTING",
    "APPROVAL-GATED ENGAGEMENT",
  ],
  primaryCta: "AUDIT OUR INTAKE FLOW",
  secondaryCta: "SEE HOW THE LAYER WORKS",
};

export const legalIntakePage = {
  hero: {
    eyebrow: "// LEGAL OPERATIONS",
    title: "HIGH-VOLUME LEAD ROUTING",
    titleSub: "AND GOVERNED INTAKE",
    ambient: "INTAKE",
    lead: "When a valuable inquiry arrives, speed matters, and so do conflict procedures, qualification standards and the firm's authority to accept the matter. KodoAI builds the integration and decision-governance layer between the firm's AI receptionist, practice-management system, conflict records and engagement workflow.",
    primaryCta: "AUDIT OUR INTAKE FLOW",
    secondaryCta: "SEE THE ORCHESTRATION LAYER",
  },
  capabilitiesEyebrow: "// WHAT THE SYSTEM CAN COORDINATE",
  capabilitiesHeading: {
    lead: ["SIX CAPABILITIES."],
    tail: "ONE GOVERNED LAYER.",
    tailAccent: false,
  } as CSHeading,
  capabilities: [
    { num: "01", title: "Minimal Pre-Conflict Capture", description: "Bring approved call, form, chat and referral inputs into one prospect record. Capture safe-contact preferences and only the details needed for the firm's preliminary conflict procedure." },
    { num: "02", title: "Conflict-Ready Preparation", description: "Extract and normalise names, adverse parties, aliases and related entities. Search the sources the firm authorises and send uncertain results to the designated reviewer." },
    { num: "03", title: "Adaptive Qualification", description: "Once the firm's preliminary conflict check clears, ask the next relevant question based on practice area, jurisdiction and the firm's acceptance criteria." },
    { num: "04", title: "Deterministic Routing", description: "Apply the firm's approved rules for case type, venue, limitation risk, language and attorney capacity. AI interprets the inquiry; the routing decision follows controlled logic." },
    { num: "05", title: "Approval-Gated Engagement", description: "Move qualified matters to the right reviewer. Trigger booking, e-signature, payment or follow-up only after the required approval state is recorded." },
    { num: "06", title: "Audit and Exception Handling", description: "Log the inputs, rules, possible matches and overrides. If a source is unavailable or a field is missing, the workflow stops safely and alerts the right person." },
  ] as LegalIntakeCapability[],
  orchestration: {
    eyebrow: "// THE ORCHESTRATION LAYER",
    heading: {
      lead: ["EVERY STAGE."],
      tail: "ONE CONTROL POINT.",
      tailAccent: false,
    } as CSHeading,
    columns: { stage: "Stage", whatHappens: "What happens", controlPoint: "Control point" },
    rows: [
      { stage: "Minimal capture", whatHappens: "Approved channels create or update one prospect record", controlPoint: "Safe contact, consent, source and duplicate checks" },
      { stage: "Conflict preparation", whatHappens: "Authorised records are searched using normalised parties and entities", controlPoint: "Possible matches shown with source evidence" },
      { stage: "Qualification", whatHappens: "The system gathers deeper facts only after the preliminary checkpoint", controlPoint: "Required fields, urgency and uncertainty flags" },
      { stage: "Routing", whatHappens: "Firm rules select a review queue, attorney or referral path", controlPoint: "Deterministic logic and exception queue" },
      { stage: "Decision", whatHappens: "The designated person reviews fit and conflict information", controlPoint: "Human or attorney approval" },
      { stage: "Engagement", whatHappens: "Approved actions create the matter, issue documents, take payment or book time", controlPoint: "Recorded approval before execution" },
    ] as LegalIntakeRow[],
  },
  fit: {
    eyebrow: "// DESIGNED FOR FIRMS WHERE DELAY HAS A REAL COST",
    intro: "The strongest fit is a high-volume boutique firm with valuable inbound inquiries, several intake channels, multiple practice areas or jurisdictions, and rules that do not fit neatly inside a standard form.",
    industries: [
      { title: "Personal Injury", description: "Preserve PPC and LSA attribution, merge duplicate phone and form inquiries, escalate catastrophic matters, and route co-counsel or referral cases without losing the source or approval history." },
      { title: "Family Law", description: "Capture safe-contact preferences before follow-up. Match former names, spouses, children and related entities. Route possible conflicts, urgent hearings and domestic-violence concerns to the firm's designated reviewers." },
      { title: "Plaintiff Employment", description: "Resolve employer brands, payroll entities, staffing firms and related companies. Extract event dates and evidence gaps, and flag deadline-sensitive matters for attorney review." },
    ] as LegalIntakeIndustry[],
    notRightFit: "Usually not the right fit for a low-volume firm with one clean intake path and a practice-management setup that already handles its exceptions well.",
  },
  cta: {
    heading: { lead: ["WANT THE INTAKE"], tail: "LAYER LIVE?", tailAccent: true } as CSHeading,
    body: CTA_BODY,
    label: "AUDIT OUR INTAKE FLOW",
  },
};
