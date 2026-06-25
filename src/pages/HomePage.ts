import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly path = '/';

  constructor(page: Page) {
    super(page);
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.locator('body')).toBeVisible();
  }
}
