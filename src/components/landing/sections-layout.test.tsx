import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("LivePreviewSection layout", () => {
  test("keeps desktop top padding compact so preview follows the process story without a blank gap", () => {
    const source = readFileSync(
      new URL("./sections.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain(
      'className="bg-surface-low px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:pb-20 lg:pt-10"'
    );
  });
});
