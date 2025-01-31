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
    const { baseUrl, merchantKey } = state.configuration;
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
        NIa_merchantKey: merchantKey,
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

    if (data.merchantKey) {
      throwError(
        "Please don't supply `merchantKey` in your request body. " +
          'The adaptor will append it automatically.'
      );
    }

    if (data) {
      // Please note that the BDR systems requires that we add username &
      // password attributes to the POST body.
      args.body = JSON.stringify({ ...data, merchantKey });

      // TODO: Why do we need to _ALSO_ append authentication to "data" for mock?
      args.data = { ...data, merchantKey };
    }

    const response = await client.request(args);
    if (response.statusCode >= 400) {
      throwError('NIA_ERROR', {
        code: response.statusCode,
        description: response.statusMessage,
        body: await response.body.text(),
      });
    }

    logResponse(response);
    return prepareNextState(state, response);
  };
};
