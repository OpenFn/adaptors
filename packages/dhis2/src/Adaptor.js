import axios from 'axios';
import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import _ from 'lodash';
const { indexOf } = _;
import {
  CONTENT_TYPES,
  generateUrl,
  handleResponse,
  prettyJson,
  selectId,
  shouldUseNewTracker,
  ensureArray,
} from './Utils';
import { request } from './Client';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for DHIS2.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    const version = state.configuration?.apiVersion;

    if (+version < 36) {
      console.warn(
        `WARNING: This adaptor is INCOMPATIBLE with DHIS2 tracker API versions before v36. Some functionality may break. See https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-master/tracker.html`
      );
    }

    return commonExecute(
      configMigrationHelper,
      ...operations
    )({ ...initialState, ...state });
  };
}

/**
 * Migrates `apiUrl` to `hostUrl` if `hostUrl` is `blank`.
 * For `OpenFn.org` users with the `old-style configuration`.
 * @example
 * configMigrationHelper(state)
 * @function
 * @param {object} state - the runtime state
 * @returns {object}
 */
function configMigrationHelper(state) {
  const { hostUrl, apiUrl } = state.configuration;
  if (!hostUrl) {
    console.warn(
      'DEPRECATION WARNING: Please migrate instance address from `apiUrl` to `hostUrl`.'
    );
    state.configuration.hostUrl = apiUrl;
    return state;
  }
  return state;
}

// NOTE: In order to prevent unintended exposure of authentication information
// in the logs, we make use of an axios interceptor.
axios.interceptors.response.use(
  function (response) {
    const contentType = response.headers['content-type']?.split(';')[0];

    const acceptHeaders = response.config.headers['Accept']
      .split(';')[0]
      .split(',');

    if (response.config.method === 'get') {
      if (indexOf(acceptHeaders, contentType) === -1) {
        const newError = {
          status: 404,
          message: 'Unexpected content returned',
          responseData: response.data,
        };

        console.error(newError.message);

        return Promise.reject(newError);
      }
    }

    if (
      typeof response?.data === 'string' &&
      contentType === CONTENT_TYPES?.json
    ) {
      try {
        // eslint-disable-next-line no-param-reassign
        response = { ...response, data: JSON.parse(response.data) };
      } catch (error) {
        console.warn('Non-JSON response detected, unable to parse.');
      }
    }
    return response;
  },
  function (error) {
    if (error.config?.auth) error.config.auth = '--REDACTED--';
    if (error.config?.data) error.config.data = '--REDACTED--';

    const details = error.response?.data;

    console.error(error.message || "That didn't work.");

    if (details) console.log(JSON.stringify(details, null, 2));

    return Promise.reject({
      request: error.config,
      message: error.message,
      response: error.response?.data,
    });
  }
);

