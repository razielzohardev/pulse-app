import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CommunityPage extends BasePage {
  readonly path = '/community';

  readonly communitySpaceSection: Locator;
  readonly featuredDiscussionsSection: Locator;
  readonly newPostButton: Locator;

  constructor(page: Page) {
    super(page);
    this.communitySpaceSection = page.getByText('מרחב הקהילה');
    this.featuredDiscussionsSection = page.getByText('דיונים בולטים');
    this.newPostButton = page.getByRole('button', { name: 'פוסט חדש' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('קהילה').first()).toBeVisible();
  }
}
