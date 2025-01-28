import undici from 'undici';
import nodepath from 'node:path';
import {
  throwError,
  logResponse,
  expandReferences,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';
import { composeNextState } from '@openfn/language-common';

let client;
const getClient = baseUrl => {
  if (baseUrl) {
    const url = new URL(baseUrl);
    client = new undici.Client(url.origin);
  }
  return client;
};

export const setMockClient = mockClient => {
  client = mockClient;
};

export const prepareNextState = async (state, response) => {
  const { body, ...responseWithoutBody } = response;

  // Please note that the BDR system responds with a valid JSON response, but in
  // string format. We JSON.parse that string here.
  const result = await body.json();
  const resultAsJson = JSON.parse(result);

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, resultAsJson),
    response: responseWithoutBody,
  };

  return nextState;
};

export const request = (path, options) => {
  return async state => {
    const { baseUrl, username, password } = state.configuration;
    getClient(baseUrl);
    const basePath = baseUrl ? new URL(baseUrl).pathname : '/';

    const [resolvedPath, resolvedoptions] = expandReferences(
      state,
      path,
      options
    );

    const {
      data,
      headers = { 'content-type': 'application/json' },
      method = 'POST',
      query,
      ...otherOptions
    } = resolvedoptions;

    const safePath = resolvedPath
      ? nodepath.join(basePath, resolvedPath)
      : basePath;

    const args = {
      path: safePath,
      data,
      headers: {
        ...headers,
      },
      method,
      query,
      ...otherOptions,
    };

    if (data.username || data.password) {
      throwError(
        "Please don't supply `username` and `password` in your request body."
      );
    }

    if (data) {
      // Please note that the BDR system requires a stringified string, so we
      // call JSON.stringify twice in a row here...
      args.body = JSON.stringify(
        JSON.stringify({
          ...data,
          // Please note that the BDR systems requires that we add username &
          // password attributes to the POST body.
          username,
          password,
        })
      );
    }

    const response = await client.request(args);
    if (response.statusCode >= 400) {
      throwError('BDR_ERROR', {
        code: response.statusCode,
        description: response.statusMessage,
        body: await response.body.text(),
      });
    }

    logResponse(response);
    return prepareNextState(state, response);
  };
};
