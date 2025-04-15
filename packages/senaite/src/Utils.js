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


export const authenticate = async (state, options) => {
  const { username, password } = state.configuration;

  const response = await commonRequest('GET', `/login?__ac_name=${username}&__ac_password=${password}`, options);
  return response.headers['set-cookie'].split(';')[0]
}

export const request = async (state, method, path, options = {}) => {
  const { baseUrl } = state.configuration;
  let cookieHeader = { 'Cookie': (options.headers?.Cookie || cookie) }

  const errors = { 404: 'Page not found' };

  let opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...cookieHeader,
    },
  };


  const safePath = nodepath.join(path);

 
  if (!opts.headers.Cookie && !cookie) {
    cookie = await authenticate(state, opts);
    opts = { ...opts, headers: { ...opts.headers, Cookie: cookie } }
  }


  return commonRequest(method, safePath, opts);
};
