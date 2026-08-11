# Landing Page Copy Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate `KodoAI-Landing-Page-Copy.md` into the live site: swap copy
in every existing section, and add three new sections (Legal Intake teaser +
subpage, Governance, Engagement Model) per the approved design spec.

**Architecture:** Pure content swap in `src/lib/content.ts` for existing
sections; three new sibling section components dropped into
`src/app/(site)/page.tsx`'s existing `.depth-band` wrapper; one new static
route (`/legal-intake`) that reuses the `/case-study/[slug]` chrome pattern
and a small extracted set of shared primitives from `CaseStudyView.tsx`. No
existing component's internal layout, GSAP timeline, or visual code changes.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind v4, GSAP +
ScrollTrigger (`@gsap/react`), Lenis, Framer Motion (FAQ accordion only).

**Spec:** `docs/superpowers/specs/2026-08-12-landing-copy-integration-design.md`
— read it first if anything below is unclear; it has the full rationale.

## Global Constraints

- Stack is locked: Next `^15.5.0`, do not bump or add dependencies.
- Colours only via CSS variables (`var(--token)` or the Tailwind utilities in
  `globals.css`'s `@theme inline` block) — never a raw hex.
- `border-radius: 0` is enforced globally already — never add radius.
- No em dashes in copy (commas/colons/parentheses instead).
- Mono eyebrow labels are UPPERCASE and `//`-prefixed (`.eyebrow` class).
- Headlines are typed uppercase in `content.ts`/data files by convention;
  body/prose copy is typed in natural sentence case (CSS `uppercase` on
  headline elements makes the visual case consistent regardless).
- All copy lives in `src/lib/content.ts`, except `src/lib/projects.ts`,
  `src/lib/caseStudies.ts`, and (new) `src/lib/legalIntake.ts` — zero
  hardcoded copy strings in JSX.
- Every new animation must early-return under
  `window.matchMedia("(prefers-reduced-motion: reduce)").matches`, rendering
  static. `globals.css` also kills animation globally under that media query.
- Mid-page homepage sections are transparent and sit inside the single
  `.depth-band` wrapper in `page.tsx` — never give one its own `bg-*`.
- No test runner or typecheck script exists in this repo. Verify each task
  with `npx tsc --noEmit` + `npm run lint`, then a manual check in
  `npm run dev`. `npm run build` is the real gate — run it in the final task.
- Never run `next build` while `next dev` is running against the same
  `.next` (stale-cache clobber). Stop dev first if you need to build.
- Create a new commit per task (this repo's established "one phase per
  commit" convention) — never `--amend`, never `--no-verify`.

---

## Task 1: Sitewide metadata + `site` object

**Files:**
- Modify: `src/lib/content.ts:22-30` (the `site` export)
- Modify: `src/app/layout.tsx:29,33-43` (`SITE_URL` const + `metadata.title`/`openGraph`)

**Interfaces:**
- Consumes: nothing new.
- Produces: `site.email` (already consumed by `Footer.tsx`, `MobileNav.tsx`,
  `layout.tsx` JSON-LD — no call-site changes needed), `site.tagline`
  (consumed by `Hero.tsx`'s `sr-only` `<h1>` and `layout.tsx` JSON-LD
  `slogan`), `site.cta.label` (consumed by `Header.tsx`'s CTA `<Button>`).

- [ ] **Step 1: Update the `site` object**

In `src/lib/content.ts`, replace:

```ts
export const site = {
  name: "kodoAI",
  wordmark: { light: "KODO", accent: "AI" },
  tagline: "IF IT'S MANUAL AND MEASURABLE, IT CAN BE AUTOMATED",
  sub: "Custom AI agents and internal software that take the repetitive work off your team, in any industry.",
  email: "hello@kodoai.xyz",
  location: ["Working worldwide."],
  cta: { label: "START A PROJECT", href: "#footer" },
};
```

with:

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

- [ ] **Step 2: Fix the domain and update page metadata**

In `src/app/layout.tsx`, replace:

```ts
const SITE_URL = "https://kodoai.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "kodoAI — If it's manual and measurable, it can be automated",
  description: site.sub,
  applicationName: site.name,
  openGraph: {
    title: "kodoAI — Automation Agency",
    description: site.sub,
    url: SITE_URL,
    siteName: site.name,
    images: ["/reference/banner.png"],
    type: "website",
  },
```

with:

```ts
const SITE_URL = "https://www.kodoai.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Custom AI Automation and Orchestration Systems | KodoAI",
  description: site.sub,
  applicationName: site.name,
  openGraph: {
    title: "KodoAI | Custom AI Systems for Work That Should Not Stay Manual",
    description: "We turn slow, fragmented workflows into reliable systems that capture, check, route and complete work across your existing stack.",
    url: SITE_URL,
    siteName: site.name,
    images: ["/reference/banner.png"],
    type: "website",
  },
```

(`SITE_URL` was pointing at a stale domain — `sitemap.ts`/`robots.ts` already
use `https://www.kodoai.xyz`, matching the copy doc's stated canonical URL.)

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Manual check**

Run: `npm run dev`, open `http://localhost:3000`.
Check: header CTA button (top right, desktop) reads "SHOW US THE WORKFLOW".
Check: browser tab title reads "Custom AI Automation and Orchestration
Systems | KodoAI". View page source, confirm `<meta property="og:title">`
and `<meta property="og:description">` match Step 2's values.

- [ ] **Step 6: Commit**

```bash
git add src/lib/content.ts src/app/layout.tsx
git commit -m "content: update site metadata, tagline and contact email"
```

---

## Task 2: Hero + Quotation content

**Files:**
- Modify: `src/lib/content.ts:45-60` (`hero`, `quotation` exports)

**Interfaces:**
- Consumes: nothing new.
- Produces: updated `hero.eyebrow/headline/sub`, `quotation.text/highlights/attribution`.
  `hero.eyebrow` is not rendered by `Hero.tsx` today (verified: `Hero.tsx`
  only reads `hero.headline` and `hero.sub`) — updating its value is safe but
  has no visible effect, and this task does not add rendering for it.

- [ ] **Step 1: Update `hero`**

Replace:

```ts
export const hero = {
  eyebrow: "// FULL STACK AI AUTOMATION",
  headline: "IF IT'S MANUAL AND MEASURABLE, IT CAN BE AUTOMATED.",
  sub: "Custom AI agents and internal software for any business: operations, sales, support, finance, marketing.",
};
```

with:

```ts
export const hero = {
  eyebrow: "// CUSTOM AI AUTOMATION AND ORCHESTRATION",
  headline: "BUILD THE SYSTEM YOUR TEAM KEEPS RUNNING BY HAND.",
  sub: "KodoAI designs custom AI agents and internal software for processes that lose time, revenue or control between tools. We connect the stack you already use, automate the repeatable work, and keep human approval wherever judgement or risk demands it.",
};
```

- [ ] **Step 2: Update `quotation`**

Replace:

```ts
export const quotation = {
  eyebrow: "// OUR THESIS",
  text: "EVERY PROCESS YOUR TEAM STILL RUNS BY HAND IS PAID FOR TWICE: ONCE IN HOURS, AGAIN IN THE WORK IT CROWDS OUT. WE FIND THE MOST EXPENSIVE ONE, AND WE REMOVE IT.",
  // Phrases must include their trailing punctuation: splitWords matches them as
  // literal substrings, so a stray ":" would break off into its own word.
  highlights: ["PAID FOR TWICE:", "REMOVE IT."],
  attribution: "KODOAI · AUTOMATION AGENCY",
};
```

with:

```ts
export const quotation = {
  eyebrow: "// OUR THESIS",
  text: "EVERY PROCESS YOUR TEAM RUNS BY HAND LEAKS VALUE AT EVERY HANDOFF. WE BUILD THE LAYER THAT CATCHES IT, AND KEEP A PERSON IN CONTROL WHERE THE DECISION SHOULD NOT BE AUTOMATED.",
  // Phrases must include their trailing punctuation: splitWords matches them as
  // literal substrings, so a stray ":" would break off into its own word.
  highlights: ["EVERY HANDOFF.", "SHOULD NOT BE AUTOMATED."],
  attribution: "KODOAI · AI AUTOMATION AND ORCHESTRATION",
};
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual check**

`npm run dev`. On the hero, confirm the two small lines under the wordmark
read the new headline/sub. Scroll to the Thesis section (`#quotation`) and
confirm the words scrub from muted to ink as you scroll, with "EVERY
HANDOFF." and "SHOULD NOT BE AUTOMATED." resolving to accent green — if
either highlight phrase fails to match, those words render as plain ink
instead of accent (a quick visual tell that a substring didn't match; if that
happens, re-check the phrase is an exact, punctuation-included substring of
`quotation.text`).

- [ ] **Step 5: Commit**

```bash
git add src/lib/content.ts
git commit -m "content: update hero and thesis copy"
```

---

## Task 3: Process content

**Files:**
- Modify: `src/lib/content.ts:66-91` (`process` array)

**Interfaces:**
- Consumes: nothing new.
- Produces: updated `process: ProcessPhase[]` (type unchanged: `{ n, title, body, chips }`).

- [ ] **Step 1: Replace the `process` array**

Replace lines 66-91 (the full `export const process: ProcessPhase[] = [...]`
block) with:

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

`processEyebrow` (line 64) is unchanged.

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual check**

`npm run dev`, scroll to `#process`. Confirm all 4 alternating bands (dark,
green, dark, green) show the new titles/body/chips, the ghost number +
overlapping title still render, and the green centre line still draws down
as each band enters.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.ts
git commit -m "content: update process/approach copy"
```

---

## Task 4: Services content

**Files:**
- Modify: `src/lib/content.ts:97-132` (`servicesEyebrow`, `services` array)

**Interfaces:**
- Consumes: nothing new.
- Produces: updated `servicesEyebrow: string`, `services: Service[]` (type unchanged: `{ title, desc }`).

- [ ] **Step 1: Replace `servicesEyebrow` and `services`**

Replace lines 97-132 with:

```ts
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
```

(Titles are unchanged from the current file — the doc's capability names
already matched. `servicesEyebrow` picked up the sitewide `//` mono prefix
every other eyebrow already has; `Services.tsx` doesn't add it in JSX.)

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual check**

`npm run dev`, scroll to `#services`. Confirm the eyebrow now shows `//` and
the new descriptions appear. Hover each row: the hovered row should still
indent 24px and reveal its `// 0N` index + description; the rest should still
dim to ~0.18 opacity.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.ts
git commit -m "content: update services/capabilities copy"
```

---

## Task 5: FAQ content

**Files:**
- Modify: `src/lib/content.ts:139-172` (`faq` array)

**Interfaces:**
- Consumes: nothing new.
- Produces: updated `faq: QA[]` (type unchanged: `{ q, a }`), 8 entries (was 8).

- [ ] **Step 1: Replace the `faq` array**

Replace lines 139-172 with:

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

`faqEyebrow` and `faqIntro` (lines 136-137) are unchanged.

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual check**

`npm run dev`, scroll to `#faq`. Confirm 8 questions render. Click each one:
it should expand (height-auto animation), and clicking a second one should
close the first (single-open accordion still works).

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.ts
git commit -m "content: replace FAQ with general-business questions from new copy"
```

---

## Task 6: Footer + Final CTA content

**Files:**
- Modify: `src/lib/content.ts:176-211` (`finalCta`, `footer` exports)

**Interfaces:**
- Consumes: nothing new.
- Produces: updated `finalCta` (all 4 fields), updated `footer.ctaLabel`,
  `footer.copyright`, `footer.tagline`. `footer.nav` is **not** touched in
  this task (deferred to Task 12, after `/legal-intake` exists) — keep it
  exactly as it is today.

- [ ] **Step 1: Update `finalCta`**

Replace:

```ts
export const finalCta = {
  eyebrow: "// READY WHEN YOU ARE",
  lead: "IN A BUSINESS, MANUAL WORK ISN'T SLOW.",
  accent: "IT'S MONEY LEAKING IN REAL TIME.",
  ctaLabel: "LET'S AUTOMATE",
};
```

with:

```ts
export const finalCta = {
  eyebrow: "// READY WHEN YOU ARE",
  lead: "FIND THE WORKFLOW COSTING YOU THE MOST.",
  accent: "THEN DECIDE IF IT'S WORTH FIXING.",
  ctaLabel: "SHOW US THE WORKFLOW",
};
```

- [ ] **Step 2: Update `footer` (nav array untouched)**

Replace only these 3 fields inside the `footer` object (leave `navHeading`,
`nav`, `detailsHeading`, `sites`, `socialsHeading`, `ctaEyebrow`,
`backToTop` exactly as they are):

```ts
  ctaLabel: "LET'S AUTOMATE",
  copyright: "© 2026 KODOAI",
  tagline: "// IF IT'S MANUAL AND MEASURABLE, IT CAN BE AUTOMATED",
```

becomes:

```ts
  ctaLabel: "SHOW US THE WORKFLOW",
  copyright: "© 2026 KODOAI. ALL RIGHTS RESERVED.",
  tagline: "// KODOAI: CUSTOM AI AUTOMATION AND ORCHESTRATION SYSTEMS",
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual check**

`npm run dev`, scroll to the footer. Confirm the final CTA heading reads
"FIND THE WORKFLOW COSTING YOU THE MOST. THEN DECIDE IF IT'S WORTH FIXING."
with the second line in accent green, and its button reads "SHOW US THE
WORKFLOW" and still opens the Cal.com booking modal on click. Confirm the
mailto link (`STUDIO DETAILS` column) points to `soban@kodoai.xyz`. Confirm
the bottom bar shows the new copyright and tagline text.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content.ts
git commit -m "content: update final CTA and footer copy"
```

---

## Task 7: Extract `Eyebrow`/`Heading` into a shared primitives file

Preparation for Task 8 — `LegalIntakeView.tsx` needs the same `Eyebrow` and
`Heading` building blocks `CaseStudyView.tsx` already has as local functions.
Pure refactor, no visual change.

**Files:**
- Create: `src/components/ui/SectionPrimitives.tsx`
- Modify: `src/components/case-study/CaseStudyView.tsx:8,274-295` (import + delete local functions)

**Interfaces:**
- Produces: `Eyebrow({ children, className? }): JSX.Element`,
  `Heading({ h, className? }): JSX.Element` where `h: CSHeading` (the
  existing `{ lead: string[]; tail: string; tailAccent: boolean }` type
  already exported from `src/lib/caseStudies.ts`).

- [ ] **Step 1: Create the shared primitives file**

```tsx
// src/components/ui/SectionPrimitives.tsx
import type { CSHeading } from "@/lib/caseStudies";

/**
 * Mono `//` label with the accent bar. Shared by CaseStudyView and
 * LegalIntakeView — both are long-form deep-dive pages built on the same
 * visual language.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-2 ${className}`}>
      <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
      {children}
    </p>
  );
}

/** Multi-line display heading; the tail line is accent or muted. */
export function Heading({ h, className = "" }: { h: CSHeading; className?: string }) {
  return (
    <h2 className={className}>
      {h.lead.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
      <span className={`block ${h.tailAccent ? "text-accent" : "text-muted"}`}>{h.tail}</span>
    </h2>
  );
}
```

- [ ] **Step 2: Point `CaseStudyView.tsx` at the shared file**

At the top of `src/components/case-study/CaseStudyView.tsx`, replace the
type-only import on line 8:

```ts
import type { CaseStudy, CSCard, CSHeading } from "@/lib/caseStudies";
```

with:

```ts
import type { CaseStudy, CSCard } from "@/lib/caseStudies";
import { Eyebrow, Heading } from "@/components/ui/SectionPrimitives";
```

Then delete the local `Eyebrow` and `Heading` function definitions (the
block currently at lines ~274-295, right after the `SECTION_H` constant and
before `TagRow`) — they now come from the import instead. Leave `SECTION_H`,
`TagRow`, `FeatureCard`, and `gridColsClass` exactly where they are.

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. If `CSHeading` shows as unused anywhere else in
`CaseStudyView.tsx`, it means the type import removal in Step 2 was correct
(it's now only needed by `SectionPrimitives.tsx`); if lint complains about an
unused `Eyebrow`/`Heading` import instead, the local function block from
Step 2 wasn't fully deleted.

- [ ] **Step 4: Manual check**

`npm run dev`, visit an existing case study, e.g.
`http://localhost:3000/case-study/ai-voice-receptionist`. Confirm it renders
identically to before this change — hero eyebrow, all section eyebrows, and
the final CTA's two-line heading (with the accent tail line) all still show
correctly. This is a pure refactor: if anything looks different, something
broke.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/SectionPrimitives.tsx src/components/case-study/CaseStudyView.tsx
git commit -m "refactor: extract Eyebrow/Heading into shared SectionPrimitives"
```

---

## Task 8: Legal Intake subpage (`/legal-intake`)

**Files:**
- Modify: `src/lib/caseStudies.ts:67-68` (export `CTA_BODY`)
- Create: `src/lib/legalIntake.ts`
- Create: `src/components/legal-intake/LegalIntakeView.tsx`
- Create: `src/app/legal-intake/page.tsx`
- Modify: `src/app/sitemap.ts` (add the new route)

**Interfaces:**
- Consumes: `Eyebrow`, `Heading` from `src/components/ui/SectionPrimitives.tsx`
  (Task 7); `CTA_BODY` from `src/lib/caseStudies.ts` (this task exports it).
- Produces: `legalIntakePage` (default export of the page shape described
  below) from `src/lib/legalIntake.ts`, consumed by `LegalIntakeView.tsx` and
  (in Task 9) by `LegalIntakeTeaser.tsx`. Route `/legal-intake`.

- [ ] **Step 1: Export `CTA_BODY` from `caseStudies.ts`**

In `src/lib/caseStudies.ts`, change:

```ts
const CTA_BODY =
  "We scope everything in detail before payment is taken. You work directly with a senior engineer, not a project manager relaying messages to an offshore team.";
```

to:

```ts
export const CTA_BODY =
  "We scope everything in detail before payment is taken. You work directly with a senior engineer, not a project manager relaying messages to an offshore team.";
```

- [ ] **Step 2: Create `src/lib/legalIntake.ts`**

```ts
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
```

- [ ] **Step 3: Create `LegalIntakeView.tsx`**

```tsx
// src/components/legal-intake/LegalIntakeView.tsx
"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { legalIntakePage } from "@/lib/legalIntake";
import { Eyebrow, Heading } from "@/components/ui/SectionPrimitives";
import BookCallButton from "@/components/ui/BookCallButton";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const SECTION_H =
  "li-reveal font-display text-[clamp(44px,7.5vw,104px)] font-extrabold uppercase leading-[0.88] tracking-tight text-ink";

/**
 * /legal-intake — long-form capability page, same visual pattern as
 * CaseStudyView.tsx (hero → sections → CTA), built on the same
 * Eyebrow/Heading primitives. Reveal: every `.li-reveal` inside a
 * `.li-section` fades up on enter, staggered. Reduced motion: static.
 */
export default function LegalIntakeView() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const p = legalIntakePage;

  useGSAP(
    () => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>(".li-section").forEach((sec) => {
        const items = sec.querySelectorAll(".li-reveal");
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sec, start: "top 82%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="depth-band text-ink">
      {/* ═══════════════  HERO  ═══════════════ */}
      <section className="li-section relative overflow-hidden border-b border-border pt-40 pb-24 md:pt-48 md:pb-32">
        <span
          aria-hidden
          className="pointer-events-none absolute left-[-3%] top-[16%] hidden select-none whitespace-nowrap font-display text-[24vw] font-black uppercase leading-[0.8] text-ink opacity-[0.03] lg:block"
        >
          {p.hero.ambient}
        </span>

        <div className="shell relative z-10">
          <Eyebrow className="li-reveal">{p.hero.eyebrow}</Eyebrow>

          <h1 className="li-reveal mt-8 font-display text-[clamp(48px,10vw,128px)] font-black uppercase leading-[0.86] tracking-tight text-ink">
            {p.hero.title}
            <br />
            <span className="text-muted">{p.hero.titleSub}</span>
          </h1>

          <p className="li-reveal mt-10 max-w-3xl text-[17px] leading-relaxed text-ink-2 md:text-xl">
            {p.hero.lead}
          </p>

          <div className="li-reveal mt-10 flex flex-wrap items-center gap-4">
            <BookCallButton>{p.hero.primaryCta}</BookCallButton>
            <Button href="#orchestration-layer" arrow>
              {p.hero.secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════  CAPABILITIES  ═══════════════ */}
      <section className="li-section border-b border-border py-24 md:py-32">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6">{p.capabilitiesEyebrow}</Eyebrow>
          <Heading h={p.capabilitiesHeading} className={SECTION_H} />

          <div className="mt-16 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {p.capabilities.map((c) => (
              <div
                key={c.num}
                className="li-reveal group border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
              >
                <span className="font-mono text-[11px] tracking-[0.35em] text-ink-3">{c.num}</span>
                <h3 className="mt-4 font-display text-2xl font-extrabold uppercase text-ink transition-colors group-hover:text-accent md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  ORCHESTRATION LAYER (table)  ═══════════════ */}
      <section id="orchestration-layer" className="li-section border-b border-border py-24 md:py-32">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6">{p.orchestration.eyebrow}</Eyebrow>
          <Heading h={p.orchestration.heading} className={SECTION_H} />

          <div className="li-reveal mt-14 overflow-x-auto border border-border">
            <table className="w-full min-w-[720px] border-collapse font-mono text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left uppercase tracking-widest text-ink-3">
                  <th className="p-4 text-xs font-medium">{p.orchestration.columns.stage}</th>
                  <th className="p-4 text-xs font-medium">{p.orchestration.columns.whatHappens}</th>
                  <th className="p-4 text-xs font-medium">{p.orchestration.columns.controlPoint}</th>
                </tr>
              </thead>
              <tbody>
                {p.orchestration.rows.map((r) => (
                  <tr key={r.stage} className="border-b border-border last:border-b-0">
                    <td className="p-4 align-top font-semibold uppercase tracking-wide text-ink">{r.stage}</td>
                    <td className="p-4 align-top text-ink-2">{r.whatHappens}</td>
                    <td className="p-4 align-top text-accent">{r.controlPoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════  FIT  ═══════════════ */}
      <section className="li-section border-b border-border py-24 md:py-32">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6">{p.fit.eyebrow}</Eyebrow>
          <p className="li-reveal max-w-3xl text-base leading-relaxed text-ink-2">{p.fit.intro}</p>

          <div className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-3">
            {p.fit.industries.map((ind) => (
              <div
                key={ind.title}
                className="li-reveal group border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
              >
                <h3 className="font-display text-xl font-extrabold uppercase text-ink transition-colors group-hover:text-accent md:text-2xl">
                  {ind.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{ind.description}</p>
              </div>
            ))}
          </div>

          <p className="li-reveal mt-10 max-w-2xl text-sm text-ink-3">{p.fit.notRightFit}</p>
        </div>
      </section>

      {/* ═══════════════  CTA  ═══════════════ */}
      <section className="li-section py-24 text-center md:py-36">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6 justify-center">{"// LET'S TALK"}</Eyebrow>
          <Heading
            h={p.cta.heading}
            className="li-reveal mx-auto font-display text-[clamp(48px,9vw,120px)] font-black uppercase leading-[0.86] tracking-tight text-ink"
          />
          <p className="li-reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-2">{p.cta.body}</p>
          <div className="li-reveal mt-12 flex justify-center">
            <BookCallButton>{p.cta.label}</BookCallButton>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Create the route**

```tsx
// src/app/legal-intake/page.tsx
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalIntakeView from "@/components/legal-intake/LegalIntakeView";
import type { NavLink } from "@/lib/content";

// Same site Header, one nav item: HOME (→ "/"). Logo also returns home.
// Matches the pattern in src/app/case-study/[slug]/page.tsx.
const HOME_NAV: NavLink[] = [{ label: "HOME", href: "/" }];

export const metadata: Metadata = {
  title: "Governed Legal Intake — kodoAI",
  description:
    "The integration and decision-governance layer between your AI receptionist, practice-management system, conflict records and engagement workflow.",
  openGraph: {
    title: "Governed Legal Intake — kodoAI",
    description:
      "The integration and decision-governance layer between your AI receptionist, practice-management system, conflict records and engagement workflow.",
    type: "article",
  },
};

export default function LegalIntakePage() {
  return (
    <>
      <Header links={HOME_NAV} logoHref="/" />
      <LegalIntakeView />
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Add the route to the sitemap**

In `src/app/sitemap.ts`, add a new entry alongside the homepage entry (after
the `caseStudyRoutes` spread, or before it — either position is fine):

```ts
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal-intake`,
      lastModified: new Date("2026-08-12"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...caseStudyRoutes,
  ];
```

- [ ] **Step 6: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Pay attention to the `LegalIntakeRow`/`LegalIntakeCapability`/`LegalIntakeIndustry`
array literals in `legalIntake.ts` — they're asserted with `as Type[]`, so a
typo'd field name there will surface as a type error.

- [ ] **Step 7: Manual check**

`npm run dev`, visit `http://localhost:3000/legal-intake` directly. Confirm:
header shows only a "HOME" link (clicking it returns to `/`); hero renders
with the ambient "INTAKE" watermark; both hero CTAs work (primary opens the
Cal.com modal, secondary jumps to the table section); all 6 capability cards
render; the orchestration table shows 6 rows and, when the viewport is
narrowed below ~720px, scrolls horizontally inside its own border instead of
breaking the page layout; all 3 industry cards render; the closing CTA
section works. Footer at the bottom should be the normal shared Footer.

- [ ] **Step 8: Commit**

```bash
git add src/lib/caseStudies.ts src/lib/legalIntake.ts src/components/legal-intake/LegalIntakeView.tsx src/app/legal-intake/page.tsx src/app/sitemap.ts
git commit -m "feat: add /legal-intake page"
```

---

## Task 9: Legal Intake homepage teaser

**Files:**
- Create: `src/components/sections/LegalIntakeTeaser.tsx`
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `legalIntakeTeaser` from `src/lib/legalIntake.ts` (Task 8).
- Produces: `<LegalIntakeTeaser />` default export, rendered with
  `id="legal-intake"`.

- [ ] **Step 1: Create the component**

```tsx
// src/components/sections/LegalIntakeTeaser.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { legalIntakeTeaser } from "@/lib/legalIntake";
import Hairline from "@/components/ui/Hairline";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/ui/BookCallButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage teaser for the Legal Intake capability. Condensed pointer to the
 * full /legal-intake page: eyebrow, heading, two short paragraphs, capability
 * chips, both CTAs. Reveal matches the Services/FAQ enter convention.
 * Reduced motion: static.
 */
export default function LegalIntakeTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".li-teaser-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="legal-intake" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <p className="li-teaser-reveal eyebrow flex items-center gap-2">
          <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
          {legalIntakeTeaser.eyebrow}
        </p>
        <h2 className="li-teaser-reveal mt-6 max-w-[22ch] font-display text-[clamp(36px,6vw,72px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
          {legalIntakeTeaser.heading}
        </h2>

        <div className="li-teaser-reveal mt-8 flex max-w-3xl flex-col gap-5">
          {legalIntakeTeaser.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-ink-2 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="li-teaser-reveal mt-8 flex flex-wrap gap-2">
          {legalIntakeTeaser.capabilities.map((c) => (
            <li key={c} className="badge accent">
              {`// ${c}`}
            </li>
          ))}
        </ul>

        <div className="li-teaser-reveal mt-10 flex flex-wrap items-center gap-4">
          <BookCallButton>{legalIntakeTeaser.primaryCta}</BookCallButton>
          <Button href="/legal-intake" arrow>
            {legalIntakeTeaser.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into the homepage**

In `src/app/(site)/page.tsx`, add the import and render it right after
`<ProcessTimeline />` and before `<Projects />`:

```tsx
import Hero from "@/components/sections/Hero";
import Quotation from "@/components/sections/Quotation";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import LegalIntakeTeaser from "@/components/sections/LegalIntakeTeaser";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="depth-band">
        <Quotation />
        <ProcessTimeline />
        <LegalIntakeTeaser />
        <Projects />
        <Services />
        <FAQ />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual check**

`npm run dev`, scroll the homepage between Process and Highlights. Confirm
the new section fades up on enter, shows both paragraphs, the 4 accent-badge
capability chips, and both CTAs — primary opens the booking modal, secondary
navigates to `/legal-intake`. Confirm it has no background of its own (reads
as one continuous surface with the sections around it).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/LegalIntakeTeaser.tsx "src/app/(site)/page.tsx"
git commit -m "feat: add Legal Intake homepage teaser section"
```

---

## Task 10: Governance section

**Files:**
- Modify: `src/lib/content.ts` (append new exports after the `services` array, before the `-- 06 Q&A --` comment)
- Create: `src/components/sections/Governance.tsx`
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `governanceEyebrow: string`, `governanceHeading: { lead: string; accent: string }`,
  `governanceIntro: string`, `governance: GovernancePrinciple[]` where
  `GovernancePrinciple = { title: string; desc: string }`. `<Governance />`
  default export, `id="governance"`.

- [ ] **Step 1: Add Governance content to `content.ts`**

Insert this block after the `services` array (after line 132) and before the
`// -- 06 Q&A --` comment:

```ts
// -- 05b Governance -------------------------------------------------------------

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
```

- [ ] **Step 2: Create the component**

```tsx
// src/components/sections/Governance.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { governance, governanceEyebrow, governanceHeading, governanceIntro } from "@/lib/content";
import Hairline from "@/components/ui/Hairline";

gsap.registerPlugin(ScrollTrigger);

/**
 * Trust/safety principles as a 5-card grid — the first card-grid look in the
 * main scroll (elsewhere it's subpage-only, see CaseStudyView's FeatureCard).
 * Reveal matches the Services/FAQ enter convention. Reduced motion: static.
 */
export default function Governance() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".gov-head", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      gsap.from(".gov-card", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gov-grid", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="governance" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <div className="gov-head">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
            {governanceEyebrow}
          </p>
          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(36px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            {governanceHeading.lead}{" "}
            <span className="text-accent">{governanceHeading.accent}</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-ink-2">{governanceIntro}</p>
        </div>

        <div className="gov-grid mt-16 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {governance.map((g, i) => (
            <div
              key={g.title}
              className="gov-card group border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
            >
              <span className="font-mono text-[11px] tracking-[0.35em] text-ink-3">{`0${i + 1}`}</span>
              <h3 className="mt-4 font-display text-xl font-extrabold uppercase text-ink transition-colors group-hover:text-accent md:text-2xl">
                {g.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire it into the homepage**

In `src/app/(site)/page.tsx`, add the import and render it right after
`<Services />` and before `<FAQ />`:

```tsx
import Governance from "@/components/sections/Governance";
// ...
      <Services />
      <Governance />
      <FAQ />
```

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Manual check**

`npm run dev`, scroll between Services and FAQ. Confirm the 2-line heading
(second line accent green), intro paragraph, and 5 numbered cards (3 in the
first row, 2 in the second) render, each card highlighting its border/title
on hover. Toggle `prefers-reduced-motion` in devtools and reload — the
section should render fully visible immediately, no fade-in.

- [ ] **Step 6: Commit**

```bash
git add src/lib/content.ts src/components/sections/Governance.tsx "src/app/(site)/page.tsx"
git commit -m "feat: add Governance section"
```

---

## Task 11: Engagement Model section

**Files:**
- Modify: `src/lib/content.ts` (append new exports right after the Governance block from Task 10, still before `-- 06 Q&A --`)
- Create: `src/components/sections/EngagementModel.tsx`
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: `Button` from `src/components/ui/Button.tsx` (existing).
- Produces: `engagementEyebrow: string`, `engagementHeading: { lead: string; accent: string }`,
  `engagementIntro: string`, `engagementSteps: EngagementStep[]` where
  `EngagementStep = { n: string; title: string; desc: string; ctaLabel: string }`,
  `engagementSelectivity: string`. `<EngagementModel />` default export,
  `id="engagement"`.

- [ ] **Step 1: Add Engagement Model content to `content.ts`**

Insert this block right after the Governance block added in Task 10 (still
before `// -- 06 Q&A --`):

```ts
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
```

- [ ] **Step 2: Create the component**

```tsx
// src/components/sections/EngagementModel.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  engagementEyebrow,
  engagementHeading,
  engagementIntro,
  engagementSteps,
  engagementSelectivity,
} from "@/lib/content";
import Hairline from "@/components/ui/Hairline";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Three-step offer structure (audit, pilot, production) as full-width rows,
 * closing on the selectivity line. Reveal matches the Services/FAQ enter
 * convention. Reduced motion: static.
 *
 * Row CTAs use the plain outline Button (not BookCallButton) on purpose:
 * three solid accent buttons stacked in three consecutive rows would be
 * visually heavy this far from the bottom of the page. The `.btn.primary`
 * treatment stays reserved for each section's one real conversion moment.
 */
export default function EngagementModel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".eng-head", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      gsap.from(".eng-row", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".eng-list", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="engagement" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <div className="eng-head">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
            {engagementEyebrow}
          </p>
          <h2 className="mt-6 max-w-[24ch] font-display text-[clamp(36px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            {engagementHeading.lead}{" "}
            <span className="text-accent">{engagementHeading.accent}</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-ink-2">{engagementIntro}</p>
        </div>

        <div className="eng-list mt-16 flex flex-col">
          {engagementSteps.map((s) => (
            <div key={s.n} className="eng-row border-b border-border first:border-t">
              <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8">
                <div className="flex items-start gap-4 md:col-span-5">
                  <span className="mt-1 shrink-0 font-mono text-xs tracking-[0.3em] text-ink-3">{s.n}</span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ink md:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[15px] leading-relaxed text-ink-2">{s.desc}</p>
                  <Button href="#footer" arrow className="mt-4">
                    {s.ctaLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-[70ch] text-ink-3">{engagementSelectivity}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire it into the homepage**

In `src/app/(site)/page.tsx`, add the import and render it right after
`<Governance />` and before `<FAQ />`:

```tsx
import EngagementModel from "@/components/sections/EngagementModel";
// ...
      <Governance />
      <EngagementModel />
      <FAQ />
```

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Manual check**

`npm run dev`, scroll between Governance and FAQ. Confirm 3 full-width rows
(WORKFLOW AUDIT / CONTROLLED PILOT / PRODUCTION SYSTEM) each with a number,
title, description and an outline arrow button, and the closing muted
selectivity line below them. Click one of the row buttons — it should smooth
scroll down to the footer (`#footer`).

- [ ] **Step 6: Commit**

```bash
git add src/lib/content.ts src/components/sections/EngagementModel.tsx "src/app/(site)/page.tsx"
git commit -m "feat: add Engagement Model section"
```

---

## Task 12: Nav updates

**Files:**
- Modify: `src/lib/content.ts` (`nav` array, and `footer.nav` array inside the `footer` object)

**Interfaces:**
- Consumes: nothing new — `Header.tsx` (`links = nav`), `MobileNav.tsx`
  (`links = footer.nav`), and `Footer.tsx` all already read these arrays with
  no fixed-length assumptions.
- Produces: `nav` grows from 4 to 6 items; `footer.nav` grows from 5 to 7.

- [ ] **Step 1: Update `nav`**

Replace:

```ts
export const nav: NavLink[] = [
  { label: "ABOUT", href: "#quotation" },
  { label: "PROCESS", href: "#process" },
  { label: "WORK", href: "#projects" },
  { label: "SERVICES", href: "#services" },
];
```

with:

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

- [ ] **Step 2: Update `footer.nav`**

Inside the `footer` object, replace:

```ts
  nav: [
    { label: "ABOUT", href: "#quotation" },
    { label: "PROCESS", href: "#process" },
    { label: "WORK", href: "#projects" },
    { label: "SERVICES", href: "#services" },
    { label: "CONTACT", href: "#footer" },
  ] as NavLink[],
```

with:

```ts
  nav: [
    { label: "ABOUT", href: "#quotation" },
    { label: "PROCESS", href: "#process" },
    { label: "LEGAL INTAKE", href: "/legal-intake" },
    { label: "WORK", href: "#projects" },
    { label: "SERVICES", href: "#services" },
    { label: "FAQS", href: "#faq" },
    { label: "CONTACT", href: "#footer" },
  ] as NavLink[],
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual check**

`npm run dev`. Desktop header (resize to ~1280px, then ~1024px): confirm all
6 items fit on one line without wrapping or crowding the logo/CTA button; if
they crowd at 1024px, note it (this was flagged as a risk in the design spec
— acceptable to ship as-is, but worth a screenshot in the final report).
Click "LEGAL INTAKE" — should navigate to `/legal-intake`. Click "FAQS" —
should smooth-scroll to the FAQ section on the same page. Resize below the
`md` breakpoint, open the hamburger menu: confirm all 7 footer-style links
(including CONTACT) appear and each navigates/scrolls correctly, then check
the footer's own NAVIGATION column shows the same 7 links.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content.ts
git commit -m "content: add Legal Intake and FAQ links to header/footer nav"
```

---

## Task 13: Full build verification

**Files:** none (verification only).

- [ ] **Step 1: Stop any running dev server**

If `npm run dev` is running from earlier tasks, stop it. Per CLAUDE.md,
`next build` run against a live dev server's `.next` clobbers it and breaks
the dev server afterward.

- [ ] **Step 2: Clean build**

```bash
rm -rf .next
npm run build
```

Expected: build succeeds, no type errors, no lint errors that fail the
build. Confirm `/legal-intake` is listed in the build output's route table
as a static route (○), same as `/` and the `/case-study/[slug]` entries.

- [ ] **Step 3: Full lint + typecheck pass**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both clean (should already be, from each task, but confirm nothing
regressed across the full set of changes).

- [ ] **Step 4: Start fresh dev server, full walkthrough**

```bash
npm run dev
```

Walk the entire homepage top to bottom: Hero → Thesis → Process → Legal
Intake teaser → Highlights → Services → Governance → Engagement Model → FAQ
→ Footer. Then visit `/legal-intake` directly, and one existing case study
(`/case-study/law-firm-operations-automation`) to confirm the Task 7 refactor
didn't regress it. Check mobile width (hamburger menu, all sections stack
correctly). Toggle `prefers-reduced-motion: reduce` in devtools and reload
the homepage + `/legal-intake`: every section (including the 3 new ones)
should render fully visible with no animation, per the reduced-motion
convention every other section already follows.

- [ ] **Step 5: Final commit (only if Step 4 turned up fixes)**

If the walkthrough is clean, there's nothing to commit here — Task 12's
commit is the last one. If it surfaced a bug, fix it, re-run Steps 2-4, then:

```bash
git add -A
git commit -m "fix: address issues found in full verification pass"
```

---

## Plan self-review notes

- **Spec coverage:** every content field in the spec (site/hero/quotation/
  process/services/faq/finalCta/footer/nav/layout metadata/sitemap, plus all
  of Legal Intake teaser+subpage, Governance, Engagement Model) has a task.
  The spec's "explicitly out of scope" items (`projects.ts`, `caseStudies.ts`
  content, `booking`, `socials`) have no task, correctly.
- **Type consistency:** `GovernancePrinciple`, `EngagementStep`,
  `LegalIntakeCapability`, `LegalIntakeRow`, `LegalIntakeIndustry` are each
  defined once (Task 10/11/8) and only ever consumed by the one component
  that imports them (Task 10/11/8-9) — no cross-task name drift.
- **Ordering:** nav additions (Task 12) come after the `/legal-intake` route
  exists (Task 8) so no task ever ships a dead link. The `SectionPrimitives`
  extraction (Task 7) comes before the first consumer that needs it
  (Task 8).
