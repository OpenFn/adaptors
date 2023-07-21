/**
 * General-purpose utility functions
 *
 * These are designed more for use in adaptor code than job code
 * (but we could choose to export util from common)
 *
 * None of these functions are operation factories
 */

import { fetch } from 'undici';
import https from 'https';

// TODO this doesn't currently support skip
export function expandReferences(state, ...args) {
  return args.map(value => expandReference(state, value));
}

function expandReference(state, value) {
  if (Array.isArray(value)) {
    return value.map(v => expandReference(state, v));
  }

  if (typeof value == 'object' && !!value) {
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

export function handleResponseError(response, data, method) {
  const { status, statusText, url } = response;

  if (isEmpty(data)) {
    const responseString = [
      `Message: 0 results returned`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
    ].join('\n\t∟ ');

    console.log(`Info at ${new Date()}\n${responseString}`);
  }
  if (!response.ok) {
    const errorString = [
      `Message: ${statusText}`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
      `Body: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n\t  ')}`,
    ].join('\n\t∟ ');
    throw new Error(errorString);
  }
}
/**
 * Creates an https agent for fetch from the agentOptions key passed in params.
 * @function
 * @param {object} params - data
 * @returns {Operation}
 */
function withAgent(params) {
  const { agentOptions } = params;
  return {
    ...params,
    httpsAgent: agentOptions && new https.Agent(agentOptions),
  };
}

function buildUrl(url, queryParams) {
  return queryParams
    ? `${url}?${new URLSearchParams(queryParams).toString()}`
    : url;
}

function buildRequest(url, params) {
  const { method, headers, body, query, ...otherParams } = params;

  const initialOptions = {
    method,
    headers,
    dispatcher: new https.Agent({ keepAlive: true }),
    otherParams,
  };

  switch (method) {
    case 'GET':
      return new Request(
        `${url}?${new URLSearchParams(query).toString()}`,
        ...withAgent(initialOptions)
      );
    case 'HEAD':
      return new Request(url, ...withAgent(initialOptions));
    default:
      return new Request(url, {
        ...withAgent(initialOptions),
        body: body ? JSON.stringify(body) : body,
      });
  }
}

// Wrapper for all requests, handles errors and logs
export async function request(url, params = { method: 'GET' }) {
  const defaultOptions = {
    method: 'GET', // POST, PUT, DELETE, HEAD, etc.
    headers: {
      // the content type header value is usually auto-set
      // depending on the request body
    },
    body: undefined, //Blob, ArrayBuffer, TypedArray, Dataview, URLSearchParms, ReadableStream >> GET or HEAD method cannot have body,
    mode: 'cors', // cors, no-cors, same-origin
    credentials: 'same-origin', // omit, same-origin, include
    cache: 'default', // default, no-store, reload, no-cache, force-cache and only-if-cached
    redirect: 'follow', // follow, error, manual
    referrer: 'about:client', // A string specifying the referrer of the request. This can be a same-origin URL, about:client, or an empty string.,
    referrerPolicy: 'strict-origin-when-cross-origin', // no-referrer-when-downgrade, no-referrer, origin, same-origin...
    integrity: '', //a hash, like "sha256-abcdef1234567890"
    keepAlive: true,
    signal: undefined, // AbortController to abort request
    priority: 'auto', //Specifies the priority of the fetch request relative to other requests of the same. Must be one of the following strings: high, low, auto
    query: {}, // An object implementing `URLSearchParams.string()` which returns a string containing a query string suitable for use in a URL.
  };

  const { method, data, headers, ...otherOptions } = {
    ...defaultOptions,
    ...params,
  };

  const request = buildRequest(url, method, otherOptions, data, headers);

  const response = await fetch(request);
  // const response = await fetch(resolvedUrl, options);
  const results = await response.json();

  handleResponseError(response, results, method);

  return results;
}
