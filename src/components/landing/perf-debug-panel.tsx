"use client";

import {
  type DebugFlagKey,
  DEBUG_FLAG_KEYS,
  DEBUG_FLAG_LABELS,
  serializeDebugFlags
} from "@/lib/debug-flags";
import { useDebugFlags } from "@/hooks/use-debug-flags";

function getFlagValue(
  flag: DebugFlagKey,
  flags: ReturnType<typeof useDebugFlags>
) {
  switch (flag) {
    case "fast-transitions":
      return flags.fastTransitions;
    case "no-grid":
      return flags.noGrid;
    case "no-lenis":
      return flags.noLenis;
    case "no-rimlight":
      return flags.noRimlight;
    case "no-tile-motion":
      return flags.noTileMotion;
    default:
      return false;
  }
}

export function PerfDebugPanel() {
  const flags = useDebugFlags();

  const updateFlag = (flag: DebugFlagKey, checked: boolean) => {
    const nextFlags = {
      ...flags,
      fastTransitions:
        flag === "fast-transitions" ? checked : flags.fastTransitions,
      noGrid: flag === "no-grid" ? checked : flags.noGrid,
      noLenis: flag === "no-lenis" ? checked : flags.noLenis,
      noRimlight:
        flag === "no-rimlight" ? checked : flags.noRimlight,
      noTileMotion:
        flag === "no-tile-motion" ? checked : flags.noTileMotion
    };

    const next = new URLSearchParams(window.location.search);
    const debugValue = serializeDebugFlags(nextFlags);

    if (debugValue) {
      next.set("debug", debugValue);
    } else {
      next.delete("debug");
    }

    const query = next.toString();
    window.location.assign(
      query ? `${window.location.pathname}?${query}` : window.location.pathname
    );
  };

  return (
    <aside className="fixed bottom-6 right-6 z-[120] hidden w-[240px] rounded-[var(--radius-sm)] border border-border bg-bg px-4 py-3 lg:block">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
        PERF DEBUG
      </p>
      <div className="mt-3 flex flex-col gap-2.5">
        {DEBUG_FLAG_KEYS.map((flag) => (
          <label className="flex items-start gap-2.5" key={flag}>
            <input
              checked={getFlagValue(flag, flags)}
              className="mt-[2px] size-3.5 accent-[var(--fg)]"
              onChange={(event) => updateFlag(flag, event.target.checked)}
              type="checkbox"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">
              {DEBUG_FLAG_LABELS[flag]}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
