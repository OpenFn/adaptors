import { Readable, Writable } from 'node:stream';
/**
 * General-purpose utility functions
 *
 * These are designed more for use in adaptor code than job code
 * (but we could choose to export util from common)
 *
 * None of these functions are operation factories
 */
import { Client } from 'undici';

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

function separateUrl(fullUrl) {
  const urlObject = new URL(fullUrl);
  const baseUrl = `${urlObject.protocol}//${urlObject.host}`;
  const path = urlObject.pathname;
  return { baseUrl, path };
}

export async function request(method, fullUrl, options = {}) {
  // let url = path;
  const { baseUrl, path } = separateUrl(fullUrl);
  const defaultOptions = {
    headers: {},
    query: {},
    timeout: {},
    tls: {},
    body: undefined,
  };

  const { headers, query, body, timeout, tls } = {
    ...defaultOptions,
    ...options,
  };

  if (!headers['Content-Type'] && body) {
    headers['Content-Type'] = 'application/json';
  }

  const urlPath = query
    ? `${path}?${new URLSearchParams(query).toString()}`
    : path;

  console.log(baseUrl, urlPath);
  const client = new Client(baseUrl);

  const response = await client.request({
    path: urlPath,
    method,
    responseHeaders: headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseBody = await readResponseBody(response);

  if (response.status >= 400) {
    const error = new Error(
      `Request to ${url} failed with status: ${response.status}`
    );
    error.status = response.status;
    error.body = responseBody;
    error.url = url;
    error.message = `Request to ${url} failed with status: ${response.status}`;
    throw error;
  }

  return {
    code: response.status,
    headers: response.headers,
    data: responseBody,
  };
}

async function readResponseBody(response) {
  console.log(response.headers);
  const contentType = response.headers.get('Content-Type');

  if (contentType?.includes('application/json')) {
    return await response.json();
  } else {
    const chunks = [];
    for await (const chunk of response.body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString();
  }
}

// Functions for different HTTP methods
export async function get(url, options = {}) {
  return request('GET', url, options);
}

export async function post(url, body, options = {}) {
  return request('POST', url, { body: body, ...options });
}

export async function put(url, body, options = {}) {
  return request('PUT', url, { body: body, ...options });
}

export async function del(url, body, options = {}) {
  return request('DELETE', url, { body: body, ...options });
}
