import Hero from "@/components/sections/Hero";
import Quotation from "@/components/sections/Quotation";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import SolutionsTeaser from "@/components/sections/SolutionsTeaser";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      {/* One seamless gradient surface for all mid-page sections; the hero and
          footer keep their own backgrounds. */}
      <div className="depth-band">
        <Quotation />
        <ProcessTimeline />
        <SolutionsTeaser />
        <Services />
        {/* Projects (Highlights), Governance and EngagementModel are
            intentionally out of the scroll for now; the components and their
            data (projects.ts, content.ts) are kept so they can be dropped back
            in here. The /case-study routes they link to still build. */}
        <FAQ />
      </div>
    </>
  );
}
