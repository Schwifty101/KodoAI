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
  openGraph: {
    title: medSpa.meta.title,
    description: medSpa.meta.description,
    type: "article",
  },
};

export default function MedSpaPage() {
  return (
    <>
      <Header links={NAV} logoHref="/" />
      <SolutionView solution={medSpa} />
      <Footer />
    </>
  );
}
