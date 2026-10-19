import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const DEFAULT_BASE_URL = 'https://api.lemlist.com/api';
export const MAX_PAGE_SIZE = 100;

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

export const request = (configuration = {}, method, path, options = {}) => {
  assertRelativeUrl(path);

  const { baseUrl, apiKey } = configuration;

  const opts = {
    parseAs: 'json',
    baseUrl: baseUrl || DEFAULT_BASE_URL,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options.headers,
      ...makeBasicAuthHeader('', apiKey),
    },
  };

  return commonRequest(method, path, opts);
};

export const requestWithPagination = async (
  configuration,
  path,
  { query = {}, offset = 0, limit = Infinity, pageSize = MAX_PAGE_SIZE } = {}
) => {
  const size = Math.min(pageSize, MAX_PAGE_SIZE);
  const items = [];
  let response;
  while (items.length < limit) {
    const pageLimit = Math.min(size, limit - items.length);
    response = await request(configuration, 'GET', path, {
      query: { ...query, limit: pageLimit, offset: offset + items.length },
    });
    const page = response.body ?? [];
    items.push(...page);
    if (page.length < pageLimit) break;
  }

  return { ...response, body: items.slice(0, limit) };
};
