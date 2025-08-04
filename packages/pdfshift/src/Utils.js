import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
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
  const { baseUrl, apiKey, apiVersion = 'v3' } = configuration;

  const { query = {}, body = {}, headers = {}, parseAs = 'json' } = options;


  const opts = {
    parseAs,
    baseUrl: `${baseUrl}/${apiVersion}`,
    body,
    query,
    headers: {
      'content-type': 'application/json',
      'X-API-Key': apiKey,
      ...headers,
    },
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts);
};
