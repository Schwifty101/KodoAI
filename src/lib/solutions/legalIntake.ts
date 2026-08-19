// -----------------------------------------------------------------------------
// LEGAL INTAKE (/legal-intake)
// Distilled from KodoAI-Landing-Page-Copy.md's "Featured solution: legal intake"
// section; the flow block comes from architecture_diagram.txt (the "core agents
// surrounding the inbound/intake" pass, not the full case lifecycle).
// Shape and rendering: src/lib/solutions/types.ts.
// -----------------------------------------------------------------------------

import type { Solution } from "@/lib/solutions/types";

export const legalIntake: Solution = {
  slug: "legal-intake",
  navLabel: "LEGAL INTAKE",
  meta: {
    title: "Personal Injury Intake Orchestration for Law Firms | KodoAI",
    description:
      "Turn more paid demand into signed matters. Custom intake orchestration, conflict-ready prep and governed routing for plaintiff PI firms, US and Canada.",
  },

  teaser: {
    eyebrow: "// PERSONAL INJURY INTAKE",
    title: "PI INTAKE ORCHESTRATION",
    body: "Your firm already paid for the inquiry. What it loses is the hours before a conflict-ready attorney review. We build the layer between the AI receptionist, CRM, practice-management system and engagement workflow, so agents prepare the matter and the firm still decides it.",
    capabilities: [
      "MINIMAL PRE-CONFLICT CAPTURE",
      "CONFLICT-READY PREPARATION",
      "DETERMINISTIC ROUTING",
      "APPROVAL-GATED ENGAGEMENT",
    ],
    cta: "SEE HOW THE LAYER WORKS",
  },

  hero: {
    eyebrow: "// PERSONAL INJURY INTAKE ORCHESTRATION",
    title: "TURN MORE PAID DEMAND",
    titleSub: "INTO SIGNED MATTERS",
    ambient: "INTAKE",
    lead: "Your firm already paid for the inquiry. What it loses is the hours between the first call and a conflict-ready attorney review. KodoAI builds the decision-governance layer between your AI receptionist, CRM, practice-management system, authorized conflict records and engagement workflow, for plaintiff personal injury firms across the US and Canada.",
    primaryCta: "BOOK AN INTAKE AUDIT",
    secondaryCta: "SEE THE ORCHESTRATION LAYER",
  },

  capabilitiesEyebrow: "// WHAT THE LAYER COORDINATES FOR YOU",
  capabilitiesHeading: {
    lead: ["SIX CAPABILITIES."],
    tail: "ONE GOVERNED LAYER.",
    tailAccent: false,
  },
  capabilities: [
    { num: "01", title: "Minimal Pre-Conflict Capture", description: "Every call, form, chat and referral becomes one prospect record instead of three. Capture safe-contact preferences and only the identity details your preliminary conflict procedure actually requires, nothing more." },
    { num: "02", title: "Conflict-Ready Preparation", description: "Normalize drivers, passengers, insurers, employers, aliases and related entities. Search the sources your firm authorizes, then hand every possible match to your reviewer with the record it came from." },
    { num: "03", title: "Adaptive Qualification", description: "Once your preliminary conflict check clears, the next question follows from claim type, jurisdiction, severity and the acceptance criteria your firm already applies. No fixed script, no dead ends." },
    { num: "04", title: "Deterministic Routing", description: "Your approved rules decide case type, venue, limitation risk, language and attorney capacity. AI reads the inquiry. The routing decision follows fixed logic your firm can inspect and change." },
    { num: "05", title: "Approval-Gated Engagement", description: "Qualified matters reach the right reviewer with the facts attached. Booking, e-signature, payment and matter creation fire only once the required approval is recorded against the file." },
    { num: "06", title: "Audit and Exception Handling", description: "Inputs, rules, possible matches and overrides are logged against the matter. If a source is unavailable or a required field is missing, the workflow stops and alerts a named owner." },
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
      { stage: "Conflict preparation", whatHappens: "Authorized records are searched on normalized parties and entities", controlPoint: "Possible matches returned with their source record" },
      { stage: "Qualification", whatHappens: "Deeper facts are gathered only after the preliminary checkpoint", controlPoint: "Required fields, urgency and uncertainty flags" },
      { stage: "Routing", whatHappens: "Firm rules select the review queue, attorney or referral path", controlPoint: "Deterministic logic, with exceptions queued" },
      { stage: "Decision", whatHappens: "An authorized person reviews fit and conflict information", controlPoint: "Human or attorney approval, always" },
      { stage: "Engagement", whatHappens: "Approved actions create the matter, issue documents, take payment", controlPoint: "Recorded approval before anything executes" },
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
      "Everything before your own core system runs as a perimeter of narrow agents, each doing one job on the way to a single clean record. Nothing in this perimeter decides whether a matter is accepted.",
    caption: "Inbound intake perimeter: channel capture, qualification and identity agents feeding one unified inquiry record, with stalled inquiries returning to capture before the record crosses into the firm's core system.",
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
          { title: "Voice agent", detail: "Answers inbound calls live or after hours, captures the initial narrative in the caller's own words, and opens the record on the spot." },
          { title: "SMS agent", detail: "Two-way texting for prospects who will not pick up the phone, plus nudges on intakes that were left half finished." },
          { title: "Web chat agent", detail: "Sits on the site and on campaign landing pages, catching the paid visitor who will neither call nor fill in a form." },
          { title: "Missed-call recovery", detail: "Detects an unanswered or abandoned call and fires a callback or text before the caller works down the rest of their list." },
        ],
      },
      {
        num: "02",
        title: "Qualification Layer",
        caption: "// CONVERSATION INTO STRUCTURED FACTS",
        nodes: [
          { title: "Transcription and extraction", detail: "Turns call, chat and voicemail narrative into the structured fact set your criteria are written against: incident date, injury, liability indicators, representation status." },
          { title: "Missing-information follow-up", detail: "Chases the prospect for whatever the record still lacks, so nothing reaches routing on a half-filled file." },
        ],
      },
      {
        num: "03",
        title: "Identity and Deduplication",
        caption: "// CLEANING THE RECORD BEFORE IT MOVES",
        nodes: [
          { title: "Deduplication agent", detail: "Matches each new inquiry against existing records across every channel, so one prospect who calls and then submits a form stays one inquiry." },
          { title: "Bilingual intake agent", detail: "Handles non-English intake at the point of first contact, rather than parking the caller until a translator is free." },
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
        "Source, consent, safe-contact preference, structured facts and the full channel history in one place, with campaign attribution attached from the first touch through to signed retainer.",
    },
    core: {
      eyebrow: "// PAST THE PERIMETER: THE FIRM'S CORE SYSTEM",
      steps: ["Conflict preparation", "Human decision", "Conversion and handoff"],
      detail:
        "From here your own rules and approvals govern every step. The agents prepare the matter. They never decide it.",
    },
  },

  fit: {
    eyebrow: "// BUILT FOR PLAINTIFF PI FIRMS WHERE DELAY COSTS MONEY",
    intro: "The strongest fit is a plaintiff personal injury firm running meaningful paid and referred volume across several intake channels, with acceptance rules that never fit neatly inside a standard form.",
    industries: [
      { title: "Paid and Referred Volume", description: "PPC, LSA, television and referral inquiries arrive on separate numbers and separate forms. Keep the source attached from first touch through to signed retainer, and merge the prospect who calls, submits and then texts." },
      { title: "Catastrophic and Multi-Party", description: "Drivers, passengers, minors, estates and wrongful-death beneficiaries, against insurers, employers, vehicle owners and TPAs. Escalate severity ahead of the routine queue and prepare every related entity before the reviewer sees it." },
      { title: "Multi-Office and Bilingual", description: "Several offices, states or provinces, each with its own venue rules, limitation exposure and attorney capacity. Non-English callers handled at first contact instead of parked until a translator is free." },
    ],
    notRightFit: "The same layer fits family law and plaintiff employment intake, though PI is where the current work sits. Usually the wrong fit for a low-volume firm with one clean intake path and a setup that already handles its own exceptions.",
  },

  // Operating scenarios, not client quotes. `quoted: false` drops the quotation
  // marks in TestimonialStrip; `name` carries the failure mode, so `initials()`
  // still renders two characters. Do not reintroduce named attributions here
  // without a real, consented quote behind each one.
  testimonials: {
    eyebrow: "// FIVE PLACES THE QUEUE BREAKS",
    heading: {
      lead: ["WHERE THE QUEUE"],
      tail: "BREAKS DOWN.",
      tailAccent: false,
    },
    quoted: false,
    label: "Common intake failure points",
    items: [
      {
        quote:
          "A call comes in at 18:40. Voicemail takes it, nobody sees it until the morning, and by then the caller has dialed two other firms. Missed-call recovery fires the callback before the unanswered call reaches anyone's log, and the record is already open when the team arrives.",
        name: "AFTER-HOURS LOSS",
        role: "After-hours and weekend inbound",
        location: "plaintiff PI",
      },
      {
        quote:
          "A possible match surfaces on an adverse party. The system does not clear it, does not reject it and does not guess. It shows the reviewer the record the match came from, marks the uncertainty, and stops there until an authorized person decides.",
        name: "CONFLICT UNCERTAINTY",
        role: "Preliminary conflict preparation",
        location: "attorney-gated",
      },
      {
        quote:
          "Half the calls arrive in Spanish and get parked until someone is free, sometimes until the next morning. The caller gets Spanish at first contact instead, the narrative is captured live, and the structured record reaches the intake team in English.",
        name: "NON-ENGLISH INTAKE",
        role: "Bilingual intake at first contact",
        location: "Spanish-speaking markets",
      },
      {
        quote:
          "The same prospect calls the main line, fills in the web form that night, then texts two days later. That is three files and two coordinators calling one person. Deduplication matches across channels first, so one prospect stays one inquiry with its original source attached.",
        name: "DUPLICATE RECORDS",
        role: "One prospect across three channels",
        location: "multi-channel intake",
      },
      {
        quote:
          "Most of a firm's routing logic has never been written down anywhere. No system can guess it and none should try. The first two weeks of any build are spent mapping how the firm actually routes matters, exceptions included, and that map is what gets built.",
        name: "UNWRITTEN RULES",
        role: "Rules that live in people's heads",
        location: "the first two weeks",
      },
    ],
  },

  faq: {
    eyebrow: "// FAQ",
    intro: "What managing partners ask before an intake build.",
    headingTop: "Questions,",
    headingBottom: "Answered",
    items: [
      {
        q: "Does the system decide whether we have a conflict?",
        a: "No. It prepares the check and stops. It normalizes the parties, searches only the sources you authorize, and returns possible matches with the record each one came from. Your attorney or designated reviewer decides whether a match is material and whether the firm can take the matter. That gate is not automatable and we do not try.",
      },
      {
        q: "We already use Clio, Lawmatics or Lead Docket. Why would we need this?",
        a: "Usually you do not need us to replace any of them. Those platforms handle capture, follow-up and records well. What tends to stay manual is the work between them: deduplicating one prospect across three channels, searching legacy records, applying attorney-specific acceptance rules, chasing approvals, and keeping the lead source attached through to a signed retainer. That is the layer we build.",
      },
      {
        q: "Can this work with our existing phone system, CRM and case management software?",
        a: "That is the intended shape. We connect what you already run rather than asking you to migrate. Where a vendor API supports the read or write we need, we use it. Where it does not, we tell you early and design around the limit instead of promising an integration that quietly fails later.",
      },
      {
        q: "What happens when a system or a data source is unavailable?",
        a: "The workflow stops and tells a named person. It does not guess, and it does not move an inquiry forward on a partial record. Missing required fields, failed searches, ambiguous matches and uncertain model output all route to a human queue rather than a default answer. Failing closed is the design, not an edge case.",
      },
      {
        q: "Where does prospective-client information go, and who can see it?",
        a: "We map every data flow and subprocessor before anything goes live, apply least-privilege access by role and matter, and can host in a US or Canadian region when your firm requires it. We do not need raw client data by default in order to support a system. Your counsel approves the applicable state or provincial pack before live use.",
      },
      {
        q: "Could we just build this in Zapier or Make?",
        a: "Sometimes, and if so we will tell you. Those tools are strong when each step maps to a supported trigger and the unhappy paths are rare. They get expensive to trust when the process needs search completeness, state that stays in sync across systems, versioned rules, retries and an audit trail you can defend later.",
      },
      {
        q: "Our routing rules change constantly. How does that survive?",
        a: "Rules are written down, versioned and tested rather than buried in a flow chart nobody owns. Changing one is a small, reviewable edit with test cases attached. Most of the first two weeks of an engagement is spent getting the real rules and exceptions out of people's heads and onto paper, because no system can infer them.",
      },
      {
        q: "How does an engagement start, and what does it cost?",
        a: "It starts with a paid intake diagnostic: your current funnel, a decision and exception register, and a target architecture. Production scope and price follow from that rather than from a rate card. Anything we build runs in shadow mode against your real inquiries before it touches live intake.",
      },
    ],
  },

  cta: {
    heading: { lead: ["WANT THIS RUNNING"], tail: "IN YOUR FIRM?", tailAccent: true },
    body: "Every engagement starts with a paid diagnostic and a shadow-mode test before anything touches live intake. You work directly with a senior engineer who has already built and deployed a live legal intake, preliminary screening and lawyer-routing platform, not a project manager relaying messages to an offshore team.",
    label: "BOOK AN INTAKE AUDIT",
  },
};
