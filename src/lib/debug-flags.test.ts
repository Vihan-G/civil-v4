import { describe, expect, test } from "vitest";
import {
  DEFAULT_DEBUG_FLAGS,
  parseDebugFlags,
  serializeDebugFlags
} from "./debug-flags";

describe("debug flag parsing", () => {
  test("defaults to the current production behavior", () => {
    expect(parseDebugFlags("")).toEqual(DEFAULT_DEBUG_FLAGS);
    expect(parseDebugFlags(null)).toEqual(DEFAULT_DEBUG_FLAGS);
  });

  test("parses the comma-separated debug flag list", () => {
    expect(parseDebugFlags("no-rimlight,no-grid,fast-transitions")).toEqual({
      fastTransitions: true,
      noGrid: true,
      noLenis: false,
      noRimlight: true,
      noTileMotion: false
    });
  });

  test("can parse a full query string", () => {
    expect(parseDebugFlags("?debug=no-lenis,no-tile-motion")).toEqual({
      fastTransitions: false,
      noGrid: false,
      noLenis: true,
      noRimlight: false,
      noTileMotion: true
    });
  });

  test("serializes active flags back into the shared query format", () => {
    expect(
      serializeDebugFlags({
        fastTransitions: true,
        noGrid: false,
        noLenis: true,
        noRimlight: true,
        noTileMotion: false
      })
    ).toBe("no-rimlight,no-lenis,fast-transitions");
  });
});
