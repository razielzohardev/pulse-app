import { faker } from '@faker-js/faker';
import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Signup', () => {
  test('signup form renders all controls', async ({ signupPage }) => {
    await signupPage.goto();

    await expect(signupPage.firstNameInput).toBeVisible();
    await expect(signupPage.lastNameInput).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
    await expect(signupPage.confirmPasswordInput).toBeVisible();
    await expect(signupPage.submitButton).toBeVisible();
  });

  test('login link navigates to /login', async ({ signupPage, page }) => {
    await signupPage.goto();
    await signupPage.loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('mismatched passwords shows error', async ({ signupPage }) => {
    await signupPage.goto();
    await signupPage.signup({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'Password123',
      confirmPassword: 'DifferentPassword456',
    });
    await expect(signupPage.toast()).toBeVisible();
  });

  // ── Validation & Errors ────────────────────────────────────────────────────

  test('submitting empty form stays on /signup', async ({ signupPage, page }) => {
    await signupPage.goto();
    await signupPage.submitButton.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('invalid email format stays on /signup', async ({ signupPage, page }) => {
    await signupPage.goto();
    await signupPage.firstNameInput.fill(faker.person.firstName());
    await signupPage.lastNameInput.fill(faker.person.lastName());
    await signupPage.emailInput.fill('notanemail');
    await signupPage.passwordInput.fill('Password123!');
    await signupPage.confirmPasswordInput.fill('Password123!');
    await signupPage.submitButton.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('short password shows error', async ({ signupPage }) => {
    await signupPage.goto();
    await signupPage.signup({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: '123',
      confirmPassword: '123',
    });
    await expect(signupPage.toast()).toBeVisible();
  });
});
