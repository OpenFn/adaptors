import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
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
  const {
    baseUrl = 'https://api.mementodatabase.com',
    token,
    apiVersion = 'v1',
  } = configuration;

  const errors = {
    404: 'Page not found',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    query: {
      token,
      ...options.query,
    },
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
  };

  const safePath = nodepath.join(apiVersion, path);

  return commonRequest(method, safePath, opts);
};
