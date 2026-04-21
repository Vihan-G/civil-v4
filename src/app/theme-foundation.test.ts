import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("marketing foundation", () => {
  test("installs the approved motion and 3d packages only", () => {
    const pkg = readFileSync(new URL("../../package.json", import.meta.url), "utf8");

    expect(pkg).toContain('"framer-motion"');
    expect(pkg).toContain('"@studio-freight/lenis"');
    expect(pkg).toContain('"gsap"');
    expect(pkg).toContain('"three"');
    expect(pkg).toContain('"@react-three/fiber"');
    expect(pkg).toContain('"@react-three/drei"');
    expect(pkg).toContain('"postprocessing"');
    expect(pkg).toContain('"@react-three/postprocessing"');
  });

  test("loads fonts through next/font/local instead of runtime google css imports", () => {
    const layout = readFileSync(new URL("./layout.tsx", import.meta.url), "utf8");
    const smoothScrollProvider = readFileSync(
      new URL("../components/providers/smooth-scroll-provider.tsx", import.meta.url),
      "utf8"
    );
    const globals = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(layout).toContain('from "next/font/local"');
    expect(layout).toContain("SFCompact.ttf");
    expect(layout).toContain("SFNS.ttf");
    expect(layout).toContain("SFNSMono.ttf");
    expect(smoothScrollProvider).toContain('lenis.on("scroll", updateScrollTrigger)');
    expect(smoothScrollProvider).toContain("gsap.ticker.add(tick)");
    expect(smoothScrollProvider).toContain("gsap.ticker.lagSmoothing(0)");
    expect(smoothScrollProvider).not.toContain("window.requestAnimationFrame(loop)");
    expect(smoothScrollProvider).toContain("debugFlags.noLenis");
    expect(globals).not.toContain("fonts.googleapis.com");
  });

  test("defines the monochrome token set in globals", () => {
    const globals = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(globals).toContain("--bg: #0A0A0B;");
    expect(globals).toContain("--bg-elev: #111113;");
    expect(globals).toContain("--fg: #F5F5F5;");
    expect(globals).toContain("--fg-muted: #8A8A93;");
    expect(globals).toContain("--border: rgba(255,255,255,0.08);");
    expect(globals).toContain("--accent: #E5E7EB;");
    expect(globals).toContain("--accent-glow: rgba(180, 220, 255, 0.55);");
    expect(globals).toContain("--radius-lg: 22px;");
  });
});
