import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string; // defaults to password
}

/**
 * Page Object for /signup.
 * Fields (Hebrew labels from the live site):
 *   שם פרטי, שם משפחה, כתובת אימייל, סיסמה, אימות סיסמה
 */
export class SignupPage extends BasePage {
  readonly path = '/signup';

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByLabel('שם פרטי');
    this.lastNameInput = page.getByLabel('שם משפחה');
    this.emailInput = page.getByLabel('כתובת אימייל');
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').last();
    this.submitButton = page.getByRole('button', { name: 'יצירת חשבון' });
    this.loginLink = page.getByRole('link', { name: 'כניסה' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('יצירת חשבון').first()).toBeVisible();
  }

  async signup(data: SignupData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword ?? data.password);
    await this.submitButton.click();
  }
}
