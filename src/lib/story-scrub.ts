import { clampUnit } from "./landing-story";

const ACTIVATION_TOLERANCE = 4;

export type StoryCaptureMode = "scrub" | "scroll";

type StorySectionActivation = {
  rectTop: number;
  rectBottom: number;
  stickyTop: number;
  viewportHeight: number;
};

type StoryScrubDecision = {
  capture: boolean;
  nextProgress: number;
};

type StoryScrubInput = {
  deltaY: number;
  progress: number;
  scrubDistance: number;
};

type StoryCaptureInput = {
  captureMode: StoryCaptureMode;
  prefersReducedMotion: boolean;
  scrubMinWidth: number;
  viewportWidth: number;
};

type StoryScrollProgressInput = {
  elementHeight: number;
  rectTop: number;
  stickyTop: number;
  viewportHeight: number;
};

export function isStorySectionActive({
  rectTop,
  rectBottom,
  stickyTop,
  viewportHeight
}: StorySectionActivation) {
  return (
    rectTop <= stickyTop + ACTIVATION_TOLERANCE &&
    rectBottom >= viewportHeight - ACTIVATION_TOLERANCE
  );
}

export function getScrubDecision({
  deltaY,
  progress,
  scrubDistance
}: StoryScrubInput): StoryScrubDecision {
  const clampedProgress = clampUnit(progress);

  if (deltaY === 0 || scrubDistance <= 0) {
    return {
      capture: false,
      nextProgress: clampedProgress
    };
  }

  const movingForward = deltaY > 0;
  const movingBackward = deltaY < 0;

  if ((movingForward && clampedProgress >= 1) || (movingBackward && clampedProgress <= 0)) {
    return {
      capture: false,
      nextProgress: clampedProgress
    };
  }

  return {
    capture: true,
    nextProgress: clampUnit(clampedProgress + deltaY / scrubDistance)
  };
}

export function shouldCaptureStoryWheel({
  captureMode,
  prefersReducedMotion,
  scrubMinWidth,
  viewportWidth
}: StoryCaptureInput) {
  return captureMode === "scrub" && !prefersReducedMotion && viewportWidth >= scrubMinWidth;
}

export function getStoryScrollProgress({
  elementHeight,
  rectTop,
  stickyTop,
  viewportHeight
}: StoryScrollProgressInput) {
  const scrollSpan = Math.max(elementHeight - (viewportHeight - stickyTop), 1);
  return clampUnit((stickyTop - rectTop) / scrollSpan);
}
