import { describe, expect, test } from "vitest";
import {
  getHeroScenePresentation,
  getProcessCardPresentation
} from "./story-stage";

describe("getHeroScenePresentation", () => {
  test("starts on the architectural plan before the structural frame takes over", () => {
    const presentation = getHeroScenePresentation(0.08);

    expect(presentation.artOffsetY).toBeLessThan(-80);
    expect(presentation.planOpacity).toBeGreaterThan(0.9);
    expect(presentation.frameOpacity).toBeLessThan(0.08);
    expect(presentation.optimizeOpacity).toBe(0);
    expect(presentation.outputOpacity).toBe(0);
    expect(presentation.showResultPanel).toBe(false);
    expect(presentation.showStatusPanel).toBe(false);
  });

  test("hands focus to the structural frame without leaving the plan fully visible", () => {
    const presentation = getHeroScenePresentation(0.34);

    expect(presentation.frameOpacity).toBeGreaterThan(0.8);
    expect(presentation.planOpacity).toBeLessThan(0.18);
    expect(presentation.optimizeOpacity).toBeLessThan(0.08);
    expect(presentation.showStatusPanel).toBe(false);
  });

  test("lets the optimization beat take over before the output sheet arrives", () => {
    const presentation = getHeroScenePresentation(0.66);

    expect(presentation.optimizeOpacity).toBeGreaterThan(0.82);
    expect(presentation.frameOpacity).toBeLessThan(0.32);
    expect(presentation.planOpacity).toBeLessThan(0.08);
    expect(presentation.outputOpacity).toBeLessThan(0.08);
  });

  test("finishes on the output sheet instead of mixed overlays", () => {
    const presentation = getHeroScenePresentation(0.92);

    expect(presentation.outputOpacity).toBeGreaterThan(0.84);
    expect(presentation.planOpacity).toBeLessThan(0.04);
    expect(presentation.frameOpacity).toBeLessThan(0.12);
    expect(presentation.optimizeOpacity).toBeLessThan(0.12);
    expect(presentation.showResultPanel).toBe(false);
  });
});

describe("getProcessCardPresentation", () => {
  test("keeps the active process card fully readable", () => {
    expect(
      getProcessCardPresentation({
        distance: 0,
        isActive: true
      })
    ).toMatchObject({
      bodyOpacity: 1,
      mode: "active",
      opacity: 1
    });
  });

  test("reduces inactive cards to supporting sheets", () => {
    const presentation = getProcessCardPresentation({
      distance: 1,
      isActive: false
    });

    expect(presentation.mode).toBe("support");
    expect(presentation.bodyOpacity).toBe(0);
    expect(presentation.opacity).toBeGreaterThan(0.06);
    expect(presentation.opacity).toBeLessThan(0.18);
    expect(Math.abs(presentation.translateY)).toBeLessThan(64);
  });

  test("hides distant process cards to avoid text bleed", () => {
    expect(
      getProcessCardPresentation({
        distance: 1.5,
        isActive: false
      })
    ).toMatchObject({
      mode: "hidden",
      opacity: 0
    });

    expect(
      getProcessCardPresentation({
        distance: 2,
        isActive: false
      })
    ).toMatchObject({
      mode: "hidden",
      opacity: 0
    });

    expect(
      getProcessCardPresentation({
        distance: 3,
        isActive: false
      })
    ).toMatchObject({
      mode: "hidden",
      opacity: 0
    });
  });
});
