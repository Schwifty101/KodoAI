import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SolutionView from "@/components/solutions/SolutionView";
import { solutionNav } from "@/lib/solutions";
import { medSpa } from "@/lib/solutions/medSpa";

// Same site Header, slim nav: HOME plus the other solution. Logo returns home.
const NAV = solutionNav(medSpa.slug);

export const metadata: Metadata = {
  title: medSpa.meta.title,
  description: medSpa.meta.description,
  alternates: { canonical: "/med-spa" },
  openGraph: {
    title: medSpa.meta.title,
    description: medSpa.meta.description,
    url: "/med-spa",
    type: "website",
    images: ["/reference/banner.png"],
  },
};

const SITE_URL = "https://www.kodoai.xyz";
const PAGE_URL = `${SITE_URL}/med-spa`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Med Spa Intake and Booking Orchestration",
      serviceType: "Med spa intake, screening preparation and booking automation",
      url: PAGE_URL,
      description:
        "Custom intake and booking orchestration for multi-provider med spas. One patient inquiry record across phone, form, chat and social, screening answers routed to a licensed reviewer, deterministic booking rules per location, and confirmation that fires only after recorded approval.",
      provider: { "@type": "Organization", name: "kodoAI", url: SITE_URL, email: "soban@kodoai.xyz" },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      audience: { "@type": "Audience", audienceType: "Med spas and aesthetic clinics" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Booking orchestration capabilities",
        itemListElement: medSpa.capabilities.map((c) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: c.title },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: (medSpa.faq?.items ?? []).map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Med Spa", item: PAGE_URL },
      ],
    },
  ],
};

export default function MedSpaPage() {
  return (
    <>
      <Header links={NAV} logoHref="/" />
      <SolutionView solution={medSpa} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
