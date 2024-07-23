import { Client, MockAgent } from 'undici';
import { getReasonPhrase } from 'http-status-codes';
import { Readable } from 'node:stream';
import querystring from 'node:querystring';
import path from 'node:path';

const clients = new Map();

export const makeBasicAuthHeader = (username, password) => {
  const buff = Buffer.from(`${username}:${password}`);
  const credentials = buff.toString('base64');
  return { Authorization: `Basic ${credentials}` };
};

export const logResponse = response => {
  const { method, url, statusCode, duration } = response;
  if (method && url && duration && statusCode) {
    const message = `${method} ${url} - ${statusCode} in ${duration}ms`;
    if (response instanceof Error) {
      console.error(message);
      console.error('response body: ');
      console.error(response.body || '[no body]');
    } else {
      console.log(message);
    }
  }
  return response;
};

const getClient = (baseUrl, options) => {
  const { tls } = options;
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, new Client(baseUrl, { connect: tls }));
  }
  return clients.get(baseUrl);
};

export const enableMockClient = baseUrl => {
  const mockAgent = new MockAgent({ connections: 1 });
  mockAgent.disableNetConnect();
  const client = mockAgent.get(baseUrl);
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, client);
  }
  return client;
};

const assertOK = async (response, errorMap, fullUrl, method, startTime) => {
  const errMapMessage = errorMap[response.statusCode];

  const isError =
    typeof errMapMessage === 'boolean'
      ? errMapMessage
      : errMapMessage || response.statusCode >= 400;

  if (isError) {
    const body = await readResponseBody(response);

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
    error.body = body;
    error.headers = response.headers;
    throw error;
  }
};

export const ERROR_ABSOLUTE_URL = 'Absolute URLs not suppored';

// throws if a path is absolute
export const assertRelativeUrl = path => {
  if (/https?:\/\//.test(path)) {
    const e = new Error('');
    e.code = 'UNEXPECTED_ABSOLUTE_URL';
    e.description =
      'An absolute URL was provided (https://...) but only a path (/a/b/c) is supported';
    e.url = path;
    e.fix =
      'Remove the protocol, domain and origin from the provided URL. Maybe you need to use the generic HTTP helper functions instead?';
    throw e;
  }
};

export const ERROR_URL_MISMATCH = 'Target origin does not match baseUrl origin';

export const parseUrl = (pathOrUrl = '', baseUrl) => {
  let fullUrl;

  // We handle our own URL parsing rather than leaning on node:url
  // because we are non-strict about the baseURL (ie, we do not ignore the path)
  if (/https?:\/\//.test(pathOrUrl)) {
    fullUrl = new URL(pathOrUrl);

    // If the url is absolute, and there's a basePath, ensure they point to the same origin
    if (baseUrl) {
      const base = new URL(baseUrl);
      if (fullUrl.origin !== base.origin) {
        const e = new Error(ERROR_URL_MISMATCH);
        e.code = 'BASE_URL_MISMATCH';
        e.description = `A request was attempted to an absolute URL, but a different base URL was specified. This is a potential security violation.`;
        e.target = pathOrUrl;
        e.baseUrl = baseUrl;
        e.fix = 'Try using a generic HTTP function to access the target URL';
        throw e;
      }
    }
  } else if (baseUrl) {
    fullUrl = new URL(path.join(baseUrl, pathOrUrl));
  } else {
    // let this throw
    new URL(pathOrUrl);
  }

  return {
    url: fullUrl.toString(),
    baseUrl: fullUrl.origin,
    path: fullUrl.pathname,
    query: querystring.parse(fullUrl.searchParams.toString()),
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
  const {
    url,
    baseUrl,
    path,
    query: urlQuery,
  } = parseUrl(fullUrlOrPath, options.baseUrl);
  const {
    headers = {},
    query: optionQuery = {},
    body,
    errors = {},
    timeout = 300e3, // Default to 300 seconds,
    tls = {},
    parseAs = 'auto',
    maxRedirections,
  } = options;

  const client = getClient(baseUrl, { tls });

  const response = await client.request({
    path,
    query: {
      ...optionQuery,
      ...urlQuery,
    },
    method,
    headers,
    body: encodeRequestBody(body),
    throwOnError: false,
    maxRedirections,
    bodyTimeout: timeout,
    headersTimeout: timeout,
    // If the request is redirected, undici requires the origin to be set (this affects commcare)
    origin: baseUrl,
  });

  const statusText = getReasonPhrase(response.statusCode);

  await assertOK(response, errors, url, method, startTime);

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
