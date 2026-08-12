// -----------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR ALL COPY.
// Rule (IMPLEMENTATION.md §2 / §12): zero hardcoded strings in components.
// When copy is upgraded later, this is the only file that changes.
// -----------------------------------------------------------------------------

export type NavLink = { label: string; href: string };
export type Social = { label: string; href: string };

export type ProcessPhase = {
  n: string;
  title: string;
  body: string;
  chips: string[];
};

export type Service = { title: string; desc: string };
export type QA = { q: string; a: string };

// -- Site-wide -----------------------------------------------------------------

export const site = {
  name: "kodoAI",
  wordmark: { light: "KODO", accent: "AI" },
  tagline: "BUILD THE SYSTEM YOUR TEAM KEEPS RUNNING BY HAND",
  sub: "KodoAI builds custom AI agents, internal software and governed automations that connect your tools, move work forward and keep people in control of high-stakes decisions.",
  email: "soban@kodoai.xyz",
  location: ["Working worldwide."],
  cta: { label: "SHOW US THE WORKFLOW", href: "#footer" },
};

export const nav: NavLink[] = [
  { label: "ABOUT", href: "#quotation" },
  { label: "PROCESS", href: "#process" },
  { label: "WORK", href: "#projects" },
  { label: "SERVICES", href: "#services" },
];

export const socials: Social[] = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/soban-ahmad-malik/" },
];

// -- 01 Hero -------------------------------------------------------------------

export const hero = {
  eyebrow: "// CUSTOM AI AUTOMATION AND ORCHESTRATION",
  headline: "BUILD THE SYSTEM YOUR TEAM KEEPS RUNNING BY HAND.",
  sub: "KodoAI designs custom AI agents and internal software for processes that lose time, revenue or control between tools. We connect the stack you already use, automate the repeatable work, and keep human approval wherever judgement or risk demands it.",
};

// -- 02 Quotation --------------------------------------------------------------

export const quotation = {
  eyebrow: "// OUR THESIS",
  text: "EVERY PROCESS YOUR TEAM RUNS BY HAND LEAKS VALUE AT EVERY HANDOFF. WE BUILD THE LAYER THAT CATCHES IT, AND KEEP A PERSON IN CONTROL WHERE THE DECISION SHOULD NOT BE AUTOMATED.",
  // Phrases must include their trailing punctuation: splitWords matches them as
  // literal substrings, so a stray ":" would break off into its own word.
  highlights: ["EVERY HANDOFF.", "SHOULD NOT BE AUTOMATED."],
  attribution: "KODOAI · AI AUTOMATION AND ORCHESTRATION",
};

// -- 03 Process Timeline -------------------------------------------------------

export const processEyebrow = "// PROCESS · HOW WE WORK";

export const process: ProcessPhase[] = [
  {
    n: "01",
    title: "WE AUDIT",
    body: "We sit with the people who run the process and map every step, tool, handoff, wait and exception. The goal is to find the point where delay or rework costs the most.",
    chips: ["WORKFLOW MAP", "EXCEPTION REGISTER", "ACCESS MAP"],
  },
  {
    n: "02",
    title: "WE QUANTIFY",
    body: "We measure the hours lost, opportunities missed, error risk and the value of a faster outcome. If the process does not justify a custom build, we will say so.",
    chips: ["COST-OF-DELAY MODEL", "BUILD VS BUY", "PILOT SCOPE"],
  },
  {
    n: "03",
    title: "WE BUILD",
    body: "We use AI where context and extraction matter, and deterministic code where the same input must always produce the same action. Sensitive decisions stay behind explicit approval gates.",
    chips: ["CUSTOM AGENTS", "STACK INTEGRATIONS", "APPROVAL GATES"],
  },
  {
    n: "04",
    title: "WE RUN",
    body: "A production system has to work on its worst day. We monitor failures, surface exceptions, and tune the workflow as your process, team and tools change.",
    chips: ["FAILURE ALERTS", "AUDIT LOGS", "OUTCOME REPORTING"],
  },
];

// -- 04 Projects → see src/lib/projects.ts (analyzed from previous_projects/) ---

