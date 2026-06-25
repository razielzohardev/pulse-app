import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('Community', () => {
  test('loads on /community', async ({ communityPage, page }) => {
    await communityPage.goto();
    await expect(page).toHaveURL(/\/community/);
  });

  test('shows community space section', async ({ communityPage }) => {
    await communityPage.goto();
    await expect(communityPage.communitySpaceSection).toBeVisible();
  });

  test('shows featured discussions section', async ({ communityPage }) => {
    await communityPage.goto();
    await expect(communityPage.featuredDiscussionsSection).toBeVisible();
  });

  test('"פוסט חדש" button is visible', async ({ communityPage }) => {
    await communityPage.goto();
    await expect(communityPage.newPostButton).toBeVisible();
  });
});
