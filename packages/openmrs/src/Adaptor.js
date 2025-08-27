import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { request, cleanPath, requestWithPagination } from './Utils';

/**
 * Options to append to the request. Unless otherwise specified, options are appended to the URL as query parameters - see the [OpenMRS Docs](https://rest.openmrs.org/) for all supported parameters.
 * @typedef {object} GetOptions
 * @property {string} [query] - (OpenFn only) Query string. Maps to `q` in OpenMRS.
 * @property {string} [language] - (OpenFn only) Language code. Maps to `Accept-Language` in OpenMRS.
 * @property {number} [max=10000] - (OpenFn only) Restrict the maximum number of retrieved records. May be fetched in several pages. Not used if `limit` is set.
 * @property {number} [pageSize=1000] - (OpenFn only) Limits the size of each page of data. Not used if limit is set.
 * @property {boolean} [singleton] - (OpenFn only) If set to true, only the first result will be returned. Useful for "get by id" APIs.
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
 * or to search a list.
 *
 * Options will be appended as query parameters to the request URL,
 * refer to {@link https://rest.openmrs.org/ OpenMRS Docs} for details.
 *
 * Pagination is handled automatically by default (maximum 10k items). Set `max`
 * to paginate with a higher limit, or pass `limit` to force a single request, as
 * per the OpenMRS Rest API.
 * @example <caption>List all concepts (up to a maximum of 10k items, with pagination)</caption>
 * get("concept")
 * @example <caption>List all concepts (with pagination)</caption>
 * get("concept", { query: "brian", max: Infinity })
 * @example <caption>Search up to 100 patients by name (allowing pagination) (<a href="https://rest.openmrs.org/#search-patients">see OpenMRS API</a>)</caption>
 * get("patient", { query: "brian", max: 100 })
 * @example <caption>Fetch patient by UUID (returns an array of 1 item)</caption>
 * get("patient/abc")
 * @example <caption>Fetch patient by UUID (returns an object of patient data)</caption>
 * get("patient/abc", { singleton: true })
 * @example <caption>Search up to 10 patients by name (in a single request without pagination) (<a href="https://rest.openmrs.org/#search-patients">see OpenMRS API</a>)</caption>
 * get("patient", { query: "brian", limit: 10 })
 * @example <caption>List allergy subresources</caption>
 * get("patient/abc/allergy")
 * @example <caption>Get allergy subresource by its UUID and parent patient UUID</caption>
 * get("patient/abc/allergy/xyz")
 * @example <caption>Get patient by UUID and set the language to French</caption>
 * get("patient/abc", { language: "fr" })
 * @function
 * @public
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {GetOptions} [options = {}] Query parameters and other options for the request.
 * @state data An array of result objects
 * @returns {Operation}
 */
export function get(path, options = {}) {
  return async state => {
    const [resolvedPath, resolvedOptions] = expandReferences(
      state,
      path,
      options
    );

    if (resolvedOptions.limit) {
      const keysToRemove = Object.keys(resolvedOptions).filter(k =>
        k.match(/^(max|pageSize)$/)
      );
      if (keysToRemove.length) {
        console.warn(
          `Warning: ignoring option [${keysToRemove.join(
            ','
          )}] as "limit" is set`
        );
        delete resolvedOptions.max;
        delete resolvedOptions.pageSize;
      }
    }
    let { max, singleton, limit, pageSize, query, language, ...queryParams } =
      resolvedOptions;

    if (singleton) {
      max = 1;
    }

    // Alias options.query to q (just for readability in job code)
    if (resolvedOptions.query) {
      queryParams.q = resolvedOptions.query;
    }

    const requestOptions = {
      baseUrl: state.configuration?.instanceUrl,
      query: queryParams,
      max,
      limit,
      pageSize,
      language,
    };

    try {
      let result = await requestWithPagination(
        state,
        cleanPath(`/ws/rest/v1/${resolvedPath}`),
        requestOptions
      );

      if (singleton) {
        result = result[0];
      } else {
        console.log(`get() downloaded ${result.length} resources`);
      }

      return composeNextState(state, result);
    } catch (e) {
      if (e.statusCode === 400 && !queryParams.q) {
        e.fix =
          'Many OpenMRS list endpoints expect a query to be passed - try setting the query option on get()';
      }
      throw e;
    }
  };
}

