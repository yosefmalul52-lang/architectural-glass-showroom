import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/editorial/GrainOverlay";
import { ScrollProgress } from "@/components/editorial/ScrollProgress";
import { StickyCtaBar } from "@/components/conversion/StickyCtaBar";
import { Hero } from "@/components/sections/Hero";
import { EngineeringPillars } from "@/components/sections/EngineeringPillars";
import { DynamicShowroom } from "@/components/sections/DynamicShowroom";
import { AtelierReel } from "@/components/sections/AtelierReel";
import { SocialProof } from "@/components/sections/SocialProof";
import { LeadCapture } from "@/components/sections/LeadCapture";
import { WhatsAppFAB } from "@/components/sections/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <ScrollProgress />
      <main id="main-content" className="m-0 p-0 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Hero />
        <EngineeringPillars />
        <DynamicShowroom />
        <AtelierReel />
        <div
          aria-hidden
          className="mx-auto w-full max-w-[1400px] px-6 py-8 lg:px-10 lg:py-12"
        >
          <div className="h-px w-full bg-hairline" />
        </div>
        <SocialProof />
        <LeadCapture />
      </main>
      <Footer />
      <StickyCtaBar />
      <WhatsAppFAB />
    </>
  );
}
