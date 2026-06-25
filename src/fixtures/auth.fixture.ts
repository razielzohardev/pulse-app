import { test as authedTest, expect } from './base.fixture';

/**
 * authedTest = the base test (page objects + api helper).
 *
 * To make a spec run authenticated, load the saved session at the top of
 * the file with Playwright's canonical pattern:
 *
 *   import { authedTest as test, expect } from '../../src/fixtures/auth.fixture';
 *   import { STORAGE_STATE } from '../../src/utils/paths';
 *
 *   test.use({ storageState: STORAGE_STATE });
 *
 *   test('dashboard loads', async ({ page }) => { ... });
 *
 * The session itself is created once by auth.setup.ts.
 */
export { authedTest, expect };
