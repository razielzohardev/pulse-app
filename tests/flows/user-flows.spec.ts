import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('User Flows', () => {
  test('dashboard → check-in: "התחל עדכון יומי" navigates to check-in page', async ({
    dashboardPage,
    checkInPage,
    page,
  }) => {
    await dashboardPage.goto();
    await dashboardPage.waitUntilReady();
    await dashboardPage.startCheckInButton.click();
    await expect(page).toHaveURL(/\/check-in/, { timeout: 25_000 });
    await expect(checkInPage.moodSection).toBeVisible();
  });

  test('sidebar → community: clicking "קהילה" navigates to community forum', async ({
    dashboardPage,
    communityPage,
    page,
  }) => {
    await dashboardPage.goto();
    await dashboardPage.waitUntilReady();
    await page.getByRole('button', { name: 'קהילה' }).click();
    await expect(page).toHaveURL(/\/community/, { timeout: 25_000 });
    await communityPage.waitUntilReady();
  });

  test('sidebar → progress: clicking "התקדמות" navigates to progress page', async ({
    dashboardPage,
    progressPage,
    page,
  }) => {
    await dashboardPage.goto();
    await dashboardPage.waitUntilReady();
    await page.getByRole('button', { name: 'התקדמות' }).click();
    await expect(page).toHaveURL(/\/progress/, { timeout: 25_000 });
    await progressPage.waitUntilReady();
  });

  test('sidebar → recovery goals: clicking "יעדי החלמה" navigates to recovery goals', async ({
    dashboardPage,
    recoveryGoalsPage,
    page,
  }) => {
    await dashboardPage.goto();
    await dashboardPage.waitUntilReady();
    await page.getByRole('button', { name: 'יעדי החלמה' }).click();
    await expect(page).toHaveURL(/\/recovery-goals/, { timeout: 25_000 });
    await recoveryGoalsPage.waitUntilReady();
  });
});
