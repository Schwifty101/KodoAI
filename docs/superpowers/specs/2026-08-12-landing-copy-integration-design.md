# Landing page copy integration — design

Source: `KodoAI-Landing-Page-Copy.md` (repo root). Goal: integrate this copy into
the live site. Existing visual design, layout, GSAP animation code, and
`src/lib/projects.ts` / `src/lib/caseStudies.ts` are not touched except where
noted. This doc is both the architecture spec and the final copy — the copy
*is* the deliverable for this project, so field values below are final, not
placeholders.

## Decisions already made (user-approved)

1. The copy doc has 3 sections with no matching component: **Legal Intake**
   (deep dive + comparison table), **Governance by design**, **Engagement
   model**. Resolution: build them as new sections/pages.
2. **Legal Intake** specifically: homepage teaser section + a full new
   `/legal-intake` subpage (reusing the existing `/case-study/[slug]` visual
   pattern), rather than one giant homepage section or a stripped-down teaser
   with no depth.
3. **FAQ**: ship 8 general-business questions from the new doc (13 available),
   dropping the 2 explicitly about automated conflict-clearing, plus "Are your
   systems compliant?" and "Who is a good fit?" (both substantially covered
   elsewhere on the page now). Kept "Do you work only with law firms?" since
   Legal Intake is now a prominent section.
