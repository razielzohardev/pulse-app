import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('Progress', () => {
  test('loads on /progress', async ({ progressPage, page }) => {
    await progressPage.goto();
    await expect(page).toHaveURL(/\/progress/);
  });

  test('shows current streak section', async ({ progressPage }) => {
    await progressPage.goto();
    await expect(progressPage.currentStreakSection).toBeVisible();
  });

  test('shows weekly summary section', async ({ progressPage }) => {
    await progressPage.goto();
    await expect(progressPage.weeklySummarySection).toBeVisible();
  });

  test('"שיתוף התקדמות" button is visible', async ({ progressPage }) => {
    await progressPage.goto();
    await expect(progressPage.shareProgressButton).toBeVisible();
  });
});
