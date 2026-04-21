export const DEBUG_FLAG_KEYS = [
  "no-rimlight",
  "no-tile-motion",
  "no-grid",
  "no-lenis",
  "fast-transitions"
] as const;

export type DebugFlagKey = (typeof DEBUG_FLAG_KEYS)[number];

export type DebugFlags = {
  fastTransitions: boolean;
  noGrid: boolean;
  noLenis: boolean;
  noRimlight: boolean;
  noTileMotion: boolean;
};

export const DEFAULT_DEBUG_FLAGS: DebugFlags = {
  fastTransitions: false,
  noGrid: false,
  noLenis: false,
  noRimlight: false,
  noTileMotion: false
};

export const DEBUG_FLAG_LABELS: Record<DebugFlagKey, string> = {
  "fast-transitions": "Fast transitions",
  "no-grid": "No grid",
  "no-lenis": "No Lenis",
  "no-rimlight": "No rim light",
  "no-tile-motion": "No tile motion"
};

function normalizeDebugValue(input: string | null | undefined) {
  if (!input) {
    return "";
  }

  if (input.includes("?") || input.includes("&") || input.startsWith("debug=")) {
    const params = new URLSearchParams(
      input.startsWith("?") ? input.slice(1) : input
    );
    return params.get("debug") ?? "";
  }

  return input;
}

export function parseDebugFlags(input: string | null | undefined): DebugFlags {
  const normalized = normalizeDebugValue(input);
  const tokens = new Set(
    normalized
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean)
  );

  return {
    fastTransitions: tokens.has("fast-transitions"),
    noGrid: tokens.has("no-grid"),
    noLenis: tokens.has("no-lenis"),
    noRimlight: tokens.has("no-rimlight"),
    noTileMotion: tokens.has("no-tile-motion")
  };
}

export function serializeDebugFlags(flags: DebugFlags) {
  return DEBUG_FLAG_KEYS.filter((key) => {
    switch (key) {
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
  }).join(",");
}
