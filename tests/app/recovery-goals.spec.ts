import { faker } from '@faker-js/faker';
import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
import { STORAGE_STATE } from '../../src/utils/paths';

test.use({ storageState: STORAGE_STATE });

test.describe('Recovery Goals', () => {
  // ── Smoke ──────────────────────────────────────────────────────────────────

  test('loads on /recovery-goals', async ({ recoveryGoalsPage, page }) => {
    await recoveryGoalsPage.goto();
    await expect(page).toHaveURL(/\/recovery-goals/);
    await recoveryGoalsPage.waitUntilReady();
  });

  test('shows "יעד חדש" button', async ({ recoveryGoalsPage }) => {
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await expect(recoveryGoalsPage.newGoalButton).toBeVisible();
  });

  // ── Form interactions ───────────────────────────────────────────────────────

  test('clicking "יעד חדש" opens goal creation form', async ({ recoveryGoalsPage }) => {
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await recoveryGoalsPage.newGoalButton.click();
    await expect(recoveryGoalsPage.goalNameInput).toBeVisible();
    await expect(recoveryGoalsPage.createGoalButton).toBeVisible();
    await expect(recoveryGoalsPage.cancelButton).toBeVisible();
  });

  test('form shows category selection buttons', async ({ recoveryGoalsPage }) => {
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await recoveryGoalsPage.newGoalButton.click();
    // Wait for modal to fully open before checking category buttons
    await expect(recoveryGoalsPage.goalNameInput).toBeVisible();
    await expect(recoveryGoalsPage.physicalCategory).toBeVisible();
    await expect(recoveryGoalsPage.mentalCategory).toBeVisible();
    await expect(recoveryGoalsPage.lifestyleCategory).toBeVisible();
  });

  test('"ביטול" closes the creation form', async ({ recoveryGoalsPage }) => {
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await recoveryGoalsPage.newGoalButton.click();
    await expect(recoveryGoalsPage.goalNameInput).toBeVisible();
    await recoveryGoalsPage.cancelButton.click();
    await expect(recoveryGoalsPage.goalNameInput).not.toBeVisible();
  });

  test('can type a goal name into the name field', async ({ recoveryGoalsPage }) => {
    const goalName = `בדיקה ${faker.number.int({ min: 1000, max: 9999 })}`;
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await recoveryGoalsPage.newGoalButton.click();
    await expect(recoveryGoalsPage.goalNameInput).toBeVisible();
    await recoveryGoalsPage.goalNameInput.fill(goalName);
    await expect(recoveryGoalsPage.goalNameInput).toHaveValue(goalName);
  });

  test('creates a new goal and it appears in the list', async ({ recoveryGoalsPage, page }) => {
    const goalName = `יעד בדיקה ${faker.number.int({ min: 1000, max: 9999 })}`;
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await recoveryGoalsPage.newGoalButton.click();
    await expect(recoveryGoalsPage.goalNameInput).toBeVisible();
    await recoveryGoalsPage.goalNameInput.fill(goalName);
    await recoveryGoalsPage.mentalCategory.click();
    await recoveryGoalsPage.createGoalButton.click();
    // Form closes and goal should appear somewhere on the page
    await expect(recoveryGoalsPage.goalNameInput).not.toBeVisible();
    await expect(page.getByText(goalName)).toBeVisible();
  });

  test('category button changes appearance when selected', async ({ recoveryGoalsPage }) => {
    await recoveryGoalsPage.goto();
    await recoveryGoalsPage.waitUntilReady();
    await recoveryGoalsPage.newGoalButton.click();
    await expect(recoveryGoalsPage.physicalCategory).toBeVisible();
    const classBefore = await recoveryGoalsPage.physicalCategory.evaluate(el => el.className);
    await recoveryGoalsPage.physicalCategory.click();
    const classAfter = await recoveryGoalsPage.physicalCategory.evaluate(el => el.className);
    // Tailwind class string changes when a category is selected
    expect(classAfter).not.toEqual(classBefore);
  });
});
