/**
 * INVARIANT: Must export function named `request`
 * - Infrastructure/helpers ONLY
 * - NO operational functions
 * - To extend: wrap it (e.g., requestWithRetry)
 *
 * Docs: ./wiki/build-a-new-adaptor.md, ./wiki/best-practice.md
 */
import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

/**
 * Serialize a credential for the Inji Verify V2 request body.
 * Objects (JSON-LD) become JSON strings; strings (SD-JWT / CWT hex) pass through.
 * @param {object|string} credential
 * @returns {string}
 */
export const toVerifiableCredential = credential => {
  if (credential == null) {
    throw new Error('A verifiable credential is required');
  }

  if (typeof credential === 'string') {
    return credential;
  }

  return JSON.stringify(credential);
};

/**
 * Call the Inji Verify HTTP API.
 * Auth is not required by the VC verification endpoints.
 * @param {object} configuration - Adaptor configuration (must include baseUrl)
 * @param {string} method - HTTP method
 * @param {string} path - Relative path under baseUrl
 * @param {object} options - Request options forwarded to commonRequest
 */
export const request = (configuration = {}, method, path, options = {}) => {
  const { baseUrl } = configuration;
  const { headers = {}, ...rest } = options;

  const errors = {
    400: 'Invalid verification request payload',
    500: 'Inji Verify verification or status-list check failed',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...rest,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  return commonRequest(method, path, opts);
};
