import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, prepareNextState, cleanPath } from './Utils';

/**
 * State object
 * @typedef {object} HttpState
 * @property data - The parsed response body
 * @property response - The response from the OpenMRS server, including headers, statusCode, body, etc
 * @property references  - An array of all previous data objects used in the job
 */

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
 * Make a get request to any OpenMRS REST endpoint.
 * @example <caption>Get a patient by UUID</caption>
 * get("/patient/abc")
 * @example <caption>Get a patient with query and limit</caption>
 * get("/patient", {query: {q: 'Jon', limit: 1}})
 * @example <caption>Get an allergy subresource by its UUID and parent patient UUID</caption>
 * get("/patient/abc/allergy/xyz")
 * @function
 * @public
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {RequestOptions}  [options={}] - An object containing query, headers, and body for the request. See {@link https://rest.openmrs.org/ OpenMRS Rest API docs} for available query parameters
 * @state {HttpState}
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
 * Create a record
 * @public
 * @function
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {object} data - Object which defines data that will be used to create a given instance of resource
 * @state {HttpState}
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
export function create(path, data) {
  return async state => {
    const [resolvedPath, resolvedData] = expandReferences(
      state,
      path,
      data
    );
    console.log(`Preparing to create ${resolvedPath}`);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(
      state,
      'POST',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        data: resolvedData,
      }
    );

    console.log(`Successfully created ${resolvedPath}`);

    return prepareNextState(state, response);
  };
}

/**
 * Update data. A generic helper function to update a resource object of any type.
 * Updating an object requires to send `all required fields` or the `full body`
 * @public
 * @function
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {Object} data - Data to update. It requires to send `all required fields` or the `full body`. If you want `partial updates`, use `patch` operation.
 * @state {HttpState}
 * @returns {Operation}
 * @example <caption>a person</caption>
 * update('person/3cad37ad-984d-4c65-a019-3eb120c9c373',{"gender":"M","birthdate":"1997-01-13"})
 */
export function update(path, data) {
  return async state => {
    const [resolvedPath, resolvedData] = expandReferences(
      state,
      path,
      data
    );

    console.log(`Preparing to update ${resolvedPath}`);
    const { instanceUrl: baseUrl } = state.configuration;

    const response = await request(
      state,
      'POST',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        data: resolvedData,
      }
    );

    console.log(`Successfully updated ${resolvedPath}`);

    return prepareNextState(state, response);
  };
}

/**
 * Upsert a record. A generic helper function used to atomically either insert a row, or on the basis of the row already existing, UPDATE that existing row instead.
 * @public
 * @function
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {Object} data - The data to use for update or create depending on the result of the query.
 * @throws {RangeError} - Throws range error
 * @state {HttpState}
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
export function upsert(path,  data) {
  return async state => {
    const [resolvedPath, resolvedData] =
      expandReferences(state, path, data);

    const resourceName = resolvedPath[0] === '/' ? resolvedPath.split('/')[1] : resolvedPath.split('/')[0];

    console.log(`Preparing composed upsert (via 'get' then 'create' OR 'update') on ${resourceName}`);

    const { instanceUrl: baseUrl } = state.configuration;
    return await request(state, 'GET', cleanPath(`/ws/rest/v1/${resolvedPath}`), {
      baseUrl,
    }).then(resp => {
      const resource = resp.body.results;
      if (resource.length > 1) {
        throw new RangeError(
          `Found more than one record for your request; cannot upsert on non-unique attribute.`
        );
      } else if (resource.length === 0) {
        console.log(`No ${resourceName} found.`);
        const path = resolvedPath.split('/').slice(0, -1).join('/'); // remove the ID
        return create(path, resolvedData)(state);
      } else {
        console.log(`One ${resourceName} found.`);
        return update(resolvedPath, resolvedData)(state);
      }
    });
  };
}



/**
 * Make a DELETE request to any OpenMRS REST endpoint.
 * @alias delete
 * @example
 * delete("patient/12346", {
 *   query: {
 *     purge: false
 *   }
 * });
 * @function
 * @public
 * @param {string} path - Path to resource (excluding /ws/rest/v1/)
 * @param {RequestOptions}  [options={}] - An object containing query, headers, and body for the request. See {@link https://rest.openmrs.org/ OpenMRS Rest API docs} for available query parameters
 * @state {HttpState}
 * @returns {Operation}
 */
function _delete(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      path,
      options
    );

    const { instanceUrl: baseUrl } = state.configuration;
    const response = await request(
      state,
      'DELETE',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        ...resolvedOptions,
      }
    );

    return prepareNextState(state, response);
  };
}

export { _delete as delete }

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
