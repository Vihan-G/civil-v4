import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("CinematicHero phase 1", () => {
  test("uses a pinned 400vh full-bleed shell with separate canvas and overlay layers", () => {
    const source = readFileSync(
      new URL("./cinematic-hero.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("HERO_PIN_SPAN_VH");
    expect(source).toContain("height: `${HERO_PIN_SPAN_VH + 100}vh`");
    expect(source).toContain('data-hero-pinned="true"');
    expect(source).toContain('data-hero-canvas-layer="true"');
    expect(source).toContain('data-hero-overlay-layer="true"');
    expect(source).toContain("pin: pinRef.current");
    expect(source).toContain("Skip intro");
    expect(source).toContain("SCROLL");
    expect(source).toContain("getHeroOverlayState");
    expect(source).toContain("getHeroSceneState");
  });

  test("loads the desktop scene lazily so the 3d code is code-split", () => {
    const source = readFileSync(
      new URL("./cinematic-hero.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain('dynamic(() => import("./cinematic-hero-scene")');
  });

  test("separates the reduced-motion poster from the cinematic desktop loading fallback", () => {
    const source = readFileSync(
      new URL("./cinematic-hero.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("<HeroReducedMotionPoster />");
    expect(source).toContain("<HeroSceneLoadingFallback />");
  });

  test("keeps the metrics strip out of the hero composition", () => {
    const source = readFileSync(
      new URL("./cinematic-hero.tsx", import.meta.url),
      "utf8"
    );

    expect(source).not.toContain("HERO_METRICS.map");
  });

  test("guards overlay furniture until the hero trigger is initialized", () => {
    const source = readFileSync(
      new URL("./cinematic-hero.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("const [ready, setReady] = useState(false);");
    expect(source).toContain("window.scrollTo(0, 0);");
    expect(source).toContain("ScrollTrigger.refresh();");
    expect(source).toContain("requestAnimationFrame(() => {");
    expect(source).toContain("setReady(true);");
    expect(source).toContain("visibility: ready ? \"visible\" : \"hidden\"");
  });

  test("uses the reduced hero display scale without changing the overlay layout", () => {
    const source = readFileSync(
      new URL("./cinematic-hero.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("text-[clamp(48px,5.5vw,80px)]");
  });

  test("uses a bundled local font for 3d drafting text instead of troika's remote default", () => {
    const source = readFileSync(
      new URL("./cinematic-hero-scene.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain('const PLAN_TEXT_FONT = "/fonts/SFNSMono.ttf";');
    expect(source).toContain("font={PLAN_TEXT_FONT}");
  });
});
