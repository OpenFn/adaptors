import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export function prepareNextState(state, response) {
  const { body, ...responseWithoutBody } = response;
  if (!responseWithoutBody) {
    return composeNextState(state, body);
  }
  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
}
export function request(state, method, path, opts = {}) {
  const { baseURL, apiVersion, username, password } = state.configuration;

  let baseUrl;

  if (!state.configuration.baseUrl && baseURL) {
    baseUrl = baseURL;
    console.warn(
      'No baseUrl found in state.configuration. baseURL will be used instead, but this will be deprecated in the future.'
    );
  } else {
    baseUrl = state.configuration.baseUrl;
  }

  const { data = {}, query = {}, headers = {}, parseAs = 'json' } = opts;

  const authHeaders = makeBasicAuthHeader(username, password);

  const options = {
    body: data,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    query: {
      format: 'json',
      ...query,
    },
    parseAs,
    baseUrl: `${baseUrl}/api/${apiVersion}`,
  };

  return commonRequest(method, path, options).then(logResponse);
}

export async function paginateRequest(state, method, path, opts = {}) {
  const { baseURL, apiVersion, username, password } = state.configuration;

  let baseUrl;

  if (!state.configuration.baseUrl && baseURL) {
    baseUrl = baseURL;
    console.warn(
      'No baseUrl found in state.configuration. baseURL will be used instead, but this will be deprecated in the future.'
    );
  } else {
    baseUrl = state.configuration.baseUrl;
  }

  const {
    data = {},
    query = {},
    headers = {},
    parseAs = 'json',
    start = 0,
    limit = 10000,
    pageSize = 1000,
  } = opts;

  const authHeaders = makeBasicAuthHeader(username, password);

  let count = 0;

  const options = {
    body: data,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    query: {
      format: 'json',
      start,
      limit:
        limit < Infinity
          ? // if the user requested a limit, ensure we don't get more than this
            Math.min(pageSize, limit - count)
          : // Otherwise the limit is the user-specified page size
            pageSize,
      ...query,
    },
    parseAs,
    baseUrl: `${baseUrl}/api/${apiVersion}`,
  };

  const response = {
    body: {
      count: 0,
      previous: null,
      next: null,
      results: [],
    },
  };

  do {
    const { body } = await commonRequest(method, path, options).then(
      logResponse
    );

    count += pageSize;

    response.body.next = body.next;
    response.body.previous = body.previous;
    response.body.count = body.count;
    response.body.results.push(...body.results);
    if (body.next) {
      const nextUrl = new URL(body.next);

      options.query = {
        ...options.query,
        start: nextUrl.searchParams.get('start'),
      };
    } else {
      break;
    }
  } while (count < limit);
  return response;
}
