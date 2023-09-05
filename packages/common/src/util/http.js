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

const assertOK = (response, errorMap, fullUrl) => {
  const errMapMessage = errorMap[response.statusCode];

  const checkSuccessCode =
    typeof errMapMessage === 'boolean'
      ? errMapMessage
      : errMapMessage || response.statusCode >= 400;

  if (checkSuccessCode) {
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

const parseUrl = (fullUrl, baseUrl) => {
  if (/^https?:\/\//.test(fullUrl)) {
    const url = new URL(fullUrl);
    return {
      baseUrl: url.origin,
      path: url.pathname,
    };
  } else {
    return { baseUrl, path: fullUrl };
  }
};

const defaultOptions = {
  timeout: 300e3, // Default to 300 seconds
  headers: {},
  query: undefined,
  body: undefined,
  errors: {},
  tls: {},
  parseAs: 'auto',
};

/**
 * `request` is a a helper function that sends HTTP requests and returns the response
 * body, headers, and status code.
 * Use the error map to provide custom error messages or get hold of the response in case of errors.
 * @param method - The HTTP method to use for the request (e.g., "GET", "POST", "PUT", "DELETE", etc.).
 * @param fullUrlOrPath - The full or partial URL for the request.
 * If a partial URL, it will be based on `options.baseUrl`.
 * @param [options] - The `options` parameter is an object that contains additional configuration
 * options for the request.
 * @returns an object with the following properties:
 * - code: the status code of the response
 * - headers: the headers of the response
 * - body: the body of the response
 */
export async function request(method, fullUrlOrPath, options = {}) {
  const { baseUrl, path } = parseUrl(fullUrlOrPath, options.baseUrl);

  const { headers, query, body, errors, timeout, tls, parseAs } = {
    ...defaultOptions,
    ...options,
  };

  const client = getClient(baseUrl, { tls, timeout });

  const response = await client.request({
    path,
    query,
    method,
    headers,
    body,
    throwOnError: false,
  });

  assertOK(response, errors, fullUrlOrPath);

  const responseBody = await readResponseBody(response, parseAs);

  return {
    code: response.statusCode,
    headers: response.headers,
    body: responseBody,
  };
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
      return contentType === 'application/json'
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
