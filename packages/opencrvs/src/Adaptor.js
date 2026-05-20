import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';
import { execute as commonExecute } from '@openfn/language-common';
import { searchEventsQuery } from './query.js';

/**
 * State object
 * @typedef {Object} OpenCRVSState
 * @property data - the parsed response body
 * @property response - the response from the HTTP server, including headers, statusCode, body, etc
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute` to make working with this API easier.
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
    return commonExecute(
      util.authorize,
      ...operations
    )({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Create a Birth Notification. Pass an array of FHIR resources wrapped in entry
 * objects like `{ fullUrl, resource }`. References must use the full URL
 * of the corresponding resources. See [OpenCRVS Event Notification Postman documentation](https://github.com/opencrvs/opencrvs-countryconfig/blob/master/postman/Event%20Notification.postman_collection.json)
 * @deprecated for OpenCRVS v2 deployments — use {@link submitBirthNotification}
 *   (or {@link createEvent} + {@link notifyEvent}) instead. Retained for v1
 *   gateway-based deployments that still consume FHIR bundles.
 * @example <caption>Create a birth notification</caption>
 * createBirthNotification($.bundleData)
 * @example <caption>Cross-reference two bundle resources</caption>
 * createBirthNotification([
  {
    fullUrl: 'urn:uuid:abcde',
    resource: {
      resourceType: 'Composition',
     section:[
           {
          title: "Mother's details",
          code: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/sections',
                code: 'mother-details',
              },
            ],
            text: "Mother's details",
          },
          entry: [
            {
              reference: 'urn:uuid:wxyz',
            },
          ],
        }
         // ... other section details  
        ]
      
      // ... other resource details
    },
  },
  {
    fullUrl: 'urn:uuid:wxyz',
    resource: {
      resourceType: 'Patient',
      // ... other resource details
    },
  },
]);
 * @function
 * @public
 * @param {Array} body - An array of Birth Notification bundle entries.
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function createBirthNotification(body) {
  return async state => {
    const [resolvedBody] = expandReferences(state, body);
    const response = await util.request(
      state.configuration,
      'POST',
      '/notification',
      {
        body: {
          resourceType: 'Bundle',
          type: 'document',
          meta: {
            lastUpdated: new Date().toISOString(),
          },
          entry: resolvedBody,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Make an events search query against the OpenCRVS GraphQL API.
 * @example <caption>Search for events with specific parameters</caption>
 * queryEvents(
  {
    event: 'birth',
    registrationStatuses: ['REGISTERED'],
    childGender: 'male',
    dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
    dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
    declarationJurisdictionId: '',
    eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
    fatherFirstNames: 'Dad',
    motherFirstNames: 'Mom',
  },
);
 * @example <caption>Search for events with options</caption>
 * queryEvents(
  {
    event: 'birth',
    registrationStatuses: ['REGISTERED'],
    childGender: 'male',
    dateOfRegistrationEnd: '2022-12-31T23:59:59.999Z',
    dateOfRegistrationStart: '2021-11-01T00:00:00.000Z',
    declarationJurisdictionId: '',
    eventLocationId: '704b9706-d729-4834-8656-05b562065deb',
    fatherFirstNames: 'Dad',
    motherFirstNames: 'Mom',
  },
  { count: 10, skip: 0 }
);
 * @function
 * @public
 * @param {Object} variables - GraphQL search parameters. For a full list of options, see [variables.advancedSearchParameters in OpenCRVS Docs](https://documentation.opencrvs.org/technology/interoperability/record-search-clients#record-search-requests)
 * @param {Object} options - Options to control the request, such as `count` and `skip`. Count defaults to 10.
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function queryEvents(variables, options = {}) {
  return async state => {
    const [resolvedVariables, resolvedOptions] = expandReferences(
      state,
      variables,
      options
    );

    const response = await util.request(
      state.configuration,
      'POST',
      '/graphql',
      {
        body: {
          operationName: 'searchEvents',
          query: searchEventsQuery,
          variables: { advancedSearchParameters: resolvedVariables },
          count: resolvedOptions.count || 10,
          skip: resolvedOptions.skip,
          ...resolvedOptions,
        },
      }
    );

    const body = response.body?.errors
      ? response.body
      : response.body?.data?.searchEvents?.results;

    return util.prepareNextState(state, {
      ...response,
      body,
    });
  };
}

/**
 * Create an OpenCRVS v2 event (e.g. a birth or death registration).
 * Posts to the `register.<domain>` host. The returned event id is
 * available on `state.data.id` for use with `notifyEvent`.
 * @example <caption>Create a birth event at a known location</caption>
 * createEvent('birth', { createdAtLocation: 'a1b2-...' });
 * @function
 * @public
 * @param {string} type - Event type, e.g. `'birth'` or `'death'`.
 * @param {object} options - Optional fields: `createdAtLocation` (string) and
 *   `transactionId` (string, defaults to a random UUID).
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function createEvent(type, options = {}) {
  return async state => {
    const [resolvedType, resolvedOptions] = expandReferences(
      state,
      type,
      options
    );

    const response = await util.request(
      state.configuration,
      'POST',
      '/api/events/events',
      {
        host: 'register',
        body: {
          type: resolvedType,
          transactionId: resolvedOptions.transactionId ?? crypto.randomUUID(),
          createdAtLocation: resolvedOptions.createdAtLocation,
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Notify an existing OpenCRVS v2 event with declaration data.
 * Posts to `register.<domain>/api/events/events/{eventId}/notify`.
 * @example <caption>Notify a birth event</caption>
 * notifyEvent(state => state.data.id, {
 *   'child.name': { firstname: 'Test', surname: 'Baby' },
 *   'child.dob': '2026-05-01',
 *   'child.gender': 'female',
 * }, { createdAtLocation: state => state.references[0][0].id });
 * @function
 * @public
 * @param {string} eventId - The event id returned by {@link createEvent}.
 * @param {object} declaration - Flat dotted-key declaration (e.g. `'child.name'`, `'child.dob'`).
 * @param {object} options - Optional fields: `createdAtLocation` (string),
 *   `transactionId` (string, defaults to a random UUID) and `annotation` (object).
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function notifyEvent(eventId, declaration, options = {}) {
  return async state => {
    const [resolvedId, resolvedDeclaration, resolvedOptions] = expandReferences(
      state,
      eventId,
      declaration,
      options
    );

    const response = await util.request(
      state.configuration,
      'POST',
      `/api/events/events/${resolvedId}/notify`,
      {
        host: 'register',
        body: {
          type: 'NOTIFY',
          transactionId: resolvedOptions.transactionId ?? crypto.randomUUID(),
          createdAtLocation: resolvedOptions.createdAtLocation,
          declaration: resolvedDeclaration,
          annotation: resolvedOptions.annotation ?? {},
        },
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Convenience helper: create a v2 birth event and notify it in one step.
 * Mirrors the reference integration script's create-then-notify chain.
 * The notify response is left on `state.data`.
 * @example <caption>Submit a birth notification in one call</caption>
 * submitBirthNotification({
 *   'child.name': { firstname: 'Test', surname: 'Baby' },
 *   'child.dob': '2026-05-01',
 *   'child.gender': 'female',
 *   'child.placeOfBirth': 'HEALTH_FACILITY',
 *   'child.birthLocation': state => state.data[0].id,
 *   'informant.relation': 'MOTHER',
 * }, { createdAtLocation: state => state.data[0].id });
 * @function
 * @public
 * @param {object} declaration - Flat dotted-key declaration passed through to {@link notifyEvent}.
 * @param {object} options - Optional fields: `createdAtLocation` (string),
 *   `transactionId` (string, applied to the create call only — notify always
 *   generates its own UUID) and `annotation` (object, passed to notify).
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function submitBirthNotification(declaration, options = {}) {
  return async state => {
    const [resolvedDeclaration, resolvedOptions] = expandReferences(
      state,
      declaration,
      options
    );

    const afterCreate = await createEvent('birth', {
      createdAtLocation: resolvedOptions.createdAtLocation,
      transactionId: resolvedOptions.transactionId,
    })(state);

    const eventId = afterCreate.data?.id;
    if (!eventId) {
      throw new Error(
        'submitBirthNotification: createEvent response did not include an id'
      );
    }

    return notifyEvent(eventId, resolvedDeclaration, {
      createdAtLocation: resolvedOptions.createdAtLocation,
      annotation: resolvedOptions.annotation,
    })(afterCreate);
  };
}

/**
 * Fetch the list of locations from the `countryconfig.<domain>` host.
 * Useful for picking `createdAtLocation` or `child.birthLocation`.
 * @example
 * getLocations();
 * @function
 * @public
 * @param {object} options - Optional fields: `params` (object of query parameters
 *   to append to the request).
 * @returns {Operation}
 * @state {OpenCRVSState}
 */
export function getLocations(options = {}) {
  return async state => {
    const [resolvedOptions] = expandReferences(state, options);

    const response = await util.request(
      state.configuration,
      'GET',
      '/api/events/locations',
      {
        host: 'countryconfig',
        params: resolvedOptions.params ?? {},
      }
    );

    return util.prepareNextState(state, response);
  };
}

/**
 * Create a document bundle entry with automatic UUID generation
 * @example
 * createDocumentEntry(builders.patient({ name: [{ given: ['John'] }] }))
 * @function
 * @public
 * @param {Object} resource - A FHIR resource using builders from fhir-4
 * @param {string} [fullUrl] - Custom fullUrl. Auto-generated if not provided
 * @returns {Object} Bundle entry with fullUrl and resource
 */
export function createDocumentEntry(resource, fullUrl) {
  const uuid = fullUrl || `urn:uuid:${crypto.randomUUID()}`;
  return {
    fullUrl: uuid,
    resource: {
      ...resource,
    },
  };
}

export {
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
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';

export { builders } from '@openfn/language-fhir-4';
