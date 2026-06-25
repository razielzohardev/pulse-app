/**
 * Central place that maps TEST_ENV -> URLs and settings.
 *
 * Override any value with environment variables (useful in CI secrets):
 *   TEST_ENV=testing
 *   BASE_URL=https://...
 *   API_URL=https://.../api
 */

export type EnvName = 'testing' | 'prod';

export interface EnvConfig {
  name: EnvName;
  baseURL: string;
  apiURL: string;
}

const ENVIRONMENTS: Record<EnvName, EnvConfig> = {
  // dev: { ... } // לא רלוונטי כרגע
  testing: {
    name: 'testing',
    baseURL: 'https://pulse-git-development-bar-cohens-projects.vercel.app',
    apiURL: 'https://pulse-git-development-bar-cohens-projects.vercel.app/api',
  },
  prod: {
    name: 'prod',
    baseURL: 'https://pulse-rehab.vercel.app',
    apiURL: 'https://pulse-rehab.vercel.app/api',
  },
};

export function getEnvConfig(): EnvConfig {
  const envName = (process.env.TEST_ENV ?? 'testing') as EnvName;

  const base = ENVIRONMENTS[envName];
  if (!base) {
    throw new Error(
      `Unknown TEST_ENV "${envName}". Use one of: ${Object.keys(ENVIRONMENTS).join(', ')}`,
    );
  }

  // Allow per-run overrides without editing this file.
  return {
    ...base,
    baseURL: process.env.BASE_URL ?? base.baseURL,
    apiURL: process.env.API_URL ?? base.apiURL,
  };
}
