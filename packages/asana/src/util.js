import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

export function addAuth(headers, configuration = {}) {
  const { token } = configuration;
  if (token) {
    Object.assign(headers, { Authorization: `Bearer ${token}` });
  }
}

export function request(state, path, params = {}, callback = s => s) {
  let {
    headers = { accept: 'application/json' },
    method = 'GET',
    ...rest
  } = params;

  const apiVersion = state.configuration?.apiVersion ?? '1.0';
  const baseUrl = `https://app.asana.com/api/${apiVersion}`;

  addAuth(headers, state.configuration);

  const options = {
    ...rest,
    headers,
    baseUrl,
    parseAs: 'json',
  };

  return commonRequest(method, path, options)
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
export async function requestWithPagination(state, path, params) {
  let { body, headers = {}, query, ...rest } = params;
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
  return {
    ...composeNextState(state, body?.data),
    response: responseWithoutBody,
  };
}
