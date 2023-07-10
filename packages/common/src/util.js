/**
 * General-purpose utility functions
 *
 * These are designed more for use in adaptor code than job code
 * (but we could choose to export util from common)
 *
 * None of these functions are operation factories
 */

import { fetch } from 'undici';

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

function buildUrl(url, queryParams) {
  return `${url}?${new URLSearchParams(queryParams).toString()}`;
}

function buildRequest(url, method, queryParams, data, headers) {
  const initialOptions = {
    method,
    headers,
    dispatcher: new https.Agent({ keepAlive: true }),
  };

  switch (method) {
    case 'GET':
      return new Request(buildUrl(url, queryParams), initialOptions);
    case 'POST':
      return new Request(buildUrl(url, queryParams), {
        ...initialOptions,
        body: data ? JSON.stringify(data) : undefined,
      });
    default:
      return new Request(url, options);
  }
}

// Wrapper for all requests, handles errors and logs
export async function request(url, params = { method: 'GET' }) {
  const { method, data, headers, ...otherOptions } = params;
  const options = {
    method: 'GET',
    headers: {},
    body: '', //Blob, ArrayBuffer, TypedArray, Dataview, URLSearchParms, ReadableStream >> GET or HEAD method cannot have body,
    mode: '', // cors, no-cors, same-origin
    credentials: '', // omit, same-origin, include
    cache: '', // default, no-store, reload, no-cache, force-cache and only-if-cached
    redirect: '', // follow, error, manual
    referrer: ''
  };

  const request = buildRequest(url, method, otherOptions, data, headers);

  const response = await fetch(request);
  // const response = await fetch(resolvedUrl, options);
  const results = await response.json();

  handleResponseError(response, results, method);

  return results;
}
