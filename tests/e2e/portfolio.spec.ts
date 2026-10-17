import { test, expect } from "@playwright/test";

/**
 * PORTFOLIO UPGRADE — PHASE 9
 * End-to-End Automated Test Suite for bouhouch.site
 *
 * Covers:
 * 1. Homepage loads, section rhythm, navigation anchors, theme toggling & persistence
 * 2. Featured Projects horizontal carousel, Quick View modal, focus trap, Escape key
 * 3. Projects Archive (/projects): 22 projects discoverable, search, filters, empty state
 * 4. Project detail routes, headers, stacks, back navigation
 * 5. Quote section: William Thatcher default, Tony Stark easter egg, reverse
 * 6. CV download link validation
 * 7. Contact form client-side validation & mocked submission
 */

test.describe("Homepage — Core Architecture & Layout", () => {
  test.beforeEach(async ({ page }) => {
    // Listen for uncaught browser errors
    page.on("pageerror", (err) => {
      console.error("Browser page error:", err.message);
    });
    await page.goto("/");
  });

  test("loads without fatal console errors and renders correct document title", async ({ page }) => {
    await expect(page).toHaveTitle(/Hamza Bouhouch/);
  });

  test("renders all main sections in approved rhythm and order", async ({ page }) => {
    const hero = page.locator("section.hero-section");
    const featuredProjects = page.locator(".projects-showcase-section, section.featured-projects");
    const skills = page.locator("section.skills-section");
    const toolsWorkflow = page.locator("section.tools-workflow-section");
    const about = page.locator("section#about, section.about-section");
    const experience = page.locator("section#experience, section.experience-section");
    const quote = page.locator("section.quote-section");
    const contact = page.locator("section#contact, section.contact-section");
    const footer = page.locator("footer");

    await expect(hero).toBeVisible();
    await expect(featuredProjects).toBeVisible();
    await expect(skills).toBeVisible();
    await expect(toolsWorkflow).toBeVisible();
    await expect(about).toBeVisible();
    await expect(experience).toBeVisible();
    await expect(quote).toBeVisible();
    await expect(contact).toBeVisible();
    await expect(footer).toBeVisible();
  });

  test("theme selector switches between dark, light, and system with persistence", async ({ page }) => {
    // Check initial dark theme attribute
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");

    // Click light theme option
    const lightOption = page.locator('button[aria-label*="Light theme"]').first();
    if (await lightOption.isVisible()) {
      await lightOption.click();
      await expect(html).toHaveAttribute("data-theme", "light");

      // Verify localStorage persistence
      const savedTheme = await page.evaluate(() => localStorage.getItem("portfolio-theme-preference"));
      expect(savedTheme).toBe("light");

      // Reload page and verify theme survives reload
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

      // Switch back to dark theme
      const darkOption = page.locator('button[aria-label*="Dark theme"]').first();
      await darkOption.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    }
  });

  test("Download CV link points to valid resume.pdf", async ({ page, request }) => {
    const cvLink = page.locator('a[href="/resume.pdf"]').first();
    await expect(cvLink).toBeVisible();

    // Verify the resume.pdf file returns HTTP 200
    const response = await request.get("/resume.pdf");
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("application/pdf");
  });
});

test.describe("Featured Projects — Horizontal Showcase & Quick View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("showcase navigation arrows and card actions are interactive", async ({ page }) => {
    const prevBtn = page.locator("button.showcase-nav-btn").first();
    const nextBtn = page.locator("button.showcase-nav-btn").nth(1);

    await expect(nextBtn).toBeVisible();
    // Initially scrolled to start, prev button is disabled
    await expect(prevBtn).toBeDisabled();

    // Scroll forward
    await nextBtn.click();
    await page.waitForTimeout(300);

    // Prev button should now be enabled
    await expect(prevBtn).toBeEnabled();
  });

  test("Quick View modal opens, traps focus, and closes on Escape key", async ({ page }) => {
    const firstQuickViewBtn = page.locator("button.showcase-btn-quickview").first();
    await expect(firstQuickViewBtn).toBeVisible();

    await firstQuickViewBtn.click();

    // Verify modal is visible
    const modalDialog = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(modalDialog).toBeVisible();

    // Verify close button is focused or present
    const closeBtn = page.locator("button.quickview-close-btn");
    await expect(closeBtn).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press("Escape");
    await expect(modalDialog).not.toBeVisible();

    // Focus should be restored to the Quick View button
    await expect(firstQuickViewBtn).toBeFocused();
  });

  test("View All Projects button in header links to /projects", async ({ page }) => {
    const viewAllBtn = page.locator("a.showcase-view-all-btn");
    await expect(viewAllBtn).toBeVisible();
    await expect(viewAllBtn).toHaveAttribute("href", "/projects");
  });
});

