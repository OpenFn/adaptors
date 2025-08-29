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
export async function requestWithPagination(state, method, path, params = {}) {
  const {
    autoThrottle = true,
    throttleTime = DEFAULT_THROTTLE_TIME,
    query = {},
    ...restOfOptions
  } = params;

  const results = { entries: [], nextPageToken: undefined, revision: 0 };
  let countRequests = 0;
  let requestOptions = { query, ...restOfOptions };
  let shouldFetchMoreContent = false;
  let shouldThrottle = autoThrottle;

  do {
    let response;
    try {
      shouldThrottle = autoThrottle && countRequests >= 10;
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
