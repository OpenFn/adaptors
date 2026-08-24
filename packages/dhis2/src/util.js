import { createHash } from 'node:crypto';
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

const UID_HEAD_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const UID_TAIL_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Derives a stable DHIS2 UID from a seed string. The same seed always returns
 * the same UID, which lets you set the id of a resource before you create it
 * and re-run a workflow without creating duplicates.
 *
 * The seed is hashed with SHA-256 and the first 16 bytes of the digest are read
 * as a single integer N. The 10 trailing characters are N in base 62; the
 * leading letter is the remaining high bits mod 52. That covers the entire
 * valid-UID space (52 * 62^10, about 2^65 values), and reducing 128 bits into
 * 65 makes the modulo bias negligible.
 *
 * The seed is hashed exactly as given, so it is the caller's job to make it
 * unique across resource types - include a prefix if two different resources
 * could otherwise share a seed.
 *
 * This mapping is a stability guarantee: it will not change in a future
 * release, because doing so would orphan every record already created with it.
 *
 * @public
 * @function
 * @namespace util
 * @param {string} seed - The string to derive the UID from.
 * @returns {string} An 11-character DHIS2 UID, matching /^[A-Za-z][A-Za-z0-9]{10}$/
 * @example <caption>Derive an event UID from an org unit and period</caption>
 * fn(state => {
 *   const uid = util.deriveUid(`event:${state.orgUnit}:${state.period}`);
 *   console.log(uid);
 *   return state;
 * })
 * @example <caption>Create an event idempotently</caption>
 * create('tracker', state => ({
 *   events: [
 *     {
 *       event: util.deriveUid(`event:${state.orgUnit}:${state.period}`),
 *       program: state.program,
 *       orgUnit: state.orgUnit,
 *       occurredAt: state.date,
 *     },
 *   ],
 * }));
 */
export function deriveUid(seed) {
  if (typeof seed !== 'string') {
    throw new TypeError(
      `util.deriveUid expects a string seed, but got ${typeof seed}. ` +
        'Build the seed yourself, eg `event:${orgUnit}:${period}`.',
    );
  }
  if (seed.length === 0) {
    throw new RangeError('util.deriveUid expects a non-empty string seed');
  }

  const digest = createHash('sha256').update(seed, 'utf8').digest('hex');
  let n = BigInt(`0x${digest.slice(0, 32)}`);

  const base = BigInt(UID_TAIL_CHARS.length);
  const tail = new Array(10);
  for (let i = 9; i >= 0; i--) {
    tail[i] = UID_TAIL_CHARS[Number(n % base)];
    n = n / base;
  }

  const head = UID_HEAD_CHARS[Number(n % BigInt(UID_HEAD_CHARS.length))];
  return head + tail.join('');
}
