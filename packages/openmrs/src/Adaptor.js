import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import request from 'superagent';
import { Log, handleError, handleResponse } from './Utils';

let agent = null;

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
  agent = null;

  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(login, ...operations)({ ...initialState, ...state });
  };
}

/**
 * Logs in to OpenMRS, gets a session token.
 * @example
 *  login(state)
 * @private
 * @param {State} state - Runtime state.
 * @returns {State}
 */
async function login(state) {
  const { instanceUrl, username, password } = state.configuration;
  agent = request.agent();
  await agent.get(`${instanceUrl}/ws/rest/v1/session`).auth(username, password);

  return state;
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
export function getPatient(uuid, callback = false) {
  return state => {
    Log.info(`Searching for patient with uuid: ${uuid}`);
    const { instanceUrl } = state.configuration;
    const defaultQuery = { v: 'full', limit: 1 };
    const url = `${instanceUrl}/ws/rest/v1/patient/${uuid}`;

    return agent
      .get(url)
      .accept('json')
      .query(defaultQuery)
      .then(response => {
        Log.success(`Found patient.`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
export function createEncounter(data, callback = false) {
  return state => {
    const { instanceUrl } = state.configuration;
    const body = expandReferences(data)(state);
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

    Log.info(`Creating an encounter.`);

    return agent
      .post(url)
      .type('json')
      .send(body)
      .then(response => {
        Log.success(`Created an encounter.`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
export function get(path, query, callback = false) {
  return state => {
    const { instanceUrl } = state.configuration;
    path = expandReferences(path)(state);
    query = expandReferences(query)(state);
    const urlPath = `${instanceUrl}/ws/rest/v1/${path}`;

    return agent
      .get(urlPath)
      .query(query)
      .then(response => handleResponse(response, state, callback))
      .catch(handleError);
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
export function post(path, data, callback = false) {
  return state => {
    path = expandReferences(path)(state);
    data = expandReferences(data)(state);
    const { instanceUrl } = state.configuration;

    const urlPath = `${instanceUrl}/ws/rest/v1/${path}`;

    return agent
      .post(urlPath)
      .type('json')
      .send(data)
      .then(response => handleResponse(response, state, callback))
      .catch(handleError);
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
export function searchPatient(query, callback = false) {
  return state => {
    const qs = expandReferences(query)(state);
    Log.info(`Searching for patient with name: ${qs.q}`);
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient`;

    return agent
      .get(url)
      .accept('json')
      .query(qs)
      .then(response => {
        const data = response.body;
        const count = data.results.length;

        if (count > 0) {
          Log.success(
            `Search successful. Returned ${count} patient${
              count > 1 ? 's' : ''
            }.`
          );
          return handleResponse(response, state, callback);
        } else {
          console.log(`${count} records were found.`);
        }
      })
      .catch(handleError);
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
export function searchPerson(query, callback = false) {
  return state => {
    const qs = expandReferences(query)(state);
    Log.info(`Searching for person with name: ${qs.q}`);

    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/person`;

    return agent
      .get(url)
      .accept('json')
      .query(qs)
      .then(response => {
        const data = response.body;
        const count = data.results.length;

        if (count > 0) {
          Log.success(
            `Search successful. Returned ${count} person${
              count > 1 ? 's' : ''
            }.`
          );
          return handleResponse(response, state, callback);
        } else {
          console.log(`${count} records were found.`);
        }
      })
      .catch(handleError);
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
export function createPatient(data, callback = false) {
  return state => {
    const body = expandReferences(data)(state);
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/patient`;

    Log.info(`Creating a patient.`);

    return agent
      .post(url)
      .type('json')
      .send(body)
      .then(response => {
        Log.success(`Created a new patient.`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
export function getEncounter(uuid, callback = false) {
  return state => {
    Log.info(`Searching for encounter with uuid: ${uuid}`);
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/encounter/${uuid}`;

    return agent
      .get(url)
      .accept('json')
      .then(response => {
        Log.success(`Found an encounter.`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
export function getEncounters(query, callback = false) {
  return state => {
    const qs = expandReferences(query)(state);
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

    Log.info(`Searching for encounters: ${JSON.stringify(qs, null, 2)}`);

    return agent
      .get(url)
      .accept('json')
      .query(qs)
      .then(response => {
        Log.success(`Found an encounter.`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
export function create(resourceType, data, callback = false) {
  return state => {
    console.log(`Preparing create operation...`);

    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/${resourceType}`;

    data = expandReferences(data)(state);
    resourceType = expandReferences(resourceType)(state);

    return agent
      .post(url)
      .type('json')
      .send(data)
      .then(response => {
        const details = `with response ${JSON.stringify(
          response.body,
          null,
          2
        )}`;

        Log.success(`Created ${resourceType} ${details}`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
export function update(resourceType, path, data, callback = false) {
  return state => {
    const { instanceUrl } = state.configuration;
    console.log(`Preparing update operation...`);
    resourceType = expandReferences(resourceType)(state);
    path = expandReferences(path)(state);
    data = expandReferences(data)(state);
    const url = `${instanceUrl}/ws/rest/v1/${resourceType}/${path}`;

    return agent
      .post(url)
      .type('json')
      .send(data)
      .then(response => {
        Log.success(`Updated ${resourceType} at ${path}`);

        return handleResponse(response, state, callback);
      })
      .catch(handleError);
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
  callback = false // callback for the upsert itself.
) {
  return state => {
    console.log(`Preparing upsert via 'get' then 'create' OR 'update'...`);

    return get(
      resourceType,
      query
    )(state)
      .then(resp => {
        const resources = resp.data.body.results;
        if (resources.length > 1) {
          throw new RangeError(
            `Cannot upsert on Non-unique attribute. The operation found more than one records for your request.`
          );
        } else if (resources.length <= 0) {
          return create(resourceType, data)(state);
        } else {
          // Pick out the first (and only) resource in the array and grab its
          // ID to be used in the subsequent `update` by the path determined
          const path = resources[0]['uuid'];
          return update(resourceType, path, data)(state);
        }
      })
      .then(result => {
        Log.success(`Performed a "composed upsert" on ${resourceType}`);
        return handleResponse(result, state, callback);
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
