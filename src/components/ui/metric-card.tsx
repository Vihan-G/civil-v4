import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
  accent?: "teal" | "coral" | "success" | "warning" | "error";
  className?: string;
};

const accentClass = {
  teal: "border-l-teal text-teal",
  coral: "border-l-coral text-coral",
  success: "border-l-success text-success",
  warning: "border-l-warning text-warning",
  error: "border-l-error text-error"
};

export function MetricCard({
  label,
  value,
  unit,
  highlight = false,
  accent = "teal",
  className
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-28 flex-col justify-between rounded-sm bg-surface-low p-5",
        highlight && "border-l-2 bg-surface-high",
        highlight && accentClass[accent],
        className
      )}
    >
      <Label className={highlight ? accentClass[accent].split(" ")[1] : undefined}>
        {label}
      </Label>
      <div className="flex flex-wrap items-baseline gap-1.5">
        <span className="font-headline text-3xl font-bold leading-none text-ink">
          {value}
        </span>
        {unit ? <Label>{unit}</Label> : null}
      </div>
    </div>
  );
}
