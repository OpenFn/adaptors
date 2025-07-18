import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils';
import { execute as commonExecute } from '@openfn/language-common';
import { searchEventsQuery } from './query';

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
