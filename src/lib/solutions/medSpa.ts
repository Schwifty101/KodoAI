// -----------------------------------------------------------------------------
// MED SPA (/med-spa)
// PLACEHOLDER CONTENT. Structurally complete and on-message, but written from
// the legal-intake pattern rather than from a source copy doc: the governance
// thesis holds (agents prepare, the clinic decides), the specifics are ours to
// replace once real med spa copy exists. Shape: src/lib/solutions/types.ts.
//
// Deliberate restraint in this copy: nothing here claims a clinical outcome,
// clears a contraindication, or names a compliance regime. Screening answers are
// collected and routed to a licensed reviewer, never judged.
// -----------------------------------------------------------------------------

import type { Solution } from "@/lib/solutions/types";

export const medSpa: Solution = {
  slug: "med-spa",
  navLabel: "MED SPA",
  meta: {
    title: "Med Spa Intake, Booking and Front Desk Automation | KodoAI",
    description:
      "Grow without growing the front desk. Custom intake, screening prep and booking orchestration for multi-provider med spas across the US and Canada.",
  },

  teaser: {
    eyebrow: "// MED SPA OPERATIONS",
    title: "MED SPA INTAKE AND BOOKING",
    body: "Your clinic already paid for the inquiry. What it loses is the hour between a DM landing and someone answering it. We build the layer between the AI receptionist, booking system, patient records and provider approvals, so agents fill the calendar and your providers keep every clinical call.",
    capabilities: [
      "MULTI-CHANNEL CAPTURE",
      "SCREENING PREPARATION",
      "DETERMINISTIC BOOKING",
      "APPROVAL-GATED CONFIRMATION",
    ],
    cta: "SEE HOW THE BOOKING LAYER WORKS",
  },

  hero: {
    eyebrow: "// MED SPA INTAKE AND BOOKING ORCHESTRATION",
    title: "GROW WITHOUT GROWING",
    titleSub: "THE FRONT DESK",
    ambient: "MEDSPA",
    lead: "Your clinic already paid for the inquiry. What it loses is the hour between a DM landing and someone answering it, and the coordinator hour you add every time volume rises. KodoAI builds the decision-governance layer between your AI receptionist, booking system, patient records and provider approvals, for multi-provider med spas across the US and Canada.",
    primaryCta: "BOOK A CLINIC AUDIT",
    secondaryCta: "SEE THE ORCHESTRATION LAYER",
  },

  capabilitiesEyebrow: "// WHAT THE LAYER COORDINATES FOR YOU",
  capabilitiesHeading: {
    lead: ["SIX CAPABILITIES."],
    tail: "ONE GOVERNED LAYER.",
    tailAccent: false,
  },
  capabilities: [
    { num: "01", title: "Multi-Channel Capture", description: "Calls, forms, site chat, Instagram DMs and campaign leads become one patient inquiry record instead of five inboxes nobody owns. Consent, contact preference and the source that paid for the lead stay attached." },
    { num: "02", title: "Treatment Interest Matching", description: "What the caller asked for gets mapped onto what this location can actually deliver: the service menu, the devices in the room and the providers certified to use them. No consult booked that cannot be honored." },
    { num: "03", title: "Screening Preparation", description: "Your screening questions get asked and recorded before a provider's time is spent. Anything on your flag list goes to a licensed reviewer. The system records answers. It never clears a contraindication." },
    { num: "04", title: "Deterministic Booking Rules", description: "Provider license, device availability, room, treatment duration, recovery buffer and location all resolve against your approved rules. AI reads the inquiry. The slot follows fixed logic your manager can inspect and change." },
    { num: "05", title: "Deposit and Confirmation Gating", description: "Hold the slot, take the deposit and send prep instructions only once the required approval is recorded. Nothing is confirmed to a patient before the clinic has confirmed it internally." },
    { num: "06", title: "No-Show Recovery and Audit", description: "Run the reminder cadence, backfill same-day cancellations from the waitlist, and log every input, rule, flag and override. When a screening answer is missing, the workflow stops and alerts a named owner." },
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
      { stage: "Multi-channel capture", whatHappens: "Approved channels create or update one patient inquiry record", controlPoint: "Consent, contact preference, source and duplicate checks" },
      { stage: "Interest matching", whatHappens: "The requested treatment is mapped onto this location's service menu", controlPoint: "Offered services, provider certification, device on site" },
      { stage: "Screening preparation", whatHappens: "Answers are gathered against the clinic's own screening form", controlPoint: "Flagged answers routed to a licensed reviewer" },
      { stage: "Booking", whatHappens: "Clinic rules select provider, room, device and duration", controlPoint: "Deterministic logic, with exceptions queued" },
      { stage: "Decision", whatHappens: "The designated provider or manager reviews fit and screening flags", controlPoint: "Human or clinical approval, always" },
      { stage: "Confirmation", whatHappens: "Approved bookings take the deposit and send prep instructions", controlPoint: "Recorded approval before anything executes" },
    ],
  },

  flow: {
    eyebrow: "// THE AGENT PERIMETER",
    heading: {
      lead: ["THREE STAGES."],
      tail: "ONE PATIENT RECORD.",
      tailAccent: false,
    },
    intro:
      "Everything before your own core system runs as a perimeter of narrow agents, each doing one job on the way to a single clean record. Nothing in this perimeter decides whether a patient is treated.",
    caption: "Inbound booking perimeter: channel capture, qualification and identity agents feeding one patient inquiry record, with stalled inquiries returning to capture before the record crosses into the clinic's core system.",
    source: {
      label: "// INBOUND DEMAND",
      items: ["Phone calls", "Web forms", "Site chat", "Social messages", "Paid campaigns"],
    },
    stages: [
      {
        num: "01",
        title: "Channel Capture",
        caption: "// THE FRONT DOOR",
        nodes: [
          { title: "Voice agent", detail: "Answers inbound calls live or after hours, captures what the caller wants done in their own words, and opens the record on the spot." },
          { title: "SMS agent", detail: "Two-way texting for the callers who will not pick up, plus nudges on consult forms that were left half finished." },
          { title: "Social DM agent", detail: "Works the Instagram and Facebook inbox where most aesthetics inquiries now start, instead of leaving it to whoever has a spare minute." },
          { title: "Missed-call recovery", detail: "Detects an unanswered or abandoned call and fires a callback or text before the caller works down the rest of their list." },
        ],
      },
      {
        num: "02",
        title: "Qualification Layer",
        caption: "// CONVERSATION INTO STRUCTURED FACTS",
        nodes: [
          { title: "Treatment intent extraction", detail: "Turns call, chat and DM narrative into the structured fact set your booking rules are written against: treatment requested, area, prior work, timeline, budget signal." },
          { title: "Screening follow-up", detail: "Chases the patient for the screening answers the record still lacks, so nothing reaches the booking rules on a half-filled form." },
        ],
      },
      {
        num: "03",
        title: "Identity and Deduplication",
        caption: "// CLEANING THE RECORD BEFORE IT MOVES",
        nodes: [
          { title: "Deduplication agent", detail: "Matches each new inquiry against existing patients across every channel, so a returning client who DMs and then calls stays one record with her treatment history attached." },
          { title: "Bilingual intake agent", detail: "Handles non-English inquiries at the point of first contact, rather than parking the caller until a bilingual coordinator is free." },
        ],
      },
    ],
    loop: {
      label: "REBOOKING LOOP",
      detail:
        "Nurture and rebooking agent: inquiries that stall (no answer on the callback, a consult form abandoned halfway) and treatments due for their next cycle re-enter capture on a scheduled cadence until they book or are marked lost.",
    },
    record: {
      eyebrow: "// CONVERGENCE",
      title: "One Unified Patient Inquiry Record",
      detail:
        "Source, consent, contact preference, treatment interest, screening answers and the full channel history in one place, with campaign attribution attached from the first touch through to the invoice.",
    },
    core: {
      eyebrow: "// PAST THE PERIMETER: THE CLINIC'S CORE SYSTEM",
      steps: ["Screening review", "Provider decision", "Booking and handoff"],
      detail:
        "From here your own protocols and approvals govern every step. The agents prepare the appointment. They never approve the treatment.",
    },
  },

  fit: {
    eyebrow: "// BUILT FOR CLINICS WHERE THE FRONT DESK IS THE CEILING",
    intro: "The strongest fit is a multi-provider clinic spending real money on demand, taking inquiries across phone, forms and social, running treatments that carry screening requirements, and adding coordinator hours every time volume rises.",
    industries: [
      { title: "Injectables and Aesthetics", description: "Neurotoxin and filler inquiries route to a certified injector with the right slot length, so a twenty-minute booking never blocks an hour-long room. The campaign source stays attached from the first DM through to the invoice." },
      { title: "Laser and Body Contouring", description: "Match the request to a device this location actually has and a provider licensed to run it. Enforce recovery buffers, package sessions, and backfill the morning's cancellations from the waitlist before the room goes cold." },
      { title: "Wellness and Hormone Therapy", description: "Lab, medication and history questions get collected before a provider's hour is committed. Recurring visits hit the same approval gate as the first, so a membership book does not quietly drift out of protocol." },
    ],
    notRightFit: "Usually the wrong fit for a single-provider studio with one phone line and a booking tool that already handles its own exceptions.",
  },

  // Operating scenarios, not client quotes. `quoted: false` drops the quotation
  // marks in TestimonialStrip; `name` carries the failure mode, so `initials()`
  // still renders two characters. Do not reintroduce named attributions here
  // without a real, consented quote behind each one.
  testimonials: {
    eyebrow: "// FIVE PLACES THE BOOK LEAKS",
    heading: {
      lead: ["WHERE THE BOOK"],
      tail: "LEAKS MONEY.",
      tailAccent: false,
    },
    quoted: false,
    label: "Common booking failure points",
    items: [
      {
        quote:
          "An inquiry lands at 19:20. Nobody sees it until morning, and by then she has booked at the clinic two blocks over. Missed-call recovery texts back within the minute and lets her pick a time herself. It still reaches the front desk before anyone is confirmed.",
        name: "AFTER-HOURS LOSS",
        role: "Evening and weekend inbound",
        location: "injectables",
      },
      {
        quote:
          "More consults now start in the Instagram inbox than on the phone, and nobody has time to sit in it. The agent answers, extracts the treatment and the area of interest, and hands over one structured inquiry instead of forty unread messages and a guess at who is serious.",
        name: "SOCIAL INBOX",
        role: "Where aesthetics demand actually starts",
        location: "DM-led clinics",
      },
      {
        quote:
          "The screening questions are the part an owner will not hand over, and should not. The system asks them, records the answers, and routes anything on the clinic's flag list to a licensed reviewer. It does not decide, and it has never told a patient she was cleared.",
        name: "SCREENING GATE",
        role: "Collected and routed, never judged",
        location: "provider-gated",
      },
      {
        quote:
          "A no-show on a laser day is a paid room sitting empty with a provider on the clock. Deposits go out with the confirmation, and when someone cancels the waitlist fills that slot the same morning instead of the following week.",
        name: "NO-SHOW DRAG",
        role: "Paid room, empty chair",
        location: "device-heavy days",
      },
      {
        quote:
          "Someone calls about filler, fills in the consult form that night, then messages on Saturday. That used to be three records and two coordinators texting the same person. It is one file now, with what she had done last spring sitting in it.",
        name: "DUPLICATE RECORDS",
        role: "One patient across three channels",
        location: "multi-channel intake",
      },
    ],
  },

  faq: {
    eyebrow: "// FAQ",
    intro: "What clinic owners ask before a build.",
    headingTop: "Questions,",
    headingBottom: "Answered",
    items: [
      {
        q: "Does the system decide anything clinical?",
        a: "No. It collects, structures and routes. Screening answers are recorded and anything on your flag list goes to a licensed reviewer. The system does not clear a contraindication, does not confirm a patient is a candidate, and does not tell anyone they are cleared. That judgment stays with your provider.",
      },
      {
        q: "We already use Zenoti, Boulevard or Aesthetic Record. Why would we need this?",
        a: "Usually you do not need us to replace them. Those platforms run the calendar and the chart well. What stays manual is the work in front of them: the Instagram inbox, the after-hours call, the same patient arriving on three channels, and getting a flagged screening answer in front of a reviewer before a room is committed.",
      },
      {
        q: "Does this touch patient records or anything under HIPAA?",
        a: "It can, and that is a design decision made with you rather than an afterthought. We map every data flow and subprocessor before go-live, work under least-privilege access by role and location, and sign a business associate agreement where one is required. We do not claim compliance on your behalf. Your own counsel or compliance reviewer signs off before live use.",
      },
      {
        q: "Can it work the Instagram and Facebook inbox?",
        a: "That is usually where the demand is. A social DM agent answers in the inbox, pulls out the treatment requested and the area of interest, and opens the same patient inquiry record a phone call would. The source stays attached, so you can see which campaign produced a booked treatment rather than a like.",
      },
      {
        q: "What happens to no-shows and same-day cancellations?",
        a: "Reminders run on your cadence, deposits gate the confirmation, and a cancellation triggers the waitlist rather than a note for someone to action later. The point is that a paid room with a provider on the clock does not sit empty because nobody had time to work the list that morning.",
      },
      {
        q: "We run four locations with different devices and providers. Does that work?",
        a: "That is the case the layer is built for. Device availability, provider certification, room, duration and recovery buffer are rules per location, not one global setting. A request a location cannot honor never becomes a booking there, and routing to a location that can is a rule rather than a phone call.",
      },
      {
        q: "How is this different from a virtual assistant or an answering service?",
        a: "A virtual assistant is a person doing coordination. This is the coordination itself, running whether or not anyone is at the desk, applying the same rules every time and leaving a record of why. Most clinics keep their people and stop adding more of them as volume rises. We are not selling headcount replacement.",
      },
      {
        q: "How does an engagement start, and what does it cost?",
        a: "It starts with a paid operations diagnostic: where inquiries arrive, what they cost, where they stall, and what a booked treatment is actually worth to you. Production scope and price follow from that rather than a rate card. Anything we build runs in shadow mode before it touches live booking.",
      },
    ],
  },

  cta: {
    heading: { lead: ["WANT THIS RUNNING"], tail: "IN YOUR CLINIC?", tailAccent: true },
    body: "Every engagement starts with a paid diagnostic and a shadow-mode test before anything touches live booking. You work directly with a senior engineer, not a project manager relaying messages to an offshore team.",
    label: "BOOK A CLINIC AUDIT",
  },
};
