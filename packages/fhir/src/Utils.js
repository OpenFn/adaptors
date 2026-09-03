import nodepath from 'node:path';

import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
  assertRelativeUrl,
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

export function getTLSOptions(configuration = {}, requestOptions = {}) {
  return requestOptions.tls ?? configuration.tls;
}

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;

  return callback({
    ...composeNextState(state, body),
    response: responseWithoutBody,
  });
};

export const request = (configuration, method, path, options = {}) => {
  assertRelativeUrl(path);

  const { baseUrl, apiPath } = configuration;
  const { headers = {}, ...otherOptions } = options;
  const fullPath = nodepath.join(apiPath ?? '', path);

  addAuth(configuration, headers);

  const tls = getTLSOptions(configuration, otherOptions);

  const opts = {
    ...otherOptions,
    headers: {
      accept: 'application/fhir+json',
      'content-type': 'application/fhir+json',
      ...headers,
    },
    baseUrl,
    parseAs: 'json',
    tls,
  };

  return commonRequest(method, fullPath, opts).then(logResponse);
};
