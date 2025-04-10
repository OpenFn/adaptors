import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse
} from '@openfn/language-common/util';
import nodepath from 'node:path';

let beaerToken = '';

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

export const login = async (state, options) => {
  const { username, password, baseUrl } = state.configuration;

  const opts = {
    headers: {
      'content-type': 'application/json',
    },
    baseUrl,
    body: {
      query: `
      query AuthToken ($username: String!, $password: String!) {
        authToken(username: $username, password: $password) {
          ... on AuthToken {
            token
          }
        }     
      }
    `,
      variables: {
        username,
        password,
      }
    },
  };

  const { body: { data: { authToken: { token } } } } = await commonRequest('POST', 'graphql', opts);
  beaerToken = token;
  return token;
}


export const request = async (state, options) => {
  const { baseUrl } = state.configuration;

  const errors = {
    404: 'Page not found',
  };

  let opts = {
    parseAs: 'json',
    errors,
    baseUrl,
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
  };

  if (!beaerToken)
    await login(state, opts)

  opts.headers = { ...opts.headers, 'Authorization': `Bearer ${beaerToken}` }

  const safePath = nodepath.join('graphql');

  return commonRequest('POST', safePath, opts).then(logResponse);
};
