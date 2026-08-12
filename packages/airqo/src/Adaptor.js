/**
 * AirQo-specific operations. Generic HTTP helpers live in ./http.js.
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

// Requires a time and timezone/offset, e.g. "2024-01-01T00:00:00Z".
const ISO_8601_DATE_TIME_RE =
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
      !ISO_8601_DATE_TIME_RE.test(params.startTime)
    ) {
      throw new Error(
        'params.startTime must be a valid ISO 8601 date string (e.g. "2024-01-01T00:00:00Z").'
      );
    }
  }

  if (params.endTime !== undefined) {
    if (
      typeof params.endTime !== 'string' ||
      !ISO_8601_DATE_TIME_RE.test(params.endTime)
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
 * @property {string} device  
 * @property {string} device_id 
 * @property {string} site_id 
 * @property {string} time 
 * @property {{ value: number }} pm2_5 
 * @property {{ value: number }} pm10 
 * @property {object} no2 
 * @property {string} frequency 
 * @property {string} aqi_category 
 * @property {string} aqi_color 
 * @property {object} siteDetails 
 */

/**
 * @typedef {Object} AirQoState
 * @property {AirQoMeasurement[]|object} data 
 * @property {object} response 
 * @property {Array} references 
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

 * @example <caption>Get recent measurements for a grid</caption>

 * @example <caption>Get recent measurements for a device</caption>

 * @function
 * @public
 * @param {string} entityType 
 * @param {string} entityId 
 * @param {object} [params] 
 * @returns {Operation}
 * @state 
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

 * @example <caption>Get historical measurements for a grid with date range</caption>

 * @function
 * @public
 * @param {string} entityType 
 * @param {string} entityId 
 * @param {object} [params] 
 * @returns {Operation}
 * @state 
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

