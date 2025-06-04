import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const DEFAULT_LIMIT = 3e4;
export const DEFAULT_PAGE_SIZE = 1e4;

export function prepareNextState(state, response) {
  const { body, ...responseWithoutBody } = response;
  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
}
export async function request(state, method, path, opts = {}) {
  const { baseUrl, apiVersion, username, password } = state.configuration;
  const {
    data = {},
    query = {},
    headers = {},
    parseAs = 'json',
    maxRedirections,
  } = opts;

  const requestPath = `/api/${apiVersion}/${path}/`;
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
    maxRedirections,
    parseAs,
    baseUrl,
  };

  return commonRequest(method, requestPath, options).then(logResponse);
}

export async function requestWithPagination(state, path, options = {}) {
  const results = [];

  let { pageSize = DEFAULT_PAGE_SIZE, start, limit, ...otherOptions } = options;

  const maxResults = limit ?? DEFAULT_LIMIT;

  let isFirstRequest = true;
  let requestOptions = { query: { start, limit: pageSize }, ...otherOptions };
  let shouldFetchMoreContent = false;
  const didUserPassLimit = Boolean(limit);

  do {
    requestOptions.query ??= {};
    if (start) {
      requestOptions.query.start = start;
    }

    if (didUserPassLimit || !isFirstRequest) {
      // If there's an explicit limit or page size,
      // or this is not the first request,
      // set the limit in the URL
      requestOptions.query.limit = Math.min(
        pageSize || maxResults,
        maxResults - results.length
      );
    } else if (!isNaN(pageSize)) {
      requestOptions.query.limit = pageSize;
    }

    const response = await request(state, 'GET', path, requestOptions);

    if (response.body?.results) {
      results.push(...response.body.results);

      if (response?.body?.next) {
        const nextUrl = new URL(response?.body?.next);
        start = nextUrl.searchParams.get('start');
      }
    } else {
      results.push(response.body);
    }

    if (isFirstRequest && !pageSize) {
      pageSize = results.length;
    }

    isFirstRequest = false;

    const hasMoreContent = response.body.next?.includes('start=');

    // If the user hasn't set a max but we've hit the limit, we should warn them
    if (hasMoreContent && didUserPassLimit && results.length === maxResults) {
      console.warn(
        `Warning: The default maximum number of items has been reached (${maxResults}), but more items are available on the server. To download all available items, make another request with start=${
          maxResults + 1
        } or set max to Infinity`
      );
    }

    // Decide whether to request another page
    shouldFetchMoreContent = results.length < maxResults && hasMoreContent;
  } while (shouldFetchMoreContent);

  return results;
}

export function maybeStringify(query) {
  return typeof query === 'string' ? query : JSON.stringify(query);
}
