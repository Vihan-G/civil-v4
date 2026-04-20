import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("StoryProcess", () => {
  test("keeps extra desktop runway so the scrubbed tile stack can capture scroll reliably", () => {
    const source = readFileSync(
      new URL("./story-process.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("lg:min-h-[calc(100vh+12rem)]");
    expect(source).toContain("h-[560px]");
  });
});
