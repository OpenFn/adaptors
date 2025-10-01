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

export function handleRateLimit(requestTimes, requestConfig) {
  const { throttleTime, maxRequests, hasReachedLimit = false } = requestConfig;

  // const bufferTime = 1e3; //1s buffer
  const safeDelayBetweenRequests = Math.ceil(throttleTime / maxRequests);
  const delayTime = safeDelayBetweenRequests;

  if (hasReachedLimit) {
    console.log(`Rate limit exceeded, waiting ${delayTime / 1000}s`);
    return new Promise(resolve => setTimeout(resolve, delayTime));
  }

  const now = Date.now();

  while (requestTimes.length > 0 && now - requestTimes[0] > throttleTime) {
    requestTimes.shift();
  }

  const oldestRequestAge = now - requestTimes[0];
  const requestCount = requestTimes.length;
  const reachedMaxRequest = requestCount >= maxRequests;
  const timeUntilOldestExpires = throttleTime - oldestRequestAge + delayTime;

  if (reachedMaxRequest) {
    console.log(`Rate limiting: waiting ${timeUntilOldestExpires / 1000}s`);
    return new Promise(resolve => setTimeout(resolve, timeUntilOldestExpires));
  }

  const hasRequestTimes = requestCount > 0;
  if (hasRequestTimes) {
    console.log(`Waiting ${delayTime / 1000}s before next request`);
    return new Promise(resolve => setTimeout(resolve, delayTime));
  }

  return;
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
    query = {},
    ...restOfOptions
  } = params;

  const results = { entries: [], nextPageToken: undefined, revision: 0 };

  let requestCount = 0;
  let requestTimes = [];
  let shouldFetchMoreContent = false;
  let requestOptions = { query, ...restOfOptions };

  do {
    let response;
    try {
      await handleRateLimit(requestTimes, {
        throttleTime,
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
        await handleRateLimit(requestTimes, {
          throttleTime,
          maxRequests,
          hasReachedLimit: true,
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
        `Fetched ${results.entries.length} entries so far in ${requestCount} requests`
      );
    }

    shouldFetchMoreContent = results.nextPageToken !== undefined;
    requestOptions.query.pageToken = results.nextPageToken;
  } while (shouldFetchMoreContent);

  console.log(
    `Total entries: ${results.entries.length} in ${requestCount} requests`
  );
  return composeNextState(state, results);
}
