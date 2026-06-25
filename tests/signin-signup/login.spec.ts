import { test, expect } from '../../src/fixtures/base.fixture';
import { hasCredentials, getStandardUser } from '../../src/utils/credentials';

test.describe('Login', () => {
  test('login form renders all controls', async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.googleButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('rejects invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('nobody@pulse-test.com', 'WrongPassword1');

    // Stays on /login rather than navigating to an authed area.
    // (If the app renders a role="alert", also call loginPage.expectErrorVisible().)
    await loginPage.expectPath('/login');
  });

  test('signup link navigates to /signup', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.signupLink.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  /**
   * Positive login is verified by the auth.setup.ts flow already.
   * If you want an explicit UI assertion too, supply real creds via env:
   *   TEST_USER_EMAIL=... TEST_USER_PASSWORD=...
   */
  test('valid credentials log the user in @auth', async ({ loginPage, page }) => {
    test.skip(!hasCredentials(), 'Set TEST_USER_EMAIL_<ENV> / TEST_USER_PASSWORD_<ENV> to run this test');

    const user = getStandardUser();
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await expect(page).not.toHaveURL(/\/login/);
  });

  // ── Validation & Errors ────────────────────────────────────────────────────

  test('submitting empty form stays on /login', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('invalid email format stays on /login', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.emailInput.fill('notanemail');
    await loginPage.passwordInput.fill('somepassword');
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('wrong password shows error toast', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('nobody@pulse-test.com', 'WrongPass999!');
    await expect(loginPage.toast()).toBeVisible();
  });
});
