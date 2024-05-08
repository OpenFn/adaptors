import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export function request(state, method, path, data, params) {
  const { instanceUrl, username, password } = state.configuration;
  const headers = makeBasicAuthHeader(username, password);

  const options = {
    body: data,

    headers: {
      ...headers,
      'content-type': 'application/json',
    },

    query: params,

    parseAs: 'json',
  };

  const url = `${instanceUrl}${path}`;

  return commonRequest(method, url, options).then(response => logResponse(response));
}
