import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export const configureAuth = (auth, headers = {}) => {
  if ('apiKey' in auth) {
    Object.assign(headers, {
      Authorization: `ApiKey ${auth.username}:${auth.apiKey}`,
    });
  } else if ('password' in auth) {
    Object.assign(headers, makeBasicAuthHeader(auth.username, auth.password));
  } else {
    throw new Error(
      'Invalid authorization credentials. Include an apiKey or password in state.configuration'
    );
  }

  return headers;
};

export const prepareNextState = (state, response, callback = s => s) => {
  const { body, ...responseWithoutBody } = response;
  const nextState = {
    ...composeNextState(state, body?.objects ?? body),
    response: { ...responseWithoutBody, ...{ meta: body?.meta } },
  };

  return callback(nextState);
};

export async function request(configuration, path, opts) {
  const { hostUrl } = configuration;

  const {
    method,
    data,
    params = {},
    headers: customHeaders = {},
    contentType,
    parseAs = 'json',
  } = opts;

  const headers = configureAuth(configuration, customHeaders);
  if (contentType) {
    headers['content-type'] = contentType;
  }

  const options = {
    body: data,
    headers,
    query: params,
    parseAs,
    maxRedirections: 1,
    baseUrl: hostUrl,
  };

  return commonRequest(method, path, options).then(logResponse);
}
