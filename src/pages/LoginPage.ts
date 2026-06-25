import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for /login.
 *
 * Locator strategy (most stable first):
 *   1. getByRole / getByLabel  -> survives styling & class changes, tied to accessibility.
 *   2. getByPlaceholder        -> fallback when no label is wired up.
 *   3. data-testid             -> ask the dev team to add these; then swap them in here.
 *
 * If the app exposes data-testid attributes, prefer:
 *   this.page.getByTestId('login-email')
 */
export class LoginPage extends BasePage {
  readonly path = '/login';

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly keepLoggedInCheckbox: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleButton: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    super(page);
    // Hebrew labels from the live site. getByLabel resolves placeholder/aria too.
    this.emailInput = page.getByLabel('כתובת אימייל').or(page.getByPlaceholder(/אימייל|email/i));
    this.passwordInput = page.locator('input[type="password"]');
    this.keepLoggedInCheckbox = page.getByRole('checkbox', { name: 'השאר אותי מחובר' });
    this.submitButton = page.getByRole('button', { name: 'כניסה' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'שכחת את הסיסמה?' });
    this.googleButton = page.getByRole('button', { name: /Google/i });
    this.signupLink = page.getByRole('link', { name: 'יצירת חשבון' });
  }

  async waitUntilReady(): Promise<void> {
    await expect(this.page.getByText('ברוך הבא')).toBeVisible();
  }

  /** Fill the form and submit. Does NOT assert success — let the test decide. */
  async login(email: string, password: string, keepLoggedIn = false): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (keepLoggedIn) {
      await this.keepLoggedInCheckbox.check();
    }
    await this.submitButton.click();
  }

  /** The validation/error message shown on a failed login. */
  async expectErrorVisible(): Promise<void> {
    await expect(this.toast()).toBeVisible();
  }
}
