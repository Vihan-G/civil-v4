import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("LandingPage", () => {
  test("renders the standalone stats strip immediately after the cinematic hero", () => {
    const source = readFileSync(
      new URL("./landing-page.tsx", import.meta.url),
      "utf8"
    );

    expect(source).toContain("import { StatsStrip }");
    expect(source).toContain("<CinematicHero />");
    expect(source).toContain("<StatsStrip />");
    expect(source).toContain("<StoryProcess />");

    expect(source.indexOf("<CinematicHero />")).toBeLessThan(
      source.indexOf("<StatsStrip />")
    );
    expect(source.indexOf("<StatsStrip />")).toBeLessThan(
      source.indexOf("<StoryProcess />")
    );
  });
});
