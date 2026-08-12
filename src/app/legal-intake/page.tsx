import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalIntakeView from "@/components/legal-intake/LegalIntakeView";
import type { NavLink } from "@/lib/content";

// Same site Header, one nav item: HOME (→ "/"). Logo also returns home.
// Matches the pattern in src/app/case-study/[slug]/page.tsx.
const HOME_NAV: NavLink[] = [{ label: "HOME", href: "/" }];

export const metadata: Metadata = {
  title: "Governed Legal Intake: kodoAI",
  description:
    "The integration and decision-governance layer between your AI receptionist, practice-management system, conflict records and engagement workflow.",
  openGraph: {
    title: "Governed Legal Intake: kodoAI",
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
