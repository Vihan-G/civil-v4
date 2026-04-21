"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Mono } from "@/components/ui/label";
import { HERO_BODY, HERO_TITLE, HOW_IT_WORKS_STEPS } from "@/lib/landing-copy";
import {
  HERO_PIN_SPAN_VH,
  getHeroOverlayState,
  getHeroSceneState
} from "@/lib/hero-story";

const CinematicHeroScene = dynamic(() => import("./cinematic-hero-scene").then((mod) => mod.CinematicHeroScene), {
  loading: () => <HeroSceneLoadingFallback />,
  ssr: false
});

type MotionMode = {
  isDesktop: boolean;
  reduceMotion: boolean;
};

export function CinematicHero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [motionMode, setMotionMode] = useState<MotionMode>({
    isDesktop: false,
    reduceMotion: false
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setMotionMode({
        isDesktop: window.innerWidth >= 768,
        reduceMotion: media.matches
      });
    };

    update();
    window.addEventListener("resize", update);
    media.addEventListener("change", update);

    return () => {
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!scrollRef.current || !pinRef.current || motionMode.reduceMotion || !motionMode.isDesktop) {
      setProgress(0);
      setReady(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    setReady(false);
    setProgress(0);
    window.scrollTo(0, 0);

    let frameId = 0;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        anticipatePin: 1,
        end: "bottom bottom",
        id: "cinematic-hero",
        onUpdate: (self) => {
          setProgress(self.progress);
        },
        pin: pinRef.current,
        scrub: 1,
        start: "top top",
        trigger: scrollRef.current
      });

      ScrollTrigger.refresh();
      frameId = window.requestAnimationFrame(() => {
        setReady(true);
      });
    }, scrollRef);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      context.revert();
    };
  }, [motionMode]);

  const isCinematic = motionMode.isDesktop && !motionMode.reduceMotion;
  const heroState = useMemo(() => getHeroSceneState(progress), [progress]);
  const overlayState = useMemo(
    () => getHeroOverlayState(progress, !isCinematic),
    [isCinematic, progress]
  );
  const currentStep = HOW_IT_WORKS_STEPS[overlayState.panelStepIndex];

  const handleSkip = () => {
    if (!scrollRef.current) {
      return;
    }

    const targetTop = scrollRef.current.offsetTop + window.innerHeight * 3.1;
    window.scrollTo({
      behavior: motionMode.reduceMotion ? "auto" : "smooth",
      top: targetTop
    });
  };

  return (
    <section className="relative" id="top">
      <div className="relative" ref={scrollRef} style={{ height: `${HERO_PIN_SPAN_VH + 100}vh` }}>
        <section
          className="relative h-screen w-screen overflow-hidden bg-bg"
          data-hero-phase={heroState.phase}
          data-hero-pinned="true"
          ref={pinRef}
        >
          <div className="absolute inset-0 z-0" data-hero-canvas-layer="true">
            {isCinematic ? (
              <CinematicHeroScene progress={progress} />
            ) : (
              <HeroReducedMotionPoster />
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 z-[5]">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-10"
            data-hero-overlay-layer="true"
            style={{ visibility: ready ? "visible" : "hidden" }}
          >
            <div className="absolute inset-x-0 top-0 flex items-start justify-end gap-6 p-6 sm:p-8">
              <Button
                className="pointer-events-auto min-w-[7.5rem] justify-center"
                onClick={handleSkip}
                size="sm"
                variant="ghost"
              >
                Skip intro
              </Button>
            </div>

            {overlayState.chapterOpacity > 0.001 || overlayState.chapterSubLabelOpacity > 0.001 ? (
              <div className="pointer-events-none absolute left-6 top-6 flex items-center gap-4 sm:left-8 sm:top-8">
                <div style={getOverlayStyle(overlayState.chapterOpacity, overlayState.chapterTranslateY)}>
                  <Mono className="text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                    CHAPTER 01 / 05
                  </Mono>
                </div>
                <div
                  className="h-px w-16 bg-white/10"
                  style={{
                    opacity: Math.max(
                      overlayState.chapterOpacity * 0.4,
                      overlayState.chapterSubLabelOpacity * 0.4
                    )
                  }}
                />
                <div
                  style={getOverlayStyle(
                    overlayState.chapterSubLabelOpacity,
                    overlayState.chapterSubLabelTranslateY
                  )}
                >
                  <span className="font-body text-[11px] font-semibold uppercase leading-tight text-fg-muted">
                    STRUCTURAL INTELLIGENCE, BEFORE REDESIGN
                  </span>
                </div>
              </div>
            ) : null}

            {overlayState.scrollIndicatorOpacity > 0.001 ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
                style={{ opacity: overlayState.scrollIndicatorOpacity }}
              >
                <div className="relative h-10 w-px bg-white/14">
                  <span className="hero-scroll-indicator-dot absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-fg" />
                </div>
                <Mono className="text-[10px] uppercase tracking-[0.12em] text-fg-muted">
                  SCROLL
                </Mono>
              </div>
            ) : null}

            <div className="absolute inset-x-0 bottom-0 grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,24rem)] lg:items-end">
              <div className="max-w-none lg:pr-10">
                {overlayState.headlineOpacity > 0.001 ? (
                  <div style={getOverlayStyle(overlayState.headlineOpacity, overlayState.headlineTranslateY)}>
                    <h1 className="max-w-[14ch] font-headline text-[clamp(48px,5.5vw,80px)] font-semibold leading-[0.98] tracking-[-0.03em] text-fg">
                      {HERO_TITLE}
                    </h1>
                  </div>
                ) : null}

                {overlayState.bodyOpacity > 0.001 ? (
                  <div style={getOverlayStyle(overlayState.bodyOpacity, overlayState.bodyTranslateY)}>
                    <p className="mt-6 max-w-[38rem] font-body text-[18px] leading-[1.55] text-fg-muted">
                      {HERO_BODY}
                    </p>
                  </div>
                ) : null}

                {overlayState.ctaOpacity > 0.001 ? (
                  <div
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                    style={getOverlayStyle(overlayState.ctaOpacity, overlayState.ctaTranslateY)}
                  >
                    <Button className="justify-center" href="#cta" size="lg">
                      Request early access
                    </Button>
                    <Button className="justify-center" href="#how-it-works" size="lg" variant="ghost">
                      See how it works
                    </Button>
                  </div>
                ) : null}
              </div>

              {overlayState.panelOpacity > 0.001 ? (
                <div
                  className="max-w-[24rem] rounded-[var(--radius-md)] border border-border bg-bg/74 p-5 backdrop-blur lg:ml-auto"
                  style={getOverlayStyle(overlayState.panelOpacity, overlayState.panelTranslateY)}
                >
                  <Mono className="text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                    {currentStep.eyebrow}
                  </Mono>
                  <h2 className="mt-3 font-headline text-[clamp(28px,3vw,40px)] font-semibold leading-[1.02] tracking-[-0.02em] text-fg">
                    {currentStep.title}
                  </h2>
                  <p className="mt-4 max-w-[34rem] font-body text-[18px] leading-[1.55] text-fg-muted">
                    {currentStep.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-[var(--radius-sm)] border border-border px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                      {currentStep.tag}
                    </span>
                    <span className="rounded-[var(--radius-sm)] border border-border px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                      {currentStep.annotation}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function HeroSceneLoadingFallback() {
  return (
    <div className="absolute inset-0 bg-bg">
      <svg
        aria-hidden="true"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 960 560"
      >
        <rect fill="#0A0A0B" height="560" width="960" />
        <rect fill="#070708" height="420" rx="18" width="760" x="100" y="70" />
        <rect height="420" rx="18" stroke="rgba(245,245,245,0.08)" width="760" x="100" y="70" />
        <path d="M100 160H860M100 300H860M290 70V490M470 70V490M650 70V490" stroke="rgba(207,216,228,0.38)" strokeWidth="2" />
        <path d="M100 230H470M650 230H860M470 300H860M100 370H290" stroke="rgba(207,216,228,0.38)" strokeWidth="2" />
        <path d="M290 370H650M650 160V300" stroke="rgba(207,216,228,0.38)" strokeWidth="2" />
        <path d="M290 160V370M470 160V490" stroke="rgba(207,216,228,0.38)" strokeWidth="2" />
        <path d="M290 250C322 250 346 228 346 198" stroke="rgba(207,216,228,0.52)" strokeDasharray="10 8" strokeWidth="2" />
        <path d="M470 250C498 250 522 228 522 198" stroke="rgba(207,216,228,0.52)" strokeDasharray="10 8" strokeWidth="2" />
        <path d="M650 250C678 250 702 228 702 198" stroke="rgba(207,216,228,0.52)" strokeDasharray="10 8" strokeWidth="2" />
      </svg>
    </div>
  );
}

function HeroReducedMotionPoster() {
  return <HeroSceneLoadingFallback />;
}

function getOverlayStyle(opacity: number, translateY: number) {
  return {
    opacity,
    transform: `translate3d(0, ${translateY}px, 0)`
  };
}
