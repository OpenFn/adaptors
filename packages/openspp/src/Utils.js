/**
 * INVARIANT: Must export function named `request`
 * - Infrastructure/helpers ONLY
 * - NO operational functions
 * - To extend: wrap it (e.g., requestWithRetry)
 *
 * Structure follows the OpenFn adaptor template
 * (tools/generate/template/src/Utils.js) and the common `request` helper.
 * API reference: OpenSPP2 `spp_api_v2` REST API, mounted at /api/v2/spp.
 */
import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const API_PATH = '/api/v2/spp';

const FORBIDDEN_HINT =
  'OpenSPP returns 403 when a record does not exist, has no consent, or the API client lacks a scope';

/**
 * Builds a readable message from an OpenSPP error body.
 * OpenSPP2 returns FastAPI `{ detail }` bodies, where `detail` is a string or,
 * for 422 validation errors, an array of `{ loc, msg }`. RFC 9457 `title` is
 * supported as a fallback.
 * @private
 */
const describeErrorBody = (body, statusMessage) => {
  const detail = body?.detail;
  if (typeof detail === 'string' && detail) {
    return detail;
  }
  if (Array.isArray(detail) && detail.length) {
    return detail
      .map(item => {
        const location = Array.isArray(item?.loc) ? item.loc.join('.') : '';
        const message = item?.msg ?? JSON.stringify(item);
        return location ? `${location}: ${message}` : message;
      })
      .join('; ');
  }
  if (typeof body?.title === 'string' && body.title) {
    return body.title;
  }
  return statusMessage;
};

/**
 * Rethrows an error from common `request` with an OpenSPP-specific message.
 * Errors that are not HTTP errors (eg an absolute URL) are rethrown unchanged.
 * @private
 */
const toOpenSppError = (error, method, path) => {
  if (!error?.statusCode) {
    return error;
  }
  const { statusCode, statusMessage, body, headers = {} } = error;

  let readablePath = path;
  try {
    readablePath = decodeURIComponent(path);
  } catch {
    // keep the path as sent if it isn't valid percent-encoding
  }

  let message = `OpenSPP ${statusCode} ${method} ${readablePath}: ${describeErrorBody(
    body,
    statusMessage
  )}`;
  if (statusCode === 403) {
    message += ` (${FORBIDDEN_HINT})`;
  }
  if (statusCode === 429 && headers['retry-after']) {
    message += ` (retry after ${headers['retry-after']}s)`;
  }

  const openSppError = new Error(message);
  openSppError.statusCode = statusCode;
  openSppError.body = body;
  openSppError.headers = headers;
  return openSppError;
};

/**
 * Sends a request to the OpenSPP2 REST API v2.
 * Paths are relative to `/api/v2/spp`. The Bearer token set by `authorize` is
 * attached to every request. Non-2xx responses throw.
 * @private
 * @param {object} configuration - `state.configuration` (baseUrl, access_token)
 * @param {string} method - HTTP method
 * @param {string} path - Path relative to /api/v2/spp, eg `/Individual`
 * @param {object} [options] - `query`, `body`, `ifMatch`, `headers`
 * @returns {Promise<object>} the common `request` response
 */
export const request = async (configuration = {}, method, path, options = {}) => {
  assertRelativeUrl(path);

  const { baseUrl, access_token } = configuration;
  const { query, body, ifMatch, headers = {} } = options;

  const requestHeaders = {
    'content-type': 'application/json',
    ...headers,
  };
  if (access_token) {
    requestHeaders.authorization = `Bearer ${access_token}`;
  }
  if (ifMatch) {
    requestHeaders['if-match'] = ifMatch;
  }

  try {
    return await commonRequest(method, `${API_PATH}${path}`, {
      baseUrl,
      query,
      body,
      headers: requestHeaders,
      parseAs: 'json',
    });
  } catch (error) {
    throw toOpenSppError(error, method, path);
  }
};

/**
 * Gets an OAuth access token with the client credentials flow and stores it on
 * `state.configuration.access_token` for the rest of the run.
 * The OpenSPP token endpoint is rate limited (5 requests per minute per IP),
 * so the token is fetched once per run and reused.
 * @private
 * @param {State} state
 * @returns {Promise<State>}
 */
