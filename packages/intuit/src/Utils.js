import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback) => {
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

export const request = (state, method, path, options = {}) => {
  const { baseUrl, access_token } = state.configuration;

  const {
    query = {},
    body = {},
    headers = { 'Content-type': 'application/json' },
    parseAs = 'json',
  } = options;

  const opts = {
    parseAs,
    baseUrl,
    body,
    query,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
      ...headers,
    },
  };

  const url = `${baseUrl}${path}`;

  return commonRequest(method, url, opts).then(logResponse);
};
