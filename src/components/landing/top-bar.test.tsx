import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("TopBar", () => {
  test("hides during the hero and fades in after the hero pin releases", () => {
    const source = readFileSync(new URL("./top-bar.tsx", import.meta.url), "utf8");

    expect(source).toContain('const [showHeader, setShowHeader] = useState(false);');
    expect(source).toContain('id: "top-bar-hero-visibility"');
    expect(source).toContain('start: "top top"');
    expect(source).toContain('end: "bottom bottom"');
    expect(source).toContain("const heroStart = heroTrigger.offsetTop;");
    expect(source).toContain("const heroEnd = heroStart + heroTrigger.offsetHeight - window.innerHeight;");
    expect(source).toContain("setShowHeader(window.scrollY > heroEnd);");
    expect(source).toContain("onEnter: () => setShowHeader(false)");
    expect(source).toContain("onEnterBack: () => setShowHeader(false)");
    expect(source).toContain("onLeave: () => setShowHeader(true)");
    expect(source).toContain("onLeaveBack: () => setShowHeader(false)");
    expect(source).toContain("translate-y-[-100%] opacity-0");
    expect(source).toContain("translate-y-0 opacity-100");
  });
});
