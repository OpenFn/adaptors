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
    baseUrl,

    ...options,

    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  return commonRequest(method, path, opts);
};
