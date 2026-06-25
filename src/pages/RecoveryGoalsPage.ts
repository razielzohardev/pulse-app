import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecoveryGoalsPage extends BasePage {
  readonly path = '/recovery-goals';

  // List view
  readonly newGoalButton: Locator;
  readonly emptyStateMessage: Locator;

  // Goal creation form (visible after clicking newGoalButton)
  readonly goalNameInput: Locator;
  readonly descriptionInput: Locator;
  readonly createGoalButton: Locator;
  readonly cancelButton: Locator;
  readonly physicalCategory: Locator;
  readonly mentalCategory: Locator;
  readonly lifestyleCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.newGoalButton = page.getByRole('button', { name: 'יעד חדש' });
    this.emptyStateMessage = page.getByText('עדיין לא יצרת יעדים');

    // Dialog is only in the DOM when the form is open — this locator is self-gating.
    this.goalNameInput = page.getByRole('dialog').locator('input[type="text"]');
    this.descriptionInput = page.locator('textarea');
    this.createGoalButton = page.getByRole('button', { name: 'צור יעד' });
    this.cancelButton = page.getByRole('button', { name: 'ביטול' });
    this.physicalCategory = page.getByRole('button', { name: 'פיזי' });
    this.mentalCategory = page.getByRole('button', { name: 'מנטלי' });
    this.lifestyleCategory = page.getByRole('button', { name: 'אורח חיים' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('יעדים').first()).toBeVisible();
  }
}
