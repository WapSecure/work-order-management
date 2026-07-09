import { test, expect } from '@playwright/test';

test.describe('Work Order E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/work-orders');
  });

  test('should create a work order', async ({ page }) => {
    await page.click('text=Create Work Order');
    await page.fill('input[name="title"]', 'E2E Test Order');
    await page.fill('textarea[name="description"]', 'This is an E2E test');
    await page.selectOption('select[name="priority"]', 'High');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=E2E Test Order')).toBeVisible();
  });

  test('should view work order detail', async ({ page }) => {
    // First create a work order
    await page.click('text=Create Work Order');
    await page.fill('input[name="title"]', 'Detail Test Order');
    await page.fill('textarea[name="description"]', 'Testing detail view');
    await page.selectOption('select[name="priority"]', 'Medium');
    await page.click('button[type="submit"]');

    // Then view it
    await page.click('text=Detail Test Order');
    await expect(page.locator('h1')).toContainText('Detail Test Order');
    await expect(page.locator('text=Testing detail view')).toBeVisible();
  });

  test('should edit a work order', async ({ page }) => {
    // First create a work order
    await page.click('text=Create Work Order');
    await page.fill('input[name="title"]', 'Edit Test Order');
    await page.fill('textarea[name="description"]', 'Testing edit');
    await page.selectOption('select[name="priority"]', 'Low');
    await page.click('button[type="submit"]');

    // Then edit it
    await page.click('text=Edit Test Order');
    await page.click('text=Edit');
    await page.fill('input[name="title"]', 'Updated Test Order');
    await page.selectOption('select[name="status"]', 'In Progress');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Updated Test Order')).toBeVisible();
  });

  test('should delete a work order', async ({ page }) => {
    // First create a work order
    await page.click('text=Create Work Order');
    await page.fill('input[name="title"]', 'Delete Test Order');
    await page.fill('textarea[name="description"]', 'Testing delete');
    await page.selectOption('select[name="priority"]', 'High');
    await page.click('button[type="submit"]');

    // Then delete it
    await page.click('text=Delete Test Order');
    const deleteButton = page.locator('button', { hasText: 'Delete' }).last();
    await deleteButton.click();

    // Handle the confirmation modal - click the Delete button in the modal
    const modalDeleteButton = page.locator('button', { hasText: 'Delete' }).first();
    await modalDeleteButton.click();

    await expect(page.locator('text=Delete Test Order')).not.toBeVisible();
  });

  test('should filter work orders by status', async ({ page }) => {
    // Select status filter
    await page.selectOption('select[aria-label="Filter by status"]', 'Open');

    // Wait for results
    await page.waitForTimeout(500);

    // Check that all visible orders have status "Open"
    const statusElements = await page.locator('td:nth-child(3)').all();
    for (const el of statusElements) {
      const text = await el.textContent();
      expect(text).toBe('Open');
    }
  });

  test('should search work orders by title', async ({ page }) => {
    // Type search query (minimum 3 characters)
    await page.fill('input[placeholder*="Search"]', 'E2E');

    // Wait for results
    await page.waitForTimeout(500);

    // Check that results contain the search term
    const titleElements = await page.locator('td:first-child a').all();
    for (const el of titleElements) {
      const text = await el.textContent();
      expect(text?.toLowerCase()).toContain('e2e');
    }
  });
});
