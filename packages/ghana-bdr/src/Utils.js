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
    console.log(`[BDR DEBUG] Auth → ${credentials.statusCode}:`, errorBody);
    throwError('BDR_AUTH_ERROR', {
      statusCode: credentials.statusCode,
      body: errorBody,
    });
  }

  // Token endpoint returns plain JSON (not double-encoded like data endpoints)
  const data = await credentials.body.json();
  const { access_token, expires_in, refresh_token } = data.api_data || {};
  const expiresAt = Date.now() + expires_in * 1000 - 30000; // 30 seconds buffer

  return {
    accessToken: access_token,
    expiresAt,
    refreshToken: refresh_token, // store for potential refresh endpoint use
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

  // Please note that the BDR system responds with a valid JSON response, but in
  // string format. We read the raw text and JSON.parse it here.
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

        // Log payload for debugging
        if (data) {
          console.log(`[BDR DEBUG] ${method} ${safePath} body:`, JSON.stringify(data, null, 2));
        }

        const response = await client.request(args);
        if (response.statusCode >= 400) {
          const errorBody = await response.body.text();
          // Log for debugging before throwing
          console.log(`[BDR DEBUG] ${method} ${safePath} → ${response.statusCode}:`, errorBody);
          throwError('BDR_ERROR', {
            code: response.statusCode,
            description: response.statusMessage,
            body: errorBody,
          });
        }

        logResponse(response);
        const nextState = await prepareNextState(state, response);
        return nextState;
      } catch (err) {
        // If we get a 401 and we haven't retried yet, clear auth and retry
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
export const validateRequestBody = (request, sample) => {
  // Simple implementation for now - always returns true
  // TODO: Implement proper validation based on sample
  return true;
};
