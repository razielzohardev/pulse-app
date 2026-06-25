# Playwright tests — Pulse

End-to-end test infrastructure for [pulse-rehab.vercel.app](https://pulse-rehab.vercel.app).
TypeScript + Playwright, Page Object Model, fixtures, API helpers, and GitHub Actions CI
across Chromium, Firefox, and WebKit (Safari).

## Setup

```bash
npm ci
npx playwright install --with-deps
cp .env.example .env   # then fill in values
```

## Running tests

```bash
npm test                 # all browsers, env from .env (default: dev)
npm run test:smoke       # smoke tests only
npm run test:chromium    # single browser
npm run test:testing     # against the "testing" environment
npm run test:ui          # interactive UI mode (best for debugging)
npm run report           # open the last HTML report
npm run codegen          # record selectors against the live site
```

Pick an environment per run:

```bash
TEST_ENV=testing npm test
TEST_ENV=prod npm run test:smoke
```

## Project structure

```
playwright.config.ts        Config: 3 envs, 3 browsers, retries, reporters
auth.setup.ts               Logs in once, saves session for reuse
src/
  config/environments.ts    dev / testing / prod URLs (env-overridable)
  pages/                     Page Object Model (BasePage + one class per page)
  fixtures/                  base.fixture (page objects + api) and auth.fixture
  api/ApiHelper.ts           Backend setup/teardown without the UI
  utils/                     test data generation, credentials, paths
tests/
  smoke/                     Fast page-render / navigation checks
  auth/                      Login & signup flows
  community/                 Authenticated example
.github/workflows/           CI matrix (chromium / firefox / webkit)
```

## How auth works

`auth.setup.ts` runs before the browser projects (it's their `dependency`),
logs in through the UI, and saves the session to `.auth/user.json`.
Authenticated tests use `authedTest` from `src/fixtures/auth.fixture.ts`,
which loads that session — so they never log in through the UI themselves.
Set `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` to enable it; otherwise auth
tests skip and the unauthenticated suites still run.

## Notes for adapting to the real app

- Locators use accessible roles/labels (the most stable option). If the
  dev team adds `data-testid` attributes, switch to `getByTestId(...)` in
  the page objects for even more resilience.
- `ApiHelper` endpoints (`/auth/register`, `/auth/login`, ...) are
  placeholders — confirm the real API paths and payloads and update them.
- Post-login and post-signup "success" assertions are marked with `TODO`
  comments where you need to confirm where the app redirects.
