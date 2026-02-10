import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse
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

  return commonRequest(method, safePath, opts).then(logResponse).catch(err => err);
};
