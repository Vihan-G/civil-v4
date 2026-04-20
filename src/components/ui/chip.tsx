import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/ui/material-icon";

type ChipTone =
  | "teal"
  | "purple"
  | "pink"
  | "coral"
  | "blue"
  | "success"
  | "warning"
  | "error"
  | "neutral";

type ChipProps = {
  tone?: ChipTone;
  icon?: string;
  children: ReactNode;
  className?: string;
};

const toneClass: Record<ChipTone, string> = {
  teal: "bg-teal/10 text-teal",
  purple: "bg-purple/10 text-purple",
  pink: "bg-pink/10 text-pink",
  coral: "bg-coral/10 text-coral",
  blue: "bg-blue/10 text-blue",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  neutral: "bg-surface text-ink"
};

export function Chip({ tone = "teal", icon, children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 max-w-full items-center gap-1.5 rounded-sm px-2 py-1 text-[10px] font-semibold uppercase leading-none",
        toneClass[tone],
        className
      )}
    >
      {icon ? <MaterialIcon name={icon} size={13} fill={icon === "check_circle"} /> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}
