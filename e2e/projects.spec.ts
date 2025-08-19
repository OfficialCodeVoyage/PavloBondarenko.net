import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should display projects page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Projects/);
    await expect(page.locator('h1').first()).toContainText('All Projects');
  });

  test('should display project cards', async ({ page }) => {
    // Check that project items exist
    const projectItems = await page.locator('.project-item');
    const count = await projectItems.count();
    
    // Should have at least one project
    expect(count).toBeGreaterThan(0);
    
    // First project should be visible
    await expect(projectItems.first()).toBeVisible();
  });

  test('should have working external project links', async ({ page, context }) => {
    // Get first project link
    const projectLink = await page.locator('.project-item a[target="_blank"]').first();
    
    // Check it has proper attributes for security
    await expect(projectLink).toHaveAttribute('rel', /noopener/);
    await expect(projectLink).toHaveAttribute('rel', /noreferrer/);
    
    // Get href
    const href = await projectLink.getAttribute('href');
    expect(href).toBeTruthy();
    
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click the link
    await projectLink.click();
    
    // New tab should open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    // URL should match the href
    expect(newPage.url()).toContain(href!.replace('https://', ''));
    
    await newPage.close();
  });

  test('should display project images', async ({ page }) => {
    // Get all project images
    const projectImages = await page.locator('.project-item img');
    const count = await projectImages.count();
    
    // Should have project images
    expect(count).toBeGreaterThan(0);
    
    // Check first image is loaded
    const firstImage = projectImages.first();
    await expect(firstImage).toBeVisible();
    
    // Image should have proper attributes
    await expect(firstImage).toHaveAttribute('alt');
    
    // Check image is actually loaded
    const naturalWidth = await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('should display project titles', async ({ page }) => {
    // Check for project titles
    const projectTitles = await page.locator('.project-item h4');
    const count = await projectTitles.count();
    
    // Should have titles
    expect(count).toBeGreaterThan(0);
    
    // Check some known projects exist
    const allTitles = await projectTitles.allTextContents();
    const hasKnownProjects = allTitles.some(title => 
      title.includes('PrescribeRX') || 
      title.includes('SizeMe') || 
      title.includes('CougarGPT')
    );
    
    expect(hasKnownProjects).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Projects should stack vertically on mobile
    const projectItems = await page.locator('.project-item');
    const firstProject = await projectItems.first().boundingBox();
    const secondProject = await projectItems.nth(1).boundingBox();
    
    if (firstProject && secondProject) {
      // Second project should be below first project on mobile
      expect(secondProject.y).toBeGreaterThan(firstProject.y + firstProject.height);
    }
  });

  test('should handle hover states on desktop', async ({ page }) => {
    // Only test on desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Get first project item
    const projectItem = await page.locator('.project-item').first();
    
    // Hover over project
    await projectItem.hover();
    
    // Overlay should be visible (if implemented)
    const overlay = await projectItem.locator('.overlay-link');
    if (await overlay.count() > 0) {
      await expect(overlay).toBeVisible();
    }
  });

  test('should not have broken images', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Check all images are loaded successfully
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.filter(img => !img.complete || img.naturalWidth === 0).length;
    });
    
    expect(brokenImages).toBe(0);
  });
});