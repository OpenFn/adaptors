import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';

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

export const request = (state, method, path, options = {}) => {
  const { baseUrl, access_token } = state.configuration;

  if (!access_token) {
    throw new Error(
      'No access_token found in state.configuration. Please ensure you have authenticated before making a request.'
    );
  }

  const { query = {}, body = {}, headers = {}, parseAs = 'json' } = options;

  const opts = {
    parseAs,
    baseUrl,
    body,
    query,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  };

  return commonRequest(method, path, opts).then(logResponse);
};
