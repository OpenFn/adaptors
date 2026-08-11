/**
 * INVARIANT: Must export a function named `request`.
 * All operational (job-facing) functions live in this file.
 * Docs: https://docs.airqo.net/airqo-rest-api-documentation
 */
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

const VALID_ENTITY_TYPES = ['sites', 'devices', 'grids', 'cohorts'];

const assertNonEmptyString = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
};

const assertAllowedValue = (value, allowedValues, label) => {
  assertNonEmptyString(value, label);

  if (!allowedValues.includes(value)) {
    throw new Error(
      `Invalid ${label}: ${value}. Expected one of: ${allowedValues.join(', ')}.`
    );
  }
};

const ISO_8601_RE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;

const assertMeasurementParams = params => {
  if (params.limit !== undefined) {
    if (
      typeof params.limit !== 'number' ||
      !Number.isInteger(params.limit) ||
      params.limit < 1
    ) {
      throw new Error('params.limit must be a positive integer.');
    }
    if (params.limit > 1000) {
      throw new Error(
        'params.limit cannot exceed 1000. Use pagination (page/skip params) for larger datasets.'
      );
    }
  }

  if (params.startTime !== undefined) {
    if (
      typeof params.startTime !== 'string' ||
      !ISO_8601_RE.test(params.startTime)
    ) {
      throw new Error(
        'params.startTime must be a valid ISO 8601 date string (e.g. "2024-01-01T00:00:00Z").'
      );
    }
  }

  if (params.endTime !== undefined) {
    if (
      typeof params.endTime !== 'string' ||
      !ISO_8601_RE.test(params.endTime)
    ) {
      throw new Error(
        'params.endTime must be a valid ISO 8601 date string (e.g. "2024-01-31T23:59:59Z").'
      );
    }
  }

  if (
    params.startTime !== undefined &&
    params.endTime !== undefined &&
    new Date(params.startTime) > new Date(params.endTime)
  ) {
    throw new Error(
      'params.startTime must not be later than params.endTime.'
    );
  }
};

/**
 * @typedef {Object} AirQoMeasurement
 * @property {string} device - Device name (e.g. "aq_##")
 * @property {string} device_id - Device ID
 * @property {string} site_id - Site ID
 * @property {string} time - ISO 8601 timestamp of the reading
 * @property {{ value: number }} pm2_5 - PM2.5 reading
 * @property {{ value: number }} pm10 - PM10 reading
 * @property {object} no2 - NO2 reading
 * @property {string} frequency - Measurement frequency (e.g. "hourly")
 * @property {string} aqi_category - AQI category (e.g. "Moderate")
 * @property {string} aqi_color - AQI colour hex (e.g. "ffff00")
 * @property {object} siteDetails - Full site location details
 */

/**
 * @typedef {Object} AirQoState
 * @property {AirQoMeasurement[]|object} data - The parsed response body from AirQo
 * @property {object} response - The raw HTTP response (status, headers, etc.)
 * @property {Array} references - Previous state data objects
 */

/**
 * Retrieve the most recent air quality measurements for a monitoring entity.
 *
 * The `entityType` determines which kind of entity is queried. Valid values are:
 * - `'sites'`   — a single monitoring site
 * - `'devices'` — a specific sensor device
 * - `'grids'`   — a named geographic grid (e.g. a city or country)
 * - `'cohorts'` — a user-defined group of devices
 *
 * @example <caption>Get recent measurements for a site</caption>
 * getRecentMeasurements('sites', '60d058c8048305120d######');
 *
 * @example <caption>Get recent measurements for a grid</caption>
 * getRecentMeasurements('grids', '65e98e11528c9f00133444f8');
 *
 * @example <caption>Get recent measurements for a device</caption>
 * getRecentMeasurements('devices', '5f2036bc70223655545#####');
 *
 * @function
 * @public
 * @param {string} entityType - Type of entity: 'sites' | 'devices' | 'grids' | 'cohorts'
 * @param {string} entityId - The ID of the entity to retrieve measurements for
 * @param {object} [params] - Optional query parameters passed through to AirQo (e.g. { limit: 100 })
 * @returns {Operation}
 * @state {AirQoState} data - Object containing `measurements` array and `meta` pagination info
 */
