import { describe, expect, test } from "vitest";
import {
  getStoryScrollProgress,
  getScrubDecision,
  isStorySectionActive,
  shouldCaptureStoryWheel
} from "./story-scrub";

describe("isStorySectionActive", () => {
  test("activates once the section is pinned under the top bar", () => {
    expect(
      isStorySectionActive({
        rectBottom: 1600,
        rectTop: 64,
        stickyTop: 64,
        viewportHeight: 900
      })
    ).toBe(true);
  });

  test("stays inactive before the sticky region starts", () => {
    expect(
      isStorySectionActive({
        rectBottom: 1800,
        rectTop: 220,
        stickyTop: 64,
        viewportHeight: 900
      })
    ).toBe(false);
  });

  test("allows a tiny layout tolerance at the sticky threshold", () => {
    expect(
      isStorySectionActive({
        rectBottom: 913,
        rectTop: 65,
        stickyTop: 64,
        viewportHeight: 720
      })
    ).toBe(true);
  });
});

describe("getScrubDecision", () => {
  test("captures downward scroll while mid-story and advances progress", () => {
    expect(
      getScrubDecision({
        deltaY: 120,
        progress: 0.4,
        scrubDistance: 3000
      })
    ).toEqual({
      capture: true,
      nextProgress: 0.44
    });
  });

  test("releases downward scroll at the end of the story", () => {
    expect(
      getScrubDecision({
        deltaY: 120,
        progress: 1,
        scrubDistance: 3000
      })
    ).toEqual({
      capture: false,
      nextProgress: 1
    });
  });

  test("releases upward scroll at the start of the story", () => {
    expect(
      getScrubDecision({
        deltaY: -120,
        progress: 0,
        scrubDistance: 3000
      })
    ).toEqual({
      capture: false,
      nextProgress: 0
    });
  });
});

describe("shouldCaptureStoryWheel", () => {
  test("captures wheel input for scrubbed desktop sections", () => {
    expect(
      shouldCaptureStoryWheel({
        captureMode: "scrub",
        prefersReducedMotion: false,
        scrubMinWidth: 1024,
        viewportWidth: 1280
      })
    ).toBe(true);
  });

  test("does not capture wheel input for page-scroll chapters", () => {
    expect(
      shouldCaptureStoryWheel({
        captureMode: "scroll",
        prefersReducedMotion: false,
        scrubMinWidth: 1024,
        viewportWidth: 1280
      })
    ).toBe(false);
  });
});

describe("getStoryScrollProgress", () => {
  test("starts at zero when the section reaches the sticky top", () => {
    expect(
      getStoryScrollProgress({
        elementHeight: 2200,
        rectTop: 64,
        stickyTop: 64,
        viewportHeight: 1000
      })
    ).toBe(0);
  });

  test("ends at one when the section bottom reaches the viewport bottom", () => {
    expect(
      getStoryScrollProgress({
        elementHeight: 2200,
        rectTop: -1200,
        stickyTop: 64,
        viewportHeight: 1000
      })
    ).toBe(1);
  });
});
