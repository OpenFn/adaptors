import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState } from './Utils';

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
 * @example
 * getPatient("123")
 * @function
 * @param {string} uuid - A uuid for the patient
 * @param {function} [callback] - Optional callback to handle the response
 * @example <caption>Get a patient by uuid</caption>
 * getPatient('681f8785-c9ca-4dc8-a091-7b869316ff93')
 * @returns {Operation}
 */
export function getPatient(uuid, callback = s => s) {
  return async state => {
    const [resolvedUuid] = expandReferences(state, uuid);
    console.log(`Searching for patient with uuid: ${resolvedUuid}`);

    const response = await request(
      state,
      'GET',
      `/ws/rest/v1/patient/${resolvedUuid}`
    );

    return prepareNextState(state, response, callback);
  };
}

/**
 * Creates an encounter
 * @example <caption>Create an encounter</caption>
 * createEncounter({
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
 * @function
 * @param {object} data - Data parameters of the encounter
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function createEncounter(data, callback = s => s) {
  return async state => {
    const [resolvedData] = expandReferences(state, data);
    // console.log({resolvedResource});
    console.log(`Creating an encounter.`);
    const response = await request(
      state,
      'POST',
      '/ws/rest/v1/encounter',
      resolvedData
    );

    console.log(`Created encounter with new UUID: ${response.body.id}`);
    return prepareNextState(state, response, callback);
  };
}

/**
 * Make a get request to any OpenMRS endpoint
 * @example
 * get("patient", {
 *   q: "Patient",
 *   limit: 1,
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {object} query - parameters for the request
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function get(path, query, callback = s => s) {
  return async state => {
    const [resolvedResource, resolvedQuery = {}] = expandReferences(
      state,
      path,
      query
    );

    console.log(`Preparing get operation...`);
    const response = await request(
      state,
      'GET',
      `/ws/rest/v1/${resolvedResource}`,
      {},
      resolvedQuery
    );
    if (response.statusCode === 200) {
      console.log(`Get operation successful for ${resolvedResource}...`);
    } else {
      console.log(`Get operation failed for ${resolvedResource} ...`);
    }

    return prepareNextState(state, response, callback);
  };
}

/**
 * Make a post request to any OpenMRS endpoint
 * @example
 * post(
 *   "idgen/identifiersource/8549f706-7e85-4c1d-9424-217d50a2988b/identifier",
 *   {}
 * );
 * @function
 * @param {string} path - Path to resource
 * @param {object} data - Object which defines data that will be used to create a given instance of resource
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function post(path, data, callback = s => s) {
  return async state => {
    const [resolvedResource, resolvedData] = expandReferences(
      state,
      path,
      data
    );
    console.log(`Preparing post operation...`);
    const response = await request(
      state,
      'POST',
      `/ws/rest/v1/${resolvedResource}`,
      resolvedData
    );

    if (response.statusCode === 201) {
      console.log(`Successfully posted operation for ${resolvedResource}...`);
    } else {
      console.log(`Posting operation failed for ${resolvedResource} ...`);
    }

    return prepareNextState(state, response, callback);
  };
}

/**
 * Fetch all non-retired patients that match any specified parameters
 * @example
 * searchPatient({ q: Sarah })
 * @function
 * @param {object} query - Object with query for the patient
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function searchPatient(query, callback = s => s) {
  return async state => {
    const [resolvedQuery = {}] = expandReferences(state, query);

    console.log(`Searching for patient with name: ${resolvedQuery?.q}`);
    const response = await request(
      'GET',
      '/ws/rest/v1/patient',
      {},
      resolvedQuery
    );

    if (response.statusCode === 200) {
      console.log(`Successfully got patient with name ${resolvedQuery?.q}...`);
    } else {
      console.log(
        `Search operation failed for patient with name ${resolvedQuery?.q} ...`
      );
    }

    return prepareNextState(state, response, callback);
  };
}

/**
 * Fetch all non-retired persons that match any specified parameters
 * @example
 * searchPerson({ q: Sarah })
 * @function
 * @param {object} query - object with query for the person
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function searchPerson(query, callback = s => s) {
  return async state => {
    const [resolvedQuery = {}] = expandReferences(state, query);

    console.log(`Searching for person with name: ${resolvedQuery?.q}`);
    const response = await request(
      'GET',
      '/ws/rest/v1/person',
      {},
      resolvedQuery
    );

    if (response.statusCode === 200) {
      console.log(`Successfully got person with name ${resolvedQuery?.q}...`);
    } else {
      console.log(
        `Search operation failed for person with name ${resolvedQuery?.q} ...`
      );
    }

    return prepareNextState(state, response, callback);
  };
}

/**
 * Creates a new patient
 * @example
 * createPatient({
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
 * @function
 * @param {object} data - Object parameters of the patient
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function createPatient(data, callback = s => s) {
  return async state => {
    const [resolvedData] = expandReferences(state, data);
    console.log(`Creating a patient.`);

    const response = await request('POST', '/ws/rest/v1/person', resolvedData);

    if (response.statusCode === 201) {
      console.log(`Successfully created a patient...`);
    } else {
      console.log(`Failed to create a patient...`);
    }

    return prepareNextState(state, response, callback);
  };
}

/**
 * Gets encounter matching a uuid
 * @example
 * getEncounter("123")
 * @function
 * @param {object} uuid - A uuid for the encounter
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getEncounter(uuid, callback = s => s) {
  return async state => {
    const [resolvedUuid] = expandReferences(state, uuid);
    console.log(`Searching for encounter with uuid: ${resolvedUuid}`);

    const response = await request(
      state,
      'GET',
      `/ws/rest/v1/encounter/${resolvedUuid}`
    );
    if (response.statusCode === 200) {
      console.log(
        `Successfully searched for encounter with uuid: ${resolvedUuid}...`
      );
    } else {
      console.log(
        `Search operation failed for encounter with uuid: ${resolvedUuid} ...`
      );
    }

    return prepareNextState(state, response, callback);
  };
}

/**
 * Gets encounters matching params
 * @example
 * getEncounters({patient: "123", fromdate: "2023-05-18"})
 * @function
 * @param {object} query - Object for the patient
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getEncounters(query, callback = s => s) {
  return async state => {
    const [resolvedQuery] = expandReferences(state, query);
    console.log(`Searching for encounters: ${resolvedQuery}`);

    const response = await request(
      state,
      'GET',
      `/ws/rest/v1/encounter/`,
      {},
      resolvedQuery
    );
    if (response.statusCode === 200) {
      console.log(`Successfully searched for encounters ...`);
    } else {
      console.log(`Search operation failed for encounters ...`);
    }

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
 */
