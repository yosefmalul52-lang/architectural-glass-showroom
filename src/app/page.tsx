import Image from "next/image";
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
      <div
        id="intro-loader-static"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary"
        aria-hidden
      >
        <Image
          src="/logo-loading-transparent.png"
          alt=""
          width={500}
          height={500}
          priority
          className="h-52 w-auto object-contain sm:h-60 md:h-[17rem] lg:h-72"
        />
      </div>
      <IntroLoader />
      <div id="site-shell">
        <GrainOverlay />
        <ScrollProgress />
        <main id="main-content" className="m-0 max-w-full overflow-x-clip p-0">
          <Hero />
          <DynamicShowroom />
          <EngineeringPillars />
          <AtelierReel />
          <CraftBridge />
          <LeadCapture />
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </>
  );
}
