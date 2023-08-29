/**
 * General-purpose utility functions
 *
 * These are designed more for use in adaptor code than job code
 * (but we could choose to export util from common)
 *
 * None of these functions are operation factories
 */
import { Client, MockAgent } from 'undici';

const clients = new Map();

const getClient = (baseUrl, options) => {
  const { tls, timeout } = options;
  if (!clients.has(baseUrl)) {
    clients.set(
      baseUrl,
      new Client(baseUrl, { bodyTimeout: timeout, connect: tls })
    );
  }
  return clients.get(baseUrl);
};

export const enableMockClient = baseUrl => {
  const mockAgent = new MockAgent({ connections: 1 });
  const client = mockAgent.get(baseUrl);
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, client);
  }
  return client;
};
const separateUrl = fullUrl => {
  const url = new URL(fullUrl);
  return {
    baseUrl: url.origin,
    path: url.pathname,
  };
};

const defaultOptions = {
  timeout: 300e3, // Default to 300 seconds
  headers: {},
  query: undefined,
  body: undefined,
  errors: {},
  tls: {},
};

const assertOK = (response, errorMap, fullUrl) => {
  const errMapMessage = errorMap[response.statusCode];

  if (errMapMessage || response.statusCode >= 400) {
    const defaultErrorMesssage = `Request to ${fullUrl} failed with status: ${response.statusCode}`;

    const errMessage =
      typeof errMapMessage === 'function'
        ? errMapMessage(response)
        : errMapMessage || defaultErrorMesssage;

    const error = new Error(errMessage);
    error.code = response.statusCode;
    error.url = fullUrl;
    throw error;
  }
};

const isValidHttpUrl = fullUrl => {
  try {
    const { protocol } = new URL(fullUrl);
    return protocol.startsWith('http');
  } catch (_) {
    return false;
  }
};

/**
 * The function `request` is an asynchronous function that sends HTTP requests and returns the response
 * data, headers, and status code.
 * @param method - The HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE", etc.).
 * @param fullUrl - The full URL is the complete URL of the request, including the protocol (e.g.,
 * "http://example.com/api").
 * @param [options] - The `options` parameter is an object that contains additional configuration
 * options for the request. It can have the following properties:
 * @returns an object with the following properties:
 * - code: the status code of the response
 * - headers: the headers of the response
 * - data: the body of the response
 */
export async function request(method, fullUrlOrPath, options = {}) {
  let baseUrl, path;

  if (!options.baseUrl || isValidHttpUrl(fullUrlOrPath)) {
    ({ baseUrl, path } = separateUrl(fullUrlOrPath));
  } else {
    baseUrl = options.baseUrl;
    path = fullUrlOrPath;
  }

  const { headers, query, body, errors, timeout, tls } = {
    ...defaultOptions,
    ...options,
  };

  if (!headers['Content-Type'] && typeof body !== 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const client = getClient(baseUrl, { tls, timeout });

  const response = await client.request({
    path,
    query,
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    throwOnError: false,
  });

  assertOK(response, errors, fullUrlOrPath);

  const responseBody = await readResponseBody(response);

  return {
    code: response.statusCode,
    headers: response.headers,
    data: responseBody,
  };
}

async function readResponseBody(response) {
  const contentType = response.headers['content-type'];

  if (contentType?.includes('application/json')) {
    return response.body.json();
  } else {
    // TODO This need more thinking
    // The function should automagically return the right response based
    // Content-type or request options
    return response.body.text();
  }
}

export const get = (url, options) => request('GET', url, options);

export const post = (url, body, options) =>
  request('POST', url, { body, ...options });

export const put = (url, body, options) =>
  request('PUT', url, { body, ...options });

export const del = (url, body, options) =>
  request('DELETE', url, { body, ...options });