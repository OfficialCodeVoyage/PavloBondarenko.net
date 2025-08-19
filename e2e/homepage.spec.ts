import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the homepage with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Pavlo Bondarenko/);
  });

  test('should show the hero section with name', async ({ page }) => {
    const heroText = await page.locator('h1').first();
    await expect(heroText).toContainText('Pavlo Bondarenko');
  });

  test('should have working navigation links', async ({ page }) => {
    // Test About link
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL('/about');
    
    // Go back to home
    await page.goto('/');
    
    // Test Projects link
    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL('/projects');
    
    // Go back to home
    await page.goto('/');
    
    // Test Contact link
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
  });

  test('should display skills marquee', async ({ page }) => {
    const marquee = await page.locator('.marquee').first();
    await expect(marquee).toBeVisible();
    
    // Check for some skills
    await expect(marquee).toContainText('JavaScript');
    await expect(marquee).toContainText('React');
    await expect(marquee).toContainText('Python');
  });

  test('should have LinkedIn button that opens in new tab', async ({ page, context }) => {
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click LinkedIn button
    await page.click('a[href*="linkedin.com"]');
    
    // Get new page
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // Check URL contains linkedin
    expect(newPage.url()).toContain('linkedin.com');
    
    await newPage.close();
  });

  test('should render Three.js background without errors', async ({ page }) => {
    // Check if canvas exists (Three.js renders to canvas)
    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();
    
    // Check for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait a bit for any async errors
    await page.waitForTimeout(2000);
    
    // No Three.js errors should occur
    const threeErrors = errors.filter(e => e.includes('THREE') || e.includes('WebGL'));
    expect(threeErrors).toHaveLength(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu toggle should be visible
    const menuToggle = await page.locator('.show-menu');
    await expect(menuToggle).toBeVisible();
    
    // Desktop nav should be hidden
    const desktopNav = await page.locator('.navbar-nav').first();
    await expect(desktopNav).toBeHidden();
    
    // Click menu toggle
    await menuToggle.click();
    
    // Mobile menu should be active
    await expect(menuToggle).toHaveClass(/active/);
  });
});