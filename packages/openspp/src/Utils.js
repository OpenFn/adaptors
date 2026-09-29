/**
 * INVARIANT: Must export function named `request`
 * - Infrastructure/helpers ONLY
 * - NO operational functions
 * - To extend: wrap it (e.g., requestWithRetry)
 */
import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  assertRelativeUrl,
} from '@openfn/language-common/util';

export const API_PATH = '/api/v2/spp';

// Upper bound used when reading all memberships of one beneficiary.
const MEMBERSHIP_PAGE_SIZE = 100;

const FORBIDDEN_HINT =
  'OpenSPP returns 403 when the API client lacks a scope, or, for API clients that require consent, when an individual or group does not exist or has no consent';

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
 * `state.configuration.access_token` for the rest of the step.
 * The OpenSPP token endpoint is rate limited (5 requests per minute and 50
 * per day per IP), so the token is fetched once and reused until the OpenFn
 * runtime removes `configuration` at the end of the step.
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
 * Note: when OpenSPP applies consent filtering, `total` is the number of
 * records on the page, not the real total. Use `next` to decide whether more
 * pages exist. On OpenSPP2 up to 2026.09 it can be null before the last page
 * when records are hidden
 * (OpenSPP reads up to 3 × `count` records for a page with `count` of 50 or
 * less, and only 100 above that: with `count` of 50 or less the page ends
 * early when more than 2 × `count` of them are hidden; above 50, when more
 * than 100 - `count` are; at 100, one is); open PR OpenSPP2 #555 fixes this.
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
  // v3 paging options, which are not sent
  if (options.limit !== undefined) {
    console.warn('WARNING: limit is not supported: use count to set the page size');
  }
  if (options.order !== undefined) {
    console.warn(
      'WARNING: order is not supported: use sort, eg { sort: "-birthDate" }'
    );
  }
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

/**
 * Throws unless `data` is a plain object.
 * @private
 */
export const assertObject = (data, name = 'data') => {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error(`${name} must be an object, got ${JSON.stringify(data)}`);
  }
};

/**
 * Warns about each option in `options` that OpenSPP ignores.
 * @private
 * @param {string} name - adaptor function name, for the message
 * @param {object} options - resolved options
 * @param {object} unsupported - map of option name to the reason it isn't supported
 */
export const warnUnsupportedOptions = (name, options, unsupported) => {
  for (const [key, reason] of Object.entries(unsupported)) {
    if (options?.[key] !== undefined) {
      console.warn(`WARNING: ${name} does not support ${key}: ${reason}`);
    }
  }
};

// Fields OpenSPP can sort individuals by. It sorts by name for any other value.
const SORT_FIELDS = ['name', 'birthDate', 'lastUpdated'];

/**
 * Warns unless `sort` is a field OpenSPP sorts individuals by, optionally
 * prefixed with `-` for descending.
 * @private
 * @param {string} name - adaptor function name, for the message
 * @param {string} [sort]
 */
export const warnUnsupportedSort = (name, sort) => {
  if (sort === undefined) {
    return;
  }
  const field = typeof sort === 'string' && sort.startsWith('-') ? sort.slice(1) : sort;
  if (!SORT_FIELDS.includes(field)) {
    console.warn(
      `WARNING: ${name} does not support sort ${JSON.stringify(
        sort
      )}: use name, birthDate or lastUpdated, with - for descending (OpenSPP sorts by name for any other value)`
    );
  }
};

/**
 * Reads one resource by `system|value` identifier and returns the response.
 * @private
 * @param {object} configuration - `state.configuration`
 * @param {string} type - resource type, eg `Individual`
 * @param {string} id - resolved identifier as `system|value`
 * @param {object} [options] - resolved `elements` and `extensions`
 * @returns {Promise<object>} the common `request` response
 */
export const readResource = (configuration, type, id, options = {}) =>
  request(configuration, 'GET', `/${type}/${encodeIdentifier(id)}`, {
    query: buildQuery({}, options),
  });

/**
 * Searches a resource type and returns the response. For an Individual
 * search with a `group` filter, the group is read first, so a missing group
 * throws (404, or 403 for API clients that require consent).
 * @private
 * @param {object} configuration - `state.configuration`
 * @param {string} type - resource type, eg `Individual`
 * @param {object} [query] - resolved OpenSPP search parameters
 * @param {object} [options] - resolved paging and field options
 * @returns {Promise<object>} the common `request` response
 */
