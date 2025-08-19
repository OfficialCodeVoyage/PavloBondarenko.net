import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between all pages', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Navigate to About
    await page.click('a[href="/about"]:visible');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About');
    
    // Navigate to Projects
    await page.click('a[href="/projects"]:visible');
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1').first()).toContainText('All Projects');
    
    // Navigate to Contact
    await page.click('a[href="/contact"]:visible');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText("Let's get in touch");
    
    // Navigate back to Home
    await page.click('a[href="/"]:visible');
    await expect(page).toHaveURL('/');
  });

  test('should have working logo link on all pages', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/contact'];
    
    for (const path of pages) {
      await page.goto(path);
      
      // Click logo to go home
      await page.click('.navbar-brand');
      await expect(page).toHaveURL('/');
    }
  });

  test('should maintain header across all pages', async ({ page }) => {
    const pages = ['/', '/about', '/projects', '/contact'];
    
    for (const path of pages) {
      await page.goto(path);
      
      // Header should be visible
      const header = await page.locator('header');
      await expect(header).toBeVisible();
      
      // Logo should be visible
      const logo = await page.locator('.navbar-brand');
      await expect(logo).toBeVisible();
      
      // LinkedIn button should be visible
      const linkedinBtn = await page.locator('a[href*="linkedin.com"]');
      await expect(linkedinBtn).toBeVisible();
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Mobile menu toggle should be visible
    const menuToggle = await page.locator('.show-menu');
    await expect(menuToggle).toBeVisible();
    
    // Open mobile menu
    await menuToggle.click();
    await expect(menuToggle).toHaveClass(/active/);
    
    // Navigate to About via mobile menu
    await page.click('.mobile-menu a[href="/about"]');
    await expect(page).toHaveURL('/about');
    
    // Menu should be closed after navigation
    await expect(menuToggle).not.toHaveClass(/active/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through navigation
    await page.keyboard.press('Tab'); // Skip to first link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // Home
    await page.keyboard.press('Tab'); // About
    
    // Press Enter on About link
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/about');
  });

  test('should handle browser back/forward buttons', async ({ page }) => {
    // Navigate through pages
    await page.goto('/');
    await page.click('a[href="/about"]:visible');
    await page.click('a[href="/projects"]:visible');
    await page.click('a[href="/contact"]:visible');
    
    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/projects');
    
    await page.goBack();
    await expect(page).toHaveURL('/about');
    
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Go forward
    await page.goForward();
    await expect(page).toHaveURL('/about');
  });

  test('should handle 404 pages', async ({ page }) => {
    // Navigate to non-existent page
    const response = await page.goto('/non-existent-page');
    
    // Should return 404 status
    expect(response?.status()).toBe(404);
    
    // Should show 404 page
    await expect(page.locator('h1')).toContainText('404');
  });
});