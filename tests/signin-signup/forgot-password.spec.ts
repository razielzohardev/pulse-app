import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Forgot Password', () => {
  test('forgot-password form renders', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await expect(forgotPasswordPage.emailInput).toBeVisible();
    await expect(forgotPasswordPage.submitButton).toBeVisible();
    await expect(forgotPasswordPage.backToLoginLink).toBeVisible();
  });

  test('back to login link navigates to /login', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.backToLoginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('submit with valid email shows confirmation', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.emailInput.fill('test@example.com');
    await forgotPasswordPage.submitButton.click();
    await expect(forgotPasswordPage.toast()).toBeVisible();
  });

  // ── Validation & Errors ────────────────────────────────────────────────────

  test('submitting empty field stays on /forgot-password', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.submitButton.click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  test('invalid email format stays on /forgot-password', async ({ forgotPasswordPage, page }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.emailInput.fill('notanemail');
    await forgotPasswordPage.submitButton.click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });
});
