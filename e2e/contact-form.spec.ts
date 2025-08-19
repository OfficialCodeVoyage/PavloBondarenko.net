import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check form exists
    const form = await page.locator('form');
    await expect(form).toBeVisible();
    
    // Check all fields are present
    await expect(page.locator('input[name="full-name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Click submit without filling fields
    await page.click('button[type="submit"]');
    
    // Check for HTML5 validation messages
    const nameInput = await page.locator('input[name="full-name"]');
    const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('should validate email format', async ({ page }) => {
    // Fill in invalid email
    await page.fill('input[name="full-name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Check for email validation error
    const emailInput = await page.locator('input[name="email"]');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toContain('email');
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Mock the API response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message sent successfully!' })
      });
    });
    
    // Fill in the form
    await page.fill('input[name="full-name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for E2E testing.');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Check for success message
    const successAlert = await page.locator('.alert-success');
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText('successfully');
    
    // Form should be reset
    await expect(page.locator('input[name="full-name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
  });

  test('should show error message on API failure', async ({ page }) => {
    // Mock API error
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error occurred' })
      });
    });
    
    // Fill and submit form
    await page.fill('input[name="full-name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Check for error message
    const errorAlert = await page.locator('.alert-danger');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('error');
  });

  test('should handle rate limiting', async ({ page }) => {
    // Mock rate limit response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
      });
    });
    
    // Fill and submit form
    await page.fill('input[name="full-name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Check for rate limit message
    const errorAlert = await page.locator('.alert-danger');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText('Too many requests');
  });

  test('should disable submit button while submitting', async ({ page }) => {
    // Slow down the API response
    await page.route('/api/contact', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Success' })
      });
    });
    
    // Fill form
    await page.fill('input[name="full-name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Click submit
    const submitButton = await page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Button should be disabled and show "Sending..."
    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toContainText('Sending...');
    
    // Wait for response
    await page.waitForResponse('/api/contact');
    
    // Button should be enabled again
    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toContainText('Send Message');
  });
});