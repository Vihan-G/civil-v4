import { describe, expect, test } from "vitest";
import {
  HERO_BODY,
  HERO_METRICS,
  HERO_TITLE,
  HOW_IT_WORKS_BODY,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_TITLE
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
      "From massing to member schedule, without the two week loop."
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
});
