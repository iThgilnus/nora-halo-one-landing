import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import dynamic from "next/dynamic";

// Dynamic imports for below-the-fold components and footer
const ProblemSection = dynamic(() =>
  import("@/components/landing/ProblemSection").then((mod) => mod.ProblemSection)
);
const SolutionRevealSection = dynamic(() =>
  import("@/components/landing/SolutionRevealSection").then(
    (mod) => mod.SolutionRevealSection
  )
);
const TechnologySection = dynamic(() =>
  import("@/components/landing/TechnologySection")
);
const FeatureCardsSection = dynamic(() =>
  import("@/components/landing/FeatureCardsSection")
);
const PetExperienceSection = dynamic(() =>
  import("@/components/landing/PetExperienceSection")
);
const SpecsSection = dynamic(() =>
  import("@/components/landing/SpecsSection").then((mod) => mod.SpecsSection)
);
const FaqSection = dynamic(() =>
  import("@/components/landing/FaqSection").then((mod) => mod.FaqSection)
);
const LeadFormSection = dynamic(() =>
  import("@/components/sections/LeadFormSection").then((mod) => mod.LeadFormSection)
);
const FinalCtaSection = dynamic(() =>
  import("@/components/landing/FinalCtaSection")
);
const SiteFooter = dynamic(() => import("@/components/layout/SiteFooter"));


export default function Home() {
  return (
    <>
      <AnalyticsTracker />
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionRevealSection />
        
        {/* S05 - Technology Cutaway */}
        <TechnologySection />
        
        {/* S06 - Feature Cards */}
        <FeatureCardsSection />
        
        {/* S07 - Pet Experience Parallax */}
        <PetExperienceSection />

        {/* Detailed Specs Section */}
        <SpecsSection />

        {/* FAQ Section */}
        <FaqSection />
        
        {/* S08 - Lead / Consultation Form */}
        <LeadFormSection />

        {/* S09 - Final CTA */}
        <FinalCtaSection />

      </main>
      
      {/* S09 - Site Footer */}
      <SiteFooter />
    </>
  );
}
