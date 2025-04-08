import { composeNextState } from '@openfn/language-common';
import { request as commonRequest, logResponse } from '@openfn/language-common/util';


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

export const configureAuth = (auth, headers = {}) => {
  if ('access_token' in auth) {
    Object.assign(headers, {
      Authorization: `Bearer ${auth.access_token}`
    });
  } else {
    throw new Error('Invalid authorization credentials. Include an access token')
  }
  return headers;
}

export const request = async (configuration, path, opts) => {
  const { baseUrl } = configuration;

  const { method, data, params = {}, headers: customHeaders = {}, contentType, parseAs = 'json' } = opts;

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
    baseUrl,
  }

  return commonRequest(method, path, options).then(logResponse)
};
