"use client";

import { useRef } from "react";
import { Chip } from "@/components/ui/chip";
import { Label, Mono } from "@/components/ui/label";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import {
  HOW_IT_WORKS_BODY,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_TITLE
} from "@/lib/landing-copy";
import { cn } from "@/lib/utils";
import {
  PROCESS_PROGRESS_OPTIONS,
  getProcessActiveIndex
} from "@/lib/landing-story";
import { getProcessCardPresentation } from "@/lib/story-stage";
import { useSectionProgress } from "@/components/landing/use-section-progress";
import type { StructuralMaterial } from "@/components/landing/isometric-building";

export function StoryProcess({ material }: { material: StructuralMaterial }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref, PROCESS_PROGRESS_OPTIONS);
  const activeIndex = getProcessActiveIndex(progress, HOW_IT_WORKS_STEPS.length);

  return (
    <section
      className="bg-surface-low px-4 py-20 sm:px-6 sm:py-24 lg:min-h-[calc(100vh+12rem)] lg:px-10 lg:py-0"
      id="how-it-works"
      ref={ref}
    >
      <div className="mx-auto max-w-[1320px] lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:py-0">
        <div className="grid h-full gap-10 lg:w-full lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8 lg:py-4">
            <div>
              <SectionEyebrow index="02 / 05">How it works</SectionEyebrow>

              <h2 className="mt-8 max-w-xl font-headline text-4xl font-semibold leading-[0.96] text-ink sm:text-5xl lg:text-[3.35rem] xl:text-[3.6rem]">
                {HOW_IT_WORKS_TITLE}
              </h2>

              <p className="mt-5 max-w-lg font-body text-base leading-7 text-muted">
                {HOW_IT_WORKS_BODY}
              </p>
            </div>

            <div className="space-y-2">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    className={cn(
                      "rounded-sm px-3 py-3 transition",
                      isActive ? "bg-paper shadow-soft hairline" : "text-muted"
                    )}
                    key={step.key}
                  >
                    <div className="flex items-center gap-3">
                      <Mono className={isActive ? "text-ink" : undefined}>{step.number}</Mono>
                      <div className="h-px flex-1 bg-ink/12" />
                      <Label className={isActive ? "text-ink" : undefined}>{step.eyebrow}</Label>
                    </div>
                    {isActive ? (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Chip tone={step.tone}>{step.tag}</Chip>
                        <Mono>{step.annotation}</Mono>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none hidden h-full items-center justify-center lg:flex">
              <div className="relative h-[560px] w-full max-w-[760px] overflow-hidden">
                <div className="process-stack relative h-full w-full">
                {HOW_IT_WORKS_STEPS.map((step, index) => {
                  const distance = index - activeIndex;
                  const isActive = index === activeIndex;
                  const presentation = getProcessCardPresentation({
                    distance,
                    isActive
                  });

                  return (
                    <article
                      className={cn(
                        "absolute inset-x-10 top-10 rounded-sm bg-paper hairline transition-[transform,opacity] duration-500 ease-[var(--ease-draft)] will-change-transform",
                        presentation.mode === "active"
                          ? "p-5 shadow-vellum ring-1 ring-ink/5 xl:p-6"
                          : "pointer-events-none p-4 shadow-soft"
                      )}
                      key={step.key}
                      style={{
                        opacity: presentation.opacity,
                        transform: `translate3d(${presentation.translateX}px, ${presentation.translateY}px, 0) rotate(${presentation.rotate}deg) scale(${presentation.scale})`,
                        zIndex:
                          presentation.mode === "active"
                            ? 30
                            : HOW_IT_WORKS_STEPS.length - index
                      }}
                    >
                      {presentation.mode === "active" ? (
                        <>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <Mono>{step.number}</Mono>
                                <Label>{step.eyebrow}</Label>
                              </div>
                              <h3 className="mt-4 max-w-lg font-headline text-2xl font-semibold leading-tight text-ink">
                                {step.title}
                              </h3>
                            </div>
                            <Chip tone={step.tone}>{step.tag}</Chip>
                          </div>
                          <div className="mt-5 grid gap-4 xl:grid-cols-[1.12fr_.88fr]">
                            <ProcessSheetArt material={material} stepKey={step.key} />
                            <div className="space-y-3" style={{ opacity: presentation.bodyOpacity }}>
                              <MetricRow label="Business angle" value={step.body} />
                              <MetricRow label="Output" value={step.annotation} />
                            </div>
                          </div>
                        </>
                      ) : presentation.mode === "support" ? (
                        <>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Mono>{step.number}</Mono>
                              <Label>{step.eyebrow}</Label>
                            </div>
                            <Chip tone={step.tone}>{step.tag}</Chip>
                          </div>
                          <div className="mt-4 flex items-center gap-3 bg-surface-low p-3">
                            <Label>{step.annotation}</Label>
                            <div className="h-px flex-1 bg-ink/10" />
                            <Mono>{step.number}</Mono>
                          </div>
                        </>
                      ) : null}
                    </article>
                  );
                })}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:hidden">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <article className="rounded-sm bg-paper p-5 shadow-vellum hairline" key={step.key}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Mono>{step.number}</Mono>
                    <Chip tone={step.tone}>{step.tag}</Chip>
                  </div>
                  <h3 className="mt-4 font-headline text-2xl font-semibold leading-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-6 text-ink">{step.body}</p>
                  <div className="mt-5">
                    <ProcessSheetArt material={material} stepKey={step.key} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-low p-4">
      <Label>{label}</Label>
      <p className="mt-2 font-body text-sm leading-6 text-ink">{value}</p>
    </div>
  );
}

function ProcessSheetArt({
  stepKey,
  material
}: {
  stepKey: string;
  material: StructuralMaterial;
}) {
  if (stepKey === "plan") {
    return (
      <div className="bg-surface-low p-4">
        <div className="grid gap-2">
          <div className="h-32 bg-paper hairline">
            <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 280 140">
              <rect fill="rgba(0,0,0,0)" height="96" stroke="rgba(49,52,41,.22)" width="180" x="42" y="22" />
              <rect fill="rgba(0,0,0,0)" height="28" stroke={material === "RC" ? "#006a6a" : "#c2615b"} strokeDasharray="4 3" strokeWidth="2" width="34" x="116" y="56" />
              <path d="M56 52 H208" stroke="rgba(49,52,41,.3)" strokeWidth="2" />
              <path d="M56 84 H208" stroke="rgba(49,52,41,.3)" strokeWidth="2" />
              <path d="M94 22 V118" stroke="rgba(49,52,41,.2)" strokeWidth="2" />
              <path d="M132 22 V118" stroke="rgba(49,52,41,.2)" strokeWidth="2" />
              <path d="M170 22 V118" stroke="rgba(49,52,41,.2)" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="blue">plates</Chip>
            <Chip tone="neutral">core</Chip>
            <Chip tone="neutral">voids</Chip>
          </div>
        </div>
      </div>
    );
  }

  if (stepKey === "frame") {
    return (
      <div className="grid gap-3 bg-surface-low p-4">
        <div className="grid grid-cols-2 gap-2">
          <MetricRow label="Material" value={material === "RC" ? "Reinforced concrete" : "Steel frame"} />
          <MetricRow label="Code" value="ACI 318 / ASCE 7" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip tone="teal">floor-to-floor</Chip>
          <Chip tone="purple">seismic zone</Chip>
          <Chip tone="coral">jurisdiction</Chip>
        </div>
      </div>
    );
  }

  if (stepKey === "optimize") {
    const accent = material === "RC" ? "#006a6a" : "#c2615b";
    return (
      <div className="bg-surface-low p-4">
        <svg aria-hidden="true" className="h-[148px] w-full" viewBox="0 0 320 180">
          <rect fill="rgba(0,0,0,0)" height="110" stroke="rgba(49,52,41,.2)" width="120" x="16" y="34" />
          <rect fill="rgba(0,0,0,0)" height="110" stroke="rgba(49,52,41,.2)" width="120" x="184" y="34" />
          <circle cx="52" cy="68" fill="#9f403d" r="8" />
          <circle cx="92" cy="104" fill="#9f403d" r="8" />
          <circle cx="228" cy="74" fill={accent} r="7" />
          <circle cx="268" cy="96" fill={accent} r="7" />
          <path d="M60 68 C120 50, 176 56, 226 74" fill="none" stroke="#9f403d" strokeDasharray="5 4" strokeWidth="2" />
          <path d="M100 104 C146 128, 196 126, 266 96" fill="none" stroke={accent} strokeDasharray="5 4" strokeWidth="2" />
          <text fill="rgba(49,52,41,.55)" fontFamily="JetBrains Mono" fontSize="12" x="42" y="22">
            before
          </text>
          <text fill="rgba(49,52,41,.55)" fontFamily="JetBrains Mono" fontSize="12" x="214" y="22">
            after
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="grid gap-3 bg-surface-low p-4">
      <div className="grid grid-cols-2 gap-2">
        <MetricRow label="Report" value="design summary" />
        <MetricRow label="Exchange" value=".pdf / .ifc / live link" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip tone="coral">member schedules</Chip>
        <Chip tone="neutral">load tables</Chip>
        <Chip tone="neutral">design notes</Chip>
      </div>
    </div>
  );
}
