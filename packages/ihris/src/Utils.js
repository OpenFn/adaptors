import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse,
} from '@openfn/language-common/util';
import nodepath from 'node:path';

let cookie;

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const authorize = async (configuration) => {
  const { username, password, baseUrl } = configuration;
  
  const options = {
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    baseUrl,
    parseAs: 'json',
  };
  
  try {
    const response = await commonRequest('POST', '/auth/login', options);
    
    if (response.headers['set-cookie']) {
      return response.headers['set-cookie'].split(';')[0];
    }
    

    throw new Error('No authentication cookie received from server');
  } catch (err) {
    console.error('Error authenticating with iHRIS');
    console.log(err.body);
    throw err;
  }
}

export const request = async (configuration = {}, method, path, options = {}) => {
  const { baseUrl, username, password } = configuration;
    const { headers = {}, parseAs = 'json', ...otherOptions } = options;
  let authHeaders = {};
  
    let cookieHeader = { 'Cookie': (options.headers?.Cookie || cookie) };
    authHeaders = cookieHeader;


  const opts = {
    parseAs,
    baseUrl,
    ...otherOptions,
    headers: {
      'content-type': 'application/fhir+json',
      ...authHeaders,
      ...headers,
    },
  };


  const safePath = nodepath.join(path);

  if (!opts.headers.Cookie && !cookie && username && password) {
    cookie = await authorize(configuration);
    opts.headers.Cookie = cookie;
  }
  return commonRequest(method, safePath, opts).then(logResponse);
};
