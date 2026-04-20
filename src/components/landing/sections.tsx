"use client";

import { FormEvent, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import {
  CompactSchemeList,
  PreviewMetrics,
  ProductPreview
} from "@/components/preview/product-preview";
import { Chip } from "@/components/ui/chip";
import { Label, Mono } from "@/components/ui/label";
import { MaterialIcon } from "@/components/ui/material-icon";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { cn } from "@/lib/utils";
import type { StructuralMaterial } from "@/components/landing/isometric-building";

type MaterialAwareProps = {
  material: StructuralMaterial;
};

const steps = [
  {
    number: "01",
    eyebrow: "Input",
    title: "Import the architectural massing.",
    body:
      "Bring in floor plates, cores, and voids from Rhino, Revit, or IFC. Civil Agent parses the geometry into a Building Graph of bays, spans, and tributary areas.",
    tag: "Building Graph",
    tone: "blue",
    annotation: ".dwg / .ifc / .3dm"
  },
  {
    number: "02",
    eyebrow: "Constraints",
    title: "Declare the constraints.",
    body:
      "Material system, target floor-to-floor, seismic zone, wind zone, and code jurisdiction become solver constraints before member sizing starts.",
    tag: "ACI 318 / ASCE 7",
    tone: "teal",
    annotation: "jurisdiction / SDC"
  },
  {
    number: "03",
    eyebrow: "Optimize",
    title: "Compare schemes side by side.",
    body:
      "Physics based iteration searches grid spacing, lateral system, and structural depth. Every scheme carries confidence against code and cost.",
    tag: "Design Graph",
    tone: "purple",
    annotation: "47 schemes / 8 min"
  },
  {
    number: "04",
    eyebrow: "Handoff",
    title: "Hand off, not hand over.",
    body:
      "Export a structured report with member schedules, load tables, design notes, and a live link back to the graph.",
    tag: "Design Summary",
    tone: "coral",
    annotation: ".pdf / .ifc / live link"
  }
] as const;

export function HowItWorks({ material }: MaterialAwareProps) {
  const activeClass = material === "Steel" ? "bg-coral" : "bg-teal";

  return (
    <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28" id="how-it-works">
      <div className="mx-auto max-w-[1320px]">
        <SectionEyebrow index="02 / 05">How it works</SectionEyebrow>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <h2 className="max-w-2xl font-headline text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            From massing to member schedule, without the two week loop.
          </h2>
          <p className="max-w-2xl font-body text-base leading-7 text-muted">
            Civil Agent does not generate a building. It reasons about the one
            already on the table, producing structural schemes that teams can
            trust, interrogate, and iterate on.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-ink/20 xl:block" />
          {steps.map((step, index) => (
            <article className="relative z-10 pr-5" key={step.number}>
              <div className="mb-6 flex size-20 items-center justify-center bg-paper">
                <div
                  className={cn(
                    "flex size-14 items-center justify-center font-headline text-lg font-bold",
                    index === 0 ? `${activeClass} text-paper` : "bg-surface-low text-ink"
                  )}
                >
                  {step.number}
                </div>
              </div>
              <Label className="mb-2 block">{step.eyebrow}</Label>
              <h3 className="mb-3 font-headline text-xl font-semibold leading-snug text-ink">
                {step.title}
              </h3>
              <p className="mb-5 max-w-sm font-body text-sm leading-6 text-ink">
                {step.body}
              </p>
              <div className="flex flex-col items-start gap-2">
                <Chip tone={step.tone}>{step.tag}</Chip>
                <Mono>{step.annotation}</Mono>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LivePreviewSection() {
  return (
    <section className="bg-surface-low px-4 py-20 sm:px-6 sm:py-24 lg:px-10" id="preview">
      <div className="mx-auto max-w-[1320px]">
        <SectionEyebrow index="03 / 05">Live product preview</SectionEyebrow>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.45fr] lg:items-end">
          <h2 className="max-w-xl font-headline text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            The Building Graph, rendered at engineering fidelity.
          </h2>
          <p className="max-w-2xl font-body text-base leading-7 text-muted">
            Elements are queryable. Confidence intervals, load paths, and code
            citations sit one interaction away because an engineer has to trust
            the output, not just inspect it.
          </p>
        </div>

        <div className="mt-10">
          <ProductPreview />
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Mono>fig. 003 / Cornerstone Tower / L1-L7 / RC flat-slab / 2-bay core</Mono>
            <a
              className="font-body text-sm font-medium text-teal underline decoration-[0.5px] underline-offset-4"
              href="#cta"
            >
              Request full workspace access
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_1.2fr]">
          <PreviewMetrics />
          <CompactSchemeList />
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: "Does Civil Agent replace my structural engineer?",
    answer:
      "No. Civil Agent produces preliminary, code-compliant schemes for the early design phase. The output is a starting point for the structural consultant, with traceable load paths and auditable assumptions."
  },
  {
    question: "What structural systems are supported?",
    answer:
      "At launch: reinforced concrete flat plate, flat slab with drops, one-way joist, two-way beam systems, and steel composite beam and column schemes with braced or moment frames."
  },
  {
    question: "Which codes are implemented?",
    answer:
      "ACI 318-19 and AISC 360-22 are used for member design. ASCE 7-22 supplies load references. Additional jurisdictions can be evaluated during onboarding."
  },
  {
    question: "How is this different from a generative AI tool?",
    answer:
      "Civil Agent is constraint driven and physics based. The schemes come from a deterministic solver that respects equilibrium, serviceability, and code limits."
  },
  {
    question: "Does the workflow require a new modeling tool?",
    answer:
      "No. Civil Agent ingests Rhino, Revit, IFC, and drawing exports, then writes back a structured report and exchangeable model data for consultant workflows."
  }
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24 lg:px-10" id="faq">
      <div className="mx-auto max-w-5xl">
        <SectionEyebrow index="04 / 05">Frequently asked</SectionEyebrow>
        <h2 className="mt-10 max-w-3xl font-headline text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Questions structural engineers tend to ask first.
        </h2>

        <div className="mt-14">
          {faqItems.map((item, index) => {
            const isOpen = open === index;
            return (
              <div className="border-t border-ink/15 last:border-b" key={item.question}>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-5 py-7 text-left"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  type="button"
                >
                  <span className="flex min-w-0 items-start gap-5">
                    <Mono className="mt-1 min-w-6">{String(index + 1).padStart(2, "0")}</Mono>
                    <span className="font-headline text-lg font-medium leading-snug text-ink sm:text-xl">
                      {item.question}
                    </span>
                  </span>
                  <MaterialIcon
                    className={cn("mt-0.5 text-muted transition", isOpen && "rotate-45")}
                    name="add"
                    size={24}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-[var(--ease-draft)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-8 pl-11 font-body text-sm leading-7 text-ink sm:pl-14 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ material }: MaterialAwareProps) {
  return (
    <section
      className="relative overflow-hidden bg-ink bg-canvas-grid-inverse bg-[length:40px_40px] px-4 py-20 text-paper sm:px-6 sm:py-24 lg:px-10 lg:py-28"
      id="cta"
    >
      <div className="mx-auto max-w-5xl">
        <SectionEyebrow index="05 / 05" inverse>
          Request early access
        </SectionEyebrow>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <h2 className="font-headline text-4xl font-semibold leading-tight text-paper sm:text-5xl lg:text-6xl">
            Join the first AEC cohort running preliminary design at conversation speed.
          </h2>

          <div>
            <p className="mb-7 font-body text-sm leading-7 text-paper/70">
              Onboarding is limited to active project teams. Structural engineers
              and mixed AEC firms are prioritized for calibration data.
            </p>
            <EarlyAccessForm accent={material === "Steel" ? "coral" : "teal"} />
          </div>
        </div>
      </div>
    </section>
  );
}

function EarlyAccessForm({ accent }: { accent: "teal" | "coral" }) {
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const response = await fetch("/api/early-access", {
      body: new FormData(form),
      method: "POST"
    });
    const data = (await response.json()) as { message?: string };

    setState(response.ok ? "success" : "error");
    setMessage(data.message ?? "Request could not be processed.");

    if (response.ok) {
      form.reset();
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-paper/35 pb-3">
        <MaterialIcon className="mr-3 text-paper/60" name="mail" size={19} />
        <label className="sr-only" htmlFor="early-access-email">
          Firm email
        </label>
        <input
          className="min-w-0 flex-1 bg-transparent py-2 font-body text-base text-paper outline-none placeholder:text-paper/45"
          id="early-access-email"
          name="email"
          placeholder="you@firm.com"
          required
          type="email"
        />
        <button
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-sm px-4 font-body text-xs font-bold uppercase text-paper transition active:scale-95 disabled:cursor-wait disabled:opacity-70",
            accent === "teal" ? "bg-teal" : "bg-coral"
          )}
          disabled={state === "loading"}
          type="submit"
        >
          {state === "loading" ? "Sending" : "Request access"}
          <MaterialIcon name="arrow_forward" size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Mono className="text-paper/60">structural / AEC / architect</Mono>
        <Mono className="text-paper/60">no credit card</Mono>
      </div>
      {message ? (
        <p
          className={cn(
            "font-body text-sm",
            state === "success" ? "text-paper" : "text-[#ffb4ad]"
          )}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function Footer() {
  const cols = [
    { heading: "Product", items: ["Overview", "Building Graph", "Design Summary", "Changelog"] },
    { heading: "Engineering", items: ["ACI 318-19", "AISC 360-22", "ASCE 7-22", "Jurisdictions"] },
    { heading: "Company", items: ["About", "Careers", "Contact", "Press"] },
    { heading: "Legal", items: ["Terms", "Privacy", "Security", "Status"] }
  ];

  return (
    <footer className="border-t border-ink/10 bg-paper px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs font-body text-sm leading-6 text-muted">
              Structural intelligence for preliminary design, built with practicing
              structural engineers.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <Label className="mb-4 block">{col.heading}</Label>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a className="font-body text-sm text-ink transition hover:text-teal" href="#top">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Mono>2026 Civil Agent / San Francisco + Zurich</Mono>
          <div className="flex gap-4">
            <Mono>v0.8.2</Mono>
            <Mono className="inline-flex items-center gap-2 text-success">
              <span className="size-1.5 bg-success" />
              all systems nominal
            </Mono>
          </div>
        </div>
      </div>
    </footer>
  );
}
