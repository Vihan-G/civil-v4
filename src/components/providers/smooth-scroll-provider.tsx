"use client";

import { type ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseDebugFlags } from "@/lib/debug-flags";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const debugFlags = parseDebugFlags(window.location.search);

    if (media.matches || debugFlags.noLenis) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.95
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
