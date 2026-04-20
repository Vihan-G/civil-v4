import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LabelProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function Label({ children, as: Tag = "span", className }: LabelProps) {
  return (
    <Tag
      className={cn(
        "font-body text-[11px] font-semibold uppercase leading-tight text-muted",
        className
      )}
    >
      {children}
    </Tag>
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
