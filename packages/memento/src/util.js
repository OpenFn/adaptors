import nodepath from 'node:path';
import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  delete responseWithoutBody.query.token;
  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

const request = (state, method, path, params = {}) => {
  assertRelativeUrl(path);
  let { body = null, query, headers = {}, parseAs, ...restOfOptions } = params;

  const {
    token,
    apiVersion = 'v1',
    baseUrl = 'https://api.mementodatabase.com',
  } = state.configuration;

  const safePath = nodepath.join(apiVersion, path);

  const options = {
    ...restOfOptions,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    query: {
      token,
      ...query,
    },
    baseUrl,
    body,
    parseAs,
  };

  return commonRequest(method, safePath, options);
};

export function sendRequest(state, method, path, params = {}) {
  return request(state, method, path, params)
    .then(response => {
      logResponse(response);
      return prepareNextState(state, response);
    })
    .catch(error => {
      logResponse(error);
      throw error;
    });
}

export const DEFAULT_THROTTLE_TIME = 6e4;
export const DEFAULT_MAX_REQUESTS = 10;
/**
 * Handles rate limiting by tracking request timestamps and calculating wait times
 * @private
 * @param {Array} requestTimes - Array of request timestamps
 * @param {number} {options.requestCount} - Current request count
 * @param {number} {options.throttleTime} - Time in ms to wait between throttled requests
 * @param {number} {options.maxRequests} - Maximum number of requests allowed within throttleTime
 * @param {number} {options.waitingTime} - Time in ms to wait between requests
 * @returns {Promise<void>} Promise that resolves after appropriate wait time
 */
async function handleRateLimit(requestTimes, options) {
  const { requestCount, throttleTime, maxRequests, waitingTime } = options;
  const now = Date.now();

  // Clean up old request times (older than throttleTime)
  while (requestTimes.length > 0 && now - requestTimes[0] > throttleTime) {
    requestTimes.shift();
  }

  // If we have maxRequests requests in the last throttleTime, wait until the oldest expires
  if (requestTimes.length >= maxRequests) {
    const timeUntilOldestExpires =
      throttleTime - (now - requestTimes[0]) + waitingTime; // 1s buffer
    console.log(`Rate limiting: waiting ${timeUntilOldestExpires / 1000}s`);
    await new Promise(resolve => setTimeout(resolve, timeUntilOldestExpires));
  } else if (requestCount > 0) {
    // Wait waitingTime between requests to be safe
    console.log(`Waiting ${waitingTime / 1000}s between requests`);
    await new Promise(resolve => setTimeout(resolve, waitingTime));
  }
}

/**
 * Handles rate limit exceeded error by calculating appropriate wait time
 * @param {Array} requestTimes - Array of request timestamps
 * @param {Object} options - Options for the request
 * @param {number} options.throttleTime - Time in ms to wait between throttled requests
 * @param {number} options.waitingTime - Time in ms to wait between requests
 * @private
 * @returns {Promise<void>} Promise that resolves after appropriate wait time
 */
async function handleRateLimitExceeded(requestTimes, options) {
  const { throttleTime, waitingTime } = options;
  const now = Date.now();
  while (requestTimes.length > 0 && now - requestTimes[0] > throttleTime) {
    requestTimes.shift();
  }
  const timeUntilOldestExpires =
    requestTimes.length > 0
      ? throttleTime - (now - requestTimes[0]) + waitingTime
      : throttleTime;
  console.log(`Rate limit exceeded, waiting ${timeUntilOldestExpires / 1000}s`);
  await new Promise(resolve => setTimeout(resolve, timeUntilOldestExpires));
}

/**
 * Makes paginated API requests to fetch all available data.
 *
 * @param {Object} state - The current state object
 * @param {string} method - The HTTP method to use (GET, POST, etc.)
 * @param {string} path - The API endpoint path
 * @param {Object} [params={}] - Optional parameters for the request
 * @param {Object} [params.query] - Query parameters for the request
 * @returns {Promise<Object>} A promise that resolves to the new state with:
 *   - entries: Array of all fetched items
 *   - nextPageToken: Token for the next page (undefined when complete)
 *   - revision: Latest revision number
 * @throws {Error} If the request fails and cannot be recovered with throttling
 */
export async function requestWithPagination(state, method, path, params = {}) {
  const {
    throttleTime = DEFAULT_THROTTLE_TIME,
    maxRequests = DEFAULT_MAX_REQUESTS,
    snoozeTime,
    query = {},
    ...restOfOptions
  } = params;
  const waitingTime =
    snoozeTime ?? Math.ceil(throttleTime / maxRequests) + 1000;
  const results = { entries: [], nextPageToken: undefined, revision: 0 };
  let requestCount = 0;
  let requestOptions = { query, ...restOfOptions };
  let shouldFetchMoreContent = false;
  const requestTimes = [];

  do {
    let response;
    try {
      await handleRateLimit(requestTimes, {
        requestCount,
        throttleTime,
        waitingTime,
        maxRequests,
      });
      requestTimes.push(Date.now());
      response = await request(state, method, path, requestOptions);
    } catch (error) {
      console.log('Error:', error.body);
      if (
        error.body?.description === 'API rate limit exceeded' &&
        error.body?.code === 403
      ) {
        await handleRateLimitExceeded(requestTimes, {
          throttleTime,
          waitingTime,
        });
        requestTimes.push(Date.now());
        response = await request(state, method, path, requestOptions);
      } else {
        throw error;
      }
    }

    const { body } = response;
    results.entries.push(...body?.entries);
    results.nextPageToken = body?.nextPageToken;
    results.revision = body?.revision;
    requestCount++;

    if (requestOptions.query?.pageToken && body?.entries.length !== 0) {
      console.log(
        'Fetched',
        results.entries.length,
        'entries so far in',
        requestCount,
        'requests'
      );
    }

    shouldFetchMoreContent = results.nextPageToken !== undefined;
    requestOptions.query.pageToken = results.nextPageToken;
  } while (shouldFetchMoreContent);

  console.log(
    'Total entries:',
    results.entries.length,
    'in',
    requestCount,
    'requests'
  );
  return composeNextState(state, results);
}
