import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Label, Mono } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  IsometricBuilding,
  type StructuralMaterial
} from "@/components/landing/isometric-building";

type HeroProps = {
  material: StructuralMaterial;
  setMaterial: (material: StructuralMaterial) => void;
};

const metrics = [
  ["< 10 min", "Preliminary scheme"],
  ["ACI 318", "Code checks"],
  ["RC / Steel", "Multi material"]
] as const;

export function Hero({ material, setMaterial }: HeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden bg-paper bg-canvas-grid bg-[length:40px_40px] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-7 lg:px-10 lg:pb-24 lg:pt-8"
      id="top"
    >
      <CanvasCorner className="left-5 top-5 border-l border-t" />
      <CanvasCorner className="right-5 top-5 border-r border-t" />

      <div className="mx-auto grid min-h-[680px] max-w-[1320px] items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="hero-mobile-copy relative z-10 min-w-0 justify-self-start py-0">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Chip icon="bolt" tone="teal">
              Early access / Q3 2026
            </Chip>
            <Mono>v0.8.2 / internal</Mono>
          </div>

          <h1 className="max-w-4xl font-headline text-4xl font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Preliminary structural design, in minutes.
          </h1>

          <p className="mt-7 max-w-xl break-words font-body text-base leading-7 text-ink sm:text-lg">
            Civil Agent produces auditable structural schemes from architectural massing.
            Constraint driven. Physics based. Ready for a consultant handoff before
            the next design review.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Button className="w-full justify-center sm:w-auto" href="#cta" size="lg" trailingIcon="arrow_forward">
              Request early access
            </Button>
            <Button className="w-full justify-center sm:w-auto" href="#how-it-works" icon="play_arrow" size="lg" variant="text">
              See how it works
            </Button>
          </div>

          <div className="mt-12 grid w-full gap-5 border-t border-ink/10 pt-7 sm:max-w-none sm:grid-cols-3">
            {metrics.map(([metric, descriptor]) => (
              <div className="flex flex-col gap-2" key={metric}>
                <span className="font-headline text-3xl font-bold leading-none text-ink">
                  {metric}
                </span>
                <Label>{descriptor}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px] min-w-0 overflow-hidden lg:min-h-[640px]" aria-label="Structural scheme preview">
          <div className="absolute right-0 top-3 z-20 inline-flex bg-paper/90 p-0.5 backdrop-blur-xl hairline">
            {(["RC", "Steel"] as const).map((item) => (
              <button
                className={cn(
                  "min-h-8 px-4 font-body text-[11px] font-semibold uppercase transition",
                  material === item ? "bg-ink text-paper" : "text-muted hover:bg-surface-low"
                )}
                key={item}
                onClick={() => setMaterial(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <Annotation className="left-0 right-20 top-14" label="28.8 m / 6 bay" />
          <Annotation className="right-0 top-24 hidden h-[420px] w-8 flex-col sm:flex" label="24.5 m / L7" vertical />

          <div className="absolute inset-x-0 bottom-0 top-10">
            <IsometricBuilding material={material} />
          </div>

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-2 bg-inverse px-3 py-3 font-mono text-[11px] text-paper/60 sm:flex sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-paper/70">
              <span className="size-1.5 bg-teal" />
              live
            </span>
            <span>CONFIDENCE 94.2%</span>
            <span>SCHEME 003/047</span>
            <span>ITER 00:08:42</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CanvasCorner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute size-6 border-ink/35", className)}
    />
  );
}

function Annotation({
  label,
  vertical = false,
  className
}: {
  label: string;
  vertical?: boolean;
  className?: string;
}) {
  if (vertical) {
    return (
      <div className={cn("absolute items-center gap-2 text-muted", className)}>
        <span className="h-2 w-px bg-ink/40" />
        <span className="h-32 w-px bg-ink/30" />
        <Mono className="[writing-mode:vertical-rl]">{label}</Mono>
        <span className="h-32 w-px bg-ink/30" />
        <span className="h-2 w-px bg-ink/40" />
      </div>
    );
  }

  return (
    <div className={cn("absolute hidden items-center gap-2 text-muted sm:flex", className)}>
      <span className="h-2 w-px bg-ink/40" />
      <span className="h-px flex-1 bg-ink/30" />
      <Mono>{label}</Mono>
      <span className="h-px flex-1 bg-ink/30" />
      <span className="h-2 w-px bg-ink/40" />
    </div>
  );
}
