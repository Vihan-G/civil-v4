"use client";

import { useState } from "react";
import {
  FAQ,
  FinalCTA,
  Footer,
  LivePreviewSection
} from "@/components/landing/sections";
import { StoryHero } from "@/components/landing/story-hero";
import { StoryProcess } from "@/components/landing/story-process";
import { TopBar } from "@/components/landing/top-bar";
import type { StructuralMaterial } from "@/components/landing/isometric-building";

export function LandingPage() {
  const [material, setMaterial] = useState<StructuralMaterial>("Steel");

  return (
    <div data-screen-label="Civil Agent landing">
      <TopBar />
      <main>
        <StoryHero material={material} setMaterial={setMaterial} />
        <StoryProcess material={material} />
        <LivePreviewSection />
        <FAQ />
        <FinalCTA material={material} />
      </main>
      <Footer />
    </div>
  );
}
