"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Preview", href: "#preview" },
  { label: "FAQ", href: "#faq" }
];

export function TopBar() {
  const [showHeader, setShowHeader] = useState(false);

  useLayoutEffect(() => {
    const heroTrigger = document.querySelector<HTMLElement>("#top > div");

    if (!heroTrigger) {
      setShowHeader(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const heroStart = heroTrigger.offsetTop;
      const heroEnd = heroStart + heroTrigger.offsetHeight - window.innerHeight;
      setShowHeader(window.scrollY > heroEnd);

      const trigger = ScrollTrigger.create({
        end: "bottom bottom",
        id: "top-bar-hero-visibility",
        onEnter: () => setShowHeader(false),
        onEnterBack: () => setShowHeader(false),
        onLeave: () => setShowHeader(true),
        onLeaveBack: () => setShowHeader(false),
        start: "top top",
        trigger: heroTrigger
      });

      if (trigger.isActive) {
        setShowHeader(false);
      }
    });

    return () => context.revert();
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-20 border-b border-border bg-[rgba(10,10,11,0.4)] transition-[transform,opacity] duration-[240ms] ease-[var(--ease-out)] backdrop-blur-[12px]",
        showHeader ? "translate-y-0 opacity-100" : "translate-y-[-100%] opacity-0"
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-8">
          <Wordmark />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                className="font-body text-sm font-medium text-ink transition hover:text-teal"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button className="hidden sm:inline-flex" href="#cta" size="sm" variant="text">
            Sign in
          </Button>
          <Button href="#cta" size="sm" trailingIcon="arrow_forward">
            <span className="hidden sm:inline">Request early access</span>
            <span className="sm:hidden">Access</span>
          </Button>
          <button
            aria-label="Open navigation"
            className="inline-flex size-9 items-center justify-center rounded-sm text-ink transition hover:bg-surface-low lg:hidden"
            type="button"
          >
            <MaterialIcon name="menu" size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
