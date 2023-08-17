import { Readable, Writable } from 'node:stream';
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

const getClient = baseUrl => {
  if (!clients.has(baseUrl)) {
    clients.set(baseUrl, new Client(baseUrl));
  }
  return clients.get(baseUrl);
};

// TODO make sure this is safe to call multple times
// Ie, only maintain one mockagent, and re-use a client if it exists
export const enableMockClient = baseUrl => {
  const mockAgent = new MockAgent({ connections: 1 });
  const client = mockAgent.get(baseUrl);
  clients.set(baseUrl, client);
  return client;
};

// TODO this doesn't currently support skip
export function expandReferences(state, ...args) {
  return args.map(value => expandReference(state, value));
}

const isStream = value => {
  if (value && typeof value == 'object') {
    if (value instanceof Readable || value instanceof Writable) {
      return true;
    }
    // This should catch streams returned by fetch (which for some reason aren't proper streams?)
    if (value.pipeTo || value.pipe) {
      return true;
    }
  }
  return false;
};

function expandReference(state, value) {
  if (Array.isArray(value)) {
    return value.map(v => expandReference(state, v));
  }

  if (typeof value == 'object' && !!value && !isStream(value)) {
    return Object.keys(value).reduce((acc, key) => {
      return { ...acc, [key]: expandReference(state, value[key]) };
    }, {});
  }

  if (typeof value == 'function') {
    return expandReference(state, value(state));
  }
  return value;
}

export function normalizeOauthConfig(configuration) {
  const { access_token, accessToken } = configuration;

  if (access_token && accessToken)
    throw new Error(
      'Both "accessToken" & "access_token" keys found in configuration; ' +
        'please use only "access_token" for OAuth2 credentials.'
    );

  if (access_token) return { ...configuration, accessToken: access_token };

  console.log(
    'Key "access_token" not found in state.configuration;',
    'is this a standard OAuth 2.0 JSON credential?'
  );

  if (accessToken) console.log('Using "accessToken" from state.configuration');

  return configuration;
}

const separateUrl = fullUrl => {
  const url = new URL(fullUrl);
  return {
    baseUrl: url.origin,
    path: url.pathname,
  };
};

/**
 * The `defaultOptions` constant is an object that defines default values for various options that can
 * be passed to the `request` function. These options include
 * `headers`,
 * `query`,
 * `timeout`,
 * `tls`,
 * `body`, and
 * `errors`.
 */
const defaultOptions = {
  timeout: '',
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
    return protocol === 'http:' || protocol === 'https:';
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

  if (!headers['Content-Type'] && body) {
    headers['Content-Type'] = 'application/json';
  }

  const client = getClient(baseUrl);

  const response = await client.request({
    path: path,
    query: query,
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
    throwOnError: false,
    bodyTimeout: timeout,
    connect: tls,
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
