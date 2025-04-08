import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState, cleanPath } from './Utils';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for OpenMRS.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Array} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Gets patient matching a uuid
 * @function
 * @public
 * @param {string} uuid - A uuid for the patient
 * @param {function} [callback] - Optional callback to handle the response
 * @example <caption>Get a patient by uuid</caption>
 * getPatient('681f8785-c9ca-4dc8-a091-7b869316ff93')
 * @returns {Operation}
 */
export function getPatient(uuid, callback = s => s) {
  return async state => {
    const [resolvedUuid] = expandReferences(state, uuid);
    console.log(`Fetching patient by uuid: ${resolvedUuid}`);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(
      state,
      'GET',
      `/ws/rest/v1/patient/${resolvedUuid}`,
      {
        baseUrl,
      }
    );

    console.log(`Retrieved patient with uuid: ${resolvedUuid}...`);

    return prepareNextState(state, response, callback);
  };
}

/**
 * Make a get request to any OpenMRS REST endpoint.
 * @example
 * get("patient", {
 * query: {
 *    q: "Patient",
 *   limit: 1,
 * }
 * });
 * @function
 * @public
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {object} options - parameters for the request
 * @returns {Operation}
 */
export function get(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const { instanceUrl: baseUrl } = state.configuration;
    const response = await request(
      state,
      'GET',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        ...resolvedOptions
      }
    );

    // TODO: later decide if we want to throw for no-results.
    // (This could be introduced as an option for this function.)
    // if (response.body.results.length == 0) {
    //   throw `Get operation returned no results for ${resolvedResource}.`;
    // }

    return prepareNextState(state, response);
  };
}

/**
 * Make a post request to any OpenMRS rest endpoint
 * @example
 * post(
 *   "idgen/identifiersource/8549f706-7e85-4c1d-9424-217d50a2988b/identifier",
 *   {}
 * );
 * @function
 * @public
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {object} data - Object which defines data that will be used to create a given instance of resource
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function post(path, data, callback = s => s) {
  return async state => {
    const [resolvedPath, resolvedData] = expandReferences(state, path, data);
    const { instanceUrl: baseUrl } = state.configuration;
    const response = await request(
      state,
      'POST',
      `/ws/rest/v1/${resolvedPath}`,
      {
        baseUrl,
        data: resolvedData,
      }
    );

    return prepareNextState(state, response, callback);
  };
}

/**
 * Fetch all non-retired patients that match any specified parameters
 * @example
 * searchPatient({ q: "Sarah"})
 * @function
 * @public
 * @param {object} query - Object with query for the patient.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function searchPatient(query, callback = s => s) {
  return async state => {
    const [resolvedQuery] = expandReferences(state, query);
    const { instanceUrl: baseUrl } = state.configuration;

    console.log('Searching for patient with query:', resolvedQuery);

    const response = await request(state, 'GET', '/ws/rest/v1/patient', {
      baseUrl,
      query: resolvedQuery,
    });

    return prepareNextState(state, response, callback);
  };
}

/**
 * Fetch all non-retired persons that match any specified parameters
 * @example
 * searchPerson({ q: "Sarah" })
 * @function
 * @public
 * @param {object} query - object with query for the person
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function searchPerson(query, callback = s => s) {
  return async state => {
    const [resolvedQuery = {}] = expandReferences(state, query);
    const { instanceUrl: baseUrl } = state.configuration;

    console.log(`Searching for person with query:`, resolvedQuery);

    const response = await request(state, 'GET', '/ws/rest/v1/person', {
      baseUrl,
      query: resolvedQuery,
    });

    console.log(`Found ${response.body.results.length} people`);

    return prepareNextState(state, response, callback);
  };
}

/**
 * Gets encounter matching a uuid
 * @example
 * getEncounter("123")
 * @function
 * @public
 * @param {object} uuid - A uuid for the encounter
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getEncounter(uuid, callback = s => s) {
  return async state => {
    const [resolvedUuid] = expandReferences(state, uuid);
    console.log(`Fetching encounter with UUID: ${resolvedUuid}`);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(
      state,
      'GET',
      `/ws/rest/v1/encounter/${resolvedUuid}`,
      {
        baseUrl,
      }
    );

    console.log(
      `Successfully retrieved for encounter with UUID: ${resolvedUuid}`
    );

    return prepareNextState(state, response, callback);
  };
}

/**
 * Gets encounters matching params
 * @example
 * getEncounters({ patient: "123", fromdate: "2023-05-18" })
 * @function
 * @public
 * @param {object} query - Object for the patient
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getEncounters(query, callback = s => s) {
  return async state => {
    const [resolvedQuery] = expandReferences(state, query);
    console.log('Fetching encounters by query', resolvedQuery);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(state, 'GET', `/ws/rest/v1/encounter/`, {
      baseUrl,
      query: resolvedQuery,
    });
    console.log(`Found ${response.body.results.length} results`);

    return prepareNextState(state, response, callback);
  };
}

/**
 * Create a record
 * @public
 * @function
 * @param {string} resourceType - Type of resource to create. E.g. `person`, `patient`, `encounter`, ...
 * @param {OpenMRSData} data - Object which defines data that will be used to create a given instance of resource. To create a single instance of a resource, `data` must be a javascript object, and to create multiple instances of a resources, `data` must be an array of javascript objects.
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 * @example <caption>Create a person</caption>
 * create("person", {
 *   names: [
 *     {
 *       givenName: "Mohit",
 *       familyName: "Kumar",
 *     },
 *   ],
 *   gender: "M",
 *   birthdate: "1997-09-02",
 *   addresses: [
 *     {
 *       address1: "30, Vivekananda Layout, Munnekolal,Marathahalli",
 *       cityVillage: "Bengaluru",
 *       country: "India",
 *       postalCode: "560037",
 *     },
 *   ],
 * });
 * @example <caption>Create an encounter</caption>
 * create("encounter", {
 *   encounterDatetime: '2023-05-25T06:08:25.000+0000',
 *   patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
 *   encounterType: 'dd528487-82a5-4082-9c72-ed246bd49591',
 *   location: 'ba685651-ed3b-4e63-9b35-78893060758a',
 *   encounterProviders: [],
 *   visit: {
 *     patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
 *     visitType: '7b0f5697-27e3-40c4-8bae-f4049abfb4ed',
 *     startDatetime: '2023-05-25T06:08:25.000+0000',
 *     stopDatetime: '2023-05-25T06:09:25.000+0000',
 *   },
 * })
 * @example <caption>Create a patient</caption>
 * create("patient", {
 *   identifiers: [
 *     {
 *       identifier: '4023287',
 *       identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
 *       preferred: true,
 *     },
 *   ],
 *   person: {
 *     gender: 'M',
 *     age: 42,
 *     birthdate: '1970-01-01T00:00:00.000+0100',
 *     birthdateEstimated: false,
 *     names: [
 *       {
 *         givenName: 'Doe',
 *         familyName: 'John',
 *       },
 *     ],
 *   },
 * })
 */
