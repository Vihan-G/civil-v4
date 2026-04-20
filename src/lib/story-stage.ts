import { clampUnit, getSegmentProgress } from "./landing-story";

type ProcessCardPresentationInput = {
  distance: number;
  isActive: boolean;
};

function smoothProgress(progress: number) {
  const clamped = clampUnit(progress);
  return clamped * clamped * (3 - 2 * clamped);
}

function easedSegment(progress: number, start: number, end: number) {
  return smoothProgress(getSegmentProgress(progress, start, end));
}

export function getHeroScenePresentation(progress: number) {
  const clamped = clampUnit(progress);
  const planFade = easedSegment(clamped, 0.16, 0.28);
  const frameReveal = easedSegment(clamped, 0.2, 0.34);
  const frameFade = easedSegment(clamped, 0.52, 0.7);
  const optimizeReveal = easedSegment(clamped, 0.54, 0.66);
  const optimizeFade = easedSegment(clamped, 0.78, 0.9);
  const handoffReveal = easedSegment(clamped, 0.82, 0.94);
  const planOpacity = clampUnit(1 - planFade);
  const frameOpacity = clampUnit(frameReveal * (1 - frameFade) * (1 - handoffReveal * 0.9));
  const badColumnOpacity = clampUnit(
    easedSegment(clamped, 0.54, 0.62) * (1 - easedSegment(clamped, 0.64, 0.72)) * (1 - handoffReveal)
  );
  const goodColumnOpacity = clampUnit(
    easedSegment(clamped, 0.62, 0.74) * (1 - handoffReveal * 0.25)
  );
  const outputOpacity = handoffReveal;

  return {
    artOffsetY: -94 + Math.round(frameReveal * 10 + optimizeReveal * 12),
    badColumnOpacity,
    frameOpacity,
    frameShiftX: Math.round(frameReveal * 36),
    frameShiftY: 70 - Math.round(frameReveal * 78),
    goodColumnOpacity,
    optimizeOpacity: clampUnit(optimizeReveal * (1 - optimizeFade) * (1 - handoffReveal * 0.6)),
    outputOpacity,
    outputScale: 0.96 + outputOpacity * 0.04,
    outputTranslateY: Math.round((1 - outputOpacity) * 18),
    planDriftX: Math.round(frameReveal * 8),
    planOpacity,
    resultOpacity: 0,
    showResultPanel: false,
    showStatusPanel: false,
    statusOpacity: 0
  };
}

export function getProcessCardPresentation({
  distance,
  isActive
}: ProcessCardPresentationInput) {
  const abs = Math.abs(distance);
  const direction = distance < 0 ? -1 : 1;

  if (isActive) {
    return {
      bodyOpacity: 1,
      mode: "active" as const,
      opacity: 1,
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0
    };
  }

  if (abs > 1.02) {
    return {
      bodyOpacity: 0,
      mode: "hidden" as const,
      opacity: 0,
      rotate: direction * -0.32,
      scale: 0.95,
      translateX: abs * 14,
      translateY: direction * 120
    };
  }

  return {
    bodyOpacity: 0,
    mode: "support" as const,
    opacity: 0.12,
    rotate: direction * -0.22,
    scale: 0.976,
    translateX: 8,
    translateY: direction < 0 ? -36 : 42
  };
}
