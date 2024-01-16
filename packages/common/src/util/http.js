import { Client, MockAgent } from 'undici';
import { getReasonPhrase } from 'http-status-codes';
import { Readable } from 'node:stream';
import { resolve } from 'node:url';

const clients = new Map();

export const makeBasicAuthHeader = (username, password) => {
  const buff = Buffer.from(`${username}:${password}`);
  const credentials = buff.toString('base64');
  return { Authorization: `Basic ${credentials}` };
};

export const logResponse = response => {
  const { method, url, statusCode, duration } = response;
  if (method && url && duration && statusCode) {
    console.log(`${method} ${url} - ${statusCode} in ${duration}ms`);
  }
};

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

const assertOK = (response, errorMap, fullUrl, method, startTime) => {
  const errMapMessage = errorMap[response.statusCode];

  const isError =
    typeof errMapMessage === 'boolean'
      ? errMapMessage
      : errMapMessage || response.statusCode >= 400;

  if (isError) {
    const statusText = getReasonPhrase(response.statusCode);
    const defaultErrorMesssage = `${method} to ${fullUrl} returned ${response.statusCode}: ${statusText}`;

    const duration = Date.now() - startTime;

    const errMessage =
      typeof errMapMessage === 'function'
        ? errMapMessage(response)
        : errMapMessage || defaultErrorMesssage;

    const error = new Error(errMessage);
    error.statusCode = response.statusCode;
    error.statusMessage = statusText;
    error.url = fullUrl;
    error.duration = duration;
    error.method = method;
    throw error;
  }
};

export const parseUrl = (path = '', baseUrl) => {
  let fullUrl;

  // We handle our own URL parsing rather than leaning on node:url
  // because we are non-strict about the baseURL (ie, we do not ignore the path)
  if (URL.canParse(path)) {
    fullUrl = path;
  } else if (baseUrl) {
    // ensure the base url ends with a /
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    // ensure the path does not start with /
    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    fullUrl = baseUrl + path;
  } else {
    // let this throw
    URL.parse(path);
  }

  const url = new URL(fullUrl);
  return {
    url: url.toString(),
    baseUrl: url.origin,
    path: url.pathname,
  };
};

/**
 * `request` is a helper function that sends HTTP requests and returns the response
 * body, headers, and status code.
 * Use the error map to provide custom error messages or get hold of the response in case of errors.
 * @param method - The HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE", etc.).
 * @param fullUrlOrPath - The full or partial URL for the request.
 * @param [options] - The `options` parameter is an object that contains additional configuration
 * options for the request.
 * @returns an object with the following properties:
 * - method: the request method
 * - url: the request url
 * - code: the status code of the response
 * - headers: the headers of the response
 * - body: the body of the response
 * - message: the status text of the response
 * - duration: the response time
 */
export async function request(method, fullUrlOrPath, options = {}) {
  const startTime = Date.now();
  const { url, baseUrl, path } = parseUrl(fullUrlOrPath, options.baseUrl);
  const {
    headers = {},
    query = {},
    body,
    errors = {},
    timeout = 300e3, // Default to 300 seconds,
    tls = {},
    parseAs = 'auto',
    maxRedirections,
  } = options;

  const client = getClient(baseUrl, { tls, timeout });

  const response = await client.request({
    path,
    query,
    method,
    headers,
    body: encodeRequestBody(body),
    throwOnError: false,
    maxRedirections,
  });

  const statusText = getReasonPhrase(response.statusCode);

  assertOK(response, errors, fullUrlOrPath, method, startTime);

  const responseBody = await readResponseBody(response, parseAs);
  const endTime = Date.now();
  const duration = endTime - startTime;

  return {
    url,
    method,
    statusCode: response.statusCode,
    statusMessage: statusText,
    headers: response.headers,
    body: responseBody,
    duration,
  };
}

function encodeRequestBody(body) {
  if (!body) {
    return undefined;
  }

  if (
    Buffer.isBuffer(body) ||
    body instanceof Readable ||
    typeof body === 'string'
  ) {
    return body;
  }

  if (typeof body === 'object') {
    if (
      Symbol.asyncIterator in Object(body) ||
      Symbol.iterator in Object(body) ||
      body instanceof FormData
    ) {
      return body;
    }
    return JSON.stringify(body);
  }

  throw new Error('Unsupported body type');
}

async function readResponseBody(response, parseAs) {
  const contentType = response.headers['content-type'];

  switch (parseAs) {
    case 'json':
      return response.body.json();
    case 'text':
      return response.body.text();
    case 'stream':
      return response.body;
    default:
      return contentType && contentType.includes('application/json')
        ? response.body.json()
        : response.body.text();
  }
}

export const get = (url, options) => request('GET', url, options);

export const post = (url, body, options) =>
  request('POST', url, { body, ...options });

export const put = (url, body, options) =>
  request('PUT', url, { body, ...options });

export const del = (url, body, options) =>
  request('DELETE', url, { body, ...options });
