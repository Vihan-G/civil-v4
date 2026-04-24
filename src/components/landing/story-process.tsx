"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HOW_IT_WORKS_BODY,
  HOW_IT_WORKS_TITLE,
  WORKFLOW_PHASE_COPY
} from "@/lib/landing-copy";
import { useDebugFlags } from "@/hooks/use-debug-flags";
import {
  getWorkflowActivePhase,
  type WorkflowPhase
} from "@/lib/landing-story";

// ============================================================================
// OPTIXLOG-PATTERN STACK
// ============================================================================
// OptixLog renders 9 layers stacked in fixed DOM order:
//   blank → content-1 → blank → content-2 → blank → content-3 → blank → content-4 → top-cap
// Every layer is ALWAYS rendered at its fixed position. The active phase's
// content layer animates to full opacity; non-active content layers dim down
// so the blank silhouette behind them dominates visually.
// ============================================================================

// Tile natural dimensions: 1400 × 1118 on our existing product PNGs
const TILE_WIDTH = 480;
const TILE_HEIGHT = 383; // 480 / (1400/1118)

// Offset between adjacent layers in the stack (each layer sits this many px BELOW the one above)
const LAYER_OFFSET = 38;

// Top cap dimensions
const CAP_WIDTH = 420;
const CAP_HEIGHT = 316; // 420 / (1190/896)
const CAP_OFFSET = -220;

// Total layers: 4 blanks + 4 content tiles = 8 stack layers, plus 1 top cap
const STACK_LAYER_COUNT = 8;

// Container padding
const STACK_HEADROOM = 140;
const STACK_TOP_INSET = STACK_HEADROOM;
const STACK_CONTAINER_HEIGHT =
  STACK_HEADROOM * 2 + TILE_HEIGHT + LAYER_OFFSET * (STACK_LAYER_COUNT - 1);

// ============================================================================
// PHASE CONFIG
// ============================================================================
const PHASE_ORDER: WorkflowPhase[] = ["import", "declare", "compare", "handoff"];
const ACTIVE_STEP_KEY: WorkflowPhase = "import";

const PHASE_TILE_SRC: Record<WorkflowPhase, { src: string; alt: string }> = {
  import: { src: "/how-it-works/tile-01-import.png", alt: "" },
  declare: { src: "/how-it-works/tile-02-declare.png", alt: "" },
  compare: { src: "/how-it-works/tile-03-compare.png", alt: "" },
  handoff: { src: "/how-it-works/tile-04-handoff.png", alt: "" }
};

// Layer definitions — ordered TOP to BOTTOM of the visual stack.
// Each content layer sits directly BELOW its paired blank spacer.
type StackLayerDef =
  | { kind: "blank"; id: string }
  | { kind: "content"; id: string; phase: WorkflowPhase; src: string };

const STACK_LAYERS: StackLayerDef[] = [
  { kind: "blank", id: "blank-1" },
  { kind: "content", id: "import", phase: "import", src: "/how-it-works/tile-01-import.png" },
  { kind: "blank", id: "blank-2" },
  { kind: "content", id: "declare", phase: "declare", src: "/how-it-works/tile-02-declare.png" },
  { kind: "blank", id: "blank-3" },
  { kind: "content", id: "compare", phase: "compare", src: "/how-it-works/tile-03-compare.png" },
  { kind: "blank", id: "blank-4" },
  { kind: "content", id: "handoff", phase: "handoff", src: "/how-it-works/tile-04-handoff.png" }
];

const TOP_CAP = {
  alt: "",
  height: 896,
  src: "/how-it-works/top-cap.png",
  width: 1190
};

const WORKFLOW_LABELS = [
  { key: "import", label: "IMPORT", meta: "≈ 30 SECONDS" },
  { key: "declare", label: "DECLARE", meta: "≈ 2 MINUTES" },
  { key: "compare", label: "COMPARE", meta: "≈ 8 MINUTES" },
  { key: "handoff", label: "HANDOFF", meta: "1 CLICK" }
] as const;

