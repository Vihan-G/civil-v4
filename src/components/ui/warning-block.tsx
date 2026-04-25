import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";

type WarningBlockProps = {
  title: string;
  children: ReactNode;
};

export function WarningBlock({ title, children }: WarningBlockProps) {
  return (
    <div className="border-l-2 border-[#9f403d] bg-[rgba(159,64,61,0.05)] px-4 py-3">
      <div className="mb-2 flex items-center gap-2">
        <MaterialIcon className="text-[#9f403d]" fill name="warning" size={18} />
        <span className="font-body text-[11px] font-bold uppercase leading-tight text-[#9f403d]">
          {title}
        </span>
      </div>
      <div className="font-body text-sm leading-6 text-[#313429]">{children}</div>
    </div>
  );
}
