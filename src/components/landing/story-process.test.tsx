import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("StoryProcess", () => {
  test("renders the new chapter heading and standalone pinned runway", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("CHAPTER 02 / 05 — HOW IT WORKS");
    expect(source).toContain("HOW_IT_WORKS_TITLE");
    expect(source).toContain("HOW_IT_WORKS_BODY");
    expect(source).toContain("ref={scrollRef}");
    expect(source).toContain("ref={pinRef}");
    expect(source).toContain("lg:h-screen");
    expect(source).toContain('lg:grid-cols-[55%_45%]');
    expect(source).toContain("MANUAL vs CIVIL AGENT");
    expect(source).toContain("40+ hrs");
    expect(source).toContain("&lt; 45 min");
    expect(source).toContain("Auditable, by default.");
  });

  test("keeps the resting stack assets and fixed headroom container in source", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("/how-it-works/top-cap.png");
    expect(source).toContain("/how-it-works/tile-01-import.png");
    expect(source).toContain("/how-it-works/tile-04-handoff.png");
    expect(source).toContain("const STACK_HEADROOM = 80;");
    expect(source).toContain("const STACK_RESTING_OFFSET = 18;");
    expect(source).toContain("const STACK_CAP_OFFSET = -180;");
    expect(source).toContain("style={{ height: `${STACK_CONTAINER_HEIGHT}px` }}");
  });

  test("defines the desktop workflow label rail with IMPORT hardcoded active for step 5", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain('label: "IMPORT"');
    expect(source).toContain('label: "DECLARE"');
    expect(source).toContain('label: "COMPARE"');
    expect(source).toContain('label: "HANDOFF"');
    expect(source).toContain('meta: "≈ 30 SECONDS"');
    expect(source).toContain('meta: "≈ 2 MINUTES"');
    expect(source).toContain('meta: "≈ 8 MINUTES"');
    expect(source).toContain('meta: "1 CLICK"');
    expect(source).toContain('const ACTIVE_STEP_KEY = "import";');
    expect(source).toContain("workflow-label-line");
    expect(source).toContain("workflow-label-dot");
  });

  test("scopes the grid behind the stack and registers a real pin with debug progress", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("workflow-stack-grid");
    expect(source).not.toContain("story-surface absolute inset-0");
    expect(source).toContain("gsap.registerPlugin(ScrollTrigger)");
    expect(source).toContain('id: "workflow-stack"');
    expect(source).toContain('start: "top top"');
    expect(source).toContain('end: "+=300%"');
    expect(source).toContain("pin: pinRef.current");
    expect(source).not.toContain("setDebugProgress(self.progress)");
    expect(source).not.toContain("DEBUG");
    expect(source).not.toContain("progress:");
  });

  test("drives the label rail from activePhase without replaying the initial import line draw", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("const [activePhase, setActivePhase] = useState");
    expect(source).toContain("const activePhaseRef = useRef");
    expect(source).toContain("getWorkflowActivePhase");
    expect(source).toContain("if (nextPhase !== activePhaseRef.current)");
    expect(source).toContain("AnimatePresence initial={false}");
    expect(source).toContain("mode=\"sync\"");
    expect(source).toContain("opacity: 0,");
    expect(source).toContain("const indicatorExitDuration =");
    expect(source).toContain("const labelTransitionMs =");
    expect(source).toContain("const lineDrawDuration =");
    expect(source).toContain("const dotDelay =");
    expect(source).toContain("const dotDuration =");
  });

  test("drives the tile stack from activePhase with a static first frame and conditional rim light", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("const isCap = layer.key === \"top-cap\";");
    expect(source).toContain("const isActiveTile = !isCap && layer.key === activePhase;");
    expect(source).toContain("const liftOffset = isCap ? 0 : isActiveTile ? 140 : 0;");
    expect(source).toContain("const opacity = isCap ? 1 : isActiveTile ? 1 : 0.55;");
    expect(source).not.toContain("willChangeRef");
    expect(source).not.toContain("setStackWillChange(true);");
    expect(source).not.toContain("setStackWillChange(false);");
    expect(source).not.toContain("willChange: stackWillChange");
    expect(source).toContain("const debugFlags = useDebugFlags();");
    expect(source).toContain("debugFlags.noTileMotion");
    expect(source).toContain("debugFlags.noGrid");
    expect(source).toContain("debugFlags.noRimlight");
    expect(source).toContain("debugFlags.fastTransitions");
    expect(source).not.toContain("<PerfDebugPanel />");
    expect(source).toContain("<AnimatePresence initial={false}>");
    expect(source).toContain("key={`${layer.key}-rim-light`}");
    expect(source).toContain("radial-gradient(ellipse, rgba(180, 210, 255, 0.28) 0%, transparent 55%)");
    expect(source).toContain('filter: "blur(8px)"');
    expect(source).toContain("const sectionTransitionDuration =");
    expect(source).toContain("debugFlags.fastTransitions ? 0.2 : 0.52");
    expect(source).toContain("debugFlags.fastTransitions ? 0.2 : 0.24");
    expect(source).toContain('brightness(0.4) saturate(0.3) blur(3px)');
    expect(source).toContain("const stackZIndex = isCap ? 50 : isActiveTile ? 40 : 9 + layer.zIndex;");
    expect(source).toContain("const tileMotionTransition = {");
    expect(source).toContain('className="absolute inset-0 rounded-[24px] bg-[#0E1016]"');
  });

  test("renders the right-column workflow copy block from activePhase", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("const currentStep =");
    expect(source).toContain("WORKFLOW_PHASE_COPY");
    expect(source).toContain('lg:grid-cols-[22%_48%_30%]');
    expect(source).toContain('mode="wait"');
    expect(source).toContain("initial={false}");
    expect(source).toContain("currentStep.eyebrow");
    expect(source).toContain("currentStep.body");
    expect(source).not.toContain('aria-hidden="true" className="hidden lg:block"');
  });

  test("adds more breathing room to the left rail and constrains the branded top cap to tile width", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("lg:pl-20 xl:pl-32");
    expect(source).toContain("height: 896");
    expect(source).toContain("width: 1190");
    expect(source).toContain('object-contain');
    expect(source).toContain('max-w-[640px]');
    expect(source).toContain('isCap ? "relative mx-auto w-[640px] max-w-full" : "relative w-full"');
    expect(source).toContain('lg:ml-12');
    expect(source).toContain('style={{ transform: "translateY(100px)" }}');
  });
});
