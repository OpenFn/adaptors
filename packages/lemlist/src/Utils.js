import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const DEFAULT_BASE_URL = 'https://api.lemlist.com/api';
export const DEFAULT_PAGE_SIZE = 100;

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
  { query = {}, pageSize = DEFAULT_PAGE_SIZE } = {}
) => {
  const items = [];
  let offset = 0;
  let response;
  do {
    response = await request(configuration, 'GET', path, {
      query: { ...query, limit: pageSize, offset },
    });
    items.push(...(response.body ?? []));
    offset += pageSize;
  } while (response.body?.length === pageSize);

  return { ...response, body: items };
};