export function create(resourceType, data, callback = s => s) {
  return async state => {
    const [resolvedResource, resolvedData] = expandReferences(
      state,
      resourceType,
      data
    );
    console.log(`Preparing create operation...`);

    const response = await request(
      state,
      'POST',
      `/ws/rest/v1/${resolvedResource}`,
      resolvedData
    );
    if (response.statusCode === 201) {
      console.log(`Successfully created operation ...`);
    } else {
      console.log(`Failed to create operation ...`);
    }

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
    console.log(`Preparing update operation...`);

    const response = await request(
      state,
      'POST',
      `/ws/rest/v1/${resolvedResource}/${resolvedPath}`,
      resolvedData
    );
    if (response.statusCode === 201) {
      console.log(`Successfully updated operation ...`);
    } else {
      console.log(`Failed to update operation ...`);
    }

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
    console.log(`Preparing upsert via 'get' then 'create' OR 'update'...`);
    return await request(
      'GET',
      `/ws/rest/v1/${resolvedResource}`,
      {},
      resolvedQuery
    )
      .then(resp => {
        const resource = resp.data.results;
        if (resource.length > 1) {
          throw new RangeError(
            `Cannot upsert on Non-unique attribute. The operation found more than one records for your request.`
          );
        } else if (resource.length === 0) {
          return create(resourceType, resolvedData)(state);
        } else {
          const path = resource[0]?.uuid;
          return update(resourceType, path, resolvedData)(state);
        }
      })
      .then(result => {
        console.log(`Performed a "composed upsert" on ${resourceType}`);
        const { body } = result;
        const nextState = prepareNextState(state, body);
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

export {
  alterState,
  fn,
  field,
  fields,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
  each,
  arrayToString,
} from '@openfn/language-common';
