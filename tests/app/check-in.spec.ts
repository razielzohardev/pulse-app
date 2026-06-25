import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('Daily Check-in', () => {
  test('loads on /daily-checkin', async ({ checkInPage, page }) => {
    await checkInPage.goto();
    await expect(page).toHaveURL(/\/daily-checkin/);
  });

  test('shows mood section', async ({ checkInPage }) => {
    await checkInPage.goto();
    await expect(checkInPage.moodSection).toBeVisible();
  });

  test('shows pain level section', async ({ checkInPage }) => {
    await checkInPage.goto();
    await expect(checkInPage.painSection).toBeVisible();
  });

  test('"שמור עדכון יומי" button is visible', async ({ checkInPage }) => {
    await checkInPage.goto();
    await expect(checkInPage.saveButton).toBeVisible();
  });
});
