import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('Dashboard', () => {
  test('loads on /dashboard after login', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('shows welcome message', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await expect(dashboardPage.welcomeText).toBeVisible();
  });

  test('shows daily check-in prompt', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await expect(dashboardPage.dailyPrompt).toBeVisible();
    await expect(dashboardPage.startCheckInButton).toBeVisible();
  });

  test('"התחל עדכון יומי" navigates to /daily-checkin', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await dashboardPage.startCheckInButton.click();
    await expect(page).toHaveURL(/\/check-in/);
  });
});