// -- 05 Services ---------------------------------------------------------------

export const servicesEyebrow = "// WHAT WE BUILD";

export const services: Service[] = [
  {
    title: "WORKFLOW AUTOMATION",
    desc: "Multi-step processes that move from trigger to completion without staff relaying data between systems",
  },
  {
    title: "INTERNAL TOOLS",
    desc: "Dashboards, portals and admin systems designed around the way your team actually works",
  },
  {
    title: "DOCUMENT & DATA AGENTS",
    desc: "Systems that read, structure, check and route information from forms, contracts, invoices and PDFs",
  },
  {
    title: "VOICE & INTAKE AGENTS",
    desc: "Phone and chat experiences that capture context, qualify inquiries and hand off with a complete record",
  },
  {
    title: "SALES & RESEARCH AGENTS",
    desc: "Prospect research, account briefs and follow-up preparation connected to your sales process",
  },
  {
    title: "AD-OPS & GROWTH AGENTS",
    desc: "Monitoring, analysis and human-approved execution across paid media workflows",
  },
  {
    title: "SYSTEM INTEGRATIONS",
    desc: "Reliable connections across CRMs, databases, calendars, payment tools and communication platforms",
  },
  {
    title: "MONITORING & REPORTING",
    desc: "Operational dashboards, scheduled reporting, failure alerts and an audit trail of what the system did",
  },
];

// -- 05b Governance ----------------------------------------------------------

export type GovernancePrinciple = { title: string; desc: string };

export const governanceEyebrow = "// CONTROL WHERE IT MATTERS";
export const governanceHeading = {
  lead: "AI CAN INTERPRET THE WORK.",
  accent: "IT SHOULD NOT QUIETLY OWN THE RISK.",
};
export const governanceIntro =
  "We separate probabilistic tasks from controlled decisions. An AI model can extract names, summarise an inquiry or identify missing information. Deterministic rules decide which action is allowed next. High-impact actions wait for the right person.";

export const governance: GovernancePrinciple[] = [
  {
    title: "APPROVAL GATES",
    desc: "Define who can approve customer, financial, legal or operational actions before anything moves downstream.",
  },
  {
    title: "LEAST-PRIVILEGE ACCESS",
    desc: "Give each service and user only the data and permissions required for its job.",
  },
  {
    title: "TRACEABLE DECISIONS",
    desc: "Record source data, system actions, rule versions, exceptions and human overrides for review.",
  },
  {
    title: "SAFE FAILURE PATHS",
    desc: "Stop, queue and alert when a required system is unavailable or the result is too uncertain to act on.",
  },
  {
    title: "MAINTAINABLE RULES",
    desc: "Document, test and version the operational logic so it can change with the business instead of becoming hidden technical debt.",
  },
];

// -- 05c Engagement Model --------------------------------------------------------

export type EngagementStep = { n: string; title: string; desc: string; ctaLabel: string };

export const engagementEyebrow = "// START WITH ONE EXPENSIVE WORKFLOW";
export const engagementHeading = {
  lead: "WE DO NOT BEGIN WITH",
  accent: "A LIST OF AI FEATURES.",
};
export const engagementIntro =
  "We begin with one process that is slow, fragmented or too dependent on a few experienced people. Then we test whether a custom system can create enough value to justify its cost.";

export const engagementSteps: EngagementStep[] = [
  {
    n: "01",
    title: "WORKFLOW AUDIT",
    desc: "Map the current process, quantify the leakage and identify the smallest useful intervention.",
    ctaLabel: "START WITH AN AUDIT",
  },
  {
    n: "02",
    title: "CONTROLLED PILOT",
    desc: "Run one channel, team or workflow in shadow mode. Compare its output with the current process before expanding its authority.",
    ctaLabel: "SCOPE A PILOT",
  },
  {
    n: "03",
    title: "PRODUCTION SYSTEM",
    desc: "Integrate the validated workflow, add monitoring and support the rules, models and APIs after launch.",
    ctaLabel: "DISCUSS A PRODUCTION BUILD",
  },
];

