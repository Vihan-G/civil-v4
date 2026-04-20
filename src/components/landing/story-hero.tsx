"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Label, Mono } from "@/components/ui/label";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import {
  HERO_BODY,
  HERO_METRICS,
  HERO_TITLE,
  HOW_IT_WORKS_STEPS
} from "@/lib/landing-copy";
import { getHeroBeat } from "@/lib/landing-story";
import { getHeroScenePresentation } from "@/lib/story-stage";
import { cn } from "@/lib/utils";
import { useSectionProgress } from "@/components/landing/use-section-progress";
import type { StructuralMaterial } from "@/components/landing/isometric-building";

type StoryHeroProps = {
  material: StructuralMaterial;
  setMaterial: (material: StructuralMaterial) => void;
};

const beatOrder: Array<ReturnType<typeof getHeroBeat>> = [
  "plan",
  "frame",
  "optimize",
  "handoff"
];

const beatShortLabel: Record<ReturnType<typeof getHeroBeat>, string> = {
  plan: "Input",
  frame: "Constraints",
  optimize: "Optimize",
  handoff: "Handoff"
};

const materialTheme = {
  RC: {
    accent: "#006a6a",
    accentClass: "bg-teal text-paper",
    chipTone: "teal" as const,
    label: "RC flat slab / shear core"
  },
  Steel: {
    accent: "#c2615b",
    accentClass: "bg-coral text-paper",
    chipTone: "coral" as const,
    label: "Steel frame / braced core"
  }
};

