import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/editorial/GrainOverlay";
import { ScrollProgress } from "@/components/editorial/ScrollProgress";
import { StickyCtaBar } from "@/components/conversion/StickyCtaBar";
import { Hero } from "@/components/sections/Hero";
import { EngineeringPillars } from "@/components/sections/EngineeringPillars";
import { DynamicShowroom } from "@/components/sections/DynamicShowroom";
import { AtelierReel } from "@/components/sections/AtelierReel";
import { CraftBridge } from "@/components/sections/CraftBridge";
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
        <DynamicShowroom />
        <EngineeringPillars />
        <AtelierReel />
        <CraftBridge />
        <SocialProof />
        <div aria-hidden className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto h-px w-full max-w-5xl bg-accent-teal/35" />
        </div>
        <LeadCapture />
      </main>
      <Footer />
      <StickyCtaBar />
      <WhatsAppFAB />
    </>
  );
}
