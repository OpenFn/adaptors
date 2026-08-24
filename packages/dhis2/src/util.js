import { createHash, getHashes } from 'node:crypto';
import { composeNextState } from '@openfn/language-common';
import {
  request as commonRequest,
  makeBasicAuthHeader,
  logResponse,
} from '@openfn/language-common/util';

export function shouldUseNewTracker(resourceType) {
  return /^(enrollments|relationships|events|trackedEntities)$/.test(
    resourceType,
  );
}
/**
 * Converts an attribute ID and value into a DHIS2 attribute object
 * @public
 * @example
 * fn(state => {
 *    const s = util.attr('w75KJ2mc4zz', 'Elias');
 *    console.log(s);
 *    return state;
 * })
 * @function
 * @param {string} attribute - A tracked entity instance (TEI) attribute ID.
 * @param {string} value - The value for that attribute.
 * @returns {object}
 */
export function attr(attribute, value) {
  return { attribute, value };
}

/**
 * Converts a dataElement and value into a DHIS2 dataValue object
 * @public
 * @example
 * fn(state => {
 *   const s = util.dv('f7n9E0hX8qk', 12);
 *   console.log(s);
 *   return state
 * })
 * @function
 * @param {string} dataElement - A data element ID.
 * @param {string} value - The value for that data element.
 * @returns {object}
 */
export function dv(dataElement, value) {
  return { dataElement, value };
}

/**
 * Gets an attribute value by its case-insensitive display name
 * @public
 * @example
 * fn(state => {
 *    const s = util.findAttributeValue(state.data.trackedEntities[0], 'first name');
 *    console.log(s);
 *    return state
 * })
 * @function
 * @param {Object} trackedEntity - A tracked entity instance (TEI) object
 * @param {string} attributeDisplayName - The 'displayName' to search for in the TEI's attributes
 * @returns {string}
 */
export function findAttributeValue(trackedEntity, attributeDisplayName) {
  return trackedEntity?.attributes?.find(
    a => a?.displayName.toLowerCase() == attributeDisplayName.toLowerCase(),
  )?.value;
}

/**
 * Gets an attribute value by its uid
 * @public
 * @example
 * fn(state =>{
 *   const s = util.findAttributeValueById(state.tei, 'y1w2R6leVmh');
 *   console.log(s);
 *   return state
 * })
 * @function
 * @param {Object} trackedEntity - A tracked entity instance (TEI) object
 * @param {string} attributeUid - The uid to search for in the TEI's attributes
 * @returns {string}
 */
export function findAttributeValueById(trackedEntity, attributeUid) {
  return trackedEntity?.attributes?.find(a => a?.attribute == attributeUid)
    ?.value;
}

export const CONTENT_TYPES = {
  xml: 'application/xml',
  json: 'application/json',
  pdf: 'application/pdf',
  csv: 'application/csv',
  xls: 'application/vnd.ms-excel',
};

/**
 * Determines the attribute name for a DHIS2 system ID given a resource type.
 * @param {string} resourceType
 * @returns {string}
 */
export function selectId(resourceType) {
  switch (resourceType) {
    case 'trackedEntityInstances':
      return 'trackedEntityInstance';

    // We can extend here if we find other special kinds of resourceType
    // case 'other-special-case':
    //   return 'other-special-id';

    default:
      return 'id';
  }
}

export function handleHttpResponse(result, state) {
  const { body, ...responseWithoutBody } = result;

  const nextState = {
    ...composeNextState(state, body),
    response: responseWithoutBody,
  };
  return nextState;
}

export function handleResponse(result, state) {
  const { body } = result;

  const nextState = {
    ...composeNextState(state, body),
  };
  return nextState;
}

export function prettyJson(data) {
  return JSON.stringify(data, null, 2);
}

export function ensureArray(data, key) {
  return Array.isArray(data) ? { [key]: data } : { [key]: [data] };
}

export function prefixVersionToPath(
  configuration,
  options,
  resourceType,
  path = null,
) {
  let { apiVersion } = configuration;
  const urlString = '/' + resourceType;

  // Note that users can override the apiVersion from configuration with args
  if (options?.apiVersion) apiVersion = options.apiVersion;

  const apiMessage = apiVersion
    ? `Using DHIS2 api version ${apiVersion}`
    : 'Using latest available version of the DHIS2 api on this server.';

  console.log(apiMessage);

  const pathSuffix = apiVersion ? `/${apiVersion}${urlString}` : `${urlString}`;

  const urlPath = '/api' + pathSuffix;
  if (path) return `${urlPath}/${path}`;
  return urlPath;
}
export const configureAuth = (auth, headers = {}) => {
  if (auth.pat) {
    Object.assign(headers, {
      Authorization: `ApiToken ${auth.pat}`,
    });
  } else if (auth.username && auth.password) {
    Object.assign(headers, makeBasicAuthHeader(auth.username, auth.password));
  } else {
    throw new Error(
      'Invalid authorization credentials. Include a PAT or a username and password in state.configuration',
    );
  }

  return headers;
};

