import { APIRequestContext, request } from '@playwright/test';
import { getEnvConfig } from '../config/environments';

/**
 * ApiHelper talks directly to the backend to set up / tear down test data
 * WITHOUT driving the UI. This is the single biggest lever for stable,
 * fast tests: create your preconditions over HTTP, then verify the one
 * thing under test in the browser.
 *
 * NOTE: The exact endpoints below are placeholders — confirm the real
 * paths/payloads with your backend and adjust. The pattern stays the same.
 */
export class ApiHelper {
  private constructor(private readonly ctx: APIRequestContext) {}

  /** Build an isolated request context bound to the active environment. */
  static async create(): Promise<ApiHelper> {
    const env = getEnvConfig();
    const ctx = await request.newContext({
      baseURL: env.apiURL,
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    return new ApiHelper(ctx);
  }

  async dispose(): Promise<void> {
    await this.ctx.dispose();
  }

  /**
   * Register a user via API so UI login tests have a known-good account.
   * Returns the credentials you can then use to log in through the UI.
   */
  async registerUser(input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{ email: string; password: string }> {
    const res = await this.ctx.post('/auth/register', { data: input });
    if (!res.ok()) {
      throw new Error(
        `registerUser failed: ${res.status()} ${await safeBody(res)}`,
      );
    }
    return { email: input.email, password: input.password };
  }

  /** Authenticate over API and return a bearer token for further API calls. */
  async loginAndGetToken(email: string, password: string): Promise<string> {
    const res = await this.ctx.post('/auth/login', { data: { email, password } });
    if (!res.ok()) {
      throw new Error(`loginAndGetToken failed: ${res.status()} ${await safeBody(res)}`);
    }
    const body = await res.json();
    return body.token ?? body.accessToken;
  }

  /** Clean up a user after a test (best-effort; ignore 404s). */
  async deleteUser(email: string, token: string): Promise<void> {
    const res = await this.ctx.delete(`/users/${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok() && res.status() !== 404) {
      throw new Error(`deleteUser failed: ${res.status()} ${await safeBody(res)}`);
    }
  }
}

async function safeBody(res: { text(): Promise<string> }): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '<no body>';
  }
}
