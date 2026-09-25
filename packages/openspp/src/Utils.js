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
  expandReferences,
} from '@openfn/language-common/util';

export const API_PATH = '/api/v2/spp';

// Upper bound used when reading all memberships of one beneficiary.
const MEMBERSHIP_PAGE_SIZE = 100;

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
  // v3 paging options, which OpenSPP2 would silently ignore
  if (options.limit !== undefined) {
    throw new Error('Use count instead of limit to set the page size');
  }
  if (options.order !== undefined) {
    throw new Error('Use sort instead of order, eg { sort: "-birthdate" }');
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
 * Throws unless `data` is an object with at least one identifier.
 * @private
 */
export const assertHasIdentifier = data => {
  assertObject(data);
  if (!Array.isArray(data.identifier) || data.identifier.length === 0) {
    throw new Error(
      'data.identifier must be a non-empty array of { system, value }, eg [{ system: "urn:openspp:vocab:id-type#national_id", value: "PH-123" }]'
    );
  }
};

/**
 * Returns an operation that reads one resource by `system|value` identifier.
 * @private
 */
export const readResource = (type, id, options = {}) => {
  return async state => {
    const [resolvedId, resolvedOptions] = expandReferences(state, id, options);
    const response = await request(
      state.configuration,
      'GET',
      `/${type}/${encodeIdentifier(resolvedId)}`,
      { query: buildQuery({}, resolvedOptions) }
    );
    return prepareNextState(state, response);
  };
};

/**
 * Returns an operation that searches a resource type.
 * @private
 */
export const searchResource = (type, query = {}, options = {}) => {
  return async state => {
    const [resolvedQuery, resolvedOptions] = expandReferences(
      state,
      query,
      options
    );
    if (Array.isArray(resolvedQuery)) {
      // A v3 Odoo domain would be sent as `?0=…`, which OpenSPP ignores,
      // returning every record
      throw new Error(
        `query must be an object of OpenSPP search parameters, eg { name: "Santos" }. Odoo domains like ${JSON.stringify(
          resolvedQuery
        )} are not supported`
      );
    }
    assertObject(resolvedQuery, 'query');
    for (const key of ['identifier', 'group']) {
      if (resolvedQuery?.[key] !== undefined && resolvedQuery[key] !== 'none') {
        // OpenSPP ignores a malformed filter and returns every record
        encodeIdentifier(resolvedQuery[key]);
      }
    }
    const groupFilter = resolvedQuery?.group;
    if (type === 'Individual' && groupFilter !== undefined && groupFilter !== 'none') {
      // OpenSPP also ignores a group filter for a group that doesn't exist,
      // so check the group first: a missing group throws a 404 here
      await request(
        state.configuration,
        'GET',
        `/Group/${encodeIdentifier(groupFilter)}`,
        { query: { _elements: 'identifier' } }
      );
    }
    const response = await request(state.configuration, 'GET', `/${type}`, {
      query: buildQuery(resolvedQuery, resolvedOptions),
    });
    return prepareSearchState(state, response);
  };
};

/**
 * Returns an operation that creates a resource with at least one identifier.
 * @private
 */
export const createResource = (type, data) => {
  return async state => {
    const [resolvedData] = expandReferences(state, data);
    assertHasIdentifier(resolvedData);
    const response = await request(state.configuration, 'POST', `/${type}`, {
      body: resolvedData,
    });
    return prepareNextState(state, response);
  };
};

/**
 * Returns an operation that partially updates a resource (JSON Merge Patch).
 * @private
 */
export const patchResource = (type, id, data, options = {}) => {
  return async state => {
    const [resolvedId, resolvedData, resolvedOptions] = expandReferences(
      state,
      id,
      data,
      options
    );
    assertObject(resolvedData);
    const response = await request(
      state.configuration,
      'PATCH',
      `/${type}/${encodeIdentifier(resolvedId)}`,
      { body: resolvedData, ifMatch: resolvedOptions.ifMatch }
    );
    return prepareNextState(state, response);
  };
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
 * Updates a membership's status with a PUT, guarding against OpenSPP2 looking
 * up memberships by beneficiary only (it updates the beneficiary's first
 * membership, whichever program it is in).
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
