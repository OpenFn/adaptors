import undici from 'undici';
import nodepath from 'node:path';
import {
  throwError,
  logResponse,
  expandReferences,
} from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';

let client;
const getClient = baseUrl => {
  if (baseUrl && !client) {
    // Use Agent (not Client) so it handles HTTPS connections correctly
    client = new undici.Agent();
  } else if (!client) {
    throw new Error('No HTTP client configured. Call setMockClient() for tests or provide a baseUrl.');
  }
  return client;
};

export const setMockClient = mockClient => {
  client = mockClient;
};

export const resetClient = () => {
  client = null;
};

/**
 * Get or refresh access token using the long-lived api_token (configuration.token).
 * Returns an object with { accessToken, expiresAt } and updates state.auth.
 * @param {Object} state - The current state
 * @returns {Promise<{accessToken: string, expiresAt: number}>}
 */
const getAccessToken = async state => {
  const { auth } = state;
  const now = Date.now();
  // If we have a valid token (with 30s buffer), return it
  if (auth && auth.accessToken && auth.expiresAt && auth.expiresAt > now + 30000) {
    return auth;
  }

  // Fetch new token using the long-lived api_token
  const { baseUrl, token } = state.configuration;
  if (!token) {
    throw new Error('Missing configuration.token (long-lived API token)');
  }

  getClient(baseUrl);
  const authUrl = new URL('/api/v1/UserManagementService/integrations/auth/token', baseUrl);
  const credentials = await client.request({
    origin: authUrl.origin,
    method: 'POST',
    path: authUrl.pathname + authUrl.search,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: token, // The long-lived api_token
    },
  });

  if (credentials.statusCode >= 400) {
    const errorBody = await credentials.body.text();
    throwError('BDR_AUTH_ERROR', {
      statusCode: credentials.statusCode,
      description: credentials.statusText || `HTTP ${credentials.statusCode}`,
      body: errorBody,
    });
  }

  // Token endpoint returns plain JSON
  const data = await credentials.body.json();
  const apiData = data.api_data || {};
  const { access_token, expires_in } = apiData;

  if (!access_token) {
    throwError('BDR_AUTH_ERROR', {
      description: 'Malformed token response: missing access_token. The API returned a 200 but the response did not contain a valid token.',
    });
  }

  if (!expires_in || typeof expires_in !== 'number') {
    throwError('BDR_AUTH_ERROR', {
      description: 'Malformed token response: missing or invalid expires_in.',
    });
  }

  const expiresAt = Date.now() + expires_in * 1000 - 30000; // 30 seconds buffer

  return {
    accessToken: access_token,
    expiresAt,
  };
};

/**
 * Prepare the next state after receiving a response.
 * @param {Object} state - The current state
 * @param {Object} response - The undici response object
 * @returns {Promise<Object>} The next state
 */
export const prepareNextState = async (state, response) => {
  const { body, ...responseWithoutBody } = response;

  // BDR data endpoints return standard JSON (single-encoded).
  // Read the raw text and parse once.
  const bodyText = await body.text();
  const resultAsJson = JSON.parse(bodyText);

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, resultAsJson),
    response: responseWithoutBody,
  };

  return nextState;
};

/**
 * Make an HTTP request.
 * @param {string} path - Path to resource
 * @param {Object} options - Request options (data, headers, method, query, etc.)
 * @returns {Function} A function that takes state and returns a promise of state
 */
export function request(path, options) {
  return async state => {
    let attempt = 0;
    const maxAttempts = 2; // try once, then retry on 401 after token refresh

    while (attempt < maxAttempts) {
      try {
        // Get valid access token (may update state.auth)
        const auth = await getAccessToken(state);
        // Update state with fresh auth if token changed
        if (auth.accessToken && (!state.auth || state.auth.accessToken !== auth.accessToken)) {
          state = { ...state, auth };
        }

        const { baseUrl } = state.configuration;
        getClient(baseUrl);
        const url = baseUrl ? new URL(baseUrl) : null;
        const basePath = url ? url.pathname : '/';

        const [resolvedPath, resolvedOptions] = expandReferences(
          state,
          path,
          options
        );

        const {
          data,
          headers = { 'Content-Type': 'application/json', Accept: 'application/json' },
          method = 'POST',
          query,
          ...otherOptions
        } = resolvedOptions;

        const safePath = resolvedPath
          ? nodepath.join(basePath, resolvedPath)
          : basePath;

        const args = {
          origin: url ? url.origin : undefined,
          path: safePath,
          body: data ? JSON.stringify(data) : undefined,
          headers: {
            ...headers,
            Authorization: `Bearer ${auth.accessToken}`,
          },
          method,
          query,
          ...otherOptions,
        };

        const response = await client.request(args);
        if (response.statusCode >= 400) {
          const errorBody = await response.body.text();
          throwError('BDR_ERROR', {
            code: response.statusCode,
            description: response.statusText || `HTTP ${response.statusCode}`,
            body: errorBody,
          });
        }

        logResponse(response);
        const nextState = await prepareNextState(state, response);
        return nextState;
      } catch (err) {
        // On 401, clear auth cache and retry once (token may have expired)
        // throwError sets err.code to the numeric status when statusCode is passed
        if (
          attempt < maxAttempts - 1 &&
          err.code === 401
        ) {
          // Clear auth to force token refresh on next attempt
          state = { ...state, auth: undefined };
          attempt++;
          continue;
        }
        throw err;
      }
    }
  };
}
