import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response) => {
  // eslint-disable-next-line no-unused-vars
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

// This helper function will call out to the IBIPIMO backend service
// and add Bearer token authorization headers
// Refer to the common request function for options and details
export const request = (configuration = {}, method, path, options) => {
  assertRelativeUrl(path);

  const { baseUrl, apiToken } = configuration;

  // Build authorization header with Bearer token
  const authHeader = apiToken ? { Authorization: `Bearer ${apiToken}` } : {};

  // Define custom error messages for IBIPIMO API
  const errors = {
    400: 'Bad Request - Validation failed or invalid format',
    401: 'Unauthorized - Invalid or missing access token',
    403: 'Forbidden - Insufficient permissions',
    404: 'Not Found - No results found for provided UIDs',
    409: 'Conflict - Duplicate integration attempt',
    500: 'Internal Server Error - Server processing failed',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  const opts = {
    // Force the response to be parsed as JSON
    parseAs: 'json',

    // Include the error map
    errors,

    // Set the baseUrl from the config object
    baseUrl,

    ...options,

    // Add headers including Bearer token
    headers: {
      'content-type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
      ...authHeader,
      ...options.headers,
    },
  };

  // Build the path safely
  const safePath = nodepath.join(path);

  // Make the actual request
  return commonRequest(method, safePath, opts);
};
