// -----------------------------------------------------------------------------
// LEGAL INTAKE (/legal-intake)
// Distilled from KodoAI-Landing-Page-Copy.md's "Featured solution: legal intake"
// section; the flow block comes from architecture_diagram.txt (the "core agents
// surrounding the inbound/intake" pass, not the full case lifecycle).
// Shape and rendering: src/lib/solutions/types.ts.
// -----------------------------------------------------------------------------

import { CTA_BODY } from "@/lib/caseStudies";
import type { Solution } from "@/lib/solutions/types";

export const legalIntake: Solution = {
  slug: "legal-intake",
  navLabel: "LEGAL INTAKE",
  meta: {
    title: "Governed Legal Intake: kodoAI",
    description:
      "The integration and decision-governance layer between your AI receptionist, practice-management system, conflict records and engagement workflow.",
  },

  teaser: {
    eyebrow: "// LEGAL OPERATIONS",
    title: "GOVERNED LEGAL INTAKE",
    body: "Speed matters when a valuable inquiry lands, and so do conflict procedures and the firm's authority to take the matter. We build the layer between the AI receptionist, practice-management system, conflict records and engagement workflow, so agents prepare the matter and the firm still decides it.",
    capabilities: [
      "MINIMAL PRE-CONFLICT CAPTURE",
      "CONFLICT-READY PREPARATION",
      "DETERMINISTIC ROUTING",
      "APPROVAL-GATED ENGAGEMENT",
    ],
    cta: "SEE HOW THE LAYER WORKS",
  },

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
    heading: {
      lead: ["EVERY STAGE."],
      tail: "ONE CONTROL POINT.",
      tailAccent: false,
    },
    columns: { stage: "Stage", whatHappens: "What happens", controlPoint: "Control point" },
    rows: [
      { stage: "Minimal capture", whatHappens: "Approved channels create or update one prospect record", controlPoint: "Safe contact, consent, source and duplicate checks" },
      { stage: "Conflict preparation", whatHappens: "Authorised records are searched using normalised parties and entities", controlPoint: "Possible matches shown with source evidence" },
      { stage: "Qualification", whatHappens: "The system gathers deeper facts only after the preliminary checkpoint", controlPoint: "Required fields, urgency and uncertainty flags" },
      { stage: "Routing", whatHappens: "Firm rules select a review queue, attorney or referral path", controlPoint: "Deterministic logic and exception queue" },
      { stage: "Decision", whatHappens: "The designated person reviews fit and conflict information", controlPoint: "Human or attorney approval" },
      { stage: "Engagement", whatHappens: "Approved actions create the matter, issue documents, take payment or book time", controlPoint: "Recorded approval before execution" },
    ],
  },

  // Three agent stages converge on one record, then the flow crosses into the
  // firm's own core system.
  flow: {
    eyebrow: "// THE AGENT PERIMETER",
    heading: {
      lead: ["THREE STAGES."],
      tail: "ONE INQUIRY RECORD.",
      tailAccent: false,
    },
    intro:
      "Everything before the firm's own core system runs as a perimeter of narrow agents, each doing one job on the way to a single clean record. Nothing here decides whether a matter is accepted.",
    caption: "Inbound intake perimeter: capture, qualification and identity agents feeding one inquiry record, with stalled inquiries returning to the capture stage before the record crosses into the firm's core system.",
    source: {
      label: "// INBOUND DEMAND",
      items: ["Phone calls", "Web forms", "Site chat", "Paid campaigns", "Referrals"],
    },
    stages: [
      {
        num: "01",
        title: "Channel Capture",
        caption: "// THE FRONT DOOR",
        nodes: [
          { title: "Voice agent", detail: "Answers inbound calls live or after hours, captures the initial narrative and opens the record." },
          { title: "SMS agent", detail: "Two-way texting for prospects who will not call, plus nudges on intakes left half finished." },
          { title: "Web chat agent", detail: "Sits on the site and campaign landing pages, catching visitors who will not call or fill a form." },
          { title: "Missed-call recovery", detail: "Detects an unanswered or abandoned call and fires a callback or text before the prospect dials a competitor." },
        ],
      },
      {
        num: "02",
        title: "Qualification Layer",
        caption: "// CONVERSATION INTO STRUCTURED FACTS",
        nodes: [
          { title: "Transcription and extraction", detail: "Turns call, chat and voicemail narrative into the structured fact set the firm's criteria are written against: incident date, injury, liability indicators, representation status." },
          { title: "Missing-information follow-up", detail: "Chases the prospect for whatever the record still lacks, so nothing moves to routing on a half-filled file." },
        ],
      },
      {
        num: "03",
        title: "Identity and Deduplication",
        caption: "// CLEANING THE RECORD BEFORE IT MOVES",
        nodes: [
          { title: "Deduplication agent", detail: "Matches each new inquiry against existing records across every channel, so one prospect who calls and then submits a form stays one inquiry." },
          { title: "Bilingual intake agent", detail: "Handles non-English intake at the point of first contact instead of parking the prospect until a translator is free." },
        ],
      },
    ],
    loop: {
      label: "RE-ENGAGEMENT LOOP",
      detail:
        "Nurture and re-engagement agent: inquiries that stall (no answer on the callback, a form abandoned halfway) re-enter capture on a scheduled cadence until they convert or are marked lost.",
    },
    record: {
      eyebrow: "// CONVERGENCE",
      title: "One Unified Inquiry Record",
      detail:
        "Source, consent, safe-contact preference, structured facts and the full channel history in one place, with campaign attribution attached from the first touch.",
    },
    core: {
      eyebrow: "// PAST THE PERIMETER: THE FIRM'S CORE SYSTEM",
      steps: ["Conflict preparation", "Human decision", "Conversion and handoff"],
      detail:
        "From here the firm's own rules and approvals govern every step. The agents prepare the matter; they never decide it.",
    },
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

  // PLACEHOLDER COPY: attributions are role + city only, no firm names, so
  // nothing here claims to be a named entity. Replace with real, approved quotes
  // before this page is treated as social proof.
  testimonials: {
    eyebrow: "// FROM THE PEOPLE WORKING THE QUEUE",
    heading: {
      lead: ["WHAT THE INTAKE"],
      tail: "TEAMS SAY.",
      tailAccent: false,
    },
    items: [
      {
        quote:
          "After five we were losing people to voicemail, and half the time we never knew it had happened. Now the callback goes out before the missed call shows up in my log. It still will not accept a matter on its own, which was my condition for signing off on any of this.",
        name: "Dana Kowalczyk",
        role: "Intake Director, plaintiff PI practice",
        location: "Toledo, OH",
      },
      {
        quote:
          "I did not want software anywhere near our conflict checks. Then I watched it flag a possible match, show me the record it pulled that from, and stop there and wait for me.",
        name: "Ray Bettencourt",
        role: "Managing Partner, family law practice",
        location: "Fall River, MA",
      },
      {
        quote:
          "About half our calls come in Spanish. We used to park those until someone was free, and some nights that meant the next morning. Now the caller gets Spanish on the first call and the record reaches us in English.",
        name: "Marisol Delgado",
        role: "Intake Supervisor, PI practice",
        location: "San Antonio, TX",
      },
      {
        quote:
          "Same guy calls the main line, fills out the web form that night, then texts us two days later. That used to be three files and two of us calling him back. We are down to a handful of duplicates a month and it stopped coming up in our Monday meeting.",
        name: "Tom Ruzicka",
        role: "Operations Manager, three-office PI practice",
        location: "Phoenix, AZ",
      },
      {
        quote:
          "We spent the first two weeks mapping how we actually route things, exceptions and all, and half those exceptions had never been written down anywhere. Soban was upfront that no software was going to guess them for us. So we wrote them down, and that is what got built.",
        name: "Kristin Vaughn",
        role: "Firm Administrator, plaintiff employment practice",
        location: "Sacramento, CA",
      },
    ],
  },

  cta: {
    heading: { lead: ["WANT THE INTAKE"], tail: "LAYER LIVE?", tailAccent: true },
    body: CTA_BODY,
    label: "AUDIT OUR INTAKE FLOW",
  },
};
