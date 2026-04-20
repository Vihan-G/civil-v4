"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import {
  getScrubDecision,
  getStoryScrollProgress,
  isStorySectionActive,
  shouldCaptureStoryWheel,
  type StoryCaptureMode
} from "@/lib/story-scrub";

type UseSectionProgressOptions = {
  captureMode?: StoryCaptureMode;
  scrubDistance?: number;
  stickyTop?: number;
  scrubMinWidth?: number;
};

const DEFAULT_OPTIONS: Required<UseSectionProgressOptions> = {
  captureMode: "scrub",
  scrubDistance: 2600,
  stickyTop: 64,
  scrubMinWidth: 1024
};

function normalizeWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 32;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

export function useSectionProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseSectionProgressOptions = {}
) {
  const { captureMode, scrubDistance, stickyTop, scrubMinWidth } = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(progress);
  const targetProgressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const applyProgress = (nextProgress: number) => {
      targetProgressRef.current = nextProgress;

      if (prefersReducedMotion.matches) {
        stopAnimation();
        progressRef.current = nextProgress;
        setProgress(nextProgress);
        return;
      }

      if (animationFrame) {
        return;
      }

      const tick = () => {
        const delta = targetProgressRef.current - progressRef.current;

        if (Math.abs(delta) < 0.0015) {
          progressRef.current = targetProgressRef.current;
          setProgress(targetProgressRef.current);
          animationFrame = 0;
          return;
        }

        progressRef.current += delta * 0.18;
        setProgress(progressRef.current);
        animationFrame = window.requestAnimationFrame(tick);
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const canCaptureWheel = () =>
      shouldCaptureStoryWheel({
        captureMode,
        prefersReducedMotion: prefersReducedMotion.matches,
        scrubMinWidth,
        viewportWidth: window.innerWidth
      });

    const updateFromDocument = () => {
      const current = ref.current;

      if (!current) {
        return;
      }

      if (canCaptureWheel()) {
        return;
      }

      const nextProgress = getStoryScrollProgress({
        elementHeight: current.offsetHeight,
        rectTop: current.getBoundingClientRect().top,
        stickyTop,
        viewportHeight: window.innerHeight
      });
      applyProgress(nextProgress);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !canCaptureWheel()) {
        return;
      }

      const current = ref.current;

      if (!current) {
        return;
      }

      const rect = current.getBoundingClientRect();

      if (
        !isStorySectionActive({
          rectBottom: rect.bottom,
          rectTop: rect.top,
          stickyTop,
          viewportHeight: window.innerHeight
        })
      ) {
        return;
      }

      const decision = getScrubDecision({
        deltaY: normalizeWheelDelta(event),
        progress: targetProgressRef.current,
        scrubDistance
      });

      if (!decision.capture) {
        return;
      }

      event.preventDefault();
      applyProgress(decision.nextProgress);
    };

    updateFromDocument();
    window.addEventListener("resize", updateFromDocument);
    window.addEventListener("scroll", updateFromDocument, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    prefersReducedMotion.addEventListener("change", updateFromDocument);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", updateFromDocument);
      window.removeEventListener("scroll", updateFromDocument);
      window.removeEventListener("wheel", handleWheel);
      prefersReducedMotion.removeEventListener("change", updateFromDocument);
    };
  }, [captureMode, ref, scrubDistance, stickyTop, scrubMinWidth]);

  return progress;
}
