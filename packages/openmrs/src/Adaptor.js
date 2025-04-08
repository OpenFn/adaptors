import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import {
  request,
  prepareNextState,
  cleanPath,
  requestWithPagination,
} from './Utils';

/**
 * State object
 * @typedef {object} HttpState
 * @private
 * @property data - The parsed response body
 * @property response - The response from the OpenMRS server
 * @property references  - An array of all previous data objects used in the job
 */

/**
 * OpenMRS query object. This is a brief overview with commonly used parameters that cut across multiple requests. For more details about parameters specific to your request visit the [OpenMRS Docs](https://rest.openmrs.org/)
 * @typedef {object} RestQueryOptions
 * @property {string} q - Search by query for listings
 * @property {number} limit - Number of listings returned in the `results` array.
 * @property {boolean} purge - For delete operations only. Use with caution! The resource will be voided unless purge = true. Purging will attempt to remove the resource irreversibly. Resources that are referenced from existing data can not be purged.
 * @property {number} startindex - Commonly used with `query.q` and `query.limit` for pagination to position the cursor.
 * @property {boolean} includeAll - Include voided/retired/disabled resources in the response.
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
 * Fetch resources from OpenMRS. Use this to fetch a single resource,
 * or to search a list. Query parameters will be appended to the request URL,
 * refer to {@link https://rest.openmrs.org/ OpenMRS Docs} for details.
 * Pagination is handled automatically, pass a limit to restrict the total number
 * of items that are retrieved.
 * @example <caption>List all patients</caption>
 * get("patient")
 * @example <caption>Search patients by name with a limit (<a href="https://rest.openmrs.org/#search-patients">see OpenMRS API</a>)</caption>
 * get("patient", { q: "brian", limit: 1 })
 * @example <caption>Fetch patient by UUID</caption>
 * get("patient/abc")
 * @example <caption>List allergy subresources</caption>
 * get("patient/abc/allergy")
 * @example <caption>Get allergy subresource by its UUID and parent patient UUID</caption>
 * get("patient/abc/allergy/xyz")
 * @function
 * @public
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {RestQueryOptions} [options = {}] Query parameters (eg `limit`, `q`)
 * @state {HttpState}
 * @state data The requested resources
 * @returns {Operation}
 */
export function get(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    const result = await requestWithPagination(
      state,
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl: state.configuration?.instanceUrl,
        query: resolvedOptions,
      }
    );

    return composeNextState(state, result);
  };
}

/**
 * Create a resource. For a list of valid resources, see {@link https://rest.openmrs.org/ OpenMRS Docs}
 * @public
 * @function
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {object} data - Resource definition
 * @state {HttpState}
 * @state data The newly created resource
 * @returns {Operation}
 * @example <caption>Create a person (<a href="https://rest.openmrs.org/#create-a-person">see OpenMRS API</a>)</caption>
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
 * @example <caption>Create an encounter (<a href="https://rest.openmrs.org/#create-an-encounter">see OpenMRS API</a>)</caption>
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
 * @example <caption>Create a patient (<a href="https://rest.openmrs.org/#create-a-patient">see OpenMRS API</a>)</caption>
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
    const [resolvedPath, resolvedData] = expandReferences(state, path, data);
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

    // TODO I think we should use composeNextState no?
    // No http semantics?
    return prepareNextState(state, response);
  };
}

/**
 * Update a resource. Only properties included in the data will be affected.
 * For a list of valid resources and for update rules, see the Update sections
 * of the {@link https://rest.openmrs.org/ OpenMRS Docs}
 * @public
 * @function
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {Object} data - Resource properties to update
 * @state {HttpState}
 * @state data The updated resource
 * @returns {Operation}
 * @example <caption>Update a person (<a href="https://rest.openmrs.org/#create-a-person">see OpenMRS API</a>)</caption>
 * update('person/3cad37ad-984d-4c65-a019-3eb120c9c373', {
 *   'gender': 'M',
 *   'birthdate':'1997-01-13'
 * })
 */
export function update(path, data) {
  return async state => {
    const [resolvedPath, resolvedData] = expandReferences(state, path, data);

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
 * Upsert a record. If the resource exists, it will be updated. Otherwise, a new resource will be created.
 * @public
 * @function
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {Object} data - The resource data
 * @state {HttpState}
 * @state data The updated or newly created resource
 * @returns {Operation}
 * @example <caption>Upsert a patient (<a href="https://rest.openmrs.org/#patients-overview">see OpenMRS API</a>)</caption>
 * upsert("patient/a5d38e09-efcb-4d91-a526-50ce1ba5011a", {
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
export function upsert(path, data) {
  return async state => {
    const [resolvedPath, resolvedData] = expandReferences(state, path, data);

    const resourceName =
      resolvedPath[0] === '/'
        ? resolvedPath.split('/')[1]
        : resolvedPath.split('/')[0];

    console.log(
      `Preparing composed upsert (via 'get' then 'create' OR 'update') on ${resourceName}`
    );

    const { instanceUrl: baseUrl } = state.configuration;
    return await request(
      state,
      'GET',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
      }
    ).then(resp => {
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
 * Delete a resource. Must include a UUID in the path.
 * Throws an error if the resource does not exist.
 * @alias delete
 * @example <caption>Void a patient</caption>
 * delete("patient/12346");
 * @example <caption>Purge a patient</caption>
 * delete("patient/12346", {
 *   purge: true
 * });
 * @function
 * @public
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {object}  [options = {}]
 * @param {object}  [options.purge=false] The resource will be voided/retired unless true
 * @state {HttpState}
 * @returns {Operation}
 */
export function destroy(path, options) {
  return async state => {
    const [resolvedPath, resolvedOptions = {}] = expandReferences(
      state,
      path,
      options
    );

    const { instanceUrl: baseUrl } = state.configuration;

    // TODO if this returns anything other than a 204, we should throw
    const result = await request(
      state,
      'DELETE',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        query: resolvedOptions,
      }
    );
    return composeNextState(state, result.body);
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
