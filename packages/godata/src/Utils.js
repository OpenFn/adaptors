import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';

const stringifyFilter = (query = {}) => {
  const { filter, ...rest } = query;
  if (filter === undefined || filter === null) {
    return rest;
  }
  if (typeof filter === 'object') {
    return { ...rest, filter: JSON.stringify(filter) };
  }
  return { ...rest, filter };
};

const assertApiUrl = configuration => {
  if (!configuration?.apiUrl) {
    const e = new Error('MISSING_API_URL');
    e.code = 'MISSING_API_URL';
    e.description = 'No apiUrl was found on state.configuration';
    e.fix =
      'Set apiUrl on your GoData credential, e.g. https://godata.example.org/api';
    throw e;
  }
};

export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  if (!state.references) {
    state.references = [];
  }

  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

export const request = (configuration = {}, method, path, options = {}) => {
  assertRelativeUrl(path);
  assertApiUrl(configuration);

  const { apiUrl, access_token } = configuration;

  const headers = {
    'content-type': 'application/json',
    ...options.headers,
  };
  if (access_token) {
    headers.Authorization = `Bearer ${access_token}`;
  }

  return commonRequest(method, path, {
    parseAs: 'json',
    ...options,
    baseUrl: apiUrl,
    query: stringifyFilter(options.query),
    headers,
  }).then(logResponse, error => {
    logResponse(error);
    throw error;
  });
};

// Like common's logResponse, but prints the query (and its JSON filter) unencoded
const logResponse = response => {
  const { method, url, statusCode, duration, query } = response;
  if (!(method && url && statusCode)) {
    return response;
  }

  const queryString = Object.entries(query || {})
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const message = `${method} ${url}${queryString ? `?${queryString}` : ''} - ${statusCode} in ${duration}ms`;

  if (response instanceof Error) {
    console.error(message);
    console.error('response body:', response.body || '[no body]');
  } else {
    console.log(message);
  }
  return response;
};

export const authorize = async state => {
  const { email, password, ...rest } = state.configuration ?? {};

  const response = await request(rest, 'POST', '/users/login', {
    body: { email, password },
  });

  return {
    ...state,
    configuration: {
      ...state.configuration,
      access_token: response.body.id,
    },
  };
};

/**
 * Find a record by `where`, then update it if exactly one matches or create it
 * if none match. Throws if more than one record matches.
 * @private
 */
export const upsertBy = async (
  state,
  { listPath, itemPath, where, data, prepareUpdate = d => d }
) => {
  const { body: matches } = await request(
    state.configuration,
    'GET',
    listPath,
    { query: { filter: { where } } }
  );

  if (matches.length > 1) {
    const e = new Error('UPSERT_MULTIPLE_MATCHES');
    e.code = 'UPSERT_MULTIPLE_MATCHES';
    e.description = `${matches.length} records at ${listPath} matched ${JSON.stringify(
      where
    )}; refusing to guess which one to update`;
    e.fix =
      'Use a match field whose value is unique, or de-duplicate the records in GoData';
    throw e;
  }

  if (matches.length === 1) {
    const [existing] = matches;
    console.log(`Record found at ${listPath}. Performing update.`);
    return request(state.configuration, 'PUT', itemPath(existing.id), {
      body: prepareUpdate({ ...data }, existing),
    });
  }

  console.log(`No record found at ${listPath}. Performing create.`);
  return request(state.configuration, 'POST', listPath, { body: data });
};
