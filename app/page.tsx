export const dynamic = "force-static";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { HomeSection } from "@/components/sections/HomeSection";
import { HowToBuySection } from "@/components/sections/HowToBuySection";
import { PenguMemeSection } from "@/components/sections/PenguMemeSection";
import { RoadMapSection } from "@/components/sections/RoadmapSection";
import { TokenomicSection } from "@/components/sections/TokenomicSection";

export default function LandingPage() {
  return (
    <>
      <main>
        <Header />
        <HomeSection />
        <AboutSection />
        <HowToBuySection />
        <TokenomicSection />
        <RoadMapSection />
        <Footer />
      </main>
    </>
  );
}
