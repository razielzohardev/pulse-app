import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { LoginPage } from '../src/pages/LoginPage';
import { hasCredentials, getStandardUser } from '../src/utils/credentials';
import { STORAGE_STATE } from '../src/utils/paths';

/**
 * Runs ONCE before the browser projects (declared as their dependency in
 * playwright.config.ts). Logs in through the UI and saves cookies +
 * localStorage to disk. Every authed test then reuses that state instead
 * of logging in again.
 */
setup('authenticate', async ({ page }) => {
  // No creds? Skip cleanly so unauthenticated suites (smoke/login/signup) still run.
  if (!hasCredentials()) {
    setup.skip(true, 'Set TEST_USER_EMAIL_<ENV> / TEST_USER_PASSWORD_<ENV> to enable authenticated tests');
    return;
  }

  const user = getStandardUser();

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  // keepLoggedIn omitted: storageState persists the session for test workers already.
  await loginPage.login(user.email, user.password);

  // Wait for a reliable post-login signal instead of a fixed sleep.
  // Adjust this to whatever proves the user is in (URL change, avatar, etc).
  await expect(page).not.toHaveURL(/\/login/, { timeout: 15_000 });

  fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE });
});