export const engagementSelectivity =
  "Custom software is not the answer to every manual process. We take on work where the bottleneck is measurable, the process owner is involved and the expected value supports a maintained system.";

// -- 06 Q&A --------------------------------------------------------------------

export const faqEyebrow = "// FAQ";
export const faqIntro = "Everything clients ask before starting.";

export const faq: QA[] = [
  {
    q: "What kind of work do you automate?",
    a: "We focus on repeatable operational workflows with clear inputs, rules, handoffs and outcomes. Typical projects include intake, qualification, routing, document processing, research, internal tools, reporting and cross-system coordination.",
  },
  {
    q: "Is this an AI wrapper or custom software?",
    a: "It is custom software built around the workflow. AI models may handle conversation, extraction or summarisation. The surrounding system handles permissions, integrations, business rules, approvals, logging, retries and monitoring.",
  },
  {
    q: "How is this different from an off-the-shelf tool or Zapier?",
    a: "Off-the-shelf tools work well when the process is standard and each step fits a supported trigger. We are useful when the workflow crosses several systems, depends on your specific rules, contains material exceptions or needs stronger control over how decisions are made and recorded.",
  },
  {
    q: "Do you replace our current software?",
    a: "Usually not. We prefer to connect the CRM, database, phone system, payment service and other tools your team already relies on. We only recommend replacing a system when integration limits make the outcome unreliable or uneconomic.",
  },
  {
    q: "How do you keep an agent from doing something it should not?",
    a: "We define allowed actions, apply deterministic checks, restrict permissions and place approval gates before high-impact steps. We also log activity and create safe failure paths for unavailable systems, incomplete information and uncertain model output.",
  },
  {
    q: "What does a project cost?",
    a: "Cost depends on workflow depth, number of integrations, data sensitivity and exception logic. We scope the smallest build that can prove the business case, then price production work and ongoing support against that scope. The audit makes the investment and expected payback visible before development begins.",
  },
  {
    q: "How long does a build take?",
    a: "A focused pilot can move quickly when the workflow owner, access and test data are available. A multi-system production build takes longer because rules, permissions, edge cases and failure paths have to be tested. We set milestones after the audit rather than offering a universal timeline.",
  },
  {
    q: "Do you work only with law firms?",
    a: "No. KodoAI builds automation and orchestration systems across industries. Legal intake is a specialised capability within the broader practice, shaped by our experience building legal operations software and approval-gated systems.",
  },
];

// -- 06b Final CTA -------------------------------------------------------------

export const finalCta = {
  eyebrow: "// READY WHEN YOU ARE",
  lead: "FIND THE WORKFLOW COSTING YOU THE MOST.",
  accent: "THEN DECIDE IF IT'S WORTH FIXING.",
  ctaLabel: "SHOW US THE WORKFLOW",
};

// Cal.com booking (element-click popup). The CTA opens this event in a modal.
export const booking = {
  namespace: "30min",
  calLink: "soban-ahmad/30min",
};

// -- 07 Footer -----------------------------------------------------------------

export const footer = {
  navHeading: "NAVIGATION",
  nav: [
    { label: "ABOUT", href: "#quotation" },
    { label: "PROCESS", href: "#process" },
    { label: "WORK", href: "#projects" },
    { label: "SERVICES", href: "#services" },
    { label: "CONTACT", href: "#footer" },
  ] as NavLink[],
  detailsHeading: "STUDIO DETAILS",
  sites: [
    { label: "SOBANAHMAD.DEV", href: "https://sobanahmad.dev/" },
    { label: "ABDULMOEIZ.COM", href: "https://abdulmoeiz.com" },
  ] as NavLink[],
  socialsHeading: "SOCIALS",
  ctaEyebrow: "// START A PROJECT",
  ctaLabel: "SHOW US THE WORKFLOW",
  copyright: "© 2026 KODOAI. ALL RIGHTS RESERVED.",
  tagline: "// KODOAI: CUSTOM AI AUTOMATION AND ORCHESTRATION SYSTEMS",
  backToTop: "BACK TO TOP",
};