// ============================================================================
// COMPONENT
// ============================================================================
export function StoryProcess() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activePhaseRef = useRef<WorkflowPhase>(ACTIVE_STEP_KEY);
  const [activePhase, setActivePhase] = useState<WorkflowPhase>(ACTIVE_STEP_KEY);
  const [canPin, setCanPin] = useState(false);
  const debugFlags = useDebugFlags();

  const sectionTransitionDuration = debugFlags.fastTransitions ? 0.2 : 0.52;
  const indicatorExitDuration = debugFlags.fastTransitions ? 0.2 : 0.24;
  const labelTransitionMs = debugFlags.fastTransitions ? 200 : 280;
  const lineDrawDuration = debugFlags.fastTransitions ? 0.14 : 0.32;
  const dotDelay = debugFlags.fastTransitions ? 0.14 : 0.32;
  const dotDuration = debugFlags.fastTransitions ? 0.06 : 0.2;

  const currentStep = WORKFLOW_PHASE_COPY[activePhase];

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanPin(desktop.matches && !reduceMotion.matches);
    update();
    desktop.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!scrollRef.current || !pinRef.current || !canPin) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      ScrollTrigger.create({
        anticipatePin: 1,
        end: "+=300%",
        id: "workflow-stack",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextPhase = getWorkflowActivePhase(self.progress, activePhaseRef.current, 0.03);
          if (nextPhase !== activePhaseRef.current) {
            activePhaseRef.current = nextPhase;
            setActivePhase(nextPhase);
          }
        },
        pin: pinRef.current,
        scrub: false,
        start: "top top",
        trigger: scrollRef.current
      });
    }, scrollRef);
    return () => context.revert();
  }, [canPin]);

  return (
    <section className="bg-bg text-fg" id="how-it-works">
      <div className="mx-auto max-w-[1280px] px-5 pb-[32px] pt-12 sm:px-6 sm:pt-16 lg:px-6 lg:pb-[32px] lg:pt-12">
        <div className="lg:grid lg:grid-cols-[55%_45%] lg:items-center lg:gap-12">
          <div>
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-fg-muted">
              CHAPTER 02 / 05 — HOW IT WORKS
            </p>
            <h2 className="mt-6 max-w-[11ch] font-headline text-[clamp(40px,4.5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-fg">
              {HOW_IT_WORKS_TITLE}
            </h2>
            <p className="mt-6 max-w-[680px] font-body text-[18px] leading-[1.55] text-fg-muted">
              {HOW_IT_WORKS_BODY}
            </p>
          </div>

          <motion.aside
            className="mt-12 lg:ml-12 lg:mt-0 lg:justify-self-start"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ amount: 0.2, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-[480px] rounded-[var(--radius-lg)] border border-border bg-bg-elev p-8">
              <div>
                <p className="font-mono text-[14px] font-medium uppercase tracking-[0.12em] text-fg-muted">
                  MANUAL vs CIVIL AGENT
                </p>

                <div className="mt-8 space-y-8">
                  <div>
                    <div className="mb-3 flex items-end justify-between gap-4">
                      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                        MANUAL TAKEOFF
                      </p>
                      <p className="font-body text-[28px] font-medium leading-none text-fg">
                        40+ hrs
                      </p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/6">
                      <div className="h-full w-full rounded-full bg-white/35" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-end justify-between gap-4">
                      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                        CIVIL AGENT
                      </p>
                      <p className="font-body text-[28px] font-medium leading-none text-fg">
                        &lt; 45 min
                      </p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/6">
                      <div className="h-full rounded-full bg-fg" style={{ width: "2%" }} />
                    </div>
                  </div>
                </div>

                <p className="mt-8 max-w-[36ch] font-body text-[13px] leading-[1.5] text-fg-muted">
                  Every scheme produced by Civil Agent cites its ACI 318 and ASCE 7
                  clauses. Auditable, by default.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <div className="relative" ref={scrollRef}>
        <div className="relative overflow-hidden bg-bg lg:h-screen" ref={pinRef}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-6 lg:grid lg:h-screen lg:grid-cols-[22%_48%_30%] lg:px-8 lg:py-0 xl:px-10">
            {/* LEFT RAIL */}
            <div className="hidden lg:flex lg:h-full lg:items-center lg:pl-20 xl:pl-32">
              <div className="flex flex-col gap-16">
                {WORKFLOW_LABELS.map((item) => {
                  const isActive = item.key === activePhase;
                  return (
                    <div className="min-w-[12rem]" key={item.key}>
                      <div className="flex items-center gap-4">
                        <span
                          className={[
                            "font-headline text-[22px] tracking-[-0.01em] transition-[color,opacity] ease-[var(--ease-out)]",
                            isActive
                              ? "font-semibold text-fg opacity-100"
                              : "font-medium text-fg-muted opacity-45"
                          ].join(" ")}
                          style={{ transitionDuration: `${labelTransitionMs}ms` }}
                        >
                          {item.label}
                        </span>

                        <AnimatePresence initial={false} mode="sync">
                          {isActive ? (
                            <motion.span
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-0"
                              exit={{
                                opacity: 0,
                                transition: { duration: indicatorExitDuration, ease: [0.16, 1, 0.3, 1] }
                              }}
                              key={`${item.key}-indicator`}
                            >
                              <motion.span
                                animate={{
                                  scaleX: 1,
                                  transition: { duration: lineDrawDuration, ease: [0.16, 1, 0.3, 1] }
                                }}
                                className="workflow-label-line h-px w-12 origin-left bg-white/35"
                                initial={{ scaleX: 0 }}
                              />
                              <motion.span
                                animate={{
                                  opacity: 1,
                                  transition: { delay: dotDelay, duration: dotDuration, ease: [0.16, 1, 0.3, 1] }
                                }}
                                className="workflow-label-dot ml-0 size-1.5 rounded-full bg-fg"
                                initial={{ opacity: 0 }}
                              />
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </div>

                      <p
                        className={[
                          "mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity ease-[var(--ease-out)]",
                          isActive ? "text-fg-muted opacity-85" : "text-fg-muted opacity-30"
                        ].join(" ")}
                        style={{ transitionDuration: `${labelTransitionMs}ms` }}
                      >
                        {item.meta}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CENTER: 9-layer stack (8 stack layers + 1 top cap). OptixLog pattern. */}
            <div className="relative lg:col-start-2 lg:mx-auto lg:w-full lg:max-w-[640px]">
              {debugFlags.noGrid ? null : (
                <div
                  aria-hidden="true"
                  className="workflow-stack-grid pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  style={{ height: "800px", width: "1100px" }}
                />
              )}

              <div
                className="relative mx-auto"
                data-workflow-stack="true"
                style={{
                  height: `${STACK_CONTAINER_HEIGHT}px`,
                  width: `${TILE_WIDTH}px`,
                  maxWidth: "100%"
                }}
              >
                {/* EIGHT STACK LAYERS in fixed DOM order: blank, content, blank, content, ... */}
                {STACK_LAYERS.map((layer, index) => {
                  const topPx = STACK_TOP_INSET + index * LAYER_OFFSET;
                  const zIndex = 10 + index;

                  if (layer.kind === "blank") {
                    // Dim empty silhouette — a CSS rounded rectangle
                    return (
                      <div
                        aria-hidden="true"
                        className="absolute left-1/2 -translate-x-1/2"
                        key={layer.id}
                        style={{
                          top: `${topPx}px`,
                          width: `${TILE_WIDTH}px`,
                          height: `${TILE_HEIGHT}px`,
                          zIndex
                        }}
                      >
                        <div
                          className="h-full w-full rounded-[28px] border border-white/6"
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 14%), linear-gradient(to bottom, #131317 0%, #0B0B0E 100%)",
                            boxShadow:
                              "0 20px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.04)"
                          }}
                        />
                      </div>
                    );
                  }

                  // Content layer: fade between dim (non-active phase) and bright (active phase)
                  const isActive = layer.phase === activePhase;

                  return (
                    <motion.div
                      aria-hidden="true"
                      animate={{ opacity: isActive ? 1 : 0.08 }}
                      className="absolute left-1/2 -translate-x-1/2"
                      initial={false}
                      key={layer.id}
                      style={{
                        top: `${topPx}px`,
                        width: `${TILE_WIDTH}px`,
                        height: `${TILE_HEIGHT}px`,
                        zIndex
                      }}
                      transition={{
                        duration: sectionTransitionDuration,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      {/* Rim-light glow only when this content layer is active */}
                      {!debugFlags.noRimlight && isActive ? (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: "150%",
                            height: "150%",
                            background:
                              "radial-gradient(ellipse, rgba(255, 245, 230, 0.28) 0%, transparent 55%)",
                            filter: "blur(10px)",
                            zIndex: -1
                          }}
                        />
                      ) : null}

                      <Image
                        alt=""
                        className="h-full w-full select-none object-contain"
                        draggable={false}
                        height={1118}
                        priority={index <= 1}
                        src={layer.src}
                        width={1400}
                      />
                    </motion.div>
                  );
                })}

                {/* TOP CAP: CivilAgent branded logo, always on top */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    top: `${STACK_TOP_INSET + CAP_OFFSET}px`,
                    width: `${CAP_WIDTH}px`,
                    height: `${CAP_HEIGHT}px`,
                    zIndex: 100
                  }}
                >
                  <Image
                    alt={TOP_CAP.alt}
                    className="h-full w-full select-none object-contain"
                    draggable={false}
                    height={TOP_CAP.height}
                    priority
                    src={TOP_CAP.src}
                    width={TOP_CAP.width}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: copy */}
            <div className="hidden lg:flex lg:h-full lg:items-center lg:justify-end lg:pr-16 xl:pr-24">
              <div className="min-h-[13rem] w-full max-w-[380px]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                      y: -8
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    key={activePhase}
                    transition={{ delay: 0.08, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                      {currentStep.eyebrow}
                    </p>
                    <p className="mt-4 font-body text-[18px] font-normal leading-[1.55] text-fg-muted">
                      {currentStep.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
