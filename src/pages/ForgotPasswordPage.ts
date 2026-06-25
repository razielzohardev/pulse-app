import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly path = '/forgot-password';

  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly backToLoginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('כתובת אימייל').or(page.getByPlaceholder(/אימייל|email/i));
    this.submitButton = page.getByRole('button', { name: 'שליחת קישור' });
    this.backToLoginLink = page.getByRole('link', { name: 'חזרה לכניסה' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('איפוס סיסמה')).toBeVisible();
  }
}
