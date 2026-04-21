import { describe, expect, test } from "vitest";
import {
  HERO_BODY,
  HERO_METRICS,
  HERO_TITLE,
  HOW_IT_WORKS_BODY,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_TITLE,
  WORKFLOW_PHASE_COPY
} from "./landing-copy";

describe("landing copy", () => {
  test("keeps the original hero headline and body", () => {
    expect(HERO_TITLE).toBe("Preliminary structural design, in minutes.");
    expect(HERO_BODY).toBe(
      "Civil Agent produces auditable structural schemes from architectural massing. Constraint driven. Physics based. Ready for a consultant handoff before the next design review."
    );
  });

  test("keeps the original hero metrics", () => {
    expect(HERO_METRICS).toEqual([
      ["< 10 min", "Preliminary scheme"],
      ["ACI 318", "Code checks"],
      ["RC / Steel", "Multi material"]
    ]);
  });

  test("keeps the original how-it-works heading and four-step flow", () => {
    expect(HOW_IT_WORKS_TITLE).toBe(
      "From massing to member schedule, in one loop."
    );
    expect(HOW_IT_WORKS_BODY).toBe(
      "Civil Agent does not generate a building. It reasons about the one already on the table, producing structural schemes that teams can trust, interrogate, and iterate on."
    );
    expect(HOW_IT_WORKS_STEPS).toHaveLength(4);
    expect(HOW_IT_WORKS_STEPS.map((step) => step.title)).toEqual([
      "Import the architectural massing.",
      "Declare the constraints.",
      "Compare schemes side by side.",
      "Hand off, not hand over."
    ]);
  });

  test("defines a separate workflow copy map for import/declare/compare/handoff", () => {
    expect(WORKFLOW_PHASE_COPY.import).toEqual({
      body: "Bring in floor plates, cores, and voids from Rhino, Revit, or IFC. Civil Agent parses the geometry into a Building Graph of bays, spans, and tributary areas.",
      eyebrow: "IMPORT"
    });
    expect(WORKFLOW_PHASE_COPY.declare).toEqual({
      body: "Material system, target floor-to-floor, seismic zone, wind zone, and code jurisdiction become solver constraints before member sizing starts.",
      eyebrow: "DECLARE"
    });
    expect(WORKFLOW_PHASE_COPY.compare).toEqual({
      body: "Physics based iteration searches grid spacing, lateral system, and structural depth. Every scheme carries confidence against code and cost.",
      eyebrow: "COMPARE"
    });
    expect(WORKFLOW_PHASE_COPY.handoff).toEqual({
      body: "Export a structured report with member schedules, load tables, design notes, and a live link back to the graph.",
      eyebrow: "HANDOFF"
    });
  });
});