/**
 * Create a record
 * @public
 * @function
 * @param {string} resourceType - Type of resource to create. E.g. `trackedEntities`, `programs`, `events`, ...
 * @magic resourceType $.children.resourceTypes[*]
 * @param {Dhis2Data} data - Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects.
 * @param {Object} [options] - Optional `options` to define URL parameters via params (E.g. `filter`, `dimension` and other import parameters), request config (E.g. `auth`) and the DHIS2 apiVersion.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @example <caption>Create a program</caption>
 * create('programs', {
 *   name: 'name 20',
 *   shortName: 'n20',
 *   programType: 'WITHOUT_REGISTRATION',
 * });
 * @example <caption>Create a single event</caption>
 * create('events', {
 *   program: 'eBAyeGv0exc',
 *   orgUnit: 'DiszpKrYNg8',
 *   status: 'COMPLETED',
 * });
 * @example <caption>Create a single tracker entity. See [Create tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)</caption>
 * create('trackedEntities', {
 *   orgUnit: 'TSyzvBiovKh',
 *   trackedEntityType: 'nEenWmSyUEp',
 *   attributes: [
 *     {
 *       attribute: 'w75KJ2mc4zz',
 *       value: 'Gigiwe',
 *     },
 *   ]
 * });
 * @example <caption>Create a dataSet</caption>
 * create('dataSets', { name: 'OpenFn Data Set', periodType: 'Monthly' });
 * @example <caption>a dataSetNotification</caption>
 * create('dataSetNotificationTemplates', {
 *   dataSetNotificationTrigger: 'DATA_SET_COMPLETION',
 *   notificationRecipient: 'ORGANISATION_UNIT_CONTACT',
 *   name: 'Notification',
 *   messageTemplate: 'Hello',
 *   deliveryChannels: ['SMS'],
 *   dataSets: [],
 * });
 * @example <caption>Create a dataElement</caption>
 * create('dataElements', {
 *   aggregationType: 'SUM',
 *   domainType: 'AGGREGATE',
 *   valueType: 'NUMBER',
 *   name: 'Paracetamol',
 *   shortName: 'Para',
 * });
 * @example <caption>Create a dataElementGroup</caption>
 * create('dataElementGroups', {
 *   name: 'Data Element Group 1',
 *   dataElements: [],
 * });
 * @example <caption>Create a dataElementGroupSet</caption>
 * create('dataElementGroupSets', {
 *   name: 'Data Element Group Set 4',
 *   dataDimension: true,
 *   shortName: 'DEGS4',
 *   dataElementGroups: [],
 * });
 * @example <caption>Create a dataValueSet</caption>
 * create('dataValueSets', {
 *   dataElement: 'f7n9E0hX8qk',
 *   period: '201401',
 *   orgUnit: 'DiszpKrYNg8',
 *   value: '12',
 * });
 * @example <caption>Create a dataValueSet with related dataValues</caption>
 * create('dataValueSets', {
 *   dataSet: 'pBOMPrpg1QX',
 *   completeDate: '2014-02-03',
 *   period: '201401',
 *   orgUnit: 'DiszpKrYNg8',
 *   dataValues: [
 *     {
 *       dataElement: 'f7n9E0hX8qk',
 *       value: '1',
 *     },
 *     {
 *       dataElement: 'Ix2HsbDMLea',
 *       value: '2',
 *     },
 *     {
 *       dataElement: 'eY5ehpbEsB7',
 *       value: '3',
 *     },
 *   ],
 * });
 * @example <caption>Create an enrollment</caption>
 * create('enrollments', {
 *   trackedEntity: 'bmshzEacgxa',
 *   orgUnit: 'TSyzvBiovKh',
 *   program: 'gZBxv9Ujxg0',
 *   enrollmentDate: '2013-09-17',
 *   incidentDate: '2013-09-17',
 * });
 * @example <caption>Create an multiple objects with the Tracker API</caption>
 *  create("tracker", {
 *   enrollments: [
 *     {
 *       trackedEntity: "bmshzEacgxa",
 *       orgUnit: "TSyzvBiovKh",
 *       program: "gZBxv9Ujxg0",
 *       enrollmentDate: "2013-09-17",
 *       incidentDate: "2013-09-17",
 *     },
 *   ],
 *   trackedEntities: [
 *     {
 *       orgUnit: "TSyzvBiovKh",
 *       trackedEntityType: "nEenWmSyUEp",
 *       attributes: [
 *         {
 *           attribute: "w75KJ2mc4zz",
 *           value: "Gigiwe",
 *         },
 *       ],
 *     },
 *   ],
 * });
 */
