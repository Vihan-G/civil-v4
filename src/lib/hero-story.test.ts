import { describe, expect, test } from "vitest";
import {
  HERO_PIN_SPAN_VH,
  HERO_PHASES,
  clampUnit,
  getHeroLineRevealProgress,
  getHeroOverlayState,
  getHeroSceneState,
  getHeroPhase,
  getPhaseProgress
} from "./hero-story";

describe("hero-story", () => {
  test("keeps the hero pinned for a 600vh cinematic scroll span", () => {
    expect(HERO_PIN_SPAN_VH).toBe(600);
  });

  test("divides the hero into four equal scroll phases", () => {
    expect(HERO_PHASES).toEqual([
      { key: "drawing", start: 0, end: 0.25 },
      { key: "lift", start: 0.25, end: 0.5 },
      { key: "systems", start: 0.5, end: 0.75 },
      { key: "hologram", start: 0.75, end: 1 }
    ]);
  });

  test("reports the active phase from scroll progress", () => {
    expect(getHeroPhase(0.1)).toBe("drawing");
    expect(getHeroPhase(0.3)).toBe("lift");
    expect(getHeroPhase(0.6)).toBe("systems");
    expect(getHeroPhase(0.9)).toBe("hologram");
  });

  test("extracts per-phase progress and clamps to a unit interval", () => {
    expect(clampUnit(-1)).toBe(0);
    expect(clampUnit(2)).toBe(1);
    expect(getPhaseProgress(0.125, HERO_PHASES[0])).toBeCloseTo(0.5, 5);
    expect(getPhaseProgress(0.4, HERO_PHASES[0])).toBe(1);
    expect(getPhaseProgress(0.1, HERO_PHASES[1])).toBe(0);
  });

  test("derives the hero scene state for each cinematic phase", () => {
    const drawing = getHeroSceneState(0.12);
    const lift = getHeroSceneState(0.38);
    const systems = getHeroSceneState(0.62);
    const hologram = getHeroSceneState(0.88);

    expect(drawing.phase).toBe("drawing");
    expect(drawing.cardStepIndex).toBe(0);
    expect(drawing.cameraPitchDeg).toBe(90);
    expect(drawing.wallLift).toBe(0);
    expect(drawing.gridOpacity).toBe(0);

    expect(lift.phase).toBe("lift");
    expect(lift.cardStepIndex).toBe(1);
    expect(lift.cameraPitchDeg).toBeLessThan(90);
    expect(lift.cameraPitchDeg).toBeGreaterThan(55);
    expect(lift.cameraYawDeg).toBeGreaterThan(0);
    expect(lift.wallLift).toBeGreaterThan(0);
    expect(lift.gridOpacity).toBeGreaterThan(0);

    expect(systems.phase).toBe("systems");
    expect(systems.cardStepIndex).toBe(2);
    expect(systems.columnReveal).toBeGreaterThan(0);
    expect(systems.slabReveal).toBeGreaterThan(0);
    expect(systems.loadPathReveal).toBeGreaterThan(0);
    expect(systems.optimizationProgress).toBeGreaterThan(0);

    expect(hologram.phase).toBe("hologram");
    expect(hologram.cardStepIndex).toBe(3);
    expect(hologram.bloomIntensity).toBeGreaterThan(0);
    expect(hologram.haloOpacity).toBeGreaterThan(0);
    expect(hologram.chromaticAberration).toBeGreaterThan(0);
    expect(hologram.modelRotation).toBeGreaterThan(0);
  });

  test("front-loads the line drawing progress so the first 6% is visually active", () => {
    expect(getHeroLineRevealProgress(0)).toBe(0);
    expect(getHeroLineRevealProgress(0.06)).toBeCloseTo(0.4, 5);
    expect(getHeroLineRevealProgress(0.15)).toBeCloseTo(0.7, 5);
    expect(getHeroLineRevealProgress(0.25)).toBe(1);
    expect(getHeroLineRevealProgress(0.1)).toBeGreaterThan(0.5);
  });

  test("keeps the entry state empty except for skip intro and the scroll indicator", () => {
    const entry = getHeroOverlayState(0);

    expect(entry.scrollIndicatorOpacity).toBe(1);
    expect(entry.chapterOpacity).toBe(0);
    expect(entry.chapterSubLabelOpacity).toBe(0);
    expect(entry.headlineOpacity).toBe(0);
    expect(entry.bodyOpacity).toBe(0);
    expect(entry.ctaOpacity).toBe(0);
    expect(entry.panelOpacity).toBe(0);
  });

  test("reveals and dismisses overlays on the corrected scroll schedule", () => {
    const chapter = getHeroOverlayState(0.08);
    const subLabel = getHeroOverlayState(0.14);
    const headline = getHeroOverlayState(0.22);
    const body = getHeroOverlayState(0.32);
    const ctas = getHeroOverlayState(0.42);
    const panel = getHeroOverlayState(0.53);
    const dissolve = getHeroOverlayState(0.98);

    expect(chapter.chapterOpacity).toBeGreaterThan(0);
    expect(chapter.chapterSubLabelOpacity).toBe(0);

    expect(subLabel.chapterOpacity).toBe(1);
    expect(subLabel.chapterSubLabelOpacity).toBeGreaterThan(0);
    expect(subLabel.scrollIndicatorOpacity).toBeLessThan(1);

    expect(headline.headlineOpacity).toBeGreaterThan(0);
    expect(headline.bodyOpacity).toBe(0);

    expect(body.bodyOpacity).toBeGreaterThan(0);
    expect(body.ctaOpacity).toBe(0);

    expect(ctas.ctaOpacity).toBeGreaterThan(0);
    expect(ctas.panelOpacity).toBe(0);

    expect(panel.panelOpacity).toBeGreaterThan(0);
    expect(panel.headlineOpacity).toBe(1);

    expect(dissolve.chapterOpacity).toBeLessThan(1);
    expect(dissolve.headlineOpacity).toBeLessThan(1);
    expect(dissolve.panelOpacity).toBeLessThan(1);
  });

  test("shows the full overlay immediately when reduced motion is enabled", () => {
    const reduced = getHeroOverlayState(0, true);

    expect(reduced.scrollIndicatorOpacity).toBe(0);
    expect(reduced.chapterOpacity).toBe(1);
    expect(reduced.chapterSubLabelOpacity).toBe(1);
    expect(reduced.headlineOpacity).toBe(1);
    expect(reduced.bodyOpacity).toBe(1);
    expect(reduced.ctaOpacity).toBe(1);
    expect(reduced.panelOpacity).toBe(1);
  });
});
