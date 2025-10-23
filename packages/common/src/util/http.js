import { getReasonPhrase } from 'http-status-codes';
import { Readable } from 'node:stream';
import querystring from 'node:querystring';
import path from 'node:path';
import throwError from './throw-error.js';
import { encode } from './base64.js';
import { MockAgent, Agent, interceptors } from 'undici';
import _ from 'lodash';

// Maps undici dispatchers to keys (where a key is the base url + encoded options)
const agents = new Map();

export const makeBasicAuthHeader = (username, password) => {
  const buff = Buffer.from(`${username}:${password}`);
  const credentials = buff.toString('base64');
  return { Authorization: `Basic ${credentials}` };
};

export const logResponse = response => {
  const { method, url, statusCode, duration, query } = response;

  if (method && url && duration && statusCode) {
    const urlWithQuery = Object.keys(query || {}).length
      ? `${url}?${new URLSearchParams(query).toString()}`
      : url;

    const message = `${method} ${urlWithQuery} - ${statusCode} in ${duration}ms`;
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

// Sort an object into a string of key,value pairs
// Supports nesting
const sortObject = obj =>
  _(obj)
    .toPairs()
    .filter(([_k, v]) => v !== undefined) // ignore undefined values
    .sortBy(0)
    .map(([k, v]) => {
      if (v && typeof v === 'object') {
        if (!Object.keys(v).length) {
          return '';
        }
        // eslint-disable-next-line no-param-reassign
        v = `${'{'}${sortObject(v)}${'}'}`;
      }
      return [k, v].join(':');
    })
    .join('|');

export const generateAgentKey = (baseUrl, agentOpts = {}) => {
  if (Object.keys(agentOpts).length) {
    const sortedSerializedOptions = sortObject(agentOpts);
    if (sortedSerializedOptions.length) {
      return `${baseUrl}+${sortedSerializedOptions}`;
    }
  }
  return baseUrl;
};

const getDispatcher = (origin, options = {}) => {
  const { tls = {}, defaultContentType, ...agentOpts } = options;
  const key = generateAgentKey(origin, options);
  if (!agents.has(key)) {
    const agent = new Agent({
      connect: tls,
      ...agentOpts,
    }).compose(
      interceptors.redirect({
        maxRedirections: agentOpts.maxRedirections,
      }),
      interceptors.decompress()
    );

    agents.set(key, agent);
  }

  return agents.get(key);
};

// Set the agent for a URL + options to be a mock dispatcher
// This causes all subsequent getDispatcher calls to use the mock,
// rather than a real dispatcher
// Note that when testing adaptors, options like maxRedirections
// MUST be set or else the mock agent will not be used!
export const enableMockClient = (baseUrl, options = {}) => {
  const {
    defaultContentType = 'application/json',
    tls = {},
    ...agentOpts
  } = options;

  const mockAgent = new MockAgent({ connections: 1 });
  mockAgent.disableNetConnect();

  const key = generateAgentKey(baseUrl, {
    ...agentOpts,
    tls,
  });
  console.log('Creating mock client for key:', key);

  const dispatcher = mockAgent.get(baseUrl);
  if (defaultContentType) {
    const _intercept = dispatcher.intercept;
    // because so many unit test use mock json,
    // force the content-type header if a body is specified
    dispatcher.intercept = (...args) => {
      const interceptor = _intercept.apply(dispatcher, args);

      const _reply = interceptor.reply;

      const ensureJsonHeader = (headers = {}) => {
        const hasJsonHeader = Object.keys(headers).find(k =>
          /content-type/i.test(k)
        );
        if (!hasJsonHeader) {
          headers['content-type'] = defaultContentType;
        }
      };

      const reply = (...args) => {
        if (typeof args[0] === 'function') {
          // call the function
          // in the resulting object, set the headers
          const response = _reply.apply(interceptor, args);
          if (response.body) {
            response.headers ??= {};
            ensureJsonHeader(response.headers);
          }
          return response;
        } else {
          const [code, data, options = {}] = args;
          if (data) {
            options.headers ??= {};
            ensureJsonHeader(options.headers);
          }
          return _reply.call(interceptor, code, data, options);
        }
      };

      interceptor.reply = reply;

      return interceptor;
    };
  }

  if (!agents.has(key)) {
    agents.set(key, mockAgent);
  }
  return dispatcher;
};

const assertOK = async (response, errorMap, fullUrl, method, startTime) => {
  if (errorMap === false) {
    return;
  }

  const errMapMessage = errorMap[response.statusCode];

  const isError =
    typeof errMapMessage === 'boolean'
      ? errMapMessage
      : errMapMessage || response.statusCode >= 400;

  if (isError) {
    const body = await readResponseBody(response);

    const statusText = getReasonPhrase(response.statusCode);
    const defaultErrorMessage = `${method} to ${fullUrl} returned ${response.statusCode}: ${statusText}`;

    const duration = Date.now() - startTime;

    const errMessage =
      typeof errMapMessage === 'function'
        ? errMapMessage(response)
        : errMapMessage || defaultErrorMessage;

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

export const ERROR_ABSOLUTE_URL = 'Absolute URLs not supported';

// throws if a path is absolute
export const assertRelativeUrl = path => {
  if (/https?:\/\//.test(path)) {
    const e = new Error('UNEXPECTED_ABSOLUTE_URL');
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
    // Note: we use path.join here because our "baseUrl" may not be a stict base url
    //       Ie it may be https://example.com/api/v1
    //       Doing new URl(path, base) will chop off the "base path" so to speak, and break stuff
    //       Technically path.join will produce an invalid URL, but the URL parser handles it safely
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

  const dispatcher = getDispatcher(baseUrl, { tls, maxRedirections });

  const queryParams = {
    ...optionQuery,
    ...urlQuery,
  };

  const response = await dispatcher.request({
    path,
    query: queryParams,
    method,
    headers,
    body: encodeRequestBody(body),
    bodyTimeout: timeout,
    headersTimeout: timeout,
    // If the request is redirected, undici requires the origin to be set (this affects commcare)
    origin: baseUrl,
  });

  // Handle redirect responses when maxRedirections is not set
  // 3xx status codes indicate redirects
  const isRedirect =
    response.statusCode >= 300 &&
    response.statusCode < 400 &&
    response.headers.location;

  if (isRedirect && maxRedirections === undefined) {
    const redirectLocation = response.headers.location;
    const statusText = getReasonPhrase(response.statusCode);
    console.warn(
      `⚠️  Request to ${url} returned ${response.statusCode} (${statusText}) and was redirected to ${redirectLocation}.\n` +
        `   To follow redirects automatically, set the 'maxRedirections' option on your request call.\n` +
        `   For example: request('GET', '${fullUrlOrPath}', { maxRedirections: 5 })`
    );
  }

  const statusText = getReasonPhrase(response.statusCode);

  await assertOK(response, errors, url, method, startTime);

  const responseBody = await readResponseBody(response, parseAs);
  const endTime = Date.now();
  const duration = endTime - startTime;

  const requestResponse = {
    url,
    method,
    statusCode: response.statusCode,
    statusMessage: statusText,
    headers: response.headers,
    body: responseBody,
    duration,
  };
  if (Object.keys(queryParams).length > 0) {
    requestResponse.query = queryParams;
  }
  return requestResponse;
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
  let contentLength = -1;
  if ('content-length' in response.headers) {
    contentLength = parseInt(response.headers['content-length']);
  }
  const contentType = response.headers['content-type'];

  // Try to work out if the response is empty
  // HTTP spec says content type must be defined if there's a body
  if (contentLength === 0 || !contentType || response.statusCode === 204) {
    return;
  }

  try {
    switch (parseAs) {
      case 'json':
        return await response.body.json();
      case 'text':
        return response.body.text();
      case 'stream':
        return response.body;
      case 'base64':
        const arrayBuffer = await response.body.arrayBuffer();
        return encode(arrayBuffer, { parseJson: false });
      default:
        return contentType && contentType.includes('application/json')
          ? await response.body.json()
          : response.body.text();
    }
  } catch (error) {
    throwError(response.statusCode, {
      description: 'Error parsing the response body',
      parseAs,
      contentType,
      bodyLength: contentLength,
      error: error.message,
    });
  }
}

export const get = (url, options) => request('GET', url, options);

export const post = (url, body, options) =>
  request('POST', url, { body, ...options });

export const put = (url, body, options) =>
  request('PUT', url, { body, ...options });

export const del = (url, body, options) =>
  request('DELETE', url, { body, ...options });
