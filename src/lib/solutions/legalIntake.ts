// -----------------------------------------------------------------------------
// LEGAL AI INFRASTRUCTURE (/legal-intake)
// Full-firm AI operational layer for modern law firms across practice areas:
// 24/7 AI receptionists, custom legal CRMs, practice management integrations,
// conflict-ready preparation, deterministic routing, and human-gated approvals.
// Shape and rendering: src/lib/solutions/types.ts.
// -----------------------------------------------------------------------------

import type { Solution } from "@/lib/solutions/types";

export const legalIntake: Solution = {
  slug: "legal-intake",
  navLabel: "LEGAL",
  meta: {
    title: "Legal AI Infrastructure, Receptionists & Operations for Law Firms | KodoAI",
    description:
      "Full-firm AI infrastructure for modern law firms: 24/7 AI receptionists, custom legal CRMs, practice management integrations, conflict-ready prep and governed workflows across the US and Canada.",
  },

  teaser: {
    eyebrow: "// LEGAL AI INFRASTRUCTURE",
    title: "LAW FIRM AI INFRASTRUCTURE",
    body: "From 24/7 voice AI receptionists and custom legal CRMs to deep integrations with your existing practice management systems and governed intake workflows. We build the full AI operational layer for modern law firms, so agents handle repetitive execution while attorneys keep complete control.",
    capabilities: [
      "24/7 AI RECEPTION & INTAKE",
      "CUSTOM LEGAL CRMS & PIPELINES",
      "CASE MANAGEMENT SYNC",
      "CONFLICT-READY PREPARATION",
    ],
    cta: "SEE HOW THE INFRASTRUCTURE WORKS",
  },

  hero: {
    eyebrow: "// LAW FIRM AI INFRASTRUCTURE & ORCHESTRATION",
    title: "END-TO-END AI INFRASTRUCTURE",
    titleSub: "FOR MODERN LAW FIRMS",
    ambient: "LEGAL",
    lead: "Capture every inquiry instantly, eliminate operational drag, and connect your entire tech stack. KodoAI builds custom AI infrastructure for law firms across the US and Canada: 24/7 voice AI receptionists, custom legal CRMs, bidirectional integrations with your existing practice management platforms, and governed intake with conflict-ready preparation.",
    primaryCta: "BOOK A FIRM AUDIT",
    secondaryCta: "SEE THE INFRASTRUCTURE",
  },

  capabilitiesEyebrow: "// WHAT THE INFRASTRUCTURE POWERS FOR YOU",
  capabilitiesHeading: {
    lead: ["SIX CORE CAPABILITIES."],
    tail: "ONE CONNECTED SYSTEM.",
    tailAccent: false,
  },
  capabilities: [
    {
      num: "01",
      title: "24/7 AI Voice & Multi-Channel Reception",
      description:
        "Every call answered live on the first ring, after hours, and on weekends, plus SMS and web chat. Voice AI captures natural-language client narrative, answers firm-level questions, and opens structured records instantly.",
    },
    {
      num: "02",
      title: "Custom Legal CRMs & Unified Inquiries",
      description:
        "Consolidate phone calls, web forms, portal inquiries and referral notes into one central pipeline. Track matter stages, client interactions, and marketing attribution with zero duplicate records.",
    },
    {
      num: "03",
      title: "Practice Management & Case System Sync",
      description:
        "Deep bidirectional integrations with your existing legal CRM, document repositories, and leading case management platforms. Keep matter files, client communications, and calendar events continuously in sync.",
    },
    {
      num: "04",
      title: "Conflict-Ready Preparation",
      description:
        "Normalize adverse parties, corporate entities, insurers, witnesses and aliases. The system searches authorized historical records and presents potential matches with their source context directly to the reviewing attorney.",
    },
    {
      num: "05",
      title: "Deterministic Routing & Matter Fit",
      description:
        "Apply firm-approved criteria for practice area, venue, limitation exposure, language, and attorney capacity. AI extracts the facts; deterministic rules decide the exact review queue.",
    },
    {
      num: "06",
      title: "Approval-Gated Retainers & Onboarding",
      description:
        "Engagement agreements, e-signatures, retainer payments, and case file creation fire only after explicit attorney approval is logged against the file. High-stakes decisions stay strictly human-gated.",
    },
  ],

  orchestration: {
    eyebrow: "// THE ORCHESTRATION LAYER",
    heading: {
      lead: ["EVERY STAGE."],
      tail: "ONE GOVERNED SYSTEM.",
      tailAccent: false,
    },
    columns: { stage: "Stage", whatHappens: "What happens", controlPoint: "Control point" },
    rows: [
      {
        stage: "Omnichannel Reception",
        whatHappens: "AI answers calls, chats, forms and texts 24/7 across every firm channel",
        controlPoint: "Safe contact, consent capture, and spam filtering",
      },
      {
        stage: "Extraction & CRM Record",
        whatHappens: "Inquiry narrative is parsed into structured matter facts in your legal CRM",
        controlPoint: "Identity verification and deduplication rules",
      },
      {
        stage: "Conflict Preparation",
        whatHappens: "Authorized case records searched for normalized party names and entities",
        controlPoint: "Candidate matches returned with direct source links",
      },
      {
        stage: "Deterministic Routing",
        whatHappens: "Firm business logic selects the reviewing attorney, partner, or office",
        controlPoint: "Practice rules, jurisdiction, and urgency flags",
      },
      {
        stage: "Attorney Review",
        whatHappens: "Counsel evaluates case merits, fit, and conflict clearance notes",
        controlPoint: "Human or attorney sign-off, always",
      },
      {
        stage: "Engagement & Case Sync",
        whatHappens: "Retainer issued, calendar booked, and file synced to case management",
        controlPoint: "Recorded authorization before any downstream action",
      },
    ],
  },

  // Three agent stages converge on one record, then the flow crosses into the
  // firm's own core system.
  flow: {
    eyebrow: "// FULL FIRM AI PERIMETER & CORE INTEGRATION",
    heading: {
      lead: ["THREE TIERS."],
      tail: "ONE UNIFIED ARCHITECTURE.",
      tailAccent: false,
    },
    intro:
      "From front-desk AI voice agents to custom pipelines and deep bidirectional case management integrations, our architecture connects every step of your firm's operations under strict attorney oversight.",
    caption:
      "Law firm AI infrastructure: 24/7 reception and intake perimeter, extraction and CRM sync layer, and governed handoff into your core case management system.",
    source: {
      label: "// INBOUND DEMAND",
      items: ["Phone calls", "Web forms", "Site chat", "SMS / Messaging", "Referral networks"],
    },
    stages: [
      {
        num: "01",
        title: "24/7 AI Reception",
        caption: "// THE FRONT DOOR",
        nodes: [
          {
            title: "Voice AI receptionist",
            detail:
              "Answers inbound calls live around the clock, captures narrative in the caller's own words, qualifies key details, and creates the file on the spot.",
          },
          {
            title: "SMS conversation agent",
            detail:
              "Two-way texting for clients who prefer mobile messaging, plus automated follow-ups on incomplete intake questionnaires.",
          },
          {
            title: "Web chat agent",
            detail:
              "Engages prospective clients directly on your firm's website and landing pages, converting anonymous traffic into qualified leads.",
          },
          {
            title: "Missed-call recovery",
            detail:
              "Detects unanswered calls instantly and triggers an immediate text or callback before the caller dials a competing firm.",
          },
        ],
      },
      {
        num: "02",
        title: "Fact Extraction & Custom CRM",
        caption: "// CONVERSATION INTO STRUCTURED DATA",
        nodes: [
          {
            title: "Transcription & extraction",
            detail:
              "Converts call recordings, voicemails, and chat transcripts into structured legal facts: incident dates, parties, claims, and timeline summaries.",
          },
          {
            title: "Custom CRM & deduplication",
            detail:
              "Matches inquiries across all channels into a single unified record, maintaining complete interaction history and ad campaign attribution.",
          },
        ],
      },
      {
        num: "03",
        title: "Conflict Prep & Integration Layer",
        caption: "// BRIDGING PERIMETER AND CORE SYSTEMS",
        nodes: [
          {
            title: "Conflict search preparation",
            detail:
              "Searches authorized firm databases for normalized party names and corporate aliases, preparing clean comparison dossiers for review.",
          },
          {
            title: "Practice management sync",
            detail:
              "Bidirectional data exchange with your existing case management software, document storage, and practice management tools.",
          },
        ],
      },
    ],
    loop: {
      label: "RE-ENGAGEMENT LOOP",
      detail:
        "Automated client nurture and document chasing: prospective clients who pause mid-intake or need to provide retainer documents receive polite, scheduled follow-ups until completed or closed.",
    },
    record: {
      eyebrow: "// CONVERGENCE",
      title: "One Unified Matter & Client Record",
      detail:
        "Marketing source, contact consent, consultation notes, structured facts, conflict search logs, and retainer status in one central record, synchronized across all firm systems.",
    },
    core: {
      eyebrow: "// PAST THE PERIMETER: PRACTICE MANAGEMENT & ATTORNEY DECISION",
      steps: ["Conflict sign-off", "Attorney evaluation", "Automated retainer & case open"],
      detail:
        "From here your firm's rules and approvals govern every step. The AI infrastructure prepares the matter and synchronizes data. Attorneys retain 100% control of legal judgment and client acceptance.",
    },
  },

  fit: {
    eyebrow: "// BUILT FOR AMBITIOUS LAW FIRMS ACROSS PRACTICE AREAS",
    intro:
      "Our AI infrastructure is engineered for law firms that handle meaningful client volume, want reliable 24/7 reception coverage, maintain custom intake criteria, and require their practice management systems to stay perfectly in sync.",
    industries: [
      {
        title: "Litigation & Trial Practices",
        description:
          "Handle heavy inbound call volume 24/7, capture complex incident and liability facts accurately, preserve ad attribution, and prep adverse party conflict searches automatically before counsel reviews the file.",
      },
      {
        title: "Corporate, Commercial & Real Estate",
        description:
          "Streamline intake questionnaires, verify business entity names against existing client databases, route by partner specialization, and sync retainers directly into billing and document repositories.",
      },
      {
        title: "Family, Employment & General Practice",
        description:
          "Capture sensitive inquiries with natural AI voice agents, manage multi-office routing, eliminate duplicate records, and keep consultations booked without endless back-and-forth phone tag.",
      },
    ],
    notRightFit:
      "Engineered for solo practitioners and multi-attorney firms seeking scalable operational infrastructure. Less suited for practices with minimal inquiry volume or firms with no desire to modernize manual administrative workflows.",
  },

  // Operating scenarios, not client quotes. `quoted: false` drops the quotation
  // marks in TestimonialStrip; `name` carries the failure mode, so `initials()`
  // still renders two characters.
  testimonials: {
    eyebrow: "// FIVE PLACES FIRM OPERATIONS BREAK DOWN",
    heading: {
      lead: ["WHERE LAW FIRMS"],
      tail: "LEAK VALUABLE MATTERS.",
      tailAccent: false,
    },
    quoted: false,
    label: "Common law firm operational failure points",
    items: [
      {
        quote:
          "A high-value prospective client calls at 19:15 on a Friday. Voicemail takes it, nobody listens until Monday morning, and by then they have hired another firm. Voice AI answers live, gathers the essential facts, and logs the inquiry in the CRM so the team can review it immediately.",
        name: "AFTER-HOURS LOSS",
        role: "Evening and weekend inbound calls",
        location: "general practice",
      },
      {
        quote:
          "Attorneys and intake staff spend hours re-typing inquiry details from web forms and phone notes into case management software. Our bidirectional integration syncs the unified client record directly into your case management platform the moment the file is approved.",
        name: "DISCONNECTED SYSTEMS",
        role: "Double entry between CRM and case management",
        location: "multi-system firms",
      },
      {
        quote:
          "A potential conflict arises on an adverse party or corporate subsidiary. The system normalizes the entity, checks authorized internal records, highlights potential matches with source references, and pauses until designated counsel signs off.",
        name: "CONFLICT UNCERTAINTY",
        role: "Preliminary conflict preparation",
        location: "attorney-gated",
      },
      {
        quote:
          "The same client calls the main line, fills in a contact form that evening, and texts two days later. Staff open three separate files and two coordinators call the same person. Multi-channel deduplication merges every touchpoint into one clean record.",
        name: "DUPLICATE RECORDS",
        role: "One prospect across three channels",
        location: "omnichannel inbound",
      },
      {
        quote:
          "Firm routing and qualification criteria live only in senior partners' heads. We translate those exact rules into deterministic logic, ensuring matters route to the right attorney, office, or referral partner every single time.",
        name: "UNWRITTEN RULES",
        role: "Partner-specific routing rules",
        location: "governed logic",
      },
    ],
  },

  faq: {
    eyebrow: "// FAQ",
    intro: "What managing partners ask before building law firm AI infrastructure.",
    headingTop: "Questions,",
    headingBottom: "Answered",
    items: [
      {
        q: "What components are included in your law firm AI infrastructure?",
        a: "We engineer an end-to-end operational stack tailored to your firm: 24/7 AI voice receptionists for inbound calls, SMS and web chat agents, custom legal CRMs and inquiry pipelines, automated conflict check preparation, deterministic routing, and deep bidirectional integrations with your existing practice management software.",
      },
      {
        q: "Does your system integrate with our existing legal practice management software and CRM?",
        a: "Yes. We connect directly with what your firm already relies on, including leading legal case management platforms, practice management suites, legal CRMs (such as Clio, Lawmatics, Lead Docket), VoIP phone systems, calendars, and document management systems. We eliminate duplicate data entry by keeping records synchronized across your entire stack.",
      },
      {
        q: "Can the AI receptionist handle complex legal conversations and practice-specific questions?",
        a: "Yes. The voice agent is trained on your firm's specific practice areas, FAQs, office locations, and intake criteria. It speaks naturally, asks the right follow-up questions to extract critical fact patterns, and knows when to transfer urgent calls or schedule consultations.",
      },
      {
        q: "Does the system make legal decisions or approve conflicts autonomously?",
        a: "No. The system gathers facts, normalizes entities, and prepares conflict search dossiers with direct references to historical records. All legal evaluations, conflict determinations, and client acceptance decisions remain 100% in the hands of authorized attorneys. High-impact steps fire only after human sign-off is recorded.",
      },
      {
        q: "How do you protect client confidentiality and data security?",
        a: "We treat legal confidentiality as paramount. We map every data flow, enforce least-privilege role-based access, utilize enterprise-grade encryption in transit and at rest, and can host within dedicated US or Canadian regions. We do not use your confidential client data to train public AI models.",
      },
      {
        q: "Could we just build this using standard automation tools like Zapier or Make?",
        a: "Basic automation tools work for simple one-way triggers, but quickly break down when handling complex legal workflows: multi-channel deduplication, fuzzy entity matching for conflict searches, reliable bidirectional data sync with case management platforms, and robust audit trails that your firm can stand behind.",
      },
      {
        q: "Our firm's intake rules and attorney specialties change over time. How is that managed?",
        a: "All operational and routing rules are modular, documented, version-controlled, and testable. Updating practice criteria, adding new attorneys, or adjusting office routing is straightforward and does not disrupt live operations.",
      },
      {
        q: "How does an engagement start, and what is the process?",
        a: "We begin with a paid operational diagnostic: mapping your firm's current inbound channels, software stack, routing exceptions, and bottleneck areas. We then build and validate your custom AI infrastructure in shadow mode before deploying to live production.",
      },
    ],
  },

  cta: {
    heading: { lead: ["MODERNIZE YOUR FIRM'S"], tail: "AI INFRASTRUCTURE.", tailAccent: true },
    body: "Every engagement begins with an operational audit and a controlled test before anything touches live client communications. You work directly with senior engineers who understand legal workflows, practice management architectures, and human-in-the-loop governance.",
    label: "BOOK A FIRM AUDIT",
  },
};
