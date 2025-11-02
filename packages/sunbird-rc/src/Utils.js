import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
} from '@openfn/language-common/util';
import nodepath from 'node:path';
import { request as undiciRequest } from 'undici';

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

// This helper function will call out to the backend service
// and add authorisation headers
// Refer to the common request function for options and details
export const request = async (configuration = {}, method, path, options) => {
  const { baseUrl, username, password, token } = configuration;

  // Build auth headers based on available credentials
  // Token auth takes precedence over basic auth
  let authHeaders = {};
  if (token) {
    authHeaders = { Token: token };
  } else if (username && password) {
    authHeaders = makeBasicAuthHeader(username, password);
  }

  const errors = {
    404: 'Page not found',
  };

  const opts = {
    // Force the response to be parsed as JSON
    parseAs: 'json',

    // Include the error map
    errors,

    // Set the baseUrl from the config object
    baseUrl,

    ...options,

    // You can add extra headers here if you want to
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  };

  // Only set content-type for JSON requests (not for binary/base64 responses)
  if (opts.parseAs === 'json') {
    opts.headers['content-type'] = 'application/json';
  }

  const safePath = nodepath.join(path);

  // ===========================================================================
  // Special handling for base64/binary responses
  // Use undici directly to get raw buffer when server doesn't set content-type
  if (opts.parseAs === 'base64') {
    // Ensure baseUrl ends with / for proper URL joining
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normalizedPath = safePath.startsWith('/')
      ? safePath.slice(1)
      : safePath;
    const fullUrl = `${normalizedBase}${normalizedPath}`;

    const startTime = Date.now();
    const { statusCode, headers, body } = await undiciRequest(fullUrl, {
      method,
      headers: opts.headers,
    });

    // Collect the stream into a buffer
    const chunks = [];
    for await (const chunk of body) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Convert to base64
    const base64String = buffer.toString('base64');

    return {
      url: fullUrl,
      method,
      statusCode,
      statusMessage: headers['status-message'] || 'OK',
      headers,
      body: base64String,
      duration: Date.now() - startTime,
    };
  }
  // ===========================================================================

  // Make the actual request
  const result = await commonRequest(method, safePath, opts);
  return result;
};
