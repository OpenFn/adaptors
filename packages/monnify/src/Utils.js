import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader
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

export const getAccessToken = async (configuration, headers) => {
  const { apiKey, secretKey, baseUrl } = configuration;

  const { body } = await commonRequest('POST', 'api/v1/auth/login', {
    headers: {
      ...headers,
      ...makeBasicAuthHeader(apiKey, secretKey)
    },
    baseUrl,
    parseAs: 'json'
  });

  return { ...configuration, access_token: body.responseBody.accessToken }
};

export const requestWithPagination = async (configuration = {}, method, path, options = {}) => {
  const { query = {} } = options;
  let { pageSize, pageNo } = query;

  const hasPagination = pageSize !== undefined || pageNo !== undefined;

  if (pageSize && pageSize > 1000) {
    console.log('Warning: PageSize cannot exceed 1000, reducing to 1000');
    pageSize = 1000;
  }

  const allContent = [];
  let currentPage = pageNo !== undefined ? pageNo : 0;
  let isLastPage = false;

  do {
    const response = await request(configuration, method, path, {
      ...options,
      query: { ...query, pageSize: pageSize || 100, pageNo: currentPage }
    });
    const { body: { responseBody } } = response;

    if (hasPagination) return { body: responseBody.content } || response


    if (responseBody.content?.length) {
      allContent.push(...responseBody.content);
    }

    isLastPage = responseBody.last === true;
    currentPage++;
  } while (!isLastPage);

  return {
    body: allContent
  };
};

export const request = async (configuration = {}, method, path, options) => {

  let config = configuration;

  const { baseUrl, access_token } = config;

  if (!access_token)
    config = await getAccessToken(config, options.headers)

  const { query = {}, body = {} } = options;

  const opts = {
    parseAs: 'json',
    baseUrl,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${config.access_token}`,
      ...options.headers,
    },
    body,
    query,
    ...options,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};
