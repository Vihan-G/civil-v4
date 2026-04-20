import { cn } from "@/lib/utils";

type WordmarkProps = {
  compact?: boolean;
  className?: string;
};

export function Wordmark({ compact = false, className }: WordmarkProps) {
  return (
    <a className={cn("inline-flex items-center gap-2.5", className)} href="#top">
      <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="7" width="13" height="13" fill="#313429" />
        <rect x="7" y="4" width="13" height="13" stroke="#313429" strokeWidth="0.8" />
      </svg>
      <span className="font-headline text-base font-bold leading-none text-ink">
        Civil Agent
      </span>
      {!compact ? (
        <span className="hidden border-l border-ink/15 pl-3 font-body text-[10px] font-semibold uppercase leading-none text-muted sm:inline-flex">
          Pre-launch
        </span>
      ) : null}
    </a>
  );
}
