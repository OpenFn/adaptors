import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

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

export const request = async (configuration = {}, method, path, options) => {
  const { apiUrl, username, password } = configuration;
  const { query = {}, body = {}, headers = {}, parseAs = 'json' } = options;
  const authHeaders = makeBasicAuthHeader(username, password);

  

  const opts = {
    parseAs,
    baseUrl: `${apiUrl}`,
    body,
    query,
    headers: {
      'content-type': 'application/json',
      ...headers,
      ...authHeaders,
    },
    ...options,
  };

  

  return commonRequest(method, path, opts).then(logResponse);
};
