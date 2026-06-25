import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Smoke', () => {
  test('login page loads', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('signup page loads', async ({ signupPage }) => {
    await signupPage.goto();
    await expect(signupPage.emailInput).toBeVisible();
    await expect(signupPage.submitButton).toBeVisible();
  });

  test('forgot-password page loads', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await expect(forgotPasswordPage.emailInput).toBeVisible();
    await expect(forgotPasswordPage.submitButton).toBeVisible();
  });

  test('root landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'התחברות' })).toBeVisible();
  });
});