export function StoryHero({ material, setMaterial }: StoryHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref, {
    scrubDistance: 3400
  });
  const beat = getHeroBeat(progress);
  const theme = materialTheme[material];
  const beatStep =
    HOW_IT_WORKS_STEPS.find((step) => step.key === beat) ?? HOW_IT_WORKS_STEPS[0];

  return (
    <section
      className="story-surface relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-7 lg:min-h-[calc(100vh-4rem)] lg:px-10 lg:pb-0 lg:pt-0"
      id="top"
      ref={ref}
    >
      <span aria-hidden="true" className="absolute left-5 top-5 size-6 border-l border-t border-ink/35" />
      <span aria-hidden="true" className="absolute right-5 top-5 size-6 border-r border-t border-ink/35" />

      <div className="mx-auto max-w-[1320px] lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:items-center lg:py-0">
        <div className="grid h-full gap-8 lg:w-full lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-10">
          <div className="flex h-full flex-col lg:justify-center lg:py-0">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Chip icon="bolt" tone="teal">
                  Early access / Q3 2026
                </Chip>
                <Mono>v0.8.2 / internal</Mono>
              </div>

              <SectionEyebrow className="max-w-xl" index="01 / 05">
                Structural intelligence, before redesign
              </SectionEyebrow>

              <h1 className="mt-7 max-w-4xl font-headline text-4xl font-bold leading-[1.01] text-ink sm:text-6xl lg:text-[4.2rem] xl:text-[4.55rem]">
                {HERO_TITLE}
              </h1>

              <p className="mt-5 max-w-xl font-body text-base leading-7 text-ink sm:text-lg">
                {HERO_BODY}
              </p>

              <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <Button className="w-full justify-center sm:w-auto" href="#cta" size="lg" trailingIcon="arrow_forward">
                  Request early access
                </Button>
                <Button className="w-full justify-center sm:w-auto" href="#how-it-works" icon="play_arrow" size="lg" variant="text">
                  See how it works
                </Button>
              </div>

              <div className="mt-8 lg:hidden">
                <div className="rounded-sm bg-paper/76 p-3 shadow-vellum hairline backdrop-blur-xl">
                  <HeroScene compact material={material} progress={0.18} />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {HERO_METRICS.map(([metric, descriptor]) => (
                <div
                  className="rounded-sm bg-paper/80 p-4 shadow-soft hairline backdrop-blur-xl"
                  key={metric}
                >
                  <Label>{descriptor}</Label>
                  <p className="mt-3 font-headline text-2xl font-semibold leading-tight text-ink">
                    {metric}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[560px] lg:block lg:min-h-0">
            <div className="relative flex h-full flex-col rounded-sm bg-paper/72 p-5 shadow-vellum hairline backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 pr-4">
                  {beatOrder.map((entry, index) => (
                    <span
                      className={cn(
                        "inline-flex min-h-7 w-full items-center justify-center gap-2 rounded-sm px-2 py-1.5 font-body text-[10px] font-semibold uppercase",
                        beat === entry ? "bg-ink text-paper" : "bg-surface-low text-muted"
                      )}
                      key={entry}
                    >
                      <span className="font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span>
                      {beatShortLabel[entry]}
                    </span>
                  ))}
                </div>

                <div className="pointer-events-auto inline-flex rounded-sm bg-paper/90 p-0.5 shadow-soft hairline backdrop-blur-xl">
                  {(["RC", "Steel"] as const).map((item) => (
                    <button
                      className={cn(
                        "min-h-8 px-4 font-body text-[11px] font-semibold uppercase",
                        material === item ? materialTheme[item].accentClass : "text-muted hover:bg-surface-low"
                      )}
                      key={item}
                      onClick={() => setMaterial(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex-1 rounded-sm bg-gradient-to-br from-paper/95 via-surface-low/88 to-paper/82 p-3 shadow-soft hairline">
                <HeroScene material={material} progress={progress} />
              </div>

              <div className="mt-4 grid gap-4 rounded-sm bg-paper/92 p-4 shadow-soft hairline backdrop-blur-xl xl:grid-cols-[auto_1fr]">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <Label className="text-ink">{beatStep.eyebrow}</Label>
                </div>

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-xl">
                    <h2 className="font-headline text-2xl font-semibold leading-tight text-ink">
                      {beatStep.title}
                    </h2>
                    <p className="mt-2 font-body text-sm leading-6 text-muted">
                      {beatStep.body}
                    </p>
                  </div>

                  <Mono className="rounded-sm bg-surface-low px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted">
                    {theme.label}
                  </Mono>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroScene({
  material,
  progress,
  compact = false
}: {
  material: StructuralMaterial;
  progress: number;
  compact?: boolean;
}) {
  const theme = materialTheme[material];
  const scenePresentation = getHeroScenePresentation(progress);
  const optimizedColumns = [
    [270, 196],
    [346, 196],
    [270, 286],
    [346, 286]
  ];
  const originalColumns = [
    [238, 178],
    [388, 188],
    [252, 312],
    [382, 302]
  ];
  const frameOpacity = Math.max(scenePresentation.frameOpacity, compact ? 0.12 : 0);
  const outputOpacity = compact ? 0 : scenePresentation.outputOpacity;

  return (
    <div className={cn("pointer-events-none relative overflow-hidden", compact ? "h-[240px]" : "h-[340px] xl:h-[390px]")}>
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox={compact ? "92 118 520 248" : "72 46 560 320"}
      >
        <defs>
          <pattern id="hero-sub-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(49,52,41,.05)" strokeWidth="1" />
          </pattern>
          <linearGradient id="hero-sheet-fade" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(251,249,242,.98)" />
            <stop offset="100%" stopColor="rgba(245,244,235,.94)" />
          </linearGradient>
        </defs>

        <rect fill="url(#hero-sub-grid)" height="460" opacity="0.7" width="700" />

        <g transform={`translate(${compact ? 0 : scenePresentation.planDriftX} ${compact ? -18 : scenePresentation.artOffsetY})`}>
          <g opacity={scenePresentation.planOpacity}>
            <text
              fill="rgba(49,52,41,.5)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
              x="124"
              y="148"
            >
              ARCHITECTURAL MASSING
            </text>
            <rect
              fill="url(#hero-sheet-fade)"
              height="214"
              stroke="rgba(49,52,41,.16)"
              strokeWidth="1"
              width="318"
              x="124"
              y="162"
            />
            <path d="M160 216 H408" stroke="rgba(49,52,41,.38)" strokeWidth="2" />
            <path d="M160 272 H408" stroke="rgba(49,52,41,.38)" strokeWidth="2" />
            <path d="M160 328 H408" stroke="rgba(49,52,41,.38)" strokeWidth="2" />
            <path d="M206 162 V376" stroke="rgba(49,52,41,.22)" strokeWidth="2" />
            <path d="M257 162 V376" stroke="rgba(49,52,41,.22)" strokeWidth="2" />
            <path d="M308 162 V376" stroke="rgba(49,52,41,.22)" strokeWidth="2" />
            <path d="M359 162 V376" stroke="rgba(49,52,41,.22)" strokeWidth="2" />
            <path d="M172 198 L214 238" stroke="rgba(49,52,41,.18)" strokeWidth="1.6" />
            <path d="M364 194 L404 236" stroke="rgba(49,52,41,.18)" strokeWidth="1.6" />
            <rect
              fill="rgba(0,0,0,0)"
              height="60"
              stroke={theme.accent}
              strokeDasharray="6 4"
              strokeWidth="2"
              width="72"
              x="247"
              y="244"
            />
            <rect
              fill={material === "RC" ? "rgba(0,106,106,.08)" : "rgba(194,97,91,.08)"}
              height="34"
              width="58"
              x="178"
              y="316"
            />
          </g>

          <g
            opacity={frameOpacity}
            transform={`translate(${compact ? 18 : scenePresentation.frameShiftX} ${compact ? 40 : scenePresentation.frameShiftY})`}
          >
            <text
              fill="rgba(49,52,41,.52)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
              x="182"
              y="144"
            >
              STRUCTURAL FRAME
            </text>
            {Array.from({ length: 4 }, (_, level) => {
              const y = 274 - level * 46;
              const x = 172 + level * 18;
              const width = 248;
              const height = 84;

              return (
                <g key={level}>
                  <polygon
                    fill="rgba(0,0,0,0)"
                    points={`${x},${y} ${x + width},${y} ${x + width + 52},${y - 28} ${x + 52},${y - 28}`}
                    stroke={theme.accent}
                    strokeWidth="1.5"
                  />
                  <polygon
                    fill="rgba(0,0,0,0)"
                    points={`${x},${y} ${x},${y + height} ${x + width},${y + height} ${x + width},${y}`}
                    stroke="rgba(49,52,41,.16)"
                    strokeWidth="1"
                  />
                  <polygon
                    fill="rgba(0,0,0,0)"
                    points={`${x + width},${y} ${x + width},${y + height} ${x + width + 52},${y + height - 28} ${x + width + 52},${y - 28}`}
                    stroke={theme.accent}
                    strokeWidth="1.1"
                  />
                </g>
              );
            })}

            {[194, 264, 334, 404].map((x) => (
              <line
                key={x}
                stroke={theme.accent}
                strokeWidth="1.2"
                x1={x}
                x2={x + 62}
                y1={354}
                y2={164}
              />
            ))}
          </g>

          <g opacity={scenePresentation.optimizeOpacity}>
            <text
              fill="rgba(49,52,41,.52)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
              x="214"
              y="148"
            >
              OPTIMIZATION PASS
            </text>
            {originalColumns.map(([x, y], index) => (
              <g key={`bad-${index}`} opacity={scenePresentation.badColumnOpacity}>
                <circle cx={x} cy={y} fill="#9f403d" r="8.5" />
                <circle cx={x} cy={y} fill="rgba(159,64,61,.12)" r="22" />
              </g>
            ))}

            {optimizedColumns.map(([x, y], index) => (
              <g key={`good-${index}`} opacity={scenePresentation.goodColumnOpacity}>
                <circle cx={x} cy={y} fill={theme.accent} r="7.5" />
                <circle
                  cx={x}
                  cy={y}
                  fill="rgba(0,0,0,0)"
                  r="18"
                  stroke={theme.accent}
                  strokeDasharray="4 5"
                  strokeWidth="1.5"
                />
              </g>
            ))}

            {originalColumns.map(([fromX, fromY], index) => {
              const [toX, toY] = optimizedColumns[index];

              return (
                <path
                  d={`M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${Math.min(fromY, toY) - 20} ${toX} ${toY}`}
                  fill="none"
                  key={`shift-${index}`}
                  opacity={Math.max(scenePresentation.badColumnOpacity, scenePresentation.goodColumnOpacity)}
                  stroke={index % 2 === 0 ? "#9f403d" : theme.accent}
                  strokeDasharray="6 5"
                  strokeWidth="2"
                />
              );
            })}
          </g>

          <g
            opacity={outputOpacity}
            transform={`translate(0 ${scenePresentation.outputTranslateY}) scale(${scenePresentation.outputScale})`}
            transform-origin="350 216"
          >
            <rect
              fill="rgba(251,249,242,.98)"
              height="248"
              stroke="rgba(49,52,41,.16)"
              strokeWidth="1"
              width="368"
              x="190"
              y="96"
            />
            <text
              fill="rgba(49,52,41,.56)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
              x="214"
              y="126"
            >
              PRELIMINARY SCHEME
            </text>
            <text
              fill="rgba(49,52,41,.94)"
              fontFamily="Space Grotesk, sans-serif"
              fontSize="28"
              fontWeight="700"
              x="214"
              y="164"
            >
              {theme.label}
            </text>

            <rect fill="rgba(245,244,235,.92)" height="118" width="140" x="214" y="184" />
            <path d="M232 214 H338" stroke="rgba(49,52,41,.34)" strokeWidth="2" />
            <path d="M232 246 H338" stroke="rgba(49,52,41,.34)" strokeWidth="2" />
            <path d="M232 278 H338" stroke="rgba(49,52,41,.34)" strokeWidth="2" />
            <path d="M256 184 V302" stroke="rgba(49,52,41,.18)" strokeWidth="2" />
            <path d="M284 184 V302" stroke="rgba(49,52,41,.18)" strokeWidth="2" />
            <path d="M312 184 V302" stroke="rgba(49,52,41,.18)" strokeWidth="2" />
            <rect
              fill="rgba(0,0,0,0)"
              height="46"
              stroke={theme.accent}
              strokeDasharray="5 4"
              strokeWidth="1.8"
              width="52"
              x="270"
              y="222"
            />

            {[
              ["Time", "< 10 min"],
              ["Code", "ACI 318"],
              ["Output", "Plan + notes"]
            ].map(([label, value], index) => (
              <g key={label}>
                <text
                  fill="rgba(49,52,41,.52)"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                  x="388"
                  y={210 + index * 38}
                >
                  {label.toUpperCase()}
                </text>
                <text
                  fill="rgba(49,52,41,.92)"
                  fontFamily="Inter, sans-serif"
                  fontSize="18"
                  fontWeight="600"
                  x="388"
                  y={230 + index * 38}
                >
                  {value}
                </text>
              </g>
            ))}

            <rect fill="rgba(245,244,235,.92)" height="34" width="316" x="214" y="318" />
            <text
              fill="rgba(49,52,41,.56)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              x="230"
              y="339"
            >
              member schedules / load tables / design notes
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
