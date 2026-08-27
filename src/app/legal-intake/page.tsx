import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SolutionView from "@/components/solutions/SolutionView";
import { solutionNav } from "@/lib/solutions";
import { legalIntake } from "@/lib/solutions/legalIntake";

// Same site Header, slim nav: HOME plus the other solution. Logo returns home.
// Matches the pattern in src/app/case-study/[slug]/page.tsx.
const NAV = solutionNav(legalIntake.slug);

export const metadata: Metadata = {
  title: legalIntake.meta.title,
  description: legalIntake.meta.description,
  alternates: { canonical: "/legal-intake" },
  openGraph: {
    title: legalIntake.meta.title,
    description: legalIntake.meta.description,
    url: "/legal-intake",
    type: "website",
    images: ["/reference/banner.png"],
  },
};

const SITE_URL = "https://www.kodoai.xyz";
const PAGE_URL = `${SITE_URL}/legal-intake`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Law Firm AI Infrastructure & Operations Automation",
      serviceType: "Legal AI receptionists, custom legal CRMs, case management sync, and governed intake",
      url: PAGE_URL,
      description:
        "Full-firm AI infrastructure for modern law firms. 24/7 AI receptionists, custom legal CRMs, seamless case management integrations, conflict-ready prep, deterministic routing, and approval-gated engagement.",
      provider: { "@type": "Organization", name: "kodoAI", url: SITE_URL, email: "soban@kodoai.xyz" },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      audience: { "@type": "Audience", audienceType: "Law firms and legal practices" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Law firm AI infrastructure capabilities",
        itemListElement: legalIntake.capabilities.map((c) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: c.title },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: (legalIntake.faq?.items ?? []).map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Legal Infrastructure", item: PAGE_URL },
      ],
    },
  ],
};

export default function LegalIntakePage() {
  return (
    <>
      <Header links={NAV} logoHref="/" />
      <SolutionView solution={legalIntake} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
