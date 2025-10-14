import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
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

export const request = (configuration = {}, method, path, options) => {
  const {
    baseUrl,
    apiKey,
  } = configuration;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  const { query = {}, body = {} } = options;
  const opts = {
    parseAs: 'json',
    baseUrl,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body,
    query,
    ...options,
  };

  const safePath = nodepath.join(path);

  return commonRequest(method, safePath, opts).then(logResponse);
};
