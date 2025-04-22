import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  logResponse
} from '@openfn/language-common/util';
import nodepath from 'node:path';

let bearerToken = '';

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

export const login = async (state) => {
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

  const { body } = await commonRequest('POST', 'graphql', opts);
  bearerToken = body.data.authToken.token;
  return body.data.authToken.token;
}


export const request = async (state, options) => {
  const { baseUrl, token = '' } = state.configuration;

  if (token) {
    bearerToken = token
  }

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

  if (!bearerToken)
    await login(state)

  opts.headers = { ...opts.headers, 'Authorization': `Bearer ${bearerToken}` }

  return commonRequest('POST', 'graphql', opts).then(logResponse);
};
