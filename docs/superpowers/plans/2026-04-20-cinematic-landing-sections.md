# Cinematic Landing Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Civil Agent hero and "How it works" sections into a cinematic scroll-storytelling experience that shows 2D plans becoming optimized structural plans with clear business value.

**Architecture:** Keep the existing Next.js landing page and preserve the rest of the site for now. Replace the current static hero and linear step grid with two client-side sections driven by small, testable progress helpers and SVG/CSS motion.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest for small unit tests around scroll-state mapping.

---

### Task 1: Prepare a testable progress-model path

**Files:**
- Create: `src/lib/landing-story.ts`
- Create: `src/lib/landing-story.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing tests**

Create tests that define:
- hero progress maps into distinct beats: `plan`, `frame`, `optimize`, `handoff`
- workflow progress activates the correct card index
- KPI deltas switch from baseline framing to optimized framing near the final beat

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- --run src/lib/landing-story.test.ts`
Expected: FAIL because the test runner or helper module does not exist yet

- [ ] **Step 3: Add the minimal test runner setup and helper implementation**

Add a `test` script using Vitest, then implement the smallest pure functions needed by the tests in `src/lib/landing-story.ts`

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- --run src/lib/landing-story.test.ts`
Expected: PASS

### Task 2: Replace the hero with the scroll-storytelling version

**Files:**
- Create: `src/components/landing/story-hero.tsx`
- Modify: `src/components/landing/landing-page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Use the tested helper functions to drive hero beat changes**

Build a sticky hero section with:
- a left narrative rail
- a right/center animated SVG scene
- beat captions and KPI chips tied to progress

- [ ] **Step 2: Implement the visual sequence**

Render these beats:
- 2D architectural plan
- translucent 3D structural frame rise
- bad structure highlighted in red and shifted
- optimized structural plan with quantified payoffs

- [ ] **Step 3: Add graceful reduced-motion and mobile fallbacks**

Use a simpler static/fade-based version on small screens and respect reduced motion preferences

- [ ] **Step 4: Verify locally**

Run: `npm run build`
Expected: PASS

### Task 3: Replace the "How it works" section with a layered stack

**Files:**
- Create: `src/components/landing/story-process.tsx`
- Modify: `src/components/landing/landing-page.tsx`

- [ ] **Step 1: Use the tested workflow helper to drive the active card**

Create a pinned commentary column and layered review-sheet stack

- [ ] **Step 2: Build the workflow cards**

Use these stages:
- input plan
- constraints
- optimize
- audit
- handoff

- [ ] **Step 3: Make the section degrade cleanly on mobile**

Switch to a readable stacked-card layout below desktop widths

- [ ] **Step 4: Verify locally**

Run: `npm run build`
Expected: PASS

### Task 4: Integrate, polish, and verify

**Files:**
- Modify: `src/components/landing/landing-page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Remove old section imports and wire the new sections into the page**

Keep `LivePreviewSection`, `FAQ`, `FinalCTA`, and `Footer` intact for now

- [ ] **Step 2: Tune spacing, typography, and section transitions**

Make the new sections feel like one cinematic arc rather than isolated modules

- [ ] **Step 3: Run the full verification pass**

Run:
- `npm test -- --run`
- `npm run build`

Expected:
- tests pass
- production build passes

- [ ] **Step 4: Do a manual browser review**

Check:
- initial hero frame feels premium and clear
- scroll progression reads in the intended order
- section two stack remains readable and intentional
- mobile layout does not clip or collapse
