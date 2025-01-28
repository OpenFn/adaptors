import undici from 'undici';
import nodepath from 'node:path';
import {
  throwError,
  logResponse,
  expandReferences,
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

  const result = await body.json();

  if (!state.references) {
    state.references = [];
  }

  const nextState = {
    ...composeNextState(state, result),
    response: responseWithoutBody,
  };

  return nextState;
};

export const request = (path, options) => {
  return async state => {
    const { baseUrl, apiKey, username } = state.configuration;
    getClient(baseUrl);
    const basePath = baseUrl ? new URL(baseUrl).pathname : '/';

    const [resolvedPath, resolvedoptions] = expandReferences(
      state,
      path,
      options
    );

    const {
      data,
      headers = {
        'content-type': 'application/json',
        'API-KEY': apiKey,
        USERNAME: username,
      },
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

    if (data) {
      args.body = JSON.stringify(data);
    }
    const response = await client.request(args);
    if (response.statusCode >= 400) {
      await handleError(response, path);
    }
    logResponse(response);
    return prepareNextState(state, response);
  };
};

export const handleError = async (response, path) => {
  const error = await response.body.json();

  if (response.statusCode === 404) {
    throwError('NOT_FOUND', {
      description: 'The server returned an error, see details message',
      error: error.message,
      fix: `Kindly check the path: ${path} well and try again.`,
    });
  }

  if (response.statusCode === 403) {
    throwError('FORBIDDEN', {
      description: 'The server returned an error, see details message',
      error: error.message,
      fix: `Make sure the API-Key,Username and senderid are correct and exists in the header of the request`,
    });
  }
};
