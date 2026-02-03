import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  state.references ??= [];

  const payload = response?.body?.data ?? response.body;
  const composed = composeNextState(state, payload);

  return {
    ...composed,
    response: responseWithoutBody,
  };
};

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, secretKey } = configuration;
  const headers = { Authorization: `Bearer ${secretKey}` };

  const errors = {
    404: 'Page not found',
  };

  const mergedHeaders = {
    'content-type': 'application/json',
    ...headers,
    ...(options && options.headers ? options.headers : {}),
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: mergedHeaders,
  };

  const url = new URL(path, baseUrl).toString();

  return commonRequest(method, url, opts);
};
