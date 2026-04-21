import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("TopBar", () => {
  test("floats over the hero as a fixed translucent bar", () => {
    const source = readFileSync(
      new URL("./top-bar.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("fixed top-0 left-0 right-0 z-20");
    expect(source).toContain("bg-[rgba(10,10,11,0.4)]");
    expect(source).toContain("backdrop-blur-[12px]");
    expect(source).toContain("border-b border-border");
    expect(source).not.toContain("sticky top-0");
  });
});
