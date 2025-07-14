import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences, throwError } from '@openfn/language-common/util';
import {
  handleResponse,
  selectId,
  shouldUseNewTracker,
  ensureArray,
  prefixVersionToPath,
  request,
} from './util';

/**
 * State object
 * @typedef {Object} DHIS2State
 * @private
 * @property data - The response body (as JSON)
 * @property references - An array of all previous data objects used in the Job
 */

/**
 * Options object
 * @typedef {Object} RequestOptions
 * @property {object} query - An object of query parameters to be encoded into the URL
 * @property {object} headers - An object of all request headers
 * @property {string} [parseAs='json'] - The response format to parse (e.g., 'json', 'text', 'stream', or 'base64'. Defaults to `json`
 * @property {string} [apiVersion=42] - The apiVersion of the request. Defaults to 42.
 */

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

/**
 * Create a record
 * @public
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
 *   occurredAt: '2025-06-19',
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
 * create('dataSets', { name: 'OpenFn Data Set', periodType: 'Monthly', shortName: 'ODS' });
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
 *   shortName: 'DEG1',
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
 *   program: 'ur1Edk5Oe2n',
 *   enrolledAt: '2013-09-17',
 *   enrollmentDate: '2013-09-17',
 *   incidentDate: '2013-09-17',
 * });
 * @function
 * @param {string} path - Path to the resource to be created
 * @magic path $.children.resourceTypes[*]
 * @param {DHIS2Data} data - An object, or array of objects, to create.
 * @param {object} params - Optional object of query parameters to include in the request
 * @state data - The created resource as returned by DHIS2
 * @returns {Operation}
 */
export function create(path, data, params = {}) {
  return async state => {
    if (path === 'tracker') {
      throw new Error('Invalid resourceType. Use `tracker.import()` instead.');
    }

    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );

    const { configuration } = state;

    let response;
    if (shouldUseNewTracker(resolvedPath)) {
      response = await callNewTracker(
        'create',
        configuration,
        {
          query: resolvedParams,
        },
        resolvedPath,
        resolvedData
      );
    } else {
      response = await request(configuration, {
        method: 'POST',
        path: prefixVersionToPath(configuration, {}, resolvedPath),
        options: {
          query: resolvedParams,
        },
        data: resolvedData,
      });
    }
    console.log(`Created ${resolvedPath}`);

    const { location } = response.headers;
    if (location) {
      console.log(`Record available @ ${location}`);
    }

    return handleResponse(response, state);
  };
}

/**
 * Get any resource, as JSON, from DHIS2. Pass in any valid DHIS2 REST path, excluding /api and the version.
 * For the new tracker API, see `tracker.export()`
 * @public
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
 * @function
 * @param {string} path - Path to the resource
 * @param {object} params - Object of query parameters to include in the request
 * @state data - the resource returned by DHIS2
 * @returns {Operation}
 */
export function get(path, params = {}) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );

    const response = await request(state.configuration, {
      method: 'GET',
      path: prefixVersionToPath(state.configuration, {}, resolvedPath),
      options: { query: resolvedParams },
    });

    console.log(`Retrieved ${resolvedPath}`);

    return handleResponse(response, state);
  };
}

/**
 * Update a resource object of any type. Updating an object requires all fields of the object you are updating, even if they have not been modified
 * @public
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
 * @function
 * @param {string} resourceType - The type of resource to be updated. E.g. `dataElements`, `organisationUnits`, etc.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `FTRrcoaog83` or `FTRrcoaog83/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. It requires to send the full body. If you want partial updates, use patch operation.
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request.
 * @state data - the resource returned by DHIS2
 * @returns {Operation}
 */
export function update(resourceType, path, data, options = {}) {
  return async state => {
    console.log(`Preparing update operation...`);

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);
    const { configuration } = state;

    let response;
    if (shouldUseNewTracker(resolvedResourceType)) {
      response = await callNewTracker(
        'update',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      response = await request(configuration, {
        method: 'PUT',
        path: prefixVersionToPath(
          configuration,
          resolvedOptions,
          resolvedResourceType,
          resolvedPath
        ),
        options: resolvedOptions,
        data: resolvedData,
      });
    }

    console.log(`Updated ${resolvedResourceType} at ${resolvedPath}`);
    return handleResponse(response, state);
  };
}

/**
 * Upsert a record. This will atomically update a record if it already exists, or otherwise create it.
 * This function does not work with the absolute tracker path `api/tracker` but rather the new tracker paths and deprecated tracker endpoints.
 * @public
 * @example <caption>Upsert a trackedEntity</caption>
 * upsert('trackedEntities', {}, {
 *  orgUnit: 'TSyzvBiovKh',
 *  trackedEntityType: 'nEenWmSyUEp',
 *  attributes: [
 *    {
 *      attribute: 'w75KJ2mc4zz',
 *      value: 'Qassim',
 *    },
 *  ],
 * });
 * @example <caption> Upsert a dataElement </caption>
 * upsert(
 *   'dataElements',
 *   { filter: 'id:eq:P3jJH5Tu5VC' },
 *   {
 *     op: 'add',
 *     path: '/domainType',
 *     name: 'Acute',
 *     shortName: 'AFP follow-up',
 *     dimensionItemType: 'DATA_ELEMENT',
 *     legendSets: [],
 *     aggregationType: 'SUM',
 *     valueType: 'NUMBER',
 *     domainType: 'AGGREGATE',
 *     code: 'DE_359049',
 *     name: 'Acute Flaccid Paralysis (AFP) follow-up',
 *    }
 *  );
 * @function
 * @param {string} resourceType - The type of a resource to `upsert`. E.g. `trackedEntities`.
 * @param {Object} query - A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created.
 * @param {Object} data - The data to use for update or create depending on the result of the query.
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request
 * @throws {RangeError} - Throws range error
 * @state {DHIS2State}
 * @returns {Operation}
 */
