import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

describe("StatsStrip", () => {
  test("promotes the hero metrics into a standalone section after the hero", () => {
    const fileUrl = new URL("./stats-strip.tsx", import.meta.url);
    const filePath = fileURLToPath(fileUrl);
    const fileExists = existsSync(filePath);
    const source = fileExists ? readFileSync(fileUrl, "utf8") : "";

    expect(fileExists).toBe(true);
    expect(source).toContain("HERO_METRICS");
    expect(source).toContain('id="hero-stats"');
    expect(source).toContain("border-y border-border");
    expect(source).toContain("max-w-[1280px]");
  });
});
