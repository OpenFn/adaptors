import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const requestWithPagination = async (
  state,
  { path, body = {}, options = {} },
  method = 'POST'
) => {
  const results = [];

  const { pageNumber = 1 } = body;
  const {
    defaultLimit = 10000, // internal not documented
    defaultPageSize = 200, // internal not documented
    ...rest
  } = options;

  const userProvidedPageSize = body?.showPerPage;

  const pageSize = userProvidedPageSize
    ? Math.max(1, Number(body.showPerPage) || defaultPageSize)
    : defaultPageSize;

  const maxToFetch = userProvidedPageSize ? pageSize : defaultLimit;

  let totalFetched = 0;
  let nextPage = pageNumber;

  while (totalFetched < maxToFetch) {
    const remainingItems = maxToFetch - totalFetched;
    const fetchSize = Math.min(pageSize, remainingItems);

    const response = await request(state.configuration, method, path, {
      body: {
        ...body,
        pageNumber: nextPage,
        showPerPage: fetchSize,
      },
      ...rest,
    });

    const model = response?.body?.model;
    if (!Array.isArray(model)) {
      const payload = typeof model !== 'undefined' ? model : response?.body;
      return payload;
    }

    const data = model;

    results.push(...data);
    const fetchedCount = data.length;
    totalFetched += fetchedCount;

    nextPage += 1;

    if (fetchedCount < fetchSize || data.length === 0) {
      break; // No more data to fetch
    }
  }

  return results;
};

export const request = (configuration = {}, method, path, options = {}) => {
  const {
    baseUrl = 'https://mfr.moh.gov.et',
    username,
    password,
  } = configuration;
  let { body = {}, query = {}, headers = {}, parseAs = 'json' } = options;

  if (username && password) {
    headers = makeBasicAuthHeader(username, password);
  }

  const opts = {
    parseAs,
    baseUrl,
    body,
    query,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  const safePath = nodepath.join(`/api/${path}`);

  return commonRequest(method, safePath, opts).then(logResponse);
};
