import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly path = '/dashboard';

  readonly welcomeText: Locator;
  readonly dailyPrompt: Locator;
  readonly startCheckInButton: Locator;
  readonly communityActivitySection: Locator;

  readonly userMenuButton: Locator;
  readonly logoutMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeText = page.getByText('ברוך שובך');
    this.dailyPrompt = page.getByText('מוכן לעדכון היומי?');
    this.startCheckInButton = page.getByRole('link', { name: /התחל עדכון יומי/ })
      .or(page.getByRole('button', { name: /התחל עדכון יומי/ }));
    this.communityActivitySection = page.getByText('פעילות הקהילה');

    // User avatar button (shows initials like "TQ") in the top nav.
    // "HE" is the language selector and comes first in DOM order, so exclude it.
    this.userMenuButton = page.locator('button')
      .filter({ hasText: /^[A-Z]{1,2}$/ })
      .filter({ hasNotText: /^HE$/ })
      .first();
    // The TQ dropdown renders a role="menuitem" button — use exact role to avoid matching the inner span.
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'התנתק' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('לוח הבקרה')).toBeVisible();
  }
}