export const authorize = async state => {
  const { configuration = {} } = state;
  if (configuration.access_token) {
    return state;
  }

  const { clientId, clientSecret } = configuration;
  if (!clientId || !clientSecret) {
    throw new Error(
      'Invalid credentials: include clientId and clientSecret in state.configuration'
    );
  }

  const response = await request(configuration, 'POST', '/oauth/token', {
    body: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    },
  });

  return {
    ...state,
    configuration: {
      ...configuration,
      access_token: response.body.access_token,
    },
  };
};

/**
 * Writes the response body to `state.data` and the rest of the response to
 * `state.response`.
 * @private
 */
export const prepareNextState = (state, response) => {
  const { body, ...responseWithoutBody } = response;
  return {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
};

/**
 * Writes the list of resources from a search response to `state.data`, and
 * paging info to `state.response.page` as `{ total, next }`.
 * Note: when OpenSPP applies consent filtering, `total` is the page size, not
 * the real total. Use `next` to decide whether more pages exist.
 * @private
 */
export const prepareSearchState = (state, response) => {
  const { body, ...responseWithoutBody } = response;

  const isBundle = body?.resourceType === 'Bundle';
  const total = isBundle ? body.total : body?.meta?.total;
  const next = isBundle
    ? body.link?.find(link => link.relation === 'next')?.url ?? null
    : body?.links?.next ?? null;

  return {
    ...composeNextState(state, unwrapSearch(body)),
    response: { ...responseWithoutBody, page: { total, next } },
  };
};

/**
 * URL-encodes a `system|value` identifier for use as one path segment.
 * @private
 * @param {string} identifier - eg `urn:openspp:vocab:id-type#national_id|PH-123`
 * @returns {string}
 */
export const encodeIdentifier = identifier => {
  if (typeof identifier !== 'string' || !identifier.includes('|')) {
    throw new Error(
      `Invalid identifier "${identifier}". Expected "system|value", eg "urn:openspp:vocab:id-type#national_id|PH-123"`
    );
  }
  return encodeURIComponent(identifier);
};

/**
 * Splits a typed reference like `Group/system|value` into its parts.
 * @private
 * @param {string} reference
 * @param {string[]} [allowedTypes] - accepted resource types
 * @returns {{type: string, identifier: string}}
 */
export const parseReference = (
  reference,
  allowedTypes = ['Individual', 'Group']
) => {
  const slash = typeof reference === 'string' ? reference.indexOf('/') : -1;
  const type = slash > 0 ? reference.slice(0, slash) : '';
  const identifier = slash > 0 ? reference.slice(slash + 1) : '';

  if (!allowedTypes.includes(type) || !identifier.includes('|')) {
    const expected = allowedTypes.map(t => `"${t}/system|value"`).join(' or ');
    throw new Error(`Invalid reference "${reference}". Expected ${expected}`);
  }
  return { type, identifier };
};

const joinList = value => (Array.isArray(value) ? value.join(',') : value);

/**
 * Builds the query for a search from documented OpenSPP search parameters
 * and adaptor paging options. Undefined values are dropped.
 * @private
 * @param {object} [query] - OpenSPP search parameters, eg `{ name: 'Santos' }`
 * @param {object} [options] - `count`, `offset`, `sort`, `lastId`, `elements`, `extensions`
 * @returns {object}
 */
export const buildQuery = (query = {}, options = {}) => {
  const params = {
    ...query,
    _count: options.count,
    _offset: options.offset,
    _sort: options.sort,
    _lastId: options.lastId,
    _elements: joinList(options.elements),
    _extensions: joinList(options.extensions),
  };
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );
};

/**
 * Returns the list of resources from a search response.
 * Most OpenSPP2 resources return `{ data, meta, links }`; ServicePoint returns
 * a FHIR Bundle `{ resourceType: 'Bundle', entry: [{ resource }] }`.
 * @private
 */
export const unwrapSearch = body => {
  if (body?.resourceType === 'Bundle') {
    return (body.entry ?? []).map(entry => entry.resource);
  }
  return body?.data ?? [];
};