export function upsert(
  resourceType, // resourceType supplied to both the `get` and the `create/update`
  query, // query supplied to the `get`
  data, // data supplied to the `create/update`
  options = {} // options supplied to both the `get` and the `create/update`
) {
  return async state => {
    const [resolvedResourceType, resolvedOptions, resolvedData, resolvedQuery] =
      expandReferences(state, resourceType, options, data, query);

    let response;
    const { configuration } = state;
    if (shouldUseNewTracker(resolvedResourceType)) {
      response = await callNewTracker(
        'create_and_update',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      console.log(`Preparing upsert via 'get' then 'create' OR 'update'...`);
      response = await request(configuration, {
        method: 'GET',
        path: prefixVersionToPath(
          configuration,
          resolvedOptions,
          resolvedResourceType
        ),
        options: {
          ...resolvedOptions,
          query: {
            ...resolvedQuery,
          },
        },
      });
      const resources = response.body[resourceType];
      if (resources.length > 1) {
        throwError(409, {
          description:
            'Upsert failed: Multiple records found for a non-unique attribute.',
          fix: 'Ensure the attribute is unique or modify the request to target a single record.',
          error: 'Conflict',
        });
      } else if (resources.length <= 0) {
        console.log(`Preparing create operation...`);
        response = await request(configuration, {
          method: 'POST',
          path: prefixVersionToPath(
            configuration,
            resolvedOptions,
            resolvedResourceType
          ),
          options: resolvedOptions,
          data: resolvedData,
        });
      } else {
        // Pick out the first (and only) resource in the array and grab its
        // ID to be used in the subsequent `update` by the path determined
        // by the `selectId(...)` function.
        const path = resources[0][selectId(resourceType)];
        console.log(`Preparing update operation...`);
        response = await request(configuration, {
          method: 'PUT',
          path: prefixVersionToPath(
            configuration,
            resolvedOptions,
            resolvedResourceType,
            path
          ),
          options: resolvedOptions,
          data: resolvedData,
        });
      }
    }

    console.log(`Performed a "composed upsert" on ${resourceType}`);
    return handleResponse(response, state);
  };
}

/**
 * Delete record.
 * @public
 * @function
 * @example <caption>a tracked entity instance. See [Delete tracker docs](https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-241/tracker.html#webapi_nti_import)</caption>
 * destroy('trackedEntities', 'LcRd6Nyaq7T');
 * @param {string} resourceType - The type of resource to be deleted. E.g. `trackedEntities`, `organisationUnits`, etc.
 * @param {string} path - Can be an `id` of an `object` or `path` to the `nested object` to `delete`.
 * @param {Object} [data] - Optional. This is useful when you want to remove multiple objects from a collection in one request. You can send `data` as, for example, `{"identifiableObjects": [{"id": "IDA"}, {"id": "IDB"}, {"id": "IDC"}]}`. See more {@link https://docs.dhis2.org/2.34/en/dhis2_developer_manual/web-api.html#deleting-objects on DHIS2 API docs}
 * @param {RequestOptions} [options] - An optional object containing query, parseAs,and headers for the request.
 * @state {DHIS2State}
 * @returns {Operation}
 */
export function destroy(resourceType, path, data = null, options = {}) {
  return async state => {
    console.log('Preparing destroy operation...');

    const [resolvedResourceType, resolvedPath, resolvedData, resolvedOptions] =
      expandReferences(state, resourceType, path, data, options);

    const { configuration } = state;

    let response;
    if (shouldUseNewTracker(resolvedResourceType)) {
      response = await callNewTracker(
        'delete',
        configuration,
        resolvedOptions,
        resolvedResourceType,
        resolvedData
      );
    } else {
      response = await request(configuration, {
        method: 'DELETE',
        path: prefixVersionToPath(
          configuration,
          resolvedOptions,
          resolvedResourceType,
          resolvedPath
        ),
        options: resolvedOptions,
        data: resolvedData,
      });
    }

    console.log(`Deleted ${resolvedResourceType} at ${resolvedPath}`);
    return handleResponse(response, state);
  };
}

function callNewTracker(
  type = 'update',
  configuration,
  options,
  resourceType,
  data = {}
) {
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
    method: 'POST',
    path: prefixVersionToPath(configuration, options, 'tracker'),
    options: {
      ...options,
      query: {
        ...options.query,
        async: false,
        importStrategy,
      },
    },
    data: ensureArray(data, resourceType),
  });
}

export {
  alterState,
  as,
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
  http,
  lastReferenceValue,
  map,
  merge,
  sourceValue,
} from '@openfn/language-common';
