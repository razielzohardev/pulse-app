import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { CommunityPage } from '../pages/CommunityPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProgressPage } from '../pages/ProgressPage';
import { CheckInPage } from '../pages/CheckInPage';
import { RecoveryGoalsPage } from '../pages/RecoveryGoalsPage';
import { ApiHelper } from '../api/ApiHelper';

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  communityPage: CommunityPage;
  forgotPasswordPage: ForgotPasswordPage;
  dashboardPage: DashboardPage;
  progressPage: ProgressPage;
  checkInPage: CheckInPage;
  recoveryGoalsPage: RecoveryGoalsPage;
};

type Helpers = {
  api: ApiHelper;
};

export const test = base.extend<Pages & Helpers>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  communityPage: async ({ page }, use) => {
    await use(new CommunityPage(page));
  },
  forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  progressPage: async ({ page }, use) => {
    await use(new ProgressPage(page));
  },
  checkInPage: async ({ page }, use) => {
    await use(new CheckInPage(page));
  },
  recoveryGoalsPage: async ({ page }, use) => {
    await use(new RecoveryGoalsPage(page));
  },

  // API helper with automatic teardown so contexts never leak.
  api: async ({}, use) => {
    const api = await ApiHelper.create();
    await use(api);
    await api.dispose();
  },
});

export { expect } from '@playwright/test';
