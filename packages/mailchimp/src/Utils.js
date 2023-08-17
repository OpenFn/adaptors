import { composeNextState } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { Client } from 'undici';

export function handleResponse(response, state, callback) {
  const nextState = {
    ...composeNextState(state, response),
    response,
  };
  if (callback) return callback(nextState);
  return nextState;
}

const createClient = baseUrl => new Client(baseUrl);

const setHeaders = config => ({
  'Content-Type': 'application/json',
  Authorization: `Basic ${Buffer.from(
    `openfn:${config.apiKey}`,
    'utf-8'
  ).toString('base64')}`,
});

const defaultOptions = {
  query: {},
  body: undefined,
};

export const request = (method, path, options, callback = s => s) => {
  return async state => {
    // TODO should we add apiVersion in credentials schema ? the default can be 3.0
    const apiVersion = '3.0';
    const { apiKey, server } = state.configuration;

    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );
    const { query, body } = { ...defaultOptions, ...resolvedOptions };

    const headers = setHeaders({ apiKey });

    const baseUrl = `https://${server}.api.mailchimp.com`;

    const client = createClient(baseUrl);

    const response = await client.request({
      method: resolvedMethod,
      path: `/${apiVersion}${resolvedPath}`,
      headers,
      query,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseBody = await response.body.json();

    return handleResponse(responseBody, state, callback);
  };
};

export const get = (path, query, callback) =>
  request('GET', path, { query }, callback);

export const post = (path, body, query, callback) =>
  request('POST', path, { body, query }, callback);
