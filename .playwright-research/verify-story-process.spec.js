const { test, expect } = require('@playwright/test');

test('verify hero handoff and workflow stack', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2500);

  const initialHeader = await page.locator('header').evaluate((node) => {
    const style = getComputedStyle(node);
    return { opacity: style.opacity, transform: style.transform };
  });

  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 7.2, behavior: 'instant' }));
  await page.waitForTimeout(1500);

  const afterHeroHeader = await page.locator('header').evaluate((node) => {
    const style = getComputedStyle(node);
    return { opacity: style.opacity, transform: style.transform };
  });

  await page.evaluate(() => {
    const section = document.querySelector('#how-it-works');
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top + 360;
    window.scrollTo({ top, behavior: 'instant' });
  });
  await page.waitForTimeout(1500);

  const stackInfo = await page.evaluate(() => {
    const stack = document.querySelector('[data-workflow-stack="true"]');
    const layers = stack ? [...stack.children].map((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        opacity: style.opacity,
        zIndex: style.zIndex,
      };
    }) : [];
    const copy = document.querySelector('#how-it-works .lg\\:flex .font-mono');
    const body = document.querySelector('#how-it-works .lg\\:flex .font-body');
    return {
      layerCount: layers.length,
      layers,
      copyEyebrow: copy?.textContent?.trim() ?? null,
      copyBody: body?.textContent?.trim() ?? null,
    };
  });

  await page.screenshot({ path: '/tmp/workflow-section-3001.png' });
  console.log(JSON.stringify({ initialHeader, afterHeroHeader, stackInfo }, null, 2));

  expect(stackInfo.layerCount).toBe(5);
});
