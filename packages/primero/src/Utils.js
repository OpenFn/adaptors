import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export function setUrl(configuration, path) {
  console.log(configuration);

  if (configuration && configuration.url) return configuration.url + path;
  else return path;
}

export function setAuth(configuration, manualAuth) {
  if (manualAuth) return manualAuth;
  else if (configuration && configuration.username)
    return {
      username: configuration.username,
      password: configuration.password,
      sendImmediately: configuration.authType != 'digest',
    };
  else return null;
}

export function scrubResponse(response) {
  if (response) response.request.headers.Authorization = '--REDACTED--';

  return response;
}

export function assembleError({ response, error, params }) {
  if (response) {
    const customCodes = params?.options && params?.options?.successCodes;
    if ((customCodes || [200, 201, 202, 204]).indexOf(response.statusCode) > -1)
      return false;
  }

  if (error) return error;

  return new Error(
    `Server responded with:\n${JSON.stringify(response, null, 2)}`
  );
}

export function tryJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return { body: data };
  }
}

export const request = (state, method, path, options = {}) => {
  const { url, username, user, password } = state.configuration;

  let baseUrl;

  if (!state.configuration.url && url) {
    baseUrl = url;
    console.warn(
      'No url found in state.configuration. Please add url in the configuration'
    );
  } else {
    baseUrl = state.configuration.url;
  }

  const authHeaders = makeBasicAuthHeader(username ?? user, password);

  const { query = {}, body = {}, headers = {}, parseAs = 'json' } = options;

  

  const opts = {
    parseAs,
    baseUrl: `${baseUrl}/api/v2/`,
    body:{ data: body},
    query,
    headers: {
      'Content-type': 'application/json',
      ...authHeaders,
      ...headers,
    },
  };

  

  return commonRequest(method, path, opts).then(logResponse);
};