export const searchResource = async (
  configuration,
  type,
  query = {},
  options = {}
) => {
  if (Array.isArray(query)) {
    // A v3 Odoo domain would be sent as `?0=…`, which OpenSPP ignores,
    // returning every record
    throw new Error(
      `query must be an object of OpenSPP search parameters, eg { name: "Santos" }. Odoo domains like ${JSON.stringify(
        query
      )} are not supported`
    );
  }
  assertObject(query, 'query');
  for (const key of ['identifier', 'group']) {
    if (query[key] !== undefined && query[key] !== 'none') {
      // OpenSPP2 up to 2026.09 ignores a malformed filter and returns every
      // record
      encodeIdentifier(query[key]);
    }
  }
  const groupFilter = query.group;
  if (type === 'Individual' && groupFilter !== undefined && groupFilter !== 'none') {
    // OpenSPP2 up to 2026.09 also ignores a group filter for a group that
    // doesn't exist, so check the group first: a missing group throws here
    // (404, or 403 for API clients that require consent)
    await request(configuration, 'GET', `/Group/${encodeIdentifier(groupFilter)}`, {
      query: { _elements: 'identifier' },
    });
  }
  return request(configuration, 'GET', `/${type}`, {
    query: buildQuery(query, options),
  });
};

/**
 * Creates a resource and returns the response.
 * @private
 * @param {object} configuration - `state.configuration`
 * @param {string} type - resource type, eg `Individual`
 * @param {object} data - resolved resource
 * @returns {Promise<object>} the common `request` response
 */
export const createResource = async (configuration, type, data) => {
  assertObject(data);
  return request(configuration, 'POST', `/${type}`, { body: data });
};

/**
 * Partially updates a resource (JSON Merge Patch) and returns the response.
 * @private
 * @param {object} configuration - `state.configuration`
 * @param {string} type - resource type, eg `Individual`
 * @param {string} id - resolved identifier as `system|value`
 * @param {object} data - resolved fields to change
 * @param {object} [options] - resolved `ifMatch`
 * @returns {Promise<object>} the common `request` response
 */
export const patchResource = async (
  configuration,
  type,
  id,
  data,
  options = {}
) => {
  assertObject(data);
  return request(configuration, 'PATCH', `/${type}/${encodeIdentifier(id)}`, {
    body: data,
    ifMatch: options.ifMatch,
  });
};

/**
 * Reads the program memberships of a beneficiary.
 * @private
 */
export const listMemberships = async (configuration, beneficiary, query = {}) => {
  const response = await request(
    configuration,
    'GET',
    '/ProgramMembership',
    {
      query: buildQuery(
        { beneficiary, ...query },
        { count: MEMBERSHIP_PAGE_SIZE }
      ),
    }
  );
  return response;
};

/**
 * Reads all memberships of a beneficiary and finds the one for a program.
 * @private
 */
export const findMembership = async (configuration, beneficiary, programId) => {
  parseReference(beneficiary);
  encodeIdentifier(programId);
  const response = await listMemberships(configuration, beneficiary);
  const memberships = unwrapSearch(response.body);
  const programReference = `Program/${programId}`;
  const membership = memberships.find(
    m => m.program?.reference === programReference
  );
  const hasMorePages = Boolean(response.body?.links?.next);
  return {
    response,
    membership,
    programReference,
    isAmbiguous: memberships.length > 1 || hasMorePages,
  };
};

/**
 * Updates a membership's status with a PUT, guarding against OpenSPP2 up to
 * 2026.09 looking up memberships by beneficiary only: it updates the
 * beneficiary's most recently created membership, whichever program it is in,
 * and moves it to
 * the program in the body. The `isAmbiguous` refusal is what prevents this.
 * @private
 */
export const putMembership = async (
  configuration,
  beneficiary,
  { membership, programReference, isAmbiguous },
  changes
) => {
  if (isAmbiguous) {
    throw new Error(
      `Ambiguous membership: ${beneficiary} is in more than one program, and OpenSPP cannot safely update one of them through the API. Change the membership in OpenSPP instead.`
    );
  }
  const { identifier } = parseReference(beneficiary);
  const body = {
    program: { reference: membership.program.reference },
    beneficiary: { reference: membership.beneficiary.reference },
    status: changes.status,
    enrollmentDate: membership.enrollmentDate,
  };
  for (const key of ['exitDate', 'exitReason']) {
    if (changes[key] !== undefined) {
      body[key] = changes[key];
    }
  }

  const response = await request(
    configuration,
    'PUT',
    `/ProgramMembership/${encodeIdentifier(identifier)}`,
    { body }
  );
  if (response.body?.program?.reference !== programReference) {
    throw new Error(
      `OpenSPP updated a membership in a different program (${response.body?.program?.reference}) instead of ${programReference}. Check this beneficiary's memberships in OpenSPP.`
    );
  }
  return response;
};