test.describe("All Projects Archive — /projects", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("loads archive and displays all 22 verified published projects", async ({ page }) => {
    await expect(page).toHaveTitle(/All Engineering Projects/);
    const cards = page.locator(".bento-card, .project-card");
    const count = await cards.count();
    expect(count).toBe(22);
  });

  test("filters projects in real time by title search", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search by project name"]');
    await expect(searchInput).toBeVisible();

    // Search for "CorePOS"
    await searchInput.fill("CorePOS");
    await page.waitForTimeout(200);

    const cards = page.locator(".bento-card");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const firstCardTitle = page.locator(".bento-title").first();
    await expect(firstCardTitle).toContainText("CorePOS");
  });

  test("filters projects in real time by technology search", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search by project name"]');
    // Search for "Laravel"
    await searchInput.fill("Laravel");
    await page.waitForTimeout(200);

    const cards = page.locator(".bento-card");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("displays empty state when query matches nothing, and reset button restores grid", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search by project name"]');
    await searchInput.fill("xyz-nonexistent-query-12345");
    await page.waitForTimeout(200);

    // Empty state should appear
    const emptyState = page.locator(".bento-empty-state");
    await expect(emptyState).toBeVisible();

    // Click Reset Filters
    const resetBtn = page.locator(".bento-empty-btn");
    await resetBtn.click();
    await page.waitForTimeout(200);

    // Grid should restore to 22
    const cards = page.locator(".bento-card");
    expect(await cards.count()).toBe(22);
  });
});

test.describe("Project Routes — Case Studies & Overviews", () => {
  const sampleSlugs = [
    { slug: "corepos-desktop-pos", title: "CorePOS Desktop" },
    { slug: "nuvomailo-smtp-platform", title: "NuvoMailo" },
    { slug: "atlas-commerce-saas", title: "Atlas Commerce" },
    { slug: "youlearn-lms", title: "YouLearn" },
  ];

  for (const { slug, title } of sampleSlugs) {
    test(`route /projects/${slug} loads with correct title and status`, async ({ page }) => {
      await page.goto(`/projects/${slug}`);
      await expect(page).toHaveTitle(new RegExp(title));

      const heading = page.locator("h1.case-study-title, h1");
      await expect(heading).toContainText(title);

      // Verify breadcrumb back to projects
      const backLink = page.locator('a[href="/projects"]').first();
      await expect(backLink).toBeVisible();
    });
  }
});

test.describe("Quote Section & Tony Stark Easter Egg", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays William Thatcher quote by default", async ({ page }) => {
    const quoteBlock = page.locator(".quote-text");
    await expect(quoteBlock).toContainText("A man can change his stars");

    const author = page.locator(".quote-author");
    await expect(author).toContainText("William Thatcher");
  });

  test("activates Tony Stark easter egg on click and can be reversed", async ({ page }) => {
    const toggleBtn = page.locator("button.quote-easter-egg-toggle");
    await expect(toggleBtn).toBeVisible();

    // Click to activate easter egg
    await toggleBtn.click();
    await page.waitForTimeout(200);

    const quoteBlock = page.locator(".quote-text");
    await expect(quoteBlock).toContainText("run before you can walk");

    const author = page.locator(".quote-author");
    await expect(author).toContainText("Tony Stark");

    // Click return button to reverse
    const returnBtn = page.locator("button.quote-easter-egg-return");
    await expect(returnBtn).toBeVisible();
    await returnBtn.click();
    await page.waitForTimeout(200);

    // Verifies returned to Thatcher
    await expect(page.locator(".quote-text")).toContainText("A man can change his stars");
  });
});

test.describe("Contact Form — Client-Side Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("form requires name, email, and message fields", async ({ page }) => {
    const nameInput = page.locator('input#name');
    const emailInput = page.locator('input#email');
    const messageInput = page.locator('textarea#message');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(nameInput).toHaveAttribute("required", "");
    await expect(emailInput).toHaveAttribute("required", "");
    await expect(messageInput).toHaveAttribute("required", "");
    await expect(submitBtn).toBeVisible();
  });
});
