/**
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

export const assertNonEmptyString = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
};

export const assertAllowedValue = (value, allowedValues, label) => {
  assertNonEmptyString(value, label);

  if (!allowedValues.includes(value)) {
    throw new Error(
      `Invalid ${label}: ${value}. Expected one of: ${allowedValues.join(', ')}.`
    );
  }
};

const logResponseSafely = response => {
  const redactedQuery = response.query?.token
    ? { ...response.query, token: '[REDACTED]' }
    : response.query;
  const redactedHeaders = response.headers?.['X-Client-Secret']
    ? { ...response.headers, 'X-Client-Secret': '[REDACTED]' }
    : response.headers;

  logResponse({ ...response, query: redactedQuery, headers: redactedHeaders });

  return response;
};

/**
 * Docs: https://docs.airqo.net/airqo-rest-api-documentation
 *
 * @param {object} configuration 
 * @param {string} method 
 * @param {string} path 
 * @param {object} options 
 */
export const request = (configuration = {}, method, path, options = {}) => {
  const {
    baseUrl = 'https://api.airqo.net/api/v2',
    token,
    clientSecret,
  } = configuration;

  if (!token || typeof token !== 'string' || !token.trim()) {
    throw new Error('token missing from configuration.');
  }

  assertRelativeUrl(path);

  const { query = {}, headers = {}, ...rest } = options;

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
    baseUrl,
    query: {
      token,
      ...query,
    },
    headers: {
      ...headers,
      ...(clientSecret ? { 'X-Client-Secret': clientSecret } : {}),
    },
    ...rest,
  };

  return commonRequest(method, path, opts).then(logResponseSafely);
};
