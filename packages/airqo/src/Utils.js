/**
 * INVARIANT: Must export a function named `request`.
 * This file contains infrastructure/helper functions ONLY.
 * No operational (job-facing) functions belong here.
 */
import { composeNextState } from '@openfn/language-common';
import {
  assertRelativeUrl,
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

/**
 * Builds the next OpenFn state from an AirQo API response.
 * Merges the response body into `state.data`, moves previous data into
 * `state.references`, and attaches the HTTP response metadata to `state.response`.
 */
export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

// Logs the request/response summary without leaking the `token` query param.
const logResponseSafely = response => {
  if (response.query?.token) {
    const redactedQuery = { ...response.query, token: '[REDACTED]' };
    logResponse({ ...response, query: redactedQuery });
  } else {
    logResponse(response);
  }

  return response;
};

/**
 * INVARIANT: Must be named `request`.
 * Makes an authenticated HTTP request to the AirQo API.
 * Authentication is via a `token` query parameter as required by the AirQo API.
 * Docs: https://docs.airqo.net/airqo-rest-api-documentation
 *
 * @param {object} configuration - state.configuration ({ token, baseUrl })
 * @param {string} method - HTTP method (GET)
 * @param {string} path - API path relative to baseUrl (e.g. 'devices/metadata/sites')
 * @param {object} options - Additional options (query, headers, etc.)
 */
export const request = (configuration = {}, method, path, options = {}) => {
  const { baseUrl = 'https://api.airqo.net/api/v2', token } = configuration;

  if (!token || typeof token !== 'string' || !token.trim()) {
    throw new Error('token missing from configuration.');
  }

  assertRelativeUrl(path);

  const { query = {}, ...rest } = options;

  const errors = {
    400: 'Bad Request - Invalid AirQo request parameters',
    401: 'Unauthorized - Invalid or missing AirQo token',
    403: 'Forbidden - AirQo request is not permitted',
    404: 'Not Found - AirQo resource not found',
    429: 'Too Many Requests - AirQo rate limit exceeded',
    500: 'Internal Server Error - AirQo service failed',
    502: 'Bad Gateway - AirQo upstream service error',
    503: 'Service Unavailable - AirQo service unavailable',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl: baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
    query: {
      token,
      ...query,
    },
    ...rest,
  };

  return commonRequest(method, path, opts).then(logResponseSafely);
};
