/**
 * If you have any helper functions which are NOT operations,
 * you should add them here
 */

import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export const request = (configuration = {}, method, path, options) => {
  const { baseUrl, username, password } = configuration;
  const headers = makeBasicAuthHeader(username, password);

  const opts = {
    parseAs: 'json',

    baseUrl,

    ...options,

    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  return commonRequest(method, path, opts);
};
