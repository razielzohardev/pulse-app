import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('Logout', () => {
  test('user menu button is visible on dashboard', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await dashboardPage.waitUntilReady();
    await expect(dashboardPage.userMenuButton).toBeVisible();
  });

  test('clicking user menu opens dropdown with account options', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await dashboardPage.userMenuButton.click();
    // TQ dropdown shows: פרופיל, הגדרות, התנתק
    await expect(page.getByRole('menu')).toBeVisible();
    await expect(page.getByText('פרופיל')).toBeVisible();
    await expect(page.getByText('התנתק')).toBeVisible();
  });

  test('logout clears session and redirects to landing page', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await dashboardPage.userMenuButton.click();
    await dashboardPage.logoutMenuItem.click();
    // App redirects to root "/" (marketing landing page) after logout — not /login.
    await expect(page).toHaveURL('/');
    // Confirm the session is cleared: the landing page shows a "התחברות" sign-in link.
    await expect(page.getByRole('link', { name: 'התחברות' })).toBeVisible();
  });
});
