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

    const addAuth = makeBasicAuthHeader(username, password);

    const safePath = resolvedPath
      ? nodepath.join(basePath, resolvedPath)
      : basePath;

    const args = {
      path: safePath,
      data,
      headers: {
        ...headers,
        ...addAuth,
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
      throwError('BDR_ERROR', {
        code: response.statusCode,
        description: response.statusMessage,
        body: await response.body.text(),
      });
    }

    //TODO: Add a function for handling stream responses
    // Eg: const responseBody = await streamToString(response.body);

    logResponse(response);
    return prepareNextState(state, response);
  };
};
/**
 * Convert a readable stream to a string
 * @param {Readable} stream - The readable stream to convert
 * @returns {Promise<string>} - The string content of the stream
 */
async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
