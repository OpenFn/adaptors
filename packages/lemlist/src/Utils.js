import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const DEFAULT_BASE_URL = 'https://api.lemlist.com/api';

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

// lemlist uses basic auth with an empty username and the API key as password
// See https://developer.lemlist.com/api-reference/getting-started/authentication
export const request = (configuration = {}, method, path, options = {}) => {
  assertRelativeUrl(path);

  const { baseUrl = DEFAULT_BASE_URL, apiKey } = configuration;

  const errors = {
    400: 'Bad request',
    401: 'Unauthorized: check your lemlist API key',
    404: 'Not found',
  };

  const opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options.headers,
      ...makeBasicAuthHeader('', apiKey),
    },
  };

  return commonRequest(method, path, opts);
};
