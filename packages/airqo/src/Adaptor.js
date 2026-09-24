import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

const VALID_ENTITY_TYPES = ['sites', 'devices', 'grids', 'cohorts'];

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
 * Retrieve the most recent air quality measurements for a monitoring entity.
 *
 * The `entityType` determines which kind of entity is queried. Valid values are:
 * - `'sites'`   — a single monitoring site
 * - `'devices'` — a specific sensor device
 * - `'grids'`   — a named geographic grid (e.g. a city or country)
 * - `'cohorts'` — a user-defined group of devices
 *
 * @example <caption>Get recent measurements for a site</caption>
 * getRecentMeasurements('sites', 'site123');
 * @example <caption>Get recent measurements for a grid</caption>
 * getRecentMeasurements('grids', 'grid123');
 * @example <caption>Get recent measurements for a device</caption>
 * getRecentMeasurements('devices', 'device123');
 * @function
 * @public
 * @param {string} entityType - Type of entity: `sites`, `devices`, `grids`, or `cohorts`.
 * @param {string} entityId - ID of the entity to retrieve measurements for.
 * @returns {Operation}
 */
export function getRecentMeasurements(entityType, entityId) {
  return async state => {
    const [resolvedType, resolvedId] = expandReferences(
      state,
      entityType,
      entityId
    );

    util.assertAllowedValue(resolvedType, VALID_ENTITY_TYPES, 'entityType');
    util.assertNonEmptyString(resolvedId, 'entityId');

    const response = await util.request(
      state.configuration,
      'GET',
      `devices/measurements/${resolvedType}/${resolvedId}/recent`
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
 * getHistoricalMeasurements('sites', 'site123', { limit: 100 });
 * @example <caption>Get historical measurements for a grid with date range</caption>
 * getHistoricalMeasurements('grids', 'grid123', {
 *   startTime: '2024-01-01T00:00:00Z',
 *   endTime: '2024-01-31T23:59:59Z',
 * });
 * @function
 * @public
 * @param {string} entityType - Type of entity: `sites`, `devices`, `grids`, or `cohorts`.
 * @param {string} entityId - ID of the entity to retrieve measurements for.
 * @param {object} [params] - Request parameters documented in {@link https://platform.airqo.net/docs/api/for-partners/historical-data/#request-parameters Request parameters}.
 * @returns {Operation}
 */
export function getHistoricalMeasurements(entityType, entityId, params = {}) {
  return async state => {
    const [resolvedType, resolvedId, resolvedParams] = expandReferences(
      state,
      entityType,
      entityId,
      params
    );

    util.assertAllowedValue(resolvedType, VALID_ENTITY_TYPES, 'entityType');
    util.assertNonEmptyString(resolvedId, 'entityId');
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

