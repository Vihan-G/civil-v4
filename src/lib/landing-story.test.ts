import { describe, expect, test } from "vitest";
import {
  PROCESS_PROGRESS_OPTIONS,
  getHeroBeat,
  getHeroKpis,
  getProcessActiveIndex,
  getWorkflowActivePhase
} from "./landing-story";

describe("getHeroBeat", () => {
  test("starts in the plan beat", () => {
    expect(getHeroBeat(0)).toBe("plan");
    expect(getHeroBeat(0.24)).toBe("plan");
  });

  test("moves through frame and optimize before handoff", () => {
    expect(getHeroBeat(0.25)).toBe("frame");
    expect(getHeroBeat(0.6)).toBe("optimize");
    expect(getHeroBeat(0.95)).toBe("handoff");
  });
});

describe("getHeroKpis", () => {
  test("shows baseline framing at the start of the story", () => {
    expect(getHeroKpis(0)).toEqual([
      { label: "Iteration speed", value: "Slow review loop" },
      { label: "Structural cost", value: "Hidden inefficiency" },
      { label: "Coordination", value: "Late-stage churn" }
    ]);
  });

  test("shows optimized business outcomes near the end of the story", () => {
    expect(getHeroKpis(1)).toEqual([
      { label: "Iteration speed", value: "Faster early schemes" },
      { label: "Structural cost", value: "Lower material pressure" },
      { label: "Coordination", value: "Fewer redesign loops" }
    ]);
  });
});

describe("getProcessActiveIndex", () => {
  test("pins the first card at the top of the section", () => {
    expect(getProcessActiveIndex(0, 5)).toBe(0);
  });

  test("activates the last card by the end of the section", () => {
    expect(getProcessActiveIndex(1, 5)).toBe(4);
  });

  test("clamps progress outside the 0-1 range", () => {
    expect(getProcessActiveIndex(-1, 5)).toBe(0);
    expect(getProcessActiveIndex(2, 5)).toBe(4);
  });
});

describe("PROCESS_PROGRESS_OPTIONS", () => {
  test("keeps the process chapter in scrub mode so the page does not drift past the tile stack", () => {
    expect(PROCESS_PROGRESS_OPTIONS).toMatchObject({
      captureMode: "scrub"
    });
    expect(PROCESS_PROGRESS_OPTIONS.scrubDistance).toBeGreaterThan(2400);
  });
});

describe("getWorkflowActivePhase", () => {
  test("starts in import and advances at the confirmed upward boundaries", () => {
    expect(getWorkflowActivePhase(0, "import", 0.03)).toBe("import");
    expect(getWorkflowActivePhase(0.25, "import", 0.03)).toBe("declare");
    expect(getWorkflowActivePhase(0.53, "declare", 0.03)).toBe("compare");
    expect(getWorkflowActivePhase(0.78, "compare", 0.03)).toBe("handoff");
  });

  test("holds the current phase inside the hysteresis bands on reverse scroll", () => {
    expect(getWorkflowActivePhase(0.24, "declare", 0.03)).toBe("declare");
    expect(getWorkflowActivePhase(0.48, "compare", 0.03)).toBe("compare");
    expect(getWorkflowActivePhase(0.73, "handoff", 0.03)).toBe("handoff");
  });

  test("reverts only after dropping below the confirmed downward thresholds", () => {
    expect(getWorkflowActivePhase(0.21, "declare", 0.03)).toBe("import");
    expect(getWorkflowActivePhase(0.46, "compare", 0.03)).toBe("declare");
    expect(getWorkflowActivePhase(0.71, "handoff", 0.03)).toBe("compare");
  });
});
