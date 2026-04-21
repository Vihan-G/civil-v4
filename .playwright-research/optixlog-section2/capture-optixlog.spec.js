const { test } = require("playwright/test");

test("inspect optixlog how-it-works section", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("https://optixlog.com/#how-it-works", {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });
  await page.waitForTimeout(4000);

  const details = await page.evaluate(() => {
    const target = document.querySelector("#how-it-works");

    if (!target) {
      return { found: false };
    }

    const ancestors = [];
    let current = target;

    while (current && ancestors.length < 8) {
      const rect = current.getBoundingClientRect();
      ancestors.push({
        tag: current.tagName,
        id: current.id || null,
        className: current.className || null,
        height: rect.height,
        top: rect.top,
        scrollHeight: current.scrollHeight
      });
      current = current.parentElement;
    }

    return {
      found: true,
      viewportHeight: window.innerHeight,
      pageHeight: document.documentElement.scrollHeight,
      targetRect: target.getBoundingClientRect().toJSON(),
      ancestors,
      text: target.textContent
    };
  });

  console.log(JSON.stringify(details, null, 2));
});
