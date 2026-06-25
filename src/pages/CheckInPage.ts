import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckInPage extends BasePage {
  readonly path = '/daily-checkin';

  readonly moodSection: Locator;
  readonly painSection: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.moodSection = page.getByText('מצב רוח');
    this.painSection = page.getByText('רמת כאב');
    this.saveButton = page.getByRole('button', { name: 'שמור עדכון יומי' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('סקירת בריאות')).toBeVisible();
  }
}