export async function request(configuration, requestData) {
  const { hostUrl } = configuration;
  const { method, path, options = {}, data = {} } = requestData;

  const {
    headers = { 'content-type': 'application/json' },
    query = {},
    parseAs = 'json',
  } = options;

  if (options) console.log(`with params: `, query);

  const authHeaders = configureAuth(configuration, headers);

  const opts = {
    headers: {
      ...authHeaders,
      ...headers,
    },
    query,
    parseAs,
    body: data,
    baseUrl: hostUrl,
  };

  return commonRequest(method, path, opts).then(logResponse);
}

const DEFAULT_ALGORITHM = 'sha256';

const resolveAlgorithm = input => {
  const requested = String(input ?? DEFAULT_ALGORITHM)
    .trim()
    .toLowerCase();
  const available = getHashes();
  const match = [requested, requested.replace(/[\s_-]/g, '')].find(candidate =>
    available.includes(candidate),
  );

  if (!match) {
    throw new Error(
      `util.hash: unsupported algorithm "${input}". ` +
        `Common options: sha256, sha512, sha3-256, sha1, md5. ` +
        `This runtime supports: ${available.slice(0, 12).join(', ')}...`,
    );
  }
  return match;
};

const stableStringify = value => {
  if (value === undefined) return 'null';
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;

  const entries = Object.keys(value)
    .sort()
    .filter(key => value[key] !== undefined)
    .map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
  return `{${entries.join(',')}}`;
};

const serialize = (data, stable) => {
  if (data === null || data === undefined) {
    throw new Error('util.hash: data is required');
  }
  if (typeof data === 'string') return data;
  if (Buffer.isBuffer(data) || ArrayBuffer.isView(data)) return data;
  if (typeof data === 'object') {
    return stable ? stableStringify(data) : JSON.stringify(data);
  }
  return String(data);
};

/**
 * Generate a cryptographic hash of a string, object or buffer.
 *
 * Objects are serialized to JSON with their keys sorted, so the digest is
 * stable across key orderings - important when hashing a payload to build an
 * idempotency or deduplication key. Pass `{ stable: false }` to hash the
 * plain `JSON.stringify` output instead.
 *
 * Note this is a one-way digest, unlike `util.encode`, which is reversible
 * base64.
 * @public
 * @function
 * @example <caption>Hash a string with the default algorithm (sha256)</caption>
 * util.hash('hello world')
 * @example <caption>Choose an algorithm</caption>
 * util.hash('hello world', 'sha512')
 * @example <caption>Build a deduplication key from a payload</caption>
 * const key = `obs:${util.hash({ sender: state.data.sender, body: state.data.content })}`
 * @example <caption>Base64url output, for use in a URL or filename</caption>
 * util.hash(state.data, 'sha256', { encoding: 'base64url' })
 * @param {string|object|Buffer} data - The data to hash. Objects are
 *   serialized with sorted keys unless `stable` is false.
 * @param {string} [algorithm=sha256] - Any digest this runtime supports, eg
 *   sha256, sha512, sha3-256, sha1, md5. Case and hyphens are forgiving:
 *   'SHA-256' and 'sha256' are the same.
 * @param {object} [options]
 * @param {string} [options.encoding=hex] - Output encoding: hex, base64 or
 *   base64url.
 * @param {boolean} [options.stable=true] - Sort object keys before hashing.
 * @returns {string} The digest of the data.
 */
export function hash(data, algorithm = DEFAULT_ALGORITHM, options = {}) {
  const { encoding = 'hex', stable = true } = options;

  if (!['hex', 'base64', 'base64url'].includes(encoding)) {
    throw new Error(
      `util.hash: unsupported encoding "${encoding}". Use hex, base64 or base64url.`,
    );
  }

  return createHash(resolveAlgorithm(algorithm))
    .update(serialize(data, stable))
    .digest(encoding);
}

/**
 * Generate a sha256 hash of a string, object or buffer. Shorthand for
 * `util.hash(data, 'sha256')`.
 * @public
 * @function
 * @example <caption>Hash a string</caption>
 * util.sha256('hello world')
 * @param {string|object|Buffer} data - The data to hash.
 * @param {object} [options] - Same options as util.hash.
 * @returns {string} The sha256 digest, hex encoded by default.
 */
export function sha256(data, options = {}) {
  return hash(data, 'sha256', options);
}
