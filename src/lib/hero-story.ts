export const HERO_PIN_SPAN_VH = 600;

export const HERO_PHASES = [
  { key: "drawing", start: 0, end: 0.25 },
  { key: "lift", start: 0.25, end: 0.5 },
  { key: "systems", start: 0.5, end: 0.75 },
  { key: "hologram", start: 0.75, end: 1 }
] as const;

export type HeroPhase = (typeof HERO_PHASES)[number]["key"];
export type HeroPhaseRange = (typeof HERO_PHASES)[number];

export type HeroSceneState = {
  phase: HeroPhase;
  cardStepIndex: number;
  cameraPitchDeg: number;
  cameraYawDeg: number;
  cameraRadius: number;
  cameraZoom: number;
  lineReveal: number;
  lineOpacity: number;
  roomLabelOpacity: number;
  dimensionOpacity: number;
  wallLift: number;
  wallOpacity: number;
  wallWireOpacity: number;
  gridOpacity: number;
  columnReveal: number;
  slabReveal: number;
  loadPathReveal: number;
  optimizationProgress: number;
  hologramGlow: number;
  haloOpacity: number;
  bloomIntensity: number;
  chromaticAberration: number;
  particleOpacity: number;
  particleDrift: number;
  modelRotation: number;
};

export type HeroOverlayState = {
  chapterOpacity: number;
  chapterTranslateY: number;
  chapterSubLabelOpacity: number;
  chapterSubLabelTranslateY: number;
  headlineOpacity: number;
  headlineTranslateY: number;
  bodyOpacity: number;
  bodyTranslateY: number;
  ctaOpacity: number;
  ctaTranslateY: number;
  panelOpacity: number;
  panelTranslateY: number;
  panelStepIndex: number;
  scrollIndicatorOpacity: number;
};

export const HERO_LINE_REVEAL_KEYFRAMES = [
  [0, 0],
  [0.06, 0.4],
  [0.15, 0.7],
  [0.25, 1],
  [1, 1]
] as const;

