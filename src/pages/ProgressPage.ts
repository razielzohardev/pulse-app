import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProgressPage extends BasePage {
  readonly path = '/progress';

  readonly currentStreakSection: Locator;
  readonly weeklySummarySection: Locator;
  readonly shareProgressButton: Locator;

  constructor(page: Page) {
    super(page);
    this.currentStreakSection = page.getByText('רצף נוכחי');
    this.weeklySummarySection = page.getByText('סיכום שבועי');
    this.shareProgressButton = page.getByRole('button', { name: 'שיתוף התקדמות' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('התקדמות').first()).toBeVisible();
  }
}