/**
 * Create a resource. For a list of valid resources, see {@link https://rest.openmrs.org/ OpenMRS Docs}
 * @public
 * @function
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {object} data - Resource definition
 * @state data The newly created resource, as returned by OpenMRS
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
  @example <caption>Create a patientIdentifier subresource (<a href="https://rest.openmrs.org/#create-a-patientidentifier-sub-resource-with-properties">see OpenMRS API</a>)</caption>
 * create("patient/b52ec6f9-0e26-424c-a4a1-c64f9d571eb3/identifier", { 
 *  "identifier" : "111:CLINIC1",
 *  "identifierType" : "a5d38e09-efcb-4d91-a526-50ce1ba5011a",
 *  "location" : "8d6c993e-c2cc-11de-8d13-0010c6dffd0f",
 *  "preferred" : true
 * })
}
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

    return composeNextState(state, response.body);
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
 * @state data The full updated resource, as returned by OpenMRS
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

    return composeNextState(state, response.body);
  };
}

/**
 * Update a resource if it already exists, or otherwise create a new one.
 *
 * Upsert will first make a request for the target item (using the `path` and `params`) to see if it exists, and then issue a second create or update request.
 * If the query request returns multiple items, the upsert will throw an error.
 * 
 * Params will be appended as query parameters to the request URL,
 * refer to {@link https://rest.openmrs.org/ OpenMRS Docs} for details.
 
 * @public
 * @function
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {Object} data - The resource data
 * @param {Object} params - Query parameters to append to the initial query
 * @state data The created/updated resource, as returned by OpenMRS
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
 * @example <caption>Upsert a patient using a query to identify the record</caption>
 * upsert("patient", $.data, { q: "Lamine Yamal", limit: 1 })
 */
export function upsert(path, data, params = {}) {
  return async state => {
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );

    console.log(`Preparing composed upsert on ${resolvedPath}`);

    const { instanceUrl: baseUrl } = state.configuration;
    const res = await request(
      state,
      'GET',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        query: resolvedParams,
        errors: { 404: false },
      }
    );
    // For get-by-id
    let found = res.statusCode <= 400;
    // for search
    const count = res.body.results?.length ?? 1;

    if (found && count > 1) {
      throw new RangeError(
        `Found more than one record for your request; cannot upsert on non-unique attribute.`
      );
    } else if (!found || count === 0) {
      console.log(`${resolvedPath} not found: creating new resource`);

      // How many resources are in the url?
      // If an even number, the UUID is in the URL
      // resource/uuid
      // resource/uuid/subresource
      // resource/uuid/subresource/uuid
      const parts = path.split('/').length;
      const dropUuid = parts % 2 > 0 && Object.keys(resolvedParams).length;
      const finalPath = dropUuid
        ? resolvedPath
        : resolvedPath.split('/').slice(0, -1).join('/'); // remove the ID
      return create(finalPath, resolvedData)(state);
    } else {
      let finalPath = resolvedPath;

      // If there are no query params and there are multiple resources in the path
      // Then the path probably includes a UUID and we can just re-use it
      const parts = path.split('/').length;
      if (parts % 2 > 0 && Object.keys(resolvedParams).length > 0) {
        // Otherwise, if there doesn't seem to be a UUID in the URL,
        // find one from th original GET
        let uuid = res.body.uuid;
        if (res.body.results) {
          uuid = res.body.results[0].uuid;
        }
        finalPath = `${resolvedPath}/${uuid}`;
      }

      console.log(`${finalPath} found: updating existing resource`);
      return update(finalPath, resolvedData)(state);
    }
  };
}

/**
 * Delete a resource. Must include a UUID in the path.
 * Throws an error if the resource does not exist.
 * @example <caption>Void a patient</caption>
 * destroy("patient/12346");
 * @example <caption>Purge a patient</caption>
 * destroy("patient/12346", {
 *   purge: true
 * });
 * @function
 * @public
 * @param {string} path - Path to resource (excluding `/ws/rest/v1/`)
 * @param {object}  [options = {}]
 * @param {object}  [options.purge=false] The resource will be voided/retired unless true
 * @state data The response from OpenMRS
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

    const response = await request(
      state,
      'DELETE',
      cleanPath(`/ws/rest/v1/${resolvedPath}`),
      {
        baseUrl,
        query: resolvedOptions,
      }
    );
    return composeNextState(state, response.body);
  };
}

export {
  alterState,
  arrayToString,
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
  lastReferenceValue,
  map,
  merge,
  sourceValue,
  util,
} from '@openfn/language-common';
