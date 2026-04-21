# Cinematic Landing Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install the approved motion and 3D dependencies, replace runtime font imports with self-hosted font loading, define the new monochrome tokens, and ship Hero Phase 1 with a pinned 400vh drawing scene that scrubs a 2D floor plan reveal.

**Architecture:** Keep the existing Next.js + Tailwind structure, but add a small foundation layer: global tokens in CSS variables, `next/font` variables in the app layout, a smooth-scroll provider, and a dedicated cinematic hero module. The hero itself stays isolated behind a dynamic import so the rest of the site can be rebuilt section by section without pulling the 3D code into the initial bundle.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Vitest, framer-motion, Lenis, GSAP ScrollTrigger, three, @react-three/fiber, @react-three/drei.

---

### Task 1: Lock the Phase 1 Foundation Contract

**Files:**
- Create: `src/app/theme-foundation.test.ts`
- Create: `src/lib/hero-story.ts`
- Create: `src/lib/hero-story.test.ts`
- Create: `src/data/floor-plan.ts`
- Create: `src/data/floor-plan.test.ts`

- [ ] **Step 1: Write the failing foundation tests**
- [ ] **Step 2: Run tests to confirm red state**
- [ ] **Step 3: Add hero phase utilities and floor-plan data**
- [ ] **Step 4: Re-run tests to confirm green state**

### Task 2: Install Motion + 3D Dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install the approved dependency list with npm**
- [ ] **Step 2: Verify `package.json` and lockfile changed only for the requested packages**

### Task 3: Replace Runtime Font Imports and Define Tokens

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Write the failing token/font assertions**
- [ ] **Step 2: Remove Google CSS imports and switch to `next/font`**
- [ ] **Step 3: Define the monochrome token set in CSS variables**
- [ ] **Step 4: Wire Tailwind font families and color aliases to the new variables**
- [ ] **Step 5: Re-run focused tests**

### Task 4: Add Smooth Scroll Plumbing

**Files:**
- Create: `src/components/providers/smooth-scroll-provider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add a small client provider for Lenis**
- [ ] **Step 2: Wrap the app body with the provider**
- [ ] **Step 3: Keep reduced-motion fallback in place**

### Task 5: Build Hero Phase 1

**Files:**
- Create: `src/components/landing/hero/cinematic-hero.tsx`
- Create: `src/components/landing/hero/cinematic-hero-scene.tsx`
- Create: `src/components/landing/hero/cinematic-hero-phase1.test.tsx`
- Modify: `src/components/landing/landing-page.tsx`

- [ ] **Step 1: Write the failing hero phase-1 assertions**
- [ ] **Step 2: Build the 400vh pinned hero shell with skip-intro control**
- [ ] **Step 3: Add the dynamic desktop scene import**
- [ ] **Step 4: Render the 2D plan drawing, dimension lines, labels, and overlay copy**
- [ ] **Step 5: Add static fallback behavior for reduced motion and mobile**
- [ ] **Step 6: Replace the old hero in the landing page with the new one**
- [ ] **Step 7: Re-run hero tests**

### Task 6: Verify the Milestone

**Files:**
- No code changes required unless verification reveals a defect

- [ ] **Step 1: Run `npm test -- --run`**
- [ ] **Step 2: Run `npm run lint`**
- [ ] **Step 3: Run `npm run build`**
- [ ] **Step 4: Start the local server and capture a preview screenshot of Hero Phase 1**
- [ ] **Step 5: Summarize what is still needed from the user for later phases**
