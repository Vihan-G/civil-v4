import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export function Label({ children, className }: LabelProps) {
  return (
    <span
      className={cn(
        "font-body text-[11px] font-semibold uppercase leading-tight text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Mono({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-[11px] leading-tight text-muted", className)}>
      {children}
    </span>
  );
}
