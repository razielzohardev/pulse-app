export interface UserCredentials {
  email: string;
  password: string;
}

export function hasCredentials(): boolean {
  const env = (process.env.TEST_ENV ?? 'testing').toUpperCase();
  const email = process.env[`TEST_USER_EMAIL_${env}`] ?? process.env.TEST_USER_EMAIL;
  const password = process.env[`TEST_USER_PASSWORD_${env}`] ?? process.env.TEST_USER_PASSWORD;
  return !!(email && password);
}

export function getStandardUser(): UserCredentials {
  const env = (process.env.TEST_ENV ?? 'testing').toUpperCase();
  const email = process.env[`TEST_USER_EMAIL_${env}`] ?? process.env.TEST_USER_EMAIL;
  const password = process.env[`TEST_USER_PASSWORD_${env}`] ?? process.env.TEST_USER_PASSWORD;
  if (!email || !password) {
    throw new Error(
      `Missing credentials for env "${env.toLowerCase()}". Set TEST_USER_EMAIL_${env} / TEST_USER_PASSWORD_${env}`,
    );
  }
  return { email, password };
}
