import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/editorial/GrainOverlay";
import { ScrollProgress } from "@/components/editorial/ScrollProgress";
import { ScrollSpy } from "@/components/editorial/ScrollSpy";
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
      <ScrollSpy />
      <Header />
      <main>
        <Hero />
        <EngineeringPillars />
        <DynamicShowroom />
        <AtelierReel />
        <SocialProof />
        <LeadCapture />
      </main>
      <Footer />
      <StickyCtaBar />
      <WhatsAppFAB />
    </>
  );
}