export function clampUnit(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function getHeroPhase(progress: number): HeroPhase {
  const clamped = clampUnit(progress);

  if (clamped < HERO_PHASES[1].start) {
    return "drawing";
  }

  if (clamped < HERO_PHASES[2].start) {
    return "lift";
  }

  if (clamped < HERO_PHASES[3].start) {
    return "systems";
  }

  return "hologram";
}

export function getPhaseProgress(progress: number, phase: HeroPhaseRange) {
  return clampUnit((clampUnit(progress) - phase.start) / (phase.end - phase.start));
}

export function getHeroSceneState(progress: number): HeroSceneState {
  const clamped = clampUnit(progress);
  const phase = getHeroPhase(clamped);
  const liftProgress =
    phase === "drawing"
      ? 0
      : phase === "lift"
        ? getPhaseProgress(clamped, HERO_PHASES[1])
        : 1;
  const systemsProgress =
    phase === "systems"
      ? getPhaseProgress(clamped, HERO_PHASES[2])
      : phase === "hologram"
        ? 1
        : 0;
  const hologramProgress = phase === "hologram" ? getPhaseProgress(clamped, HERO_PHASES[3]) : 0;

  const liftEase = easeInOutCubic(liftProgress);
  const systemsEase = easeInOutCubic(systemsProgress);
  const hologramEase = easeInOutCubic(hologramProgress);

  return {
    phase,
    cardStepIndex: phase === "drawing" ? 0 : phase === "lift" ? 1 : phase === "systems" ? 2 : 3,
    cameraPitchDeg: phase === "drawing" ? 90 : lerp(90, 55, liftEase),
    cameraYawDeg:
      phase === "drawing"
        ? 0
        : phase === "lift"
          ? lerp(0, 35, liftEase)
          : phase === "systems"
            ? lerp(35, 55, systemsEase)
            : lerp(55, 62, hologramEase),
    cameraRadius:
      phase === "drawing"
        ? 32
        : phase === "lift"
          ? lerp(32, 30, liftEase)
          : phase === "systems"
            ? lerp(30, 28, systemsEase)
            : lerp(28, 26.5, hologramEase),
    cameraZoom:
      phase === "drawing"
        ? 1
        : phase === "lift"
          ? lerp(1, 0.86, liftEase)
          : phase === "systems"
            ? lerp(0.86, 0.8, systemsEase)
            : lerp(0.8, 0.75, hologramEase),
    lineReveal: getHeroLineRevealProgress(clamped),
    lineOpacity:
      phase === "drawing"
        ? 1
        : phase === "lift"
          ? lerp(1, 0.62, liftEase)
          : phase === "systems"
            ? lerp(0.62, 0.4, systemsEase)
            : lerp(0.4, 0.28, hologramEase),
    roomLabelOpacity:
      phase === "drawing"
        ? getTimedOverlayOpacity(clamped, 0.12, 0.2)
        : phase === "lift"
          ? lerp(1, 0.1, liftEase)
          : 0,
    dimensionOpacity:
      phase === "drawing"
        ? getTimedOverlayOpacity(clamped, 0.18, 0.24)
        : phase === "lift"
          ? lerp(1, 0.08, liftEase)
          : 0,
    wallLift: liftEase,
    wallOpacity:
      phase === "drawing"
        ? 0
        : phase === "lift"
          ? 0.15 * liftEase
          : phase === "systems"
            ? lerp(0.15, 0.18, systemsEase)
            : lerp(0.18, 0.22, hologramEase),
    wallWireOpacity:
      phase === "drawing"
        ? 0
        : phase === "lift"
          ? 0.36 * liftEase
          : phase === "systems"
            ? lerp(0.36, 0.48, systemsEase)
            : lerp(0.48, 0.58, hologramEase),
    gridOpacity:
      phase === "drawing"
        ? 0
        : phase === "lift"
          ? 0.9 * clampUnit((liftProgress - 0.12) / 0.88)
          : phase === "systems"
            ? lerp(0.9, 0.96, systemsEase)
            : 1,
    columnReveal: clampUnit((systemsProgress - 0.05) / 0.22),
    slabReveal: clampUnit((systemsProgress - 0.2) / 0.22),
    loadPathReveal: clampUnit((systemsProgress - 0.42) / 0.26),
    optimizationProgress: clampUnit((systemsProgress - 0.36) / 0.32),
    hologramGlow: hologramEase,
    haloOpacity: 0.5 * hologramEase,
    bloomIntensity: 0.6 * hologramEase,
    chromaticAberration: 0.0008 * hologramEase,
    particleOpacity: 0.5 * hologramEase,
    particleDrift: hologramEase,
    modelRotation: 0.35 * hologramEase
  };
}

export function getHeroLineRevealProgress(progress: number) {
  return interpolateKeyframes(clampUnit(progress), HERO_LINE_REVEAL_KEYFRAMES);
}

export function getHeroOverlayState(progress: number, reducedMotion = false): HeroOverlayState {
  if (reducedMotion) {
    return {
      bodyOpacity: 1,
      bodyTranslateY: 0,
      chapterOpacity: 1,
      chapterSubLabelOpacity: 1,
      chapterSubLabelTranslateY: 0,
      chapterTranslateY: 0,
      ctaOpacity: 1,
      ctaTranslateY: 0,
      headlineOpacity: 1,
      headlineTranslateY: 0,
      panelOpacity: 1,
      panelStepIndex: 3,
      panelTranslateY: 0,
      scrollIndicatorOpacity: 0
    };
  }

  const clamped = clampUnit(progress);
  const dissolve = 1 - clampUnit((clamped - 0.95) / 0.05);
  const chapterOpacity = getTimedOverlayOpacity(clamped, 0.06, 0.12, dissolve);
  const chapterSubLabelOpacity = getTimedOverlayOpacity(clamped, 0.1, 0.16, dissolve);
  const headlineOpacity = getTimedOverlayOpacity(clamped, 0.18, 0.28, dissolve);
  const bodyOpacity = getTimedOverlayOpacity(clamped, 0.28, 0.38, dissolve);
  const ctaOpacity = getTimedOverlayOpacity(clamped, 0.38, 0.48, dissolve);
  const panelOpacity = getTimedOverlayOpacity(clamped, 0.48, 0.58, dissolve);

  return {
    bodyOpacity,
    bodyTranslateY: getTranslateY(bodyOpacity, 16),
    chapterOpacity,
    chapterSubLabelOpacity,
    chapterSubLabelTranslateY: getTranslateY(chapterSubLabelOpacity, 8),
    chapterTranslateY: getTranslateY(chapterOpacity, 8),
    ctaOpacity,
    ctaTranslateY: getTranslateY(ctaOpacity, 20),
    headlineOpacity,
    headlineTranslateY: getTranslateY(headlineOpacity, 24),
    panelOpacity,
    panelStepIndex:
      clamped < 0.58 ? 0 : clamped < 0.64 ? 1 : clamped < 0.7 ? 2 : 3,
    panelTranslateY: getTranslateY(panelOpacity, 20),
    scrollIndicatorOpacity:
      clamped < 0.12 ? 1 : 1 - clampUnit((clamped - 0.12) / 0.06)
  };
}

function easeInOutCubic(value: number) {
  const clamped = clampUnit(value);
  return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - ((-2 * clamped + 2) ** 3) / 2;
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * clampUnit(progress);
}

function getTimedOverlayOpacity(progress: number, enterStart: number, enterEnd: number, dissolve = 1) {
  return clampUnit((progress - enterStart) / (enterEnd - enterStart)) * dissolve;
}

function getTranslateY(opacity: number, distance: number) {
  return lerp(distance, 0, opacity);
}

function interpolateKeyframes(
  progress: number,
  keyframes: readonly (readonly [number, number])[]
) {
  if (keyframes.length === 0) {
    return 0;
  }

  if (progress <= keyframes[0][0]) {
    return keyframes[0][1];
  }

  for (let index = 1; index < keyframes.length; index += 1) {
    const previous = keyframes[index - 1];
    const current = keyframes[index];

    if (progress <= current[0]) {
      const localProgress = clampUnit((progress - previous[0]) / (current[0] - previous[0]));
      return lerp(previous[1], current[1], localProgress);
    }
  }

  return keyframes.at(-1)?.[1] ?? 0;
}
