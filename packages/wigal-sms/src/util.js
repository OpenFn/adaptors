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

/**
 * 
 * @param {string} path  - path to the endpoint
 * @param {object} options  - Other requred data for the request like   method, data, etc
 * @returns 
 */
export const request = (path, options) => {
  return async state => {
    const { baseUrl,apiKey,username } = state.configuration;
    getClient(baseUrl);
    const basePath = baseUrl ? new URL(baseUrl).pathname : '/';

    const [resolvedPath, resolvedoptions] = expandReferences(
      state,
      path,
      options
    );

    const {
      data,
      headers = { 'content-type': 'application/json','API-KEY' : apiKey, 'USERNAME' : username },
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
  const errordata = await response.body.json();
  const e = new Error(errordata?.status);
  e.message = errordata.message;
  e.code = response.statusCode;
  e.description = 'The server returned an error, see details message';

  if (response.statusCode === 404) {
    e.fix = `Kindly check the path: ${path} well and try again.`;
  }

  if (response.statusCode === 403) {
    e.fix = 'Make sure the API-Key,Username and senderid are correct and exists in the header of the request'
  }

  throw e;
};