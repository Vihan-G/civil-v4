import {
  FAQ,
  FinalCTA,
  Footer,
  LivePreviewSection
} from "@/components/landing/sections";
import { CinematicHero } from "@/components/landing/hero/cinematic-hero";
import { StatsStrip } from "@/components/landing/stats-strip";
import { StoryProcess } from "@/components/landing/story-process";
import { TopBar } from "@/components/landing/top-bar";
import type { StructuralMaterial } from "@/components/landing/isometric-building";

export function LandingPage() {
  const material: StructuralMaterial = "Steel";

  return (
    <div data-screen-label="Civil Agent landing">
      <TopBar />
      <main>
        <CinematicHero />
        <StatsStrip />
        <StoryProcess />
        <LivePreviewSection />
        <FAQ />
        <FinalCTA material={material} />
      </main>
      <Footer />
    </div>
  );
}