export function create(resourceType, data, options = {}, callback = s => s) {
  return state => {
    console.log(`Preparing create operation...`);

    const [resolvedResourceType, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, data, options);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    let promise;
    if (shouldUseNewTracker(resolvedResourceType)) {
      promise = callNewTracker(
        'create',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      promise = request(configuration, {
        method: 'post',
        url: generateUrl(configuration, resolvedOptions, resolvedResourceType),
        params,
        data: resolvedData,
        ...requestConfig,
      });
    }

    return promise.then(result => {
      const details = `with response ${JSON.stringify(result.data, null, 2)}`;
      console.log(`Created ${resolvedResourceType} ${details}`);

      const { location } = result.headers;
      if (location) console.log(`Record available @ ${location}`);

      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Update data. A generic helper function to update a resource object of any type.
 * Updating an object requires to send `all required fields` or the `full body`
 * @public
 * @function
 * @param {string} resourceType - The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. It requires to send `all required fields` or the `full body`. If you want `partial updates`, use `patch` operation.
 * @param {Object} [options] - Optional `options` to define URL parameters via params (E.g. `filter`, `dimension` and other import parameters), request config (E.g. `auth`) and the DHIS2 apiVersion.
 * @param {function} [callback]  - Optional callback to handle the response
 * @returns {Operation}
 * @example <caption>a program</caption>
 * update('programs', 'qAZJCrNJK8H', {
 *   name: '14e1aa02c3f0a31618e096f2c6d03bed',
 *   shortName: '14e1aa02',
 *   programType: 'WITHOUT_REGISTRATION',
 * });
 * @example <caption>an event</caption>
 * update('events', 'PVqUD2hvU4E', {
 *   program: 'eBAyeGv0exc',
 *   orgUnit: 'Ngelehun CHC',
 *   status: 'COMPLETED',
 *   storedBy: 'admin',
 *   dataValues: [],
 * });
 * @example <caption>Update a tracker entity. See [Update tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)</caption>
 * update('trackedEntities', '', {
 *   createdAt: '2015-08-06T21:12:37.256',
 *   orgUnit: 'TSyzvBiovKh',
 *   createdAtClient: '2015-08-06T21:12:37.256',
 *   trackedEntity: 'IeQfgUtGPq2',
 *   trackedEntityType: 'nEenWmSyUEp',
 *   inactive: false,
 *   deleted: false,
 *   featureType: 'NONE',
 *   programOwners: [
 *     {
 *       ownerOrgUnit: 'TSyzvBiovKh',
 *       program: 'IpHINAT79UW',
 *       trackedEntity: 'IeQfgUtGPq2',
 *     },
 *   ],
 *   attributes: [
 *     {
 *       lastUpdated: '2016-01-12T00:00:00.000',
 *       displayName: 'Last name',
 *       created: '2016-01-12T00:00:00.000',
 *       valueType: 'TEXT',
 *       attribute: 'zDhUuAYrxNC',
 *       value: 'Russell',
 *     },
 *     {
 *       lastUpdated: '2016-01-12T00:00:00.000',
 *       code: 'MMD_PER_NAM',
 *       displayName: 'First name',
 *       created: '2016-01-12T00:00:00.000',
 *       valueType: 'TEXT',
 *       attribute: 'w75KJ2mc4zz',
 *       value: 'Catherine',
 *     },
 *   ],
 * });
 * @example <caption>Update a dataSet</caption>
 * update('dataSets', 'lyLU2wR22tC', { name: 'OpenFN Data Set', periodType: 'Weekly' });
 * @example <caption>a dataSetNotification</caption>
 * update('dataSetNotificationTemplates', 'VbQBwdm1wVP', {
 *   dataSetNotificationTrigger: 'DATA_SET_COMPLETION',
 *   notificationRecipient: 'ORGANISATION_UNIT_CONTACT',
 *   name: 'Notification',
 *   messageTemplate: 'Hello Updated',
 *   deliveryChannels: ['SMS'],
 *   dataSets: [],
 * });
 * @example <caption>Update a dataElement</caption>
 * update('dataElements', 'FTRrcoaog83', {
 *   aggregationType: 'SUM',
 *   domainType: 'AGGREGATE',
 *   valueType: 'NUMBER',
 *   name: 'Paracetamol',
 *   shortName: 'Para',
 * });
 * @example <caption>Update a dataElementGroup</caption>
 * update('dataElementGroups', 'QrprHT61XFk', {
 *   name: 'Data Element Group 1',
 *   dataElements: [],
 * });
 * @example <caption>Update a dataElementGroupSet</caption>
 * update('dataElementGroupSets', 'VxWloRvAze8', {
 *   name: 'Data Element Group Set 4',
 *   dataDimension: true,
 *   shortName: 'DEGS4',
 *   dataElementGroups: [],
 * });
 * @example <caption>Update a dataValueSet</caption>
 * update('dataValueSets', 'AsQj6cDsUq4', {
 *   dataElement: 'f7n9E0hX8qk',
 *   period: '201401',
 *   orgUnit: 'DiszpKrYNg8',
 *   value: '12',
 * });
 * @example <caption>Update a dataValueSet with related dataValues</caption>
 * update('dataValueSets', 'Ix2HsbDMLea', {
 *   dataSet: 'pBOMPrpg1QX',
 *   completeDate: '2014-02-03',
 *   period: '201401',
 *   orgUnit: 'DiszpKrYNg8',
 *   dataValues: [
 *     {
 *       dataElement: 'f7n9E0hX8qk',
 *       value: '1',
 *     },
 *     {
 *       dataElement: 'Ix2HsbDMLea',
 *       value: '2',
 *     },
 *     {
 *       dataElement: 'eY5ehpbEsB7',
 *       value: '3',
 *     },
 *   ],
 * });
 * @example <caption>Update an enrollment given the provided ID</caption>
 * update('enrollments', 'CmsHzercTBa' {
 *   trackedEntity: 'bmshzEacgxa',
 *   orgUnit: 'TSyzvBiovKh',
 *   program: 'gZBxv9Ujxg0',
 *   enrollmentDate: '2013-10-17',
 *   incidentDate: '2013-10-17',
 * });
 */
export function update(
  resourceType,
  path,
  data,
  options = {},
  callback = s => s
) {
  return state => {
    console.log(`Preparing update operation...`);

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);

    const { requestConfig } = resolvedOptions;
    const { configuration } = state;

    let promise;
    if (shouldUseNewTracker(resolvedResourceType)) {
      promise = callNewTracker(
        'update',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      promise = request(configuration, {
        method: 'put',
        url: generateUrl(
          configuration,
          resolvedOptions,
          resolvedResourceType,
          resolvedPath
        ),
        options,
        data: resolvedData,
        ...requestConfig,
      });
    }

    return promise.then(result => {
      console.log(`Updated ${resolvedResourceType} at ${resolvedPath}`);
      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Get data. Generic helper method for getting data of any kind from DHIS2.
 * - This can be used to get `DataValueSets`,`events`,`trackers`,`etc.`
 * @public
 * @function
 * @param {string} resourceType - The type of resource to get(use its `plural` name). E.g. `dataElements`, `tracker/trackedEntities`,`organisationUnits`, etc.
 * @param {Object} query - A query object that will limit what resources are retrieved when converted into request params.
 * @param {Object} [options] - Optional `options` to define URL parameters via params beyond filters, request configuration (e.g. `auth`) and DHIS2 api version to use.
 * @param {function} [callback]  - Optional callback to handle the response
 * @returns {Operation} state
 * @example <caption>Get all data values for the 'pBOMPrpg1QX' dataset</caption>
 * get('dataValueSets', {
 *   dataSet: 'pBOMPrpg1QX',
 *   orgUnit: 'DiszpKrYNg8',
 *   period: '201401',
 *   fields: '*',
 * });
 * @example <caption>Get all programs for an organization unit</caption>
 * get('programs', { orgUnit: 'TSyzvBiovKh', fields: '*' });
 * @example <caption>Get a single tracked entity given the provided ID. See [TrackedEntities docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#tracked-entities-get-apitrackertrackedentities)</caption>
 * get('tracker/trackedEntities/F8yKM85NbxW');
 * @example <caption>Get an enrollment given the provided ID. See [Enrollment docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#enrollments-get-apitrackerenrollments)</caption>
 * get('tracker/enrollments/abcd');
 * @example <caption>Get all events matching given criteria. See [Events docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#events-get-apitrackerevents)</caption>
 * get('tracker/events');
 * @example <caption>Get the relationship between two tracker entities. The only required parameters are 'trackedEntity', 'enrollment' or 'event'. See [Relationships docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#relationships-get-apitrackerrelationships)</caption>
 * get('tracker/relationships', {
 *   trackedEntity:['F8yKM85NbxW'],
 * });
 */
export function get(resourceType, query, options = {}, callback = false) {
  return state => {
    console.log('Preparing get operation...');

    const [resolvedResourceType, resolvedQuery, resolvedOptions] =
      expandReferences(state, resourceType, query, options);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    return request(configuration, {
      method: 'get',
      url: generateUrl(configuration, resolvedOptions, resolvedResourceType),
      params: { ...resolvedQuery, ...params },
      responseType: 'json',
      ...requestConfig,
    }).then(result => {
      console.log(`Retrieved ${resolvedResourceType}`);
      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Post data. Generic helper method for posting data of any kind to DHIS2.
 * This can be used to create `DataValueSets`,`events`,`trackers`,etc.
 * @public
 * @function
 * @param {string} resourceType - Type of resource to create. E.g. `trackedEntities`, `programs`, `events`, ...
 * @magic resourceType $.children.resourceTypes[*]
 * @param {Dhis2Data} data - Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects.
 * @param {Object} [options] - Optional `options` to define URL parameters via params (E.g. `filter`, `dimension` and other import parameters), request config (E.g. `auth`) and the DHIS2 apiVersion.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation} state
 * @example <caption>Create an event</caption>
 * post("tracker", {
 *   events: [
 *     {
 *       program: "eBAyeGv0exc",
 *       orgUnit: "DiszpKrYNg8",
 *       status: "COMPLETED",
 *     },
 *   ],
 * });
 */
export function post(
  resourceType,
  data,
  query,
  options = {},
  callback = s => s
) {
  return state => {
    console.log('Preparing post operation...');

    const [resolvedResourceType, resolvedQuery, resolvedOptions, resolvedData] =
      expandReferences(state, resourceType, query, options, data);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    return request(configuration, {
      method: 'post',
      url: generateUrl(configuration, resolvedOptions, resolvedResourceType),
      params: { ...resolvedQuery, ...params },
      responseType: 'json',
      data: resolvedData,
      ...requestConfig,
    }).then(result => {
      console.log(`Created ${resolvedResourceType}`);
      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.
 * @public
 * @function
 * @param {string} resourceType - The type of a resource to `upsert`. E.g. `trackedEntities`
 * @param {Object} query - A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created.
 * @param {Object} data - The data to use for update or create depending on the result of the query.
 * @param {{ apiVersion: object, requestConfig: object, params: object }} [options] - Optional configuration that will be applied to both the `get` and the `create` or `update` operations.
 * @param {function} [callback] - Optional callback to handle the response
 * @throws {RangeError} - Throws range error
 * @returns {Operation}
 * @example <caption>Upsert a trackedEntity</caption>
 * upsert('trackedEntities', {
 *  orgUnit: 'TSyzvBiovKh',
 *  filter: ['w75KJ2mc4zz:Eq:Qassim'],
 * }, {
 *  orgUnit: 'TSyzvBiovKh',
 *  trackedEntityType: 'nEenWmSyUEp',
 *  attributes: [
 *    {
 *      attribute: 'w75KJ2mc4zz',
 *      value: 'Qassim',
 *    },
 *  ],
 * });
 */
export function upsert(
  resourceType, // resourceType supplied to both the `get` and the `create/update`
  query, // query supplied to the `get`
  data, // data supplied to the `create/update`
  options = {}, // options supplied to both the `get` and the `create/update`
  callback = s => s // callback for the upsert itself.
) {
  return state => {
    const [resolvedResourceType, resolvedOptions, resolvedData] =
      expandReferences(state, resourceType, options, data);

    let promise;

    if (shouldUseNewTracker(resolvedResourceType)) {
      const { configuration } = state;
      promise = callNewTracker(
        'create_and_update',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      // NOTE: that these parameters are all expanded by the `get`, `create`, and
      // `update` functions used inside this composed "upsert" function.
      console.log(`Preparing upsert via 'get' then 'create' OR 'update'...`);
      promise = get(
        resourceType,
        query,
        options
      )(state).then(resp => {
        const resources = resp.data[resourceType];
        if (resources.length > 1) {
          throw new RangeError(
            `Cannot upsert on Non-unique attribute. The operation found more than one records for your request.`
          );
        } else if (resources.length <= 0) {
          return create(resourceType, data, options)(state);
        } else {
          // Pick out the first (and only) resource in the array and grab its
          // ID to be used in the subsequent `update` by the path determined
          // by the `selectId(...)` function.
          const path = resources[0][selectId(resourceType)];
          return update(resourceType, path, data, options)(state);
        }
      });
    }

    return promise.then(result => {
      console.log(`Performed a "composed upsert" on ${resourceType}`);
      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Discover `DHIS2` `api` `endpoint` `query parameters` and allowed `operators` for a given resource's endpoint.
 * @public
 * @function
 * @param {string} httpMethod - The HTTP to inspect parameter usage for a given endpoint, e.g., `get`, `post`,`put`,`patch`,`delete`
 * @param {string} endpoint - The path for a given endpoint. E.g. `/trackedEntities` or `/dataValueSets`
 * @returns {Operation}
 * @example <caption>a list of parameters allowed on a given endpoint for specific http method</caption>
 * discover('post', '/trackedEntities')
 */
export function discover(httpMethod, endpoint) {
  return state => {
    console.log(
      `Discovering query/import parameters for ${httpMethod} on ${endpoint}`
    );
    return axios
      .get(
        'https://dhis2.github.io/dhis2-api-specification/spec/metadata_openapi.json',
        {
          transformResponse: [
            data => {
              let tempData = JSON.parse(data);
              let filteredData = tempData.paths[endpoint][httpMethod];
              return {
                ...filteredData,
                parameters: filteredData.parameters.reduce(
                  (acc, currentValue) => {
                    let index = currentValue['$ref'].lastIndexOf('/') + 1;
                    let paramRef = currentValue['$ref'].slice(index);
                    let param = tempData.components.parameters[paramRef];

                    if (param.schema['$ref']) {
                      let schemaRefIndex =
                        param.schema['$ref'].lastIndexOf('/') + 1;
                      let schemaRef =
                        param.schema['$ref'].slice(schemaRefIndex);
                      param.schema = tempData.components.schemas[schemaRef];
                    }

                    param.schema = JSON.stringify(param.schema);

                    let descIndex;
                    if (
                      indexOf(param.description, ',') === -1 &&
                      indexOf(param.description, '.') > -1
                    )
                      descIndex = indexOf(param.description, '.');
                    else if (
                      indexOf(param.description, ',') > -1 &&
                      indexOf(param.description, '.') > -1
                    ) {
                      descIndex =
                        indexOf(param.description, '.') <
                        indexOf(param.description, ',')
                          ? indexOf(param.description, '.')
                          : indexOf(param.description, ',');
                    } else {
                      descIndex = param.description.length;
                    }

                    param.description = param.description.slice(0, descIndex);

                    acc[paramRef] = param;
                    return acc;
                  },
                  {}
                ),
              };
            },
          ],
        }
      )
      .then(result => {
        console.log(
          `\t=======================================================================================\n\tQuery Parameters for ${httpMethod} on ${endpoint} [${
            result.data.description ?? '<description_missing>'
          }]\n\t=======================================================================================`
        );
        console.table(result.data.parameters, [
          'in',
          'required',
          'description',
        ]);
        console.table(result.data.parameters, ['schema']);
        console.log(
          `=========================================Responses===============================\n${prettyJson(
            result.data.responses
          )}\n=======================================================================================`
        );
        return { ...state, data: result.data };
      });
  };
}

/**
 * Patch a record. A generic helper function to send partial updates on one or more object properties.
 * - You are not required to send the full body of object properties.
 * - This is useful for cases where you don't want or need to update all properties on a object.
 * @public
 * @function
 * @param {string} resourceType - The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. Include only the fields you want to update. E.g. `{name: "New Name"}`
 * @param {Object} [options] - Optional configuration, including params for the update ({preheatCache: true, strategy: 'UPDATE', mergeMode: 'REPLACE'}). Defaults to `{operationName: 'patch', apiVersion: state.configuration.apiVersion, responseType: 'json'}`
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @example <caption>a dataElement</caption>
 * patch('dataElements', 'FTRrcoaog83', { name: 'New Name' });
 */
// TODO: @Elias, can this be deleted in favor of update? How does DHIS2 handle PATCH vs PUT?
// I need to investigate on this. But I think DHIS2 forces to send all properties back when we do an update. If that's confirmed then this may be needed.
export function patch(
  resourceType,
  path,
  data,
  options = {},
  callback = s => s
) {
  return state => {
    console.log('Preparing patch operation...');

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    return request(configuration, {
      method: 'patch',
      url: generateUrl(
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedPath
      ),
      params,
      data: resolvedData,
      ...requestConfig,
    }).then(result => {
      console.log(`Patched ${resolvedResourceType} at ${resolvedPath}`);
      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Delete a record. A generic helper function to delete an object
 * @public
 * @function
 * @param {string} resourceType - The type of resource to be deleted. E.g. `trackedEntities`, `organisationUnits`, etc.
 * @param {string} path - Can be an `id` of an `object` or `path` to the `nested object` to `delete`.
 * @param {Object} [data] - Optional. This is useful when you want to remove multiple objects from a collection in one request. You can send `data` as, for example, `{"identifiableObjects": [{"id": "IDA"}, {"id": "IDB"}, {"id": "IDC"}]}`. See more {@link https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#deleting-objects on DHIS2 API docs}
 * @param {{apiVersion: number,operationName: string,resourceType: string}} [options] - Optional `options` for `del` operation including params e.g. `{preheatCache: true, strategy: 'UPDATE', mergeMode: 'REPLACE'}`. Run `discover` or see {@link https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#create-update-parameters DHIS2 documentation}. Defaults to `{operationName: 'delete', apiVersion: state.configuration.apiVersion, responseType: 'json'}`
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @example <caption>a tracked entity instance. See [Delete tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)</caption>
 * destroy('trackedEntities', 'LcRd6Nyaq7T');
 */
export function destroy(
  resourceType,
  path,
  data = null,
  options = {},
  callback = false
) {
  return state => {
    console.log('Preparing destroy operation...');

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);

    const { params, requestConfig } = resolvedOptions;
    const { configuration } = state;

    let promise;
    if (shouldUseNewTracker(resolvedResourceType)) {
      promise = callNewTracker(
        'delete',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      promise = request({
        method: 'delete',
        url: generateUrl(
          configuration,
          resolvedOptions,
          resolvedResourceType,
          resolvedPath
        ),
        params,
        resolvedData,
        ...requestConfig,
      });
    }

    return promise.then(result => {
      console.log(`Deleted ${resolvedResourceType} at ${resolvedPath}`);
      return handleResponse(result, state, callback);
    });
  };
}

/**
 * Gets an attribute value by its case-insensitive display name
 * @public
 * @example
 * findAttributeValue(state.data.trackedEntities[0], 'first name')
 * @function
 * @param {Object} trackedEntity - A tracked entity instance (TEI) object
 * @param {string} attributeDisplayName - The 'displayName' to search for in the TEI's attributes
 * @returns {string}
 */
export function findAttributeValue(trackedEntity, attributeDisplayName) {
  return trackedEntity?.attributes?.find(
    a => a?.displayName.toLowerCase() == attributeDisplayName.toLowerCase()
  )?.value;
}

/**
 * Converts an attribute ID and value into a DHIS2 attribute object
 * @public
 * @example
 * attr('w75KJ2mc4zz', 'Elias')
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
 * dv('f7n9E0hX8qk', 12)
 * @function
 * @param {string} dataElement - A data element ID.
 * @param {string} value - The value for that data element.
 * @returns {object}
 */
export function dv(dataElement, value) {
  return { dataElement, value };
}

function callNewTracker(
  type = 'update',
  configuration,
  options,
  resourceType,
  data = {}
) {
  const { params, requestConfig, ...opts } = options;
  let importStrategy;
  switch (type) {
    case 'create':
      importStrategy = 'CREATE';
      break;
    case 'update':
      importStrategy = 'UPDATE';
      break;
    case 'delete':
      importStrategy = 'DELETE';
      break;
    default:
      importStrategy = 'CREATE_AND_UPDATE';
  }

  return request(configuration, {
    method: 'post',
    url: generateUrl(
      configuration,
      {
        ...opts,
        importStrategy,
      },
      'tracker'
    ),
    params: { async: false, ...params },
    data: ensureArray(data, resourceType),
    ...requestConfig,
  });
}

export {
  alterState,
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  fnIf,
  http,
  group,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
