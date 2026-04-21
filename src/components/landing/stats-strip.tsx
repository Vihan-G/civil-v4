import { Label } from "@/components/ui/label";
import { HERO_METRICS } from "@/lib/landing-copy";

export function StatsStrip() {
  return (
    <section className="border-y border-border bg-bg py-16" id="hero-stats">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-6">
        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {HERO_METRICS.map(([metric, descriptor]) => (
            <div className="py-6 sm:px-6 lg:px-8" key={metric}>
              <Label className="text-fg-muted">{descriptor}</Label>
              <p className="mt-3 font-headline text-[28px] font-semibold leading-none tracking-[-0.02em] text-fg">
                {metric}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
