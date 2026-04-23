import { composeNextState, parseCsv } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  assertRelativeUrl,
} from '@openfn/language-common/util';
import nodepath from 'node:path';
import { stringify } from 'csv-stringify/sync';

export function parseNdjson(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line));
}

export async function parseByFormat(buffer, format, state) {
  if (format === 'raw') {
    return buffer;
  }

  const text = buffer.toString('utf8');
  const trimmed = text.trim();

  if (format === 'json') {
    return trimmed ? JSON.parse(trimmed) : null;
  }

  if (format === 'ndjson') {
    return trimmed ? parseNdjson(trimmed) : [];
  }

  if (format === 'csv') {
    const csvState = await parseCsv(text)(state);
    return csvState.data;
  }

  throw new Error(
    `Unsupported format: ${format}. Use one of json, ndjson, csv, raw.`,
  );
}

export function writeDestination(state, destination, value) {
  const path = destination
    .split('.')
    .map(segment => segment.trim())
    .filter(Boolean);

  if (!path.length) {
    return state;
  }

  const nextState = { ...state };
  let cursor = nextState;

  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index];
    const existing = cursor[segment];

    cursor[segment] =
      existing && typeof existing === 'object' && !Array.isArray(existing)
        ? { ...existing }
        : {};

    cursor = cursor[segment];
  }

  cursor[path[path.length - 1]] = value;

  return nextState;
}

const CONTENT_TYPES = {
  json: 'application/json',
  ndjson: 'application/x-ndjson',
  csv: 'text/csv',
  raw: 'application/octet-stream',
};

export function serializeByFormat(data, format) {
  if (format === 'raw') {
    return Buffer.isBuffer(data) ? data : Buffer.from(String(data));
  }

  if (format === 'json') {
    return Buffer.from(JSON.stringify(data));
  }

  if (format === 'ndjson') {
    const lines = (Array.isArray(data) ? data : [data])
      .map(row => JSON.stringify(row))
      .join('\n');
    return Buffer.from(lines);
  }

  if (format === 'csv') {
    const rows = Array.isArray(data) ? data : [data];
    return Buffer.from(stringify(rows, { header: true }));
  }

  throw new Error(
    `Unsupported format: ${format}. Use one of json, ndjson, csv, raw.`,
  );
}

export function inferContentType(format) {
  return CONTENT_TYPES[format] ?? 'application/octet-stream';
}

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, response.body),
    response: responseWithoutBody,
  };
};

// This helper function will call out to the backend service
// and add authorisation headers
// Refer to the common request function for options and details
export const request = (configuration = {}, method, path, options) => {
  // You might want to check that the path is not an absolute URL before
  // appending credentials commonRequest will do this for you if you
  // pass a baseURL to it and you don't need to build a path here
  // assertRelativeUrl(path);

  // TODO This example adds basic auth from config data
  //       you may need to support other auth strategies
  const { baseUrl, username, password } = configuration;
  const headers = makeBasicAuthHeader(username, password);

  // TODO You can define custom error messages here
  //      The request function will throw if it receives
  //      an error code (<=400), terminating the workflow
  const errors = {
    404: 'Page not found',
  };

  const opts = {
    // Force the response to be parsed as JSON
    parseAs: 'json',

    // Include the error map
    errors,

    // Set the baseUrl from the config object
    baseUrl,

    ...options,

    // You can add extra headers here if you want to
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
  };

  // TODO you may want to add a prefix to the path
  // use path.join to build the path safely
  const safePath = nodepath.join(path);

  // Make the actual request
  return commonRequest(method, safePath, opts);
};
