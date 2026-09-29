import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
});

test("desktop content, project filters and native case-study dialog", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("HARSHIT");
  await expect(page.locator(".project-story")).toHaveCount(3);
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await expect(page.locator(".project-story:visible")).toHaveCount(0);
  await expect(page.locator(".archive-row:visible")).toHaveCount(2);
  await page.getByRole("button", { name: "All work" }).click();
  const opener = page.getByRole("link", { name: "View WAFER-GPT case study" });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#dialog-title")).toHaveText("WAFER-GPT");
  await expect(
    page.getByRole("heading", { name: "How it connects" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(errors).toEqual([]);
});

test("mobile menu supports keyboard, Escape and section navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(page.locator(".nav-sections a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator(".custom-cursor")).not.toBeVisible();
});

test("GitHub failure and malformed data preserve useful source links", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#github").scrollIntoViewIfNeeded();
  await expect(page.locator("#github-status")).toContainText(
    "Live updates unavailable",
  );
  await expect(page.locator("#github-repos a")).toHaveCount(3);
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({ json: { unexpected: true } }),
  );
  await page.reload();
  await page.locator("#github").scrollIntoViewIfNeeded();
  await expect(page.locator("#github-status")).toContainText(
    "Live updates unavailable",
  );
});

test("GitHub renders real API metadata and caches the response", async ({
  page,
}) => {
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({
      json: [
        {
          name: "WAFER-GPT",
          html_url: "https://github.com/Harshitcodes154/WAFER-GPT",
          language: "Python",
          pushed_at: "2026-09-20T12:00:00Z",
          stargazers_count: 0,
        },
      ],
    }),
  );
  await page.goto("/");
  await page.locator("#github").scrollIntoViewIfNeeded();
  await expect(page.locator("#github-status")).toContainText(
    "Live public repository data",
  );
  await expect(page.locator("#github-repos small").first()).toContainText(
    "Python",
  );
  await page.reload();
  await page.locator("#github").scrollIntoViewIfNeeded();
  await expect(page.locator("#github-status")).toContainText("Cached");
});

test("reduced motion, assets, résumé and semantic accessibility", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const broken = await page.locator("img").evaluateAll(async (images) => {
    for (const img of images) {
      img.loading = "eager";
      try {
        await img.decode();
      } catch {
        /* Report below. */
      }
    }
    return images.filter((img) => !img.naturalWidth).map((img) => img.src);
  });
  expect(broken).toEqual([]);
  expect(
    await page
      .locator(".portrait-image")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(".custom-cursor")).not.toBeVisible();
  const resume = await page.request.get("/assets/Harshit_Kumar_Resume.pdf");
  expect(resume.ok()).toBeTruthy();
  expect(resume.headers()["content-type"]).toBe("application/pdf");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole("link", { name: "View WAFER-GPT case study" }).click();
  const modalResult = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(modalResult.violations).toEqual([]);
});

test("missing résumé offers an email request and missing WebP falls back", async ({
  page,
}) => {
  await page.route("**/assets/Harshit_Kumar_Resume.pdf", (route) =>
    route.fulfill({ status: 404 }),
  );
  await page.route("**/assets/portrait/*.webp", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("[data-resume]").first()).toHaveAttribute(
    "href",
    /mailto:/,
  );
  await expect(page.locator(".portrait-image")).toHaveAttribute(
    "src",
    /original.jpeg/,
  );
  await expect
    .poll(() =>
      page.locator(".portrait-image").evaluate((img) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
});

test("server-rendered content works without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator("#about h2")).toBeVisible();
  await expect(page.locator(".project-story")).toHaveCount(3);
  await expect(page.locator(".hero-actions a").first()).toHaveAttribute(
    "href",
    "#projects",
  );
  await expect(page.locator(".visual-open").first()).toHaveAttribute(
    "href",
    "https://github.com/Harshitcodes154/WAFER-GPT",
  );
  await context.close();
});

test("a missing project illustration preserves the readable case study", async ({ page }) => {
  await page.route("**/assets/projects/wafer.svg", route => route.fulfill({ status: 404 }));
  await page.goto("/");
  await page.getByRole("link", { name: "View WAFER-GPT case study" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".dialog-visual")).toBeHidden();
  await expect(page.getByRole("heading", { name: "The problem", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore source" })).toHaveAttribute("href", "https://github.com/Harshitcodes154/WAFER-GPT");
});

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px has no horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.locator('img').evaluateAll(async images => {
      await Promise.all(images.map(async img => {
        img.loading = 'eager';
        await img.decode();
      }));
    });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `artifacts/hero-${width}.png` });
    await page.locator("#projects").evaluate(section => window.scrollTo(0, section.offsetTop - 90));
    await page.screenshot({ path: `artifacts/projects-${width}.png` });
    if (width === 1440 || width === 390) {
      await page.screenshot({
        path: `artifacts/full-${width}.png`,
        fullPage: true,
      });
    }
  });
}
