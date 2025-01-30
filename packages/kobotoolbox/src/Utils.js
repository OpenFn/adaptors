import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
  return callback(nextState);
};

export async function request(state, method, path, opts) {
  const { baseURL, apiVersion, username, password } = state.configuration;

  const { data = {}, query = {}, headers = {}, parseAs = 'json' } = opts;

  const authHeaders = makeBasicAuthHeader(username, password);

  const options = {
    body: data,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,
    baseUrl: `${baseURL}/api/${apiVersion}`,
  };

  return commonRequest(method, path, options).then(logResponse);
}
