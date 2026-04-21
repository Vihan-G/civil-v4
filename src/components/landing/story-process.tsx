"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const TILE_HEIGHT = 447;
const STACK_HEADROOM = 80;
const STACK_RESTING_OFFSET = 18;
const STACK_CAP_OFFSET = -180;
const STACK_CONTAINER_HEIGHT = TILE_HEIGHT + STACK_RESTING_OFFSET * 4 + STACK_HEADROOM;
const STACK_TOP_INSET = STACK_HEADROOM;
const ACTIVE_STEP_KEY = "import";

const STACK_LAYERS = [
  {
    alt: "",
    height: 1118,
    key: "import",
    src: "/how-it-works/tile-01-import.png",
    translateY: STACK_RESTING_OFFSET * 4,
    width: 1400,
    zIndex: 1
  },
  {
    alt: "",
    height: 1118,
    key: "declare",
    src: "/how-it-works/tile-02-declare.png",
    translateY: STACK_RESTING_OFFSET * 3,
    width: 1400,
    zIndex: 2
  },
  {
    alt: "",
    height: 1118,
    key: "compare",
    src: "/how-it-works/tile-03-compare.png",
    translateY: STACK_RESTING_OFFSET * 2,
    width: 1400,
    zIndex: 3
  },
  {
    alt: "",
    height: 1118,
    key: "handoff",
    src: "/how-it-works/tile-04-handoff.png",
    translateY: STACK_RESTING_OFFSET,
    width: 1400,
    zIndex: 4
  },
  {
    alt: "",
    height: 896,
    key: "top-cap",
    src: "/how-it-works/top-cap.png",
    translateY: STACK_CAP_OFFSET,
    width: 1190,
    zIndex: 5
  }
] as const;

const WORKFLOW_LABELS = [
  {
    key: "import",
    label: "IMPORT",
    meta: "≈ 30 SECONDS"
  },
  {
    key: "declare",
    label: "DECLARE",
    meta: "≈ 2 MINUTES"
  },
  {
    key: "compare",
    label: "COMPARE",
    meta: "≈ 8 MINUTES"
  },
  {
    key: "handoff",
    label: "HANDOFF",
    meta: "1 CLICK"
  }
] as const;

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

    const update = () => {
      setCanPin(desktop.matches && !reduceMotion.matches);
    };

    update();
    desktop.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);

    return () => {
      desktop.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!scrollRef.current || !pinRef.current || !canPin) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      ScrollTrigger.create({
        anticipatePin: 1,
        end: "+=300%",
        id: "workflow-stack",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextPhase = getWorkflowActivePhase(
            self.progress,
            activePhaseRef.current,
            0.03
          );

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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(180,220,255,0.08),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(255,255,255,0.03),transparent_32%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-6 lg:grid lg:h-screen lg:grid-cols-[22%_48%_30%] lg:px-8 lg:py-0 xl:px-10">
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
                                transition: {
                                  duration: indicatorExitDuration,
                                  ease: [0.16, 1, 0.3, 1]
                                }
                              }}
                              key={`${item.key}-indicator`}
                            >
                              <motion.span
                                animate={{
                                  scaleX: 1,
                                  transition: {
                                    duration: lineDrawDuration,
                                    ease: [0.16, 1, 0.3, 1]
                                  }
                                }}
                                className="workflow-label-line h-px w-12 origin-left bg-white/35"
                                initial={{ scaleX: 0 }}
                              />
                              <motion.span
                                animate={{
                                  opacity: 1,
                                  transition: {
                                    delay: dotDelay,
                                    duration: dotDuration,
                                    ease: [0.16, 1, 0.3, 1]
                                  }
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

            <div className="relative lg:col-start-2 lg:mx-auto lg:w-full lg:max-w-[640px]">
              {debugFlags.noGrid ? null : (
                <div
                  aria-hidden="true"
                  className="workflow-stack-grid pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  style={{ height: "800px", width: "1100px" }}
                />
              )}

              <div
                className="relative mx-auto w-[min(90vw,640px)] max-w-[640px]"
                data-workflow-stack="true"
                style={{ height: `${STACK_CONTAINER_HEIGHT}px` }}
              >
                {STACK_LAYERS.map((layer) => {
                  const isCap = layer.key === "top-cap";
                  const isActiveTile = !isCap && layer.key === activePhase;
                  const liftOffset = isCap ? 0 : isActiveTile ? 140 : 0;
                  const opacity = isCap ? 1 : isActiveTile ? 1 : 0.55;
                  const tileScale = debugFlags.noTileMotion
                    ? 1
                    : isActiveTile
                      ? 1.04
                      : 1;
                  const tileTranslateY = debugFlags.noTileMotion ? 0 : -liftOffset;
                  const stackZIndex = isCap ? 50 : isActiveTile ? 40 : 9 + layer.zIndex;
                  const tileFilter =
                    !isCap && !isActiveTile
                      ? "brightness(0.45) saturate(0.4) blur(0.5px)"
                      : undefined;

                  return (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-0 w-full -translate-x-1/2"
                      key={layer.key}
                      style={{
                        top: `${STACK_TOP_INSET + layer.translateY}px`,
                        zIndex: stackZIndex
                      }}
                    >
                      <motion.div
                        animate={{
                          opacity,
                          scale: tileScale,
                          y: tileTranslateY
                        }}
                        className={isCap ? "relative mx-auto w-[640px] max-w-full" : "relative w-full"}
                        initial={false}
                        style={{ filter: tileFilter }}
                        transition={{
                          duration: sectionTransitionDuration,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        {debugFlags.noRimlight ? null : (
                          <AnimatePresence initial={false}>
                            {isActiveTile ? (
                              <motion.div
                                animate={{
                                  opacity: 1,
                                  transition: {
                                    duration: sectionTransitionDuration,
                                    ease: [0.16, 1, 0.3, 1]
                                  }
                                }}
                                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
                                exit={{
                                  opacity: 0,
                                  transition: {
                                    duration: debugFlags.fastTransitions ? 0.2 : 0.24,
                                    ease: [0.16, 1, 0.3, 1]
                                  }
                                }}
                                initial={{ opacity: 0 }}
                                key={`${layer.key}-rim-light`}
                                style={{
                                  background:
                                    "radial-gradient(ellipse, rgba(180, 210, 255, 0.28) 0%, transparent 55%)",
                                  filter: "blur(8px)"
                                }}
                              />
                            ) : null}
                          </AnimatePresence>
                        )}

                        <Image
                          alt={layer.alt}
                          className={[
                            "h-auto w-full select-none",
                            isCap ? "object-contain" : ""
                          ].join(" ")}
                          draggable={false}
                          height={layer.height}
                          priority={layer.key === "top-cap"}
                          src={layer.src}
                          width={layer.width}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex lg:h-full lg:items-center lg:justify-end lg:pr-16 xl:pr-24">
              <div className="min-h-[13rem] w-full max-w-[380px]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1]
                      },
                      y: -8
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    key={activePhase}
                    transition={{
                      delay: 0.08,
                      duration: 0.32,
                      ease: [0.16, 1, 0.3, 1]
                    }}
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
