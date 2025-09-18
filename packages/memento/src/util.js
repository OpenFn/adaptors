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

/**
 * Handles rate limiting by tracking request timestamps and calculating wait times
 * @private
 * @param {Array} requestTimes - Array of request timestamps
 * @param {number} requestCount - Current request count
 * @param {Object} configs - Request configurations
 * @param {number} {configs.throttleTime} - Time in ms to wait between throttled requests
 * @param {number} {configs.maxRequests} - Maximum number of requests allowed within throttleTime
 * @param {number} {configs.waitingTime} - Time in ms to wait between requests
 * @returns {Promise<void>} Promise that resolves after appropriate wait time
 */
function handleRateLimit(requestTimes, requestCount, configs) {
  const { throttleTime, maxRequests, waitingTime } = configs;
  const now = Date.now();

  const hasRequestTimes = requestTimes.length > 0;
  const oldestRequestAge = now - requestTimes[0];
  const isRequestExpired = oldestRequestAge > throttleTime;

  while (hasRequestTimes && isRequestExpired) {
    requestTimes.shift();
  }

  const hasMaxRequests = requestTimes.length >= maxRequests;
  const timeUntilOldestExpires = throttleTime - oldestRequestAge + waitingTime; // 1s buffer

  if (hasMaxRequests) {
    console.log(`Rate limiting: waiting ${timeUntilOldestExpires / 1000}s`);
    return new Promise(resolve => setTimeout(resolve, timeUntilOldestExpires));
  }

  if (requestCount > 0) {
    console.log(`Waiting ${waitingTime / 1000}s between requests`);
    return new Promise(resolve => setTimeout(resolve, waitingTime));
  }

  return;
}

/**
 * Handles rate limit exceeded error by calculating appropriate wait time
 * @param {Array} requestTimes - Array of request timestamps
 * @param {Object} configs - Request configurations
 * @param {number} configs.throttleTime - Time in ms to wait between throttled requests
 * @param {number} configs.waitingTime - Time in ms to wait between requests
 * @private
 * @returns {Promise<void>} Promise that resolves after appropriate wait time
 */
function handleRateLimitExceeded(requestTimes, configs) {
  const { throttleTime, waitingTime } = configs;
  const now = Date.now();
  const hasRequestTimes = requestTimes.length > 0;
  const oldestRequestAge = now - requestTimes[0];
  const isRequestExpired = oldestRequestAge > throttleTime;

  while (hasRequestTimes && isRequestExpired) {
    requestTimes.shift();
  }
  const timeUntilOldestExpires = throttleTime - oldestRequestAge + waitingTime;
  console.log(`Rate limit exceeded, waiting ${timeUntilOldestExpires / 1000}s`);
  return new Promise(resolve => setTimeout(resolve, timeUntilOldestExpires));
}

export const DEFAULT_THROTTLE_TIME = 6e4; // 1 minute
export const DEFAULT_MAX_REQUESTS = 10; // 10 requests per minute
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

  const bufferTime = 1000; //1s buffer
  const minimumTimePerRequest = Math.ceil(throttleTime / maxRequests);
  const safeDelayBetweenRequests = minimumTimePerRequest + bufferTime;
  const waitingTime = snoozeTime ?? safeDelayBetweenRequests;

  const results = { entries: [], nextPageToken: undefined, revision: 0 };

  let requestCount = 0;
  let requestTimes = [];
  let shouldFetchMoreContent = false;
  let requestOptions = { query, ...restOfOptions };

  do {
    let response;
    try {
      await handleRateLimit(requestTimes, requestCount, {
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
