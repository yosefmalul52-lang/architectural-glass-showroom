import { IntroLoader } from "@/components/IntroLoader";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/editorial/GrainOverlay";
import { ScrollProgress } from "@/components/editorial/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { EngineeringPillars } from "@/components/sections/EngineeringPillars";
import { DynamicShowroom } from "@/components/sections/DynamicShowroom";
import { AtelierReel } from "@/components/sections/AtelierReel";
import { CraftBridge } from "@/components/sections/CraftBridge";
import { LeadCapture } from "@/components/sections/LeadCapture";
import { WhatsAppFAB } from "@/components/sections/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <GrainOverlay />
      <ScrollProgress />
      <main id="main-content" className="m-0 p-0">
        <Hero />
        <DynamicShowroom />
        <EngineeringPillars />
        <AtelierReel />
        <CraftBridge />
        <LeadCapture />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
