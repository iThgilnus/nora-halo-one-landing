import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { SiteHeader } from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionRevealSection } from "@/components/landing/SolutionRevealSection";

// Import S04 - S08 components
import TechnologySection from "@/components/landing/TechnologySection";
import FeatureCardsSection from "@/components/landing/FeatureCardsSection";
import PetExperienceSection from "@/components/landing/PetExperienceSection";
import { SpecsSection } from "@/components/landing/SpecsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";


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