4. **Contact email**: switch `site.email` to `soban@kodoai.xyz` (doc's value),
   superseding the `hello@kodoai.xyz` set in a recent deliberate commit.
5. **Nav**: header and footer nav both grow from 4 to 6 items (add LEGAL
   INTAKE, FAQS). Confirmed acceptable including the header density change.

## Page architecture

```
Hero
Quotation (Thesis)
Process (Approach)
[NEW] LegalIntakeTeaser          — id="legal-intake"
Projects (Highlights)
Services (Capabilities)
[NEW] Governance                 — id="governance"
[NEW] EngagementModel            — id="engagement"
FAQ
Footer (Final CTA lives inside Footer, unchanged structurally)
```

All three new sections render inside the existing `.depth-band` wrapper in
`src/app/(site)/page.tsx` (transparent background, no own `bg-*`), same rule
the current mid-page sections follow. No existing section is reordered
relative to any other existing section.

`src/app/(site)/page.tsx` becomes:

```tsx
<Hero />
<div className="depth-band">
  <Quotation />
  <ProcessTimeline />
  <LegalIntakeTeaser />
  <Projects />
  <Services />
  <Governance />
  <EngagementModel />
  <FAQ />
</div>
```

## New files

- `src/components/sections/LegalIntakeTeaser.tsx` — homepage teaser section.
- `src/components/sections/Governance.tsx` — homepage section, 5-card grid.
- `src/components/sections/EngagementModel.tsx` — homepage section, 3 rows.
- `src/lib/legalIntake.ts` — teaser copy + full subpage copy (mirrors the
  `projects.ts` / `caseStudies.ts` pattern of living outside `content.ts`).
- `src/app/legal-intake/page.tsx` — new static route. Same chrome pattern as
  `src/app/case-study/[slug]/page.tsx`: `<Header links={HOME_NAV} logoHref="/" />`
  + view + `<Footer />`. `Footer`'s existing `navHref` helper already rewrites
  bare `#anchor` hrefs to `/#anchor` off the homepage, so it needs no changes.
- `src/components/legal-intake/LegalIntakeView.tsx` — subpage view, structured
  like `CaseStudyView.tsx` (hero → intro → capability cards → orchestration
  table → industry fit → CTA), same `.cs-reveal`/`.cs-section` GSAP fade-up
  convention, `depth-band` on the root element.
- `src/components/ui/SectionPrimitives.tsx` — `Eyebrow` and `Heading` (lead
  lines + accent/muted tail) extracted out of `CaseStudyView.tsx` so
  `LegalIntakeView` doesn't duplicate them. `CaseStudyView.tsx` imports them
  from here instead of defining them locally. Everything else
  (`FeatureCard`-equivalent, `TagRow`, table markup) is written directly in
  `LegalIntakeView.tsx` — not extracted, since the shapes differ enough
  (no tags, no tech stack, a table) that a shared abstraction would just be
  indirection for a 2-file win.
- `src/lib/caseStudies.ts` — export the existing local `CTA_BODY` constant
  (currently module-private) so `legalIntake.ts` can reuse the exact same
  closing-CTA copy instead of duplicating the string.

## Content — existing sections

### `site` (content.ts)

```ts
export const site = {
  name: "kodoAI",
  wordmark: { light: "KODO", accent: "AI" },
  tagline: "BUILD THE SYSTEM YOUR TEAM KEEPS RUNNING BY HAND",
  sub: "KodoAI builds custom AI agents, internal software and governed automations that connect your tools, move work forward and keep people in control of high-stakes decisions.",
  email: "soban@kodoai.xyz",
  location: ["Working worldwide."],
  cta: { label: "SHOW US THE WORKFLOW", href: "#footer" },
};
```

`tagline` cascades to `hero.headline` (below), the footer's small tagline
line, and the JSON-LD `slogan` in `layout.tsx` — all three should read the new
line. `sub` cascades to the meta description and JSON-LD `description`.

### `nav` (content.ts) — and mirrored in `footer.nav`

```ts
export const nav: NavLink[] = [
  { label: "ABOUT", href: "#quotation" },
  { label: "PROCESS", href: "#process" },
  { label: "LEGAL INTAKE", href: "/legal-intake" },
  { label: "WORK", href: "#projects" },
  { label: "SERVICES", href: "#services" },
  { label: "FAQS", href: "#faq" },
];
```

`footer.nav` gets the same two additions, keeping its existing `CONTACT`
entry last:
`ABOUT, PROCESS, LEGAL INTAKE, WORK, SERVICES, FAQS, CONTACT`.

### `hero` (content.ts)

```ts
export const hero = {
  eyebrow: "// CUSTOM AI AUTOMATION AND ORCHESTRATION",
  headline: "BUILD THE SYSTEM YOUR TEAM KEEPS RUNNING BY HAND.",
  sub: "KodoAI designs custom AI agents and internal software for processes that lose time, revenue or control between tools. We connect the stack you already use, automate the repeatable work, and keep human approval wherever judgement or risk demands it.",
};
```

Note: `hero.eyebrow` is not currently rendered anywhere in `Hero.tsx` (verified
by grep — dead field today). Updating its value is free and keeps it correct
if it's ever wired up, but this spec does not add rendering for it — that
would be new hero layout, out of scope. Same reasoning for the doc's Hero
capability strip and the Hero primary/secondary CTA pair: `Hero.tsx` today
renders only `headline` and `sub`, no CTAs and no chip list. Not adding them.

### `quotation` (content.ts)

The doc's Thesis section is 4 prose paragraphs; the `Quotation` component is
built for one scrubbed maxim (word-by-word colour reveal), not multi-paragraph
prose. Synthesized down to the component's shape, keeping the doc's two
strongest lines ("leaks value at every handoff", "should not be automated"):

```ts
export const quotation = {
  eyebrow: "// OUR THESIS",
  text: "EVERY PROCESS YOUR TEAM RUNS BY HAND LEAKS VALUE AT EVERY HANDOFF. WE BUILD THE LAYER THAT CATCHES IT, AND KEEP A PERSON IN CONTROL WHERE THE DECISION SHOULD NOT BE AUTOMATED.",
  highlights: ["EVERY HANDOFF.", "SHOULD NOT BE AUTOMATED."],
  attribution: "KODOAI · AI AUTOMATION AND ORCHESTRATION",
};
```

### `process` (content.ts) — 4 phases, 1:1 with the doc's "Approach" steps

Titles keep their existing "WE ___" form (already matches the doc's step
verbs; doc doesn't specify a punchier alternative). Bodies use the doc's
sentences directly. Chips picked from each step's "Outputs" list, keeping the
chip text that already existed where the doc overlaps with it (WORKFLOW MAP,
FAILURE ALERTS, CUSTOM AGENTS, APPROVAL GATES all survive unchanged).

```ts
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
```

`processEyebrow` unchanged (`"// PROCESS · HOW WE WORK"` — doc's label "How We
Work" already matches).

### `services` (content.ts) — 8 items, 1:1 with the doc's "Broader capabilities"

Titles already match the doc almost verbatim, no changes needed. Descriptions
replaced with the doc's lines:

```ts
export const servicesEyebrow = "// WHAT WE BUILD";

export const services: Service[] = [
  { title: "WORKFLOW AUTOMATION", desc: "Multi-step processes that move from trigger to completion without staff relaying data between systems." },
  { title: "INTERNAL TOOLS", desc: "Dashboards, portals and admin systems designed around the way your team actually works." },
  { title: "DOCUMENT & DATA AGENTS", desc: "Systems that read, structure, check and route information from forms, contracts, invoices and PDFs." },
  { title: "VOICE & INTAKE AGENTS", desc: "Phone and chat experiences that capture context, qualify inquiries and hand off with a complete record." },
  { title: "SALES & RESEARCH AGENTS", desc: "Prospect research, account briefs and follow-up preparation connected to your sales process." },
  { title: "AD-OPS & GROWTH AGENTS", desc: "Monitoring, analysis and human-approved execution across paid media workflows." },
  { title: "SYSTEM INTEGRATIONS", desc: "Reliable connections across CRMs, databases, calendars, payment tools and communication platforms." },
  { title: "MONITORING & REPORTING", desc: "Operational dashboards, scheduled reporting, failure alerts and an audit trail of what the system did." },
];
```

(`servicesEyebrow` picked up the sitewide `//` mono prefix it was missing —
every other eyebrow has one; `Services.tsx` doesn't add it in JSX. One-line
fix in the same field this task already touches.)

### `faq` (content.ts) — 8 of the doc's 13, per decision #3 above

```ts
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
```

`faqEyebrow` (`"// FAQ"`) and `faqIntro` (`"Everything clients ask before
starting."`) are unchanged — not sourced differently by the doc.

### `finalCta` (content.ts) — the Footer's built-in final CTA block

```ts
export const finalCta = {
  eyebrow: "// READY WHEN YOU ARE",
  lead: "FIND THE WORKFLOW COSTING YOU THE MOST.",
  accent: "THEN DECIDE IF IT'S WORTH FIXING.",
  ctaLabel: "SHOW US THE WORKFLOW",
};
```

The doc's Final CTA also has a body paragraph and a small supporting line;
`Footer.tsx`'s `.footer-cta` block only ever renders eyebrow + heading +
button, no body copy slot. Not adding one — same reasoning as the Hero
eyebrow/CTA gap above. Dropped, not lost by oversight.

### `footer` (content.ts)

```ts
export const footer = {
  navHeading: "NAVIGATION",
  nav: [
    { label: "ABOUT", href: "#quotation" },
    { label: "PROCESS", href: "#process" },
    { label: "LEGAL INTAKE", href: "/legal-intake" },
    { label: "WORK", href: "#projects" },
    { label: "SERVICES", href: "#services" },
    { label: "FAQS", href: "#faq" },
    { label: "CONTACT", href: "#footer" },
  ] as NavLink[],
  detailsHeading: "STUDIO DETAILS",
  sites: [ /* unchanged */ ],
  socialsHeading: "SOCIALS",
  ctaEyebrow: "// START A PROJECT",
  ctaLabel: "SHOW US THE WORKFLOW",
  copyright: "© 2026 KODOAI. ALL RIGHTS RESERVED.",
  tagline: "// KODOAI: CUSTOM AI AUTOMATION AND ORCHESTRATION SYSTEMS",
  backToTop: "BACK TO TOP",
};
```

### `booking` and `socials` — unchanged, not in the doc's scope.

### `layout.tsx` metadata

```ts
const SITE_URL = "https://www.kodoai.xyz"; // was "https://kodoai.dev" — see note below

title: "Custom AI Automation and Orchestration Systems | KodoAI",
description: site.sub, // unchanged reference, new value flows through
openGraph: {
  title: "KodoAI | Custom AI Systems for Work That Should Not Stay Manual",
  description: "We turn slow, fragmented workflows into reliable systems that capture, check, route and complete work across your existing stack.",
  ...
}
```

**Bug fix noted in passing**: `SITE_URL` in `layout.tsx` is currently
`"https://kodoai.dev"`, but `sitemap.ts` and `robots.ts` both already use
`https://www.kodoai.xyz` — the exact domain the copy doc lists as canonical.
This is an existing three-way inconsistency; fixing `layout.tsx` to match is
a one-line change in the metadata block this task is already editing, not a
separate initiative.

### `sitemap.ts`

Add the new route:

```ts
{
  url: `${baseUrl}/legal-intake`,
  lastModified: new Date("2026-08-02"),
  changeFrequency: "monthly",
  priority: 0.7,
},
```

## New content — `src/lib/legalIntake.ts`

### Homepage teaser (`legalIntakeTeaser`)

```ts
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
  primaryCta: "AUDIT OUR INTAKE FLOW", // BookCallButton
  secondaryCta: "SEE HOW THE LAYER WORKS", // Button → /legal-intake
};
```

`LegalIntakeTeaser.tsx` layout: eyebrow, H2, the 2 body paragraphs (max-w
prose block, same treatment as `Quotation`/`ProcessTimeline` body copy), the
4 capabilities as a `.badge` row (same primitive `Services`/`Projects` already
use for chips — no new component), then the two CTAs side by side. Own
`useGSAP` fade-up-on-enter, reduced-motion early return — same convention as
every other section.

### Subpage (`legalIntakePage`)

```ts
export const legalIntakePage = {
  hero: {
    eyebrow: "// LEGAL OPERATIONS",
    title: "HIGH-VOLUME LEAD ROUTING",
    titleSub: "AND GOVERNED INTAKE",
    ambient: "INTAKE",
    lead: "When a valuable inquiry arrives, speed matters, and so do conflict procedures, qualification standards and the firm's authority to accept the matter. KodoAI builds the integration and decision-governance layer between the firm's AI receptionist, practice-management system, conflict records and engagement workflow.",
    primaryCta: "AUDIT OUR INTAKE FLOW", // BookCallButton
    secondaryCta: "SEE THE ORCHESTRATION LAYER", // Button, href hardcoded to "#orchestration-layer" in LegalIntakeView (same pattern as legalIntakeTeaser.secondaryCta)
  },
  capabilities: [
    { num: "01", title: "Minimal Pre-Conflict Capture", description: "Bring approved call, form, chat and referral inputs into one prospect record. Capture safe-contact preferences and only the details needed for the firm's preliminary conflict procedure." },
    { num: "02", title: "Conflict-Ready Preparation", description: "Extract and normalise names, adverse parties, aliases and related entities. Search the sources the firm authorises and send uncertain results to the designated reviewer." },
    { num: "03", title: "Adaptive Qualification", description: "Once the firm's preliminary conflict check clears, ask the next relevant question based on practice area, jurisdiction and the firm's acceptance criteria." },
    { num: "04", title: "Deterministic Routing", description: "Apply the firm's approved rules for case type, venue, limitation risk, language and attorney capacity. AI interprets the inquiry; the routing decision follows controlled logic." },
    { num: "05", title: "Approval-Gated Engagement", description: "Move qualified matters to the right reviewer. Trigger booking, e-signature, payment or follow-up only after the required approval state is recorded." },
    { num: "06", title: "Audit and Exception Handling", description: "Log the inputs, rules, possible matches and overrides. If a source is unavailable or a field is missing, the workflow stops safely and alerts the right person." },
  ],
  orchestration: {
    eyebrow: "// THE ORCHESTRATION LAYER",
    rows: [
      { stage: "Minimal capture", whatHappens: "Approved channels create or update one prospect record", controlPoint: "Safe contact, consent, source and duplicate checks" },
      { stage: "Conflict preparation", whatHappens: "Authorised records are searched using normalised parties and entities", controlPoint: "Possible matches shown with source evidence" },
      { stage: "Qualification", whatHappens: "The system gathers deeper facts only after the preliminary checkpoint", controlPoint: "Required fields, urgency and uncertainty flags" },
      { stage: "Routing", whatHappens: "Firm rules select a review queue, attorney or referral path", controlPoint: "Deterministic logic and exception queue" },
      { stage: "Decision", whatHappens: "The designated person reviews fit and conflict information", controlPoint: "Human or attorney approval" },
      { stage: "Engagement", whatHappens: "Approved actions create the matter, issue documents, take payment or book time", controlPoint: "Recorded approval before execution" },
    ],
  },
  fit: {
    eyebrow: "// DESIGNED FOR FIRMS WHERE DELAY HAS A REAL COST",
    intro: "The strongest fit is a high-volume boutique firm with valuable inbound inquiries, several intake channels, multiple practice areas or jurisdictions, and rules that do not fit neatly inside a standard form.",
    industries: [
      { title: "Personal Injury", description: "Preserve PPC and LSA attribution, merge duplicate phone and form inquiries, escalate catastrophic matters, and route co-counsel or referral cases without losing the source or approval history." },
      { title: "Family Law", description: "Capture safe-contact preferences before follow-up. Match former names, spouses, children and related entities. Route possible conflicts, urgent hearings and domestic-violence concerns to the firm's designated reviewers." },
      { title: "Plaintiff Employment", description: "Resolve employer brands, payroll entities, staffing firms and related companies. Extract event dates and evidence gaps, and flag deadline-sensitive matters for attorney review." },
    ],
    notRightFit: "Usually not the right fit for a low-volume firm with one clean intake path and a practice-management setup that already handles its exceptions well.",
  },
  cta: {
    heading: { lead: ["WANT THE INTAKE"], tail: "LAYER LIVE?", tailAccent: true },
    body: CTA_BODY, // imported from src/lib/caseStudies.ts
    label: "AUDIT OUR INTAKE FLOW",
  },
};
```

`LegalIntakeView.tsx` section order: hero (no meta pills / rating / tech
stack — not applicable outside a case study) → capability cards (6, numbered,
`border-border bg-surface hover:border-accent` — same visual as
`CaseStudyView`'s `FeatureCard`) → orchestration table (real `<table>`,
`font-mono text-sm`, `border-border` cell rules, zero radius, wrapped in a
`overflow-x-auto` container for mobile — first table in the codebase, styled
directly, no new global `.table` class needed for one use site) → fit intro +
3 industry cards (same card treatment) → `notRightFit` as a muted centered
line → CTA section (identical shape to `CaseStudyView`'s CTA section, reusing
`CTA_BODY`).

## New content — `content.ts` (Governance, Engagement Model)

Both small enough to live directly in `content.ts`, same tier as
`process`/`services`.

```ts
export type GovernancePrinciple = { title: string; desc: string };

export const governanceEyebrow = "// CONTROL WHERE IT MATTERS";
export const governanceHeading = {
  lead: "AI CAN INTERPRET THE WORK.",
  accent: "IT SHOULD NOT QUIETLY OWN THE RISK.",
};
export const governanceIntro =
  "We separate probabilistic tasks from controlled decisions. An AI model can extract names, summarise an inquiry or identify missing information. Deterministic rules decide which action is allowed next. High-impact actions wait for the right person.";

export const governance: GovernancePrinciple[] = [
  { title: "APPROVAL GATES", desc: "Define who can approve customer, financial, legal or operational actions before anything moves downstream." },
  { title: "LEAST-PRIVILEGE ACCESS", desc: "Give each service and user only the data and permissions required for its job." },
  { title: "TRACEABLE DECISIONS", desc: "Record source data, system actions, rule versions, exceptions and human overrides for review." },
  { title: "SAFE FAILURE PATHS", desc: "Stop, queue and alert when a required system is unavailable or the result is too uncertain to act on." },
  { title: "MAINTAINABLE RULES", desc: "Document, test and version the operational logic so it can change with the business instead of becoming hidden technical debt." },
];

export type EngagementStep = { n: string; title: string; desc: string; ctaLabel: string };

export const engagementEyebrow = "// START WITH ONE EXPENSIVE WORKFLOW";
export const engagementHeading = {
  lead: "WE DO NOT BEGIN WITH",
  accent: "A LIST OF AI FEATURES.",
};
export const engagementIntro =
  "We begin with one process that is slow, fragmented or too dependent on a few experienced people. Then we test whether a custom system can create enough value to justify its cost.";

export const engagementSteps: EngagementStep[] = [
  { n: "01", title: "WORKFLOW AUDIT", desc: "Map the current process, quantify the leakage and identify the smallest useful intervention.", ctaLabel: "START WITH AN AUDIT" },
  { n: "02", title: "CONTROLLED PILOT", desc: "Run one channel, team or workflow in shadow mode. Compare its output with the current process before expanding its authority.", ctaLabel: "SCOPE A PILOT" },
  { n: "03", title: "PRODUCTION SYSTEM", desc: "Integrate the validated workflow, add monitoring and support the rules, models and APIs after launch.", ctaLabel: "DISCUSS A PRODUCTION BUILD" },
];

export const engagementSelectivity =
  "Custom software is not the answer to every manual process. We take on work where the bottleneck is measurable, the process owner is involved and the expected value supports a maintained system.";
```

**`Governance.tsx`**: eyebrow, 2-line heading (lead + accent tail, same shape
as `finalCta`'s heading), intro paragraph, then a 5-up card grid (3-col
desktop / 2-col tablet / 1-col mobile, last row centers on desktop), each card
numbered 01-05, `border-border bg-surface p-6 md:p-8 hover:border-accent` —
the same visual as `CaseStudyView`'s `FeatureCard`. This is the first time
that card-grid look appears in the main scroll instead of a subpage; picked
over forcing 5 short parallel items into the `Services` list-row pattern
because a grid reads better for 5 roughly-equal items and gives the scroll
rhythm variety between two full-width sections (`Projects` blocks,
`ProcessTimeline` bands). Own `useGSAP` fade-up, reduced-motion early return.

**`EngagementModel.tsx`**: eyebrow, heading, intro, then 3 full-width rows
(`border-t border-border`, `first:border-t`) — number + title on the left,
description + a small outline `Button` (not primary, arrow, `href="#footer"`,
label = each step's `ctaLabel`) on the right — the same row shape as
`CaseStudyView`'s "how it works" rows, chosen so Governance and Engagement
Model don't look like twins back to back. Using the plain outline `Button`
here rather than `BookCallButton` is deliberate: three solid accent buttons
stacked in three consecutive rows would be visually heavy this far from the
bottom of the page; the accent-filled `.btn.primary` treatment stays reserved
for the section's one real conversion moment (Footer's final CTA, Header CTA,
Legal Intake's CTAs). Closes with `engagementSelectivity` as a centered muted
paragraph. Own `useGSAP` fade-up, reduced-motion early return.

## Explicitly out of scope / unchanged

- `src/lib/projects.ts`, `src/lib/caseStudies.ts` — separate authoritative
  source per that file's own header comment. The doc's "Selected work"
  blurbs are shorter versions of 4 of the 5 existing Highlights projects, not
  new information; not used.
- No existing section's internal layout, GSAP timeline, or visual code
  changes — only new sibling sections, one new route, and content.ts /
  legalIntake.ts values.
- `booking`, `socials` — untouched, not addressed by the doc.
- Content the doc provides but the target component has no slot for (Hero
  eyebrow rendering, Hero CTA pair, Hero capability strip, Final CTA body
  paragraph + supporting line) is dropped rather than forcing new layout
  in to fit it — consistent with "don't change layout."

## Verification plan

- `npx tsc --noEmit` + `npm run lint` after implementation (project has no
  test runner/typecheck script per CLAUDE.md).
- `npm run dev`, visually check: homepage scroll order and all 3 new
  sections, `/legal-intake` route directly, mobile nav with 6 items, header
  nav with 6 items at 1024px/1280px breakpoints (flagged risk: crowding),
  reduced-motion (`prefers-reduced-motion: reduce`) renders every new section
  static, FAQ still single-open accordion with 8 items, all new CTAs
  (BookCallButton instances) actually open the Cal.com modal.
- Do not run `next build` while `next dev` is running (stale `.next` clobber
  — see CLAUDE.md).
