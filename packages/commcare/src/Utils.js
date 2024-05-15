/* eslint-disable no-param-reassign */
import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const configureAuth = (auth, headers = {}) => {
  const configKeys = Object.keys(auth);

  if (!configKeys.includes('apiKey') && !configKeys.includes('password')) {
    throw new Error('No authorization credentials provided');
  } else if (configKeys.includes('apiKey')) {
    headers = {
      Authorization: `ApiKey ${auth.username}:${auth.apiKey}`,
    };
  } else {
    headers = {
      ...makeBasicAuthHeader(auth.username, auth.password),
    };
  }

  return headers;
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return callback(nextState);
};

export function request({
  state,
  method,
  path,
  data,
  params = {},
  headers = {},
  contentType = 'application/json',
  parseAs = 'json',
}) {
  const { hostUrl } = state.configuration;

  const options = {
    body: data,
    headers: {
      ...configureAuth(state.configuration),
      'content-type': contentType,
      ...headers,
    },
    query: params,
    parseAs: parseAs,
  };

  const url = `${hostUrl}${path}`;

  return commonRequest(method, url, options).then(logResponse);
}
