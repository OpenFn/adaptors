import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

export function addAuth(configuration = {}, headers) {
  if (headers.Authorization) return;

  const { username, password, access_token } = configuration;

  if (access_token) {
    Object.assign(headers, { Authorization: `Bearer ${access_token}` });
  } else if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
}

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const request = (configuration = {}, method, path, options = {}) => {
  const { baseUrl, apiPath } = configuration;
  const { headers = {}, ...otherOptions } = options;
  const url = apiPath ? `${baseUrl}/${apiPath}` : baseUrl;

  addAuth(configuration, headers);

  const opts = {
    ...otherOptions,
    headers: {
      accept: 'application/fhir+json',
      'content-type': 'application/fhir+json',
      ...headers,
    },
    baseUrl: url,
    parseAs: 'json',
  };

  return commonRequest(method, path, opts)
    .then(logResponse)
    .catch(e => {
      logResponse(e);
      throw e;
    });
};
