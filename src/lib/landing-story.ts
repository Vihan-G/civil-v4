export type HeroBeat = "plan" | "frame" | "optimize" | "handoff";
export type WorkflowPhase = "import" | "declare" | "compare" | "handoff";

export type HeroKpi = {
  label: string;
  value: string;
};

export const PROCESS_PROGRESS_OPTIONS = {
  captureMode: "scrub" as const,
  scrubDistance: 3000
};

const WORKFLOW_PHASE_BASES = {
  compare: 0.5,
  declare: 0.25,
  handoff: 0.75
} as const;

const BASELINE_KPIS: HeroKpi[] = [
  { label: "Iteration speed", value: "Slow review loop" },
  { label: "Structural cost", value: "Hidden inefficiency" },
  { label: "Coordination", value: "Late-stage churn" }
];

const OPTIMIZED_KPIS: HeroKpi[] = [
  { label: "Iteration speed", value: "Faster early schemes" },
  { label: "Structural cost", value: "Lower material pressure" },
  { label: "Coordination", value: "Fewer redesign loops" }
];

export function clampUnit(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export function getSegmentProgress(progress: number, start: number, end: number) {
  if (end <= start) {
    return 1;
  }

  return clampUnit((progress - start) / (end - start));
}

export function getHeroBeat(progress: number): HeroBeat {
  const clamped = clampUnit(progress);

  if (clamped <= 0.24) {
    return "plan";
  }

  if (clamped <= 0.52) {
    return "frame";
  }

  if (clamped <= 0.84) {
    return "optimize";
  }

  return "handoff";
}

export function getHeroKpis(progress: number) {
  return getHeroBeat(progress) === "handoff" ? OPTIMIZED_KPIS : BASELINE_KPIS;
}

export function getProcessActiveIndex(progress: number, stepCount: number) {
  if (stepCount <= 1) {
    return 0;
  }

  const clamped = clampUnit(progress);
  return Math.min(stepCount - 1, Math.floor(clamped * stepCount));
}

export function getWorkflowActivePhase(
  progress: number,
  currentPhase: WorkflowPhase,
  hysteresis = 0.03
): WorkflowPhase {
  const clamped = clampUnit(progress);
  const offset = clampUnit(hysteresis);
  const declareDown = WORKFLOW_PHASE_BASES.declare - offset;
  const declareUp = WORKFLOW_PHASE_BASES.declare;
  const compareDown = WORKFLOW_PHASE_BASES.compare - offset;
  const compareUp = WORKFLOW_PHASE_BASES.compare + offset;
  const handoffDown = WORKFLOW_PHASE_BASES.handoff - offset;
  const handoffUp = WORKFLOW_PHASE_BASES.handoff + offset;

  switch (currentPhase) {
    case "import":
      return clamped >= declareUp ? "declare" : "import";

    case "declare":
      if (clamped < declareDown) {
        return "import";
      }

      return clamped >= compareUp ? "compare" : "declare";

    case "compare":
      if (clamped < compareDown) {
        return "declare";
      }

      return clamped >= handoffUp ? "handoff" : "compare";

    case "handoff":
      return clamped < handoffDown
        ? "compare"
        : "handoff";

    default:
      return currentPhase;
  }
}
