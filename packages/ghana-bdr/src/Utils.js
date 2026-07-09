import {
  request as commonRequest,
  logResponse,
  expandReferences,
  throwError,
} from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';

const TOKEN_PATH = '/api/v1/UserManagementService/integrations/auth/token';

/**
 * Get or refresh the short-lived access token using the long-lived api_token
 * (configuration.token).
 * @param {Object} state - The current state
 * @returns {Promise<{accessToken: string, expiresAt: number}>}
 */
const getAccessToken = async state => {
  const { auth } = state;
  if (auth?.accessToken && auth.expiresAt > Date.now()) {
    return auth;
  }

  const { baseUrl, token } = state.configuration;
  if (!token) {
    throw new Error('Missing configuration.token (long-lived API token)');
  }

  const response = await commonRequest('POST', TOKEN_PATH, {
    baseUrl,
    parseAs: 'json',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Token: token, // The long-lived api_token
    },
  });
  logResponse(response);

  const { access_token, expires_in } = response.body?.api_data ?? {};

  if (!access_token) {
    throwError('BDR_AUTH_ERROR', {
      description:
        'Malformed token response: missing access_token. The API returned a 200 but the response did not contain a valid token.',
    });
  }

  if (!expires_in || typeof expires_in !== 'number') {
    throwError('BDR_AUTH_ERROR', {
      description: 'Malformed token response: missing or invalid expires_in.',
    });
  }

  return {
    accessToken: access_token,
    expiresAt: Date.now() + expires_in * 1000 - 30000, // 30 seconds buffer
  };
};

/**
 * Prepare the next state after receiving a response.
 * @param {Object} state - The current state
 * @param {Object} response - The response from language-common's request helper
 * @returns {Object} The next state
 */
export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

/**
 * Make an HTTP request.
 * @param {string} path - Path to resource
 * @param {Object} options - Request options (data, headers, method, query, etc.)
 * @returns {Function} A function that takes state and returns a promise of state
 */
export function request(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const { baseUrl } = state.configuration;
    const {
      data,
      headers = {},
      method = 'POST',
      query,
      ...otherOptions
    } = resolvedOptions;

    let attempt = 0;
    const maxAttempts = 2; // try once, then retry on 401 after token refresh

    while (attempt < maxAttempts) {
      // Get a valid access token and cache it on state for later operations.
      // This sits outside the try block so a bad long-lived token fails
      // immediately instead of being retried.
      const auth = await getAccessToken(state);
      state = { ...state, auth };

      try {
        const response = await commonRequest(method, resolvedPath, {
          baseUrl,
          // BDR data endpoints return standard JSON (single-encoded)
          parseAs: 'json',
          body: data,
          query,
          ...otherOptions,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers,
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        logResponse(response);
        return prepareNextState(state, response);
      } catch (err) {
        // On 401, clear the cached token and retry once (it may have expired)
        if (attempt < maxAttempts - 1 && err.statusCode === 401) {
          state = { ...state, auth: undefined };
          attempt++;
          continue;
        }
        throw err;
      }
    }
  };
}
