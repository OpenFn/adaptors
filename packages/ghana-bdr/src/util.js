import undici from 'undici';
import nodepath from 'node:path';
// import Ajv from 'ajv';
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

// mock validator
export const validateRequestBody = (request, sample) => {
  // Check top-level keys
  const sampleKeys = Object.keys(sample);
  const requestKeys = Object.keys(request);

  for (const key of sampleKeys) {
    // make sure all keys are present
    if (!requestKeys.includes(key)) {
      console.log('Key missing:', key);
      return false;
    }

    // make sure all the value of all keys have the same value type
    if (typeof sample[key] != typeof request[key]) {
      console.log('Key with wrong value type:', key);
      return false;
    }

    // If the value is an object, recursively validate
    // can we check the keys of each key (assuming it's an object)
    if (typeof sample[key] === 'object' && sample[key] !== null) {
      if (!validateRequestBody(request[key], sample[key])) {
        console.log('Failed check at:', key);
        return false;
      }
    }
  }

  return true;
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
        "Please don't supply `username` and `password` in your request body. " +
          'The adaptor will append it automatically.'
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

      // TODO: Why do we need to _ALSO_ append authentication to "data" for mock?
      args.data = { ...data, username, password };
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
