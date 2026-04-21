"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_DEBUG_FLAGS,
  parseDebugFlags,
  type DebugFlags
} from "@/lib/debug-flags";

let cachedSearch = "";
let cachedFlags: DebugFlags = DEFAULT_DEBUG_FLAGS;
const serverFlags = DEFAULT_DEBUG_FLAGS;

function getSnapshot() {
  const search = window.location.search;

  if (search === cachedSearch) {
    return cachedFlags;
  }

  cachedSearch = search;
  cachedFlags = parseDebugFlags(search);
  return cachedFlags;
}

function getServerSnapshot() {
  return serverFlags;
}

function subscribe(listener: () => void) {
  const notify = () => {
    listener();
  };

  window.addEventListener("popstate", notify);
  window.addEventListener("codex:debug-flags-change", notify);

  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener("codex:debug-flags-change", notify);
  };
}

export function useDebugFlags() {
  return useSyncExternalStore<DebugFlags>(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}
