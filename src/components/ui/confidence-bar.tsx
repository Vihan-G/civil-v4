import { cn } from "@/lib/utils";

type ConfidenceBarProps = {
  value: number;
  tone?: "teal" | "success" | "warning" | "error";
  className?: string;
};

const toneClass = {
  teal: "bg-teal",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error"
};

export function ConfidenceBar({
  value,
  tone = "teal",
  className
}: ConfidenceBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="h-1 w-16 bg-surface-high">
        <div className={cn("h-full", toneClass[tone])} style={{ width: `${safeValue}%` }} />
      </div>
      <span className="font-headline text-xs font-bold text-ink">{safeValue}%</span>
    </div>
  );
}