export function create(resourceType, data, callback = s => s) {
  return async state => {
    const [resolvedResource, resolvedData] = expandReferences(
      state,
      resourceType,
      data
    );
    console.log('Preparing to create', resolvedResource);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(
      state,
      'POST',
      `/ws/rest/v1/${resolvedResource}`,
      {
        baseUrl,
        data: resolvedData,
      }
    );

    console.log('Successfully created', resolvedResource);

    return prepareNextState(state, response, callback);
  };
}

/**
 * Update data. A generic helper function to update a resource object of any type.
 * Updating an object requires to send `all required fields` or the `full body`
 * @public
 * @function
 * @param {string} resourceType - The type of resource to be updated. E.g. `person`, `patient`, etc.
 * @param {string} path - The `id` or `path` to the `object` to be updated. E.g. `e739808f-f166-42ae-aaf3-8b3e8fa13fda` or `e739808f-f166-42ae-aaf3-8b3e8fa13fda/{collection-name}/{object-id}`
 * @param {Object} data - Data to update. It requires to send `all required fields` or the `full body`. If you want `partial updates`, use `patch` operation.
 * @param {function} [callback]  - Optional callback to handle the response
 * @returns {Operation}
 * @example <caption>a person</caption>
 * update("person", '3cad37ad-984d-4c65-a019-3eb120c9c373',{"gender":"M","birthdate":"1997-01-13"})
 */
export function update(resourceType, path, data, callback = s => s) {
  return async state => {
    const [resolvedResource, resolvedPath, resolvedData] = expandReferences(
      state,
      resourceType,
      path,
      data
    );
    console.log('Preparing to update', resolvedResource);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(
      state,
      'POST',
      `/ws/rest/v1/${resolvedResource}/${resolvedPath}`,
      {
        baseUrl,
        data: resolvedData,
      }
    );

    console.log('Successfully updated', resolvedResource);

    return prepareNextState(state, response, callback);
  };
}

/**
 * Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.
 * @public
 * @function
 * @param {string} resourceType - The type of a resource to `upsert`. E.g. `trackedEntityInstances`
 * @param {Object} query - A query object that allows to uniquely identify the resource to update. If no matches found, then the resource will be created.
 * @param {Object} data - The data to use for update or create depending on the result of the query.
 * @param {function} [callback] - Optional callback to handle the response
 * @throws {RangeError} - Throws range error
 * @returns {Operation}
 * @example <caption>For an existing patient using upsert</caption>
 * upsert('patient', { q: '10007JJ' }, { person: { age: 50 } });
 * @example <caption>For non existing patient creating a patient record using upsert </caption>
 * upsert(
 *   "patient",
 *   { q: "1000EHE" },
 *   {
 *     identifiers: [
 *       {
 *         identifier: "1000EHE",
 *         identifierType: "05a29f94-c0ed-11e2-94be-8c13b969e334",
 *         location: "44c3efb0-2583-4c80-a79e-1f756a03c0a1",
 *         preferred: true,
 *       },
 *     ],
 *     person: {
 *       gender: "M",
 *       age: 42,
 *     },
 *   }
 * );
 */
export function upsert(
  resourceType, // resourceType supplied to both the `get` and the `create/update`
  query, // query supplied to the `get`
  data, // data supplied to the `create/update`
  callback = s => s // callback for the upsert itself.
) {
  return async state => {
    const [resolvedResource, resolvedData, resolvedQuery = {}] =
      expandReferences(state, resourceType, data, query);

    console.log(
      "Preparing composed upsert (via 'get' then 'create' OR 'update') on",
      resolvedResource
    );
    const { instanceUrl: baseUrl } = state.configuration;
    return await request(state, 'GET', `/ws/rest/v1/${resolvedResource}`, {
      baseUrl,
      query: resolvedQuery,
    }).then(resp => {
      const resource = resp.body.results;
      if (resource.length > 1) {
        throw new RangeError(
          `Found more than one record for your request; cannot upsert on non-unique attribute.`
        );
      } else if (resource.length === 0) {
        console.log(`No ${resolvedResource} found.`);
        return create(resolvedResource, resolvedData, callback)(state);
      } else {
        console.log(`One ${resolvedResource} found.`);
        const path = resource[0]?.uuid;
        return update(resolvedResource, path, resolvedData, callback)(state);
      }
    });
  };
}

export {
  alterState,
  fn,
  fnIf,
  field,
  fields,
  cursor,
  dateFns,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
  each,
  arrayToString,
} from '@openfn/language-common';
