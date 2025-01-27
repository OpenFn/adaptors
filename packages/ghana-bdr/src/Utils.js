import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
  expandReferences,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import nodepath from 'node:path';
import undici from 'undici';

let client;
const getClient = state => {
  const { baseUrl } = state.configuration;
  if (baseUrl) {
    const url = new URL(baseUrl);
    client = new undici.Client(url.origin);
  } else {
    client = new undici.Client('https://bdr.openfn.org');
  }
  return client;
};

export const setMockClient = mockClient => {
  client = mockClient;
};

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };

  return nextState;
};

// This helper function will call out to the backend service
// and add authorisation headers
// Refer to the common request function for options and details
export const request = (path, options) => {
  return async state => {
    getClient(state);

    const [resolvedPath, resolvedoptions] = expandReferences(
      state,
      path,
      options
    );

    const {
      body,
      headers = {},
      method = 'GET',
      query,
      ...otherOptions
    } = resolvedoptions;
    // TODO This example adds basic auth from config data
    //       you may need to support other auth strategies
    const { baseUrl, username, password } = state.configuration;
    const addAuth = makeBasicAuthHeader(username, password);
    const safePath = resolvedPath
      ? nodepath.join(baseUrl, resolvedPath)
      : baseUrl;
    const args = {
      path: safePath,
      headers: {
        'content-type': 'application/json',
        ...headers,
        ...addAuth,
      },
      method,
      query,
      ...otherOptions,
    };

    // Make the actual request
    await client
      .request(args)
      .then(response => {
        logResponse(response);
        return prepareNextState(state, response);
      })
      .catch(err => {
        logResponse(err);
        throw err;
      });
  };
};
