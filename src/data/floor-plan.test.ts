import { describe, expect, test } from "vitest";
import {
  FLOOR_PLAN_COLUMN_POINTS,
  FLOOR_PLAN_CORE,
  FLOOR_PLAN_DIMENSIONS,
  FLOOR_PLAN_FOOTPRINT,
  FLOOR_PLAN_LABELS,
  FLOOR_PLAN_LOAD_PATHS,
  FLOOR_PLAN_OPTIMIZATION_MOVES,
  FLOOR_PLAN_SEGMENTS
} from "./floor-plan";

describe("floor-plan data", () => {
  test("contains the required room labels for the hero drawing", () => {
    expect(FLOOR_PLAN_LABELS.map((label) => label.text)).toEqual(
      expect.arrayContaining([
        "FOYER",
        "LIVING",
        "KITCHEN",
        "BED 1",
        "BED 2",
        "BATH",
        "STAIR"
      ])
    );
  });

  test("contains enough authored line segments to read as a real floor plan", () => {
    expect(FLOOR_PLAN_SEGMENTS.length).toBeGreaterThanOrEqual(18);
    expect(FLOOR_PLAN_DIMENSIONS.length).toBeGreaterThanOrEqual(6);
    expect(FLOOR_PLAN_DIMENSIONS.map((dimension) => dimension.label)).toEqual(
      expect.arrayContaining(["24'-0\"", "12'-6\"", "18'-0\"", "10'-0\""])
    );
  });

  test("includes the structural overlay data needed for later 3d hero phases", () => {
    expect(FLOOR_PLAN_FOOTPRINT.length).toBeGreaterThanOrEqual(5);
    expect(FLOOR_PLAN_CORE.length).toBeGreaterThanOrEqual(5);
    expect(FLOOR_PLAN_COLUMN_POINTS.length).toBeGreaterThanOrEqual(10);
    expect(FLOOR_PLAN_OPTIMIZATION_MOVES.length).toBeGreaterThanOrEqual(3);
    expect(FLOOR_PLAN_LOAD_PATHS.length).toBeGreaterThanOrEqual(3);
  });
});
