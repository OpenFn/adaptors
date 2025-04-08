import { composeNextState } from '@openfn/language-common';
import { request as commonRequest } from '@openfn/language-common/util';
import nodepath from 'node:path';

let cookie;

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


export const authenticate = async (opts) => {
  const response = await commonRequest('POST', '/login', opts);
  return response.headers['set-cookie'].split(';')[0]
}

export const request = async (state, method, path, options = {}) => {
  const { baseUrl, username, password } = state.configuration;
  let headers = { 'Cookie': (cookie || options.headers?.Cookie) }

  const errors = { 404: 'Page not found' };

  let opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };


  const safePath = nodepath.join(path);

  if (!opts.headers.Cookie && username && password) {
    cookie = await authenticate({ ...opts, parseAs: 'text/html', body: { username, password } });
    opts = { ...opts, headers: { ...opts.headers, Cookie: cookie } }
  }


  return commonRequest(method, safePath, opts);
};
