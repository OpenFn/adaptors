/**
 * INVARIANT: Must export a function named `request`.
 * All operational (job-facing) functions live in this file.
 * Docs: https://docs.airqo.net/airqo-rest-api-documentation
 */
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

const VALID_ENTITY_TYPES = ['sites', 'devices', 'grids', 'cohorts'];
const VALID_METADATA_RESOURCES = ['grids', 'cohorts', 'devices', 'sites'];
const VALID_TRANSFORM_FIELDS = ['pm2_5', 'pm10', 'no2'];
const VALID_PERIOD_TYPES = ['daily', 'hourly', 'monthly'];

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
        'params.limit cannot exceed 1000. For larger datasets use getAllHistoricalMeasurements.'
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

const assertForecastParams = params => {
  const hasDeviceId = typeof params.device_id === 'string' && params.device_id.trim();
  const hasSiteId = typeof params.site_id === 'string' && params.site_id.trim();

  if (!hasDeviceId && !hasSiteId) {
    throw new Error(
      'Forecast params must include either device_id or site_id.'
    );
  }

  if (hasDeviceId && hasSiteId) {
    throw new Error(
      'Forecast params must include only one of device_id or site_id.'
    );
  }
};

const formatPeriodFromTimestamp = (timestamp, periodType) => {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid measurement time: ${timestamp}`);
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hour = String(date.getUTCHours()).padStart(2, '0');

  if (periodType === 'daily') {
    return `${year}${month}${day}`;
  }

  if (periodType === 'hourly') {
    return `${year}${month}${day}${hour}`;
  }

  return `${year}${month}`;
};

const assertTransformOptions = options => {
  if (!options || typeof options !== 'object') {
    throw new Error('options must be an object.');
  }

  if (options.periodType !== undefined) {
    assertAllowedValue(options.periodType, VALID_PERIOD_TYPES, 'options.periodType');
  }

  if (options.fields !== undefined) {
    if (!Array.isArray(options.fields) || options.fields.length === 0) {
      throw new Error(
        'options.fields must not be empty. Provide at least one field (e.g. ["pm2_5"]).'
      );
    }

    options.fields.forEach(fieldName =>
      assertAllowedValue(fieldName, VALID_TRANSFORM_FIELDS, 'options.fields value')
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
 * Retrieve ALL historical air quality measurements for a monitoring entity,
 * automatically fetching every page of results and combining them into a
 * single `measurements` array.
 *
 * Use this instead of `getHistoricalMeasurements` when you need a complete
 * dataset and the total number of records may exceed one page (1000 records).
 *
 * @example <caption>Get all historical measurements for a site</caption>
 * getAllHistoricalMeasurements('sites', '60d058c8048305120d######');
 *
 * @example <caption>Get all historical measurements for a grid with a date range</caption>
 * getAllHistoricalMeasurements('grids', '65e98e11528c9f00133444f8', {
 *   startTime: '2024-01-01T00:00:00Z',
 *   endTime: '2024-01-31T23:59:59Z',
 * });
 *
 * @function
 * @public
 * @param {string} entityType - Type of entity: 'sites' | 'devices' | 'grids' | 'cohorts'
 * @param {string} entityId - The ID of the entity to retrieve measurements for
 * @param {object} [params] - Optional query parameters passed through to AirQo (e.g. { startTime, endTime }). Do not pass `limit`.
 * @returns {Operation}
 * @state {AirQoState} data - Object containing combined `measurements` array and `meta` from the last page
 */
export function getAllHistoricalMeasurements(entityType, entityId, params = {}) {
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

    const path = `devices/measurements/${resolvedType}/${resolvedId}/historical`;
    const pageSize = 1000;

    const firstResponse = await util.request(
      state.configuration,
      'GET',
      path,
      { query: { ...resolvedParams, page: 1, limit: pageSize } }
    );

    if (!Array.isArray(firstResponse.body?.measurements)) {
      throw new Error(
        'Invalid AirQo response: expected body.measurements to be an array on page 1.'
      );
    }

    const totalPages = Number(firstResponse.body?.meta?.pages ?? 1);
    if (!Number.isInteger(totalPages) || totalPages < 1) {
      throw new Error(
        `Invalid AirQo response: expected body.meta.pages to be an integer >= 1, got ${firstResponse.body?.meta?.pages}.`
      );
    }

    const allMeasurements = [...firstResponse.body.measurements];

    for (let page = 2; page <= totalPages; page++) {
      const pageResponse = await util.request(
        state.configuration,
        'GET',
        path,
        { query: { ...resolvedParams, page, limit: pageSize } }
      );

      if (!Array.isArray(pageResponse.body?.measurements)) {
        throw new Error(
          `Invalid AirQo response: expected body.measurements to be an array on page ${page}.`
        );
      }

      allMeasurements.push(...pageResponse.body.measurements);
    }

    const syntheticResponse = {
      ...firstResponse,
      body: {
        ...firstResponse.body,
        measurements: allMeasurements,
        meta: {
          ...firstResponse.body.meta,
          total: allMeasurements.length,
          page: totalPages,
          pages: totalPages,
        },
      },
    };

    return util.prepareNextState(state, syntheticResponse);
  };
}

/**
 * Retrieve metadata about publicly available AirQo monitoring entities.
 *
 * Valid `resource` values:
 * - `'grids'`   — all publicly available geographic grids
 * - `'cohorts'` — all publicly available device cohorts
 * - `'devices'` — all publicly available devices
 * - `'sites'`   — all publicly available monitoring sites
 *
 * @example <caption>Get all publicly available sites</caption>
 * listMetadata('sites');
 *
 * @example <caption>Get all publicly available grids</caption>
 * listMetadata('grids');
 *
 * @example <caption>Get all publicly available devices</caption>
 * listMetadata('devices');
 *
 * @function
 * @public
 * @param {string} resource - Resource type: 'grids' | 'cohorts' | 'devices' | 'sites'
 * @param {object} [params] - Optional query parameters passed through to AirQo
 * @returns {Operation}
 * @state {AirQoState} data - Object containing the resource list (e.g. `grids`, `sites`, `devices`, or `cohorts`)
 */
export function listMetadata(resource, params = {}) {
  return async state => {
    const [resolvedResource, resolvedParams] = expandReferences(
      state,
      resource,
      params
    );

    assertAllowedValue(resolvedResource, VALID_METADATA_RESOURCES, 'resource');

    const response = await util.request(
      state.configuration,
      'GET',
      `devices/metadata/${resolvedResource}`,
      { query: resolvedParams }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Retrieve all site details for publicly available AirQo grids.
 * Returns a summary of every monitored location grouped by grid,
 * including coordinates, city, country, and data provider.
 *
 * @example <caption>Get grid summary with all site details</caption>
 * getGridSummary();
 *
 * @function
 * @public
 * @returns {Operation}
 * @state {AirQoState} data - Object with `grids` array, each containing a `sites` array
 */
export function getGridSummary() {
  return async state => {
    const response = await util.request(
      state.configuration,
      'GET',
      'devices/grids/summary'
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Retrieve daily air quality forecasts for a device or site.
 *
 * Pass either `device_id` or `site_id` in the params object.
 *
 * @example <caption>Get daily forecast for a device</caption>
 * getDailyForecast({ device_id: '5f2036bc70223655545#####' });
 *
 * @example <caption>Get daily forecast for a site</caption>
 * getDailyForecast({ site_id: '60d058c8048305120d######' });
 *
 * @function
 * @public
 * @param {object} params - Query parameters passed through to AirQo. Provide `device_id` (e.g. `'5f2036bc70223655545#####'`) or `site_id` (e.g. `'60d058c8048305120d######'`). Exactly one is required.
 * @returns {Operation}
 * @state {AirQoState} data - Object containing a `forecasts` array with `pm2_5`, `time`, and `health_tips`
 */
export function getDailyForecast(params = {}) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    assertForecastParams(resolvedParams);

    const response = await util.request(
      state.configuration,
      'GET',
      'predict/daily-forecast',
      { query: resolvedParams }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Retrieve hourly air quality forecasts for a device or site.
 *
 * Pass either `device_id` or `site_id` in the params object.
 *
 * @example <caption>Get hourly forecast for a device</caption>
 * getHourlyForecast({ device_id: '5f2036bc70223655545#####' });
 *
 * @example <caption>Get hourly forecast for a site</caption>
 * getHourlyForecast({ site_id: '60d058c8048305120d######' });
 *
 * @function
 * @public
 * @param {object} params - Query parameters passed through to AirQo. Provide `device_id` (e.g. `'5f2036bc70223655545#####'`) or `site_id` (e.g. `'60d058c8048305120d######'`). Exactly one is required.
 * @returns {Operation}
 * @state {AirQoState} data - Object containing a `forecasts` array with `pm2_5`, `time`, and `health_tips`
 */
export function getHourlyForecast(params = {}) {
  return async state => {
    const [resolvedParams] = expandReferences(state, params);

    assertForecastParams(resolvedParams);

    const response = await util.request(
      state.configuration,
      'GET',
      'predict/hourly-forecast',
      { query: resolvedParams }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * DHIS2-specific convenience: map AirQo measurements into DHIS2 `dataValue`
 * entries for batch import. This does not call the AirQo or DHIS2 APIs — it's
 * a pure data-shaping step. If your workflow targets a different system,
 * write your own mapping in job code instead of using this operation.
 *
 * This operation is designed for scheduled workflows where measurements are
 * fetched first (for example via getAllHistoricalMeasurements) and then mapped
 * to DHIS2 org units and data elements.
 *
 * @example <caption>Transform PM2.5 and PM10 measurements into daily data values</caption>
 * toDhis2DataValues(
 *   state => state.data.measurements,
 *   {
 *     orgUnits: {
 *       site_id_001: 'DHIS2_ORG_UNIT_UID_1',
 *     },
 *     dataElements: {
 *       pm2_5: 'DHIS2_PM25_ELEMENT_UID',
 *       pm10: 'DHIS2_PM10_ELEMENT_UID',
 *     },
 *   },
 *   { fields: ['pm2_5', 'pm10'], periodType: 'daily' }
 * );
 *
 * @function
 * @public
 * @param {AirQoMeasurement[]|function} measurements - Array of measurements or a state-resolved reference to one
 * @param {object|function} mappingConfig - Mapping config containing `orgUnits` and `dataElements`
 * @param {object} [options] - Transform options: `fields` and `periodType`
 * @returns {Operation}
 * @state {object} data - Object containing `dataValues` array and a `summary`
 */
export function toDhis2DataValues(
  measurements,
  mappingConfig,
  options = {}
) {
  return async state => {
    const [resolvedMeasurements, resolvedMappingConfig, resolvedOptions] =
      expandReferences(state, measurements, mappingConfig, options);

    if (!Array.isArray(resolvedMeasurements)) {
      throw new Error('measurements must be an array.');
    }

    if (
      !resolvedMappingConfig ||
      typeof resolvedMappingConfig !== 'object' ||
      Array.isArray(resolvedMappingConfig)
    ) {
      throw new Error('mappingConfig must be an object.');
    }

    const { orgUnits = {}, dataElements = {} } = resolvedMappingConfig;

    if (!orgUnits || typeof orgUnits !== 'object' || Array.isArray(orgUnits)) {
      throw new Error('mappingConfig.orgUnits must be an object.');
    }

    if (
      !dataElements ||
      typeof dataElements !== 'object' ||
      Array.isArray(dataElements)
    ) {
      throw new Error('mappingConfig.dataElements must be an object.');
    }

    assertTransformOptions(resolvedOptions);

    const fields = resolvedOptions.fields || ['pm2_5'];
    const periodType = resolvedOptions.periodType || 'daily';

    const dataValues = [];
    const skippedDetails = [];
    let mappedMeasurements = 0;

    resolvedMeasurements.forEach((measurement, index) => {
      if (!measurement || typeof measurement !== 'object') {
        skippedDetails.push({ index, reason: 'invalid entry: not an object' });
        return;
      }

      const orgUnit = orgUnits[measurement.site_id] || orgUnits[measurement.device_id];

      if (!orgUnit) {
        skippedDetails.push({
          index,
          reason: `site_id "${measurement.site_id}" and device_id "${measurement.device_id}" not found in orgUnits mapping`,
        });
        return;
      }

      let period;
      try {
        period = formatPeriodFromTimestamp(measurement.time, periodType);
      } catch (error) {
        throw new Error(
          `Unable to transform measurement at index ${index}: ${error.message}`
        );
      }

      let hasMappedField = false;

      fields.forEach(fieldName => {
        const dataElement = dataElements[fieldName];
        const fieldValue = measurement[fieldName]?.value;

        if (!dataElement || fieldValue === undefined || fieldValue === null) {
          return;
        }

        hasMappedField = true;
        dataValues.push({
          dataElement,
          period,
          orgUnit,
          value: String(fieldValue),
        });
      });

      if (hasMappedField) {
        mappedMeasurements += 1;
      } else {
        skippedDetails.push({
          index,
          reason: `no configured dataElement matched fields [${fields.join(', ')}] for site_id "${measurement.site_id}"`,
        });
      }
    });

    const syntheticResponse = {
      status: 200,
      body: {
        dataValues,
        summary: {
          totalMeasurements: resolvedMeasurements.length,
          mappedMeasurements,
          skippedMeasurements: skippedDetails.length,
          skippedDetails,
          fields,
          periodType,
        },
      },
    };

    return util.prepareNextState(state, syntheticResponse);
  };
}

/**
 * Retrieve metadata for all publicly available AirQo monitoring sites.
 * Convenience alias for `listMetadata('sites')`.
 *
 * @example
 * listSites();
 *
 * @function
 * @public
 * @param {object} [params] - Optional query parameters passed through to AirQo
 * @returns {Operation}
 * @state {AirQoState} data - Object containing a `sites` array
 */
export function listSites(params = {}) {
  return listMetadata('sites', params);
}

/**
 * Retrieve metadata for all publicly available AirQo devices.
 * Convenience alias for `listMetadata('devices')`.
 *
 * @example
 * listDevices();
 *
 * @function
 * @public
 * @param {object} [params] - Optional query parameters passed through to AirQo
 * @returns {Operation}
 * @state {AirQoState} data - Object containing a `devices` array
 */
export function listDevices(params = {}) {
  return listMetadata('devices', params);
}

/**
 * Retrieve metadata for all publicly available AirQo geographic grids.
 * Convenience alias for `listMetadata('grids')`.
 *
 * @example
 * listGrids();
 *
 * @function
 * @public
 * @param {object} [params] - Optional query parameters passed through to AirQo
 * @returns {Operation}
 * @state {AirQoState} data - Object containing a `grids` array
 */
export function listGrids(params = {}) {
  return listMetadata('grids', params);
}

/**
 * Retrieve metadata for all publicly available AirQo device cohorts.
 * Convenience alias for `listMetadata('cohorts')`.
 *
 * @example
 * listCohorts();
 *
 * @function
 * @public
 * @param {object} [params] - Optional query parameters passed through to AirQo
 * @returns {Operation}
 * @state {AirQoState} data - Object containing a `cohorts` array
 */
export function listCohorts(params = {}) {
  return listMetadata('cohorts', params);
}

export { request } from './Utils.js';

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
