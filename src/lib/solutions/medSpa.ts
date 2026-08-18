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

import { CTA_BODY } from "@/lib/caseStudies";
import type { Solution } from "@/lib/solutions/types";

export const medSpa: Solution = {
  slug: "med-spa",
  navLabel: "MED SPA",
  meta: {
    title: "Governed Med Spa Booking: kodoAI",
    description:
      "The integration and decision-governance layer between your AI receptionist, booking system, patient records and provider approvals.",
  },

  teaser: {
    eyebrow: "// MED SPA OPERATIONS",
    title: "GOVERNED MED SPA BOOKING",
    body: "An aesthetics lead is worth a consult in minutes, not the next business day. We build the layer between the AI receptionist, booking system, patient records and provider approvals, so agents fill the calendar and your providers keep every clinical call.",
    capabilities: [
      "MULTI-CHANNEL CAPTURE",
      "SCREENING PREPARATION",
      "DETERMINISTIC BOOKING",
      "APPROVAL-GATED CONFIRMATION",
    ],
    cta: "SEE HOW THE BOOKING LAYER WORKS",
  },

  hero: {
    eyebrow: "// MED SPA OPERATIONS",
    title: "HIGH-INTENT LEAD CAPTURE",
    titleSub: "AND GOVERNED BOOKING",
    ambient: "MEDSPA",
    lead: "An aesthetics inquiry is worth a consult within minutes, and the caller is already messaging three other clinics. KodoAI builds the integration and decision-governance layer between the clinic's AI receptionist, booking system, patient records and treatment approvals, so inquiries move at the speed of the ad spend while clinical judgement stays with the provider.",
    primaryCta: "AUDIT OUR BOOKING FLOW",
    secondaryCta: "SEE THE ORCHESTRATION LAYER",
  },

  capabilitiesEyebrow: "// WHAT THE SYSTEM CAN COORDINATE",
  capabilitiesHeading: {
    lead: ["SIX CAPABILITIES."],
    tail: "ONE GOVERNED LAYER.",
    tailAccent: false,
  },
  capabilities: [
    { num: "01", title: "Multi-Channel Capture", description: "Bring calls, web forms, site chat, social messages and campaign leads into one patient inquiry record. Capture consent, contact preference and the source that paid for the lead." },
    { num: "02", title: "Treatment Interest Matching", description: "Map what the caller asked for onto the clinic's actual service menu, including the treatments a given location and provider are certified and equipped to deliver." },
    { num: "03", title: "Screening Preparation", description: "Collect the answers the clinic's own screening form asks for: medications, pregnancy, prior treatments, allergies, recent procedures. Anything on the clinic's flag list routes to a licensed reviewer. The system never clears a contraindication." },
    { num: "04", title: "Deterministic Booking Rules", description: "Apply the clinic's approved rules for provider licence, device and room availability, treatment duration, recovery buffer and location. AI interprets the inquiry; the slot follows controlled logic." },
    { num: "05", title: "Deposit and Confirmation Gating", description: "Hold the slot, take the deposit and send prep instructions only after the required approval state is recorded. Nothing is confirmed to a patient before the clinic has confirmed it internally." },
    { num: "06", title: "No-Show Recovery and Audit", description: "Log inputs, rules, flags and overrides. Run the reminder cadence, backfill cancellations from the waitlist, and stop safely when a screening answer or a required field is missing." },
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
      { stage: "Interest matching", whatHappens: "The requested treatment is mapped onto the clinic's service menu", controlPoint: "Offered services, provider certification and device availability" },
      { stage: "Screening preparation", whatHappens: "Intake answers are gathered against the clinic's own screening form", controlPoint: "Flagged answers routed to a licensed reviewer" },
      { stage: "Booking", whatHappens: "Clinic rules select provider, room, device and duration", controlPoint: "Deterministic logic and exception queue" },
      { stage: "Decision", whatHappens: "The designated provider or manager reviews fit and screening flags", controlPoint: "Human or clinical approval" },
      { stage: "Confirmation", whatHappens: "Approved bookings take the deposit, send prep instructions and set reminders", controlPoint: "Recorded approval before execution" },
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
      "Everything before the clinic's own core system runs as a perimeter of narrow agents, each doing one job on the way to a single clean record. Nothing here decides whether a patient is treated.",
    caption: "Inbound booking perimeter: capture, qualification and identity agents feeding one patient inquiry record, with stalled inquiries returning to the capture stage before the record crosses into the clinic's core system.",
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
          { title: "Voice agent", detail: "Answers inbound calls live or after hours, captures what the caller wants done and opens the record." },
          { title: "SMS agent", detail: "Two-way texting for the callers who will not pick up, plus nudges on consult forms left half finished." },
          { title: "Social DM agent", detail: "Works the Instagram and Facebook inbox where most aesthetics inquiries now start, instead of leaving it to whoever has a spare minute." },
          { title: "Missed-call recovery", detail: "Detects an unanswered or abandoned call and fires a callback or text before the caller books with the clinic down the road." },
        ],
      },
      {
        num: "02",
        title: "Qualification Layer",
        caption: "// CONVERSATION INTO STRUCTURED FACTS",
        nodes: [
          { title: "Treatment intent extraction", detail: "Turns call, chat and DM narrative into the structured fact set the clinic's booking rules are written against: treatment requested, area, prior work, timeline, budget signal." },
          { title: "Screening follow-up", detail: "Chases the patient for the screening answers the record still lacks, so nothing reaches the booking rules on a half-filled form." },
        ],
      },
      {
        num: "03",
        title: "Identity and Deduplication",
        caption: "// CLEANING THE RECORD BEFORE IT MOVES",
        nodes: [
          { title: "Deduplication agent", detail: "Matches each new inquiry against existing patients across every channel, so a returning client who DMs and then calls stays one record with their treatment history attached." },
          { title: "Bilingual intake agent", detail: "Handles non-English inquiries at the point of first contact instead of parking the caller until a bilingual coordinator is free." },
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
        "Source, consent, contact preference, treatment interest, screening answers and the full channel history in one place, with campaign attribution attached from the first touch.",
    },
    core: {
      eyebrow: "// PAST THE PERIMETER: THE CLINIC'S CORE SYSTEM",
      steps: ["Screening review", "Provider decision", "Booking and handoff"],
      detail:
        "From here the clinic's own protocols and approvals govern every step. The agents prepare the appointment; they never approve the treatment.",
    },
  },

  fit: {
    eyebrow: "// DESIGNED FOR CLINICS WHERE AN UNANSWERED LEAD IS PAID TWICE",
    intro: "The strongest fit is a multi-provider clinic spending real money on demand, taking inquiries across phone, forms and social, running treatments that carry screening requirements, and losing bookings to response time rather than to price.",
    industries: [
      { title: "Injectables and Aesthetics", description: "Route neurotoxin and filler inquiries to a certified injector with the right slot length, keep the campaign source attached to the booking, and hold the consult until the screening answers are in front of a reviewer." },
      { title: "Laser and Body Contouring", description: "Match the requested treatment to a device the location actually has and a provider licensed to run it. Enforce recovery buffers, package sessions and backfill cancellations from the waitlist the same morning." },
      { title: "Wellness and Hormone Therapy", description: "Collect lab, medication and history questions before a provider's time is spent, flag anything the protocol calls out, and hold every recurring visit to the same approval gate as the first." },
    ],
    notRightFit: "Usually not the right fit for a single-provider studio with one phone line and a booking tool that already handles its exceptions well.",
  },

  // PLACEHOLDER COPY: attributions are role + city only, no clinic names, so
  // nothing here claims to be a named entity. Replace with real, approved quotes
  // before this page is treated as social proof.
  testimonials: {
    eyebrow: "// FROM THE PEOPLE WORKING THE FRONT DESK",
    heading: {
      lead: ["WHAT THE CLINIC"],
      tail: "TEAMS SAY.",
      tailAccent: false,
    },
    items: [
      {
        quote:
          "Anything that came in after we closed sat until the next morning, and by then half of them had booked somewhere else. Now they get a text back in about a minute and pick a time themselves. It still lands in front of me before anyone is confirmed.",
        name: "Alyssa Prather",
        role: "Front Desk Lead, injectables clinic",
        location: "Scottsdale, AZ",
      },
      {
        quote:
          "More of our consults start in the Instagram inbox than on the phone, and nobody here has time to sit in it. The agent answers, pulls out what treatment they want, and hands me an inquiry instead of forty unread messages.",
        name: "Renata Okafor",
        role: "Practice Manager, two-location med spa",
        location: "Atlanta, GA",
      },
      {
        quote:
          "The screening questions were the part I would not hand over. It asks them, it writes the answers down, and anything on our flag list goes to a nurse. It has never once told a patient they were cleared.",
        name: "Priya Raghunathan",
        role: "Clinical Director, laser and body contouring",
        location: "Fremont, CA",
      },
      {
        quote:
          "No-shows were running about a fifth of the book on laser days. Deposits go out with the confirmation now, and when someone cancels the waitlist fills the room the same morning.",
        name: "Chase Delacroix",
        role: "Owner, single-location med spa",
        location: "Nashville, TN",
      },
      {
        quote:
          "Somebody calls about filler, fills out the consult form that night, then messages us on Saturday. That used to be three records and two of us texting the same person. It is one file now, with what she had done last spring sitting right there in it.",
        name: "Meredith Kalinowski",
        role: "Front Desk Manager, injectables and wellness clinic",
        location: "Charlotte, NC",
      },
    ],
  },

  cta: {
    heading: { lead: ["WANT THE BOOKING"], tail: "LAYER LIVE?", tailAccent: true },
    body: CTA_BODY,
    label: "AUDIT OUR BOOKING FLOW",
  },
};
