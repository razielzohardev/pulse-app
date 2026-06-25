import { Page, expect, Locator } from '@playwright/test';

/**
 * BasePage holds behaviour every page shares.
 * All concrete page objects extend this so they get navigation,
 * waiting and small reusable helpers for free.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Each page defines its own path, e.g. "/login". */
  abstract readonly path: string;

  /** Navigate to this page and wait until the network is idle. */
  async goto(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitUntilReady();
  }

  /**
   * Override in subclasses to assert a stable "page is loaded" signal
   * (a heading, a form, etc). Default just waits for the body.
   */
  async waitUntilReady(): Promise<void> {
    await expect(this.page.locator('body')).toBeVisible();
  }

  /** Assert the current URL matches an expected path (string or regex). */
  async expectPath(expected: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(
      typeof expected === 'string' ? new RegExp(`${escapeRegExp(expected)}/?$`) : expected,
    );
  }

  /** Convenience: a visible toast / alert message, if the app shows one. */
  toast(): Locator {
    // role="alert" is the conventional, accessible way apps surface errors.
    return this.page.getByRole('alert');
  }

  /** Assert a toast/alert is visible — usable directly from tests. */
  async expectToastVisible(): Promise<void> {
    await expect(this.toast()).toBeVisible();
  }
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
