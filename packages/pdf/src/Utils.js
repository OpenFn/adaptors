import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

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

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, username, password } = configuration;

  const { query = {}, body = {}, headers = {}, parseAs = 'json' } = options;
  const authHeaders = makeBasicAuthHeader(username, password);

  const opts = {
    parseAs,
    baseUrl,
    body,
    query,
    headers: {
      'content-type': 'application/json',
      ...authHeaders,
      ...headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts);
};
