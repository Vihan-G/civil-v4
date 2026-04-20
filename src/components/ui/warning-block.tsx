import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";

type WarningBlockProps = {
  title: string;
  children: ReactNode;
};

export function WarningBlock({ title, children }: WarningBlockProps) {
  return (
    <div className="border-l-2 border-error bg-error/5 px-4 py-3">
      <div className="mb-2 flex items-center gap-2">
        <MaterialIcon className="text-error" fill name="warning" size={18} />
        <span className="font-body text-[11px] font-bold uppercase leading-tight text-error">
          {title}
        </span>
      </div>
      <div className="font-body text-sm leading-6 text-ink">{children}</div>
    </div>
  );
}
