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
/**
 * Makes paginated API requests to fetch all available data.
 *
 * @param {Object} state - The current state object
 * @param {string} method - The HTTP method to use (GET, POST, etc.)
 * @param {string} path - The API endpoint path
 * @param {Object} [params={}] - Optional parameters for the request
 * @param {number} [params.throttleTime] - Time in ms to wait between throttled requests
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
    query = {},
    ...restOfOptions
  } = params;

  const results = { entries: [], nextPageToken: undefined, revision: 0 };
  let countRequests = 0;
  let requestOptions = { query, ...restOfOptions };
  let shouldFetchMoreContent = false;
  let shouldThrottle = true;

  do {
    let response;
    try {
      shouldThrottle = countRequests >= 10;
      if (shouldThrottle) {
        console.log('Throttling for 1 minute to avoid rate limit');
        await new Promise(resolve => setTimeout(resolve, throttleTime));
      }
      response = await request(state, method, path, requestOptions);
    } catch (error) {
      if (
        shouldThrottle ||
        error.body?.description === 'API rate limit exceeded'
      ) {
        console.log('Rate limit exceeded, throttling for 1 minute');
        await new Promise(resolve => setTimeout(resolve, throttleTime));
        response = await request(state, method, path, requestOptions);
      } else {
        throw error;
      }
    }

    const { body } = response;
    results.entries.push(...body?.entries);
    results.nextPageToken = body?.nextPageToken;
    results.revision = body?.revision;
    countRequests++;

    if (requestOptions.query?.pageToken && body?.entries.length !== 0) {
      console.log(
        'Fetched',
        results.entries.length,
        'entries so far in',
        countRequests,
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
    countRequests,
    'requests'
  );
  return composeNextState(state, results);
}
