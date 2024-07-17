import nodepath from 'node:path';

import {
  request as commonRequest,
  logResponse,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';

import { composeNextState } from '@openfn/language-common';

export function addAuth(configuration = {}, headers) {
  if (headers.Authorization) return;

  const { username, password, access_token } = configuration;

  if (access_token) {
    Object.assign(headers, { Authorization: `Bearer ${access_token}` });
  } else if (username && password) {
    Object.assign(headers, makeBasicAuthHeader(username, password));
  }
}

export const prepareNextState = (state, response, callback) => {
  const { body, ...responseWithoutBody } = response;

  return callback({
    ...composeNextState(state, body),
    response: responseWithoutBody,
  });
};

export const request = (configuration, method, path, options = {}) => {
  const { baseUrl, apiPath } = configuration;
  const { headers = {}, ...otherOptions } = options;
  const fullPath = nodepath.join(apiPath ?? '', path);

  urlMatchesBase(path, baseUrl);
  addAuth(configuration, headers);

  const opts = {
    ...otherOptions,
    headers: {
      accept: 'application/fhir+json',
      'content-type': 'application/fhir+json',
      ...headers,
    },
    baseUrl,
    parseAs: 'json',
  };

  return commonRequest(method, fullPath, opts).then(logResponse);
};

function urlMatchesBase(path, baseUrl) {
  const base = new URL(baseUrl);
  const url = new URL(path, baseUrl);

  if (url.origin !== base.origin) {
    throw new Error(`The URL ${path} does not match the base URL ${baseUrl}`);
  }
  return true;
}