export function getRecentMeasurements(entityType, entityId, params = {}) {
  return async state => {
    const [resolvedType, resolvedId, resolvedParams] = expandReferences(
      state,
      entityType,
      entityId,
      params
    );

    assertAllowedValue(resolvedType, VALID_ENTITY_TYPES, 'entityType');
    assertNonEmptyString(resolvedId, 'entityId');
    assertMeasurementParams(resolvedParams);

    const response = await util.request(
      state.configuration,
      'GET',
      `devices/measurements/${resolvedType}/${resolvedId}/recent`,
      { query: resolvedParams }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Retrieve historical (past) air quality measurements for a monitoring entity.
 *
 * The `entityType` determines which kind of entity is queried. Valid values are:
 * - `'sites'`   — a single monitoring site
 * - `'devices'` — a specific sensor device
 * - `'grids'`   — a named geographic grid (e.g. a city or country)
 * - `'cohorts'` — a user-defined group of devices
 *
 * @example <caption>Get historical measurements for a site</caption>
 * getHistoricalMeasurements('sites', '60d058c8048305120d######');
 *
 * @example <caption>Get historical measurements for a grid with date range</caption>
 * getHistoricalMeasurements('grids', '65e98e11528c9f00133444f8', {
 *   startTime: '2024-01-01T00:00:00Z',
 *   endTime: '2024-01-31T23:59:59Z',
 * });
 *
 * @function
 * @public
 * @param {string} entityType - Type of entity: 'sites' | 'devices' | 'grids' | 'cohorts'
 * @param {string} entityId - The ID of the entity to retrieve measurements for
 * @param {object} [params] - Optional query parameters passed through to AirQo (e.g. { startTime, endTime, limit })
 * @returns {Operation}
 * @state {AirQoState} data - Object containing `measurements` array and `meta` pagination info
 */
export function getHistoricalMeasurements(entityType, entityId, params = {}) {
  return async state => {
    const [resolvedType, resolvedId, resolvedParams] = expandReferences(
      state,
      entityType,
      entityId,
      params
    );

    assertAllowedValue(resolvedType, VALID_ENTITY_TYPES, 'entityType');
    assertNonEmptyString(resolvedId, 'entityId');
    assertMeasurementParams(resolvedParams);

    const response = await util.request(
      state.configuration,
      'GET',
      `devices/measurements/${resolvedType}/${resolvedId}/historical`,
      { query: resolvedParams }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a generic authenticated GET request to any AirQo endpoint.
 * Also available as `http.get`.
 *
 * @example <caption>Get raw data from any AirQo path</caption>
 * get('devices/measurements/sites/60d058c8048305120d######/recent');
 *
 * @function
 * @public
 * @param {string} path - API path relative to baseUrl (e.g. 'devices/metadata/sites')
 * @param {object} [options] - Additional options (query, headers, etc.)
 * @returns {Operation}
 * @state {AirQoState} data - The parsed response body from AirQo
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(state, path, options);

    assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a generic authenticated POST request to any AirQo endpoint.
 * Also available as `http.post`.
 *
 * @example <caption>Post a body to any AirQo path</caption>
 * post('devices/some-endpoint', { foo: 'bar' });
 *
 * @function
 * @public
 * @param {string} path - API path relative to baseUrl
 * @param {object} [body] - Request body
 * @param {object} [options] - Additional options (query, headers, etc.)
 * @returns {Operation}
 * @state {AirQoState} data - The parsed response body from AirQo
 */
export function post(path, body = {}, options = {}) {
  return async state => {
    const [resolvedPath, resolvedBody, resolvedOptions] = expandReferences(
      state,
      path,
      body,
      options
    );

    assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(state.configuration, 'POST', resolvedPath, {
      ...resolvedOptions,
      body: resolvedBody,
    });

    return util.prepareNextState(state, response);
  };
}

/**
 * Make a generic authenticated request of any HTTP method to any AirQo endpoint.
 * Also available as `http.request`.
 *
 * @example <caption>Make an arbitrary request</caption>
 * request('GET', 'devices/metadata/grids');
 *
 * @function
 * @public
 * @param {string} method - HTTP method (e.g. 'GET', 'POST')
 * @param {string} path - API path relative to baseUrl
 * @param {object} [options] - Additional options (query, body, headers, etc.)
 * @returns {Operation}
 * @state {AirQoState} data - The parsed response body from AirQo
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );

    assertNonEmptyString(resolvedMethod, 'method');
    assertNonEmptyString(resolvedPath, 'path');

    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );

    return util.prepareNextState(state, response);
  };
}

// Namespace alias grouping the generic helpers above; each member is already
// documented and exported individually as `get`, `post`, and `request`.
export const http = { get, post, request };

export {
  as,
  combine,
  cursor,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  fnIf,
  group,
  lastReferenceValue,
  map,
  merge,
  scrubEmojis,
  sourceValue,
} from '@openfn/language-common';

