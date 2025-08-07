import {
  request as commonRequest,
  logResponse,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import { join } from 'node:path';
import { composeNextState } from '@openfn/language-common';

const baseUrl = 'https://app.asana.com';

export function addAuth(headers, token) {
  if (token) {
    Object.assign(headers, { Authorization: `Bearer ${token}` });
  }
}

export function request(state, path, params = {}, callback = s => s) {
  assertRelativeUrl(path);
  const { token, apiVersion = '1.0' } = state.configuration ?? {};
  const currentPath = join('/api', apiVersion, path);

  const {
    method = 'GET',
    headers = { accept: 'application/json' },
    ...rest
  } = params;

  addAuth(headers, token);

  const options = {
    ...rest,
    headers,
    baseUrl, // https://app.asana.com
    parseAs: 'json',
  };

  return commonRequest(method, currentPath, options)
    .then(logResponse)
    .then(callback)
    .catch(err => {
      if (err.code !== 'BASE_URL_MISMATCH') {
        console.log('Asana says:');
        logResponse(err);
      }
      throw err;
    });
}

export const DEFAULT_PAGE_LIMIT = 1e2; // Asana API has a maximum limit of 100
export async function requestWithPagination(state, path, params = {}) {
  let { body, headers, query = {}, ...rest } = params;
  const { limit, ...restQuery } = query;

  const options = {
    ...rest,
    headers,
    body,
    query: { limit: limit ?? DEFAULT_PAGE_LIMIT, ...restQuery },
  };
  const results = [];
  const didUserPassLimit = Boolean(limit);
  let shouldFetchNextPage = false;
  let currentPath = path;

  do {
    const response = await request(state, currentPath, options);
    results.push(...response?.body?.data);

    const nextPage = response?.body?.next_page;
    const hasNextPage = nextPage?.path && nextPage?.offset !== undefined;

    shouldFetchNextPage = !didUserPassLimit && hasNextPage;
    if (shouldFetchNextPage) {
      currentPath = nextPage.path;
    }
  } while (shouldFetchNextPage);

  return results;
}

export function prepareNextState(state, response) {
  const { body, ...responseWithoutBody } = response;
  const { data, next_page } = body ?? {};
  return {
    ...composeNextState(state, data),
    response: { next_page, ...responseWithoutBody },
  };
}
