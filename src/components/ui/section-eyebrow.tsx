import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label, Mono } from "@/components/ui/label";

type SectionEyebrowProps = {
  index: string;
  children: ReactNode;
  inverse?: boolean;
  className?: string;
};

export function SectionEyebrow({
  index,
  children,
  inverse = false,
  className
}: SectionEyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Mono className={inverse ? "text-paper/60" : undefined}>{index}</Mono>
      <div className={cn("h-px flex-1", inverse ? "bg-paper/20" : "bg-ink/15")} />
      <Label className={inverse ? "text-paper/60" : undefined}>{children}</Label>
    </div>
  );
}
