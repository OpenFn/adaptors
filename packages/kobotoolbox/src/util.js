import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

export function request(state, method, path, opts) {
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

// limit: 10k
// start: 0
// pageSize: 1k
// let start, limit;

// const startDigit =
//   nextUrl.searchParams.get('start') !== null
//     ? nextUrl.searchParams.get('start')
//     : 0;
// start = Number(startDigit);
// limit = nextUrl.searchParams.get('limit');

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

  console.log({ options });
  const responses = {
    body: {
      count,
      previous: null,
      next: null,
      results: [],
    },
  };

  do {
    const { body } = await commonRequest(method, path, options).then(
      logResponse
    );

    responses.body.next = body.next;
    responses.body.previous = body.previous;
    responses.body.count = body.count;
    responses.body.results.push(...body.results);
    if (body.next && body.count !== limit) {
      const nextUrl = new URL(body.next);

      options.query = {
        ...options.query,
        start: nextUrl.searchParams.get('start'),
        limit: pageSize,
      };
    } else {
      break;
    }
  } while (true);
  return responses;
}
