import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

export const prepareNextState = (state, response) => {
  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
  };
};

export const prepareHttpNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const request = (configuration = {}, method, path, options = {}) => {
  const { baseUrl, access_token, apiVersion = 'v1' } = configuration;

  const { query = {}, body = {}, headers = {}, parseAs = 'json' } = options;

  const opts = {
    parseAs,
    baseUrl: `${baseUrl}/api/${apiVersion}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${access_token}`,
      ...headers,
    },
    body,
    query,
    ...options,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};
