import { composeNextState } from '@openfn/language-common';
import { throwError, expandReferences } from '@openfn/language-common/util';
import { assertValidResourceId, prepareNextState, request } from './util';

/**
 * Fetch a single FHIR resource.
 * @public
 * @function
 * @param {string} reference - The type and ID of the resource to read, eg, `Patient/123`
 * @state data - the newly updated resource, as returned by the server
 * @state response - the HTTP response returned by the server.
 * @example <caption>Read a single Patient resource</caption>
 * read('Patient/12345')
 * @returns Operation
 */

// don't support vread, but maybe accept a version parameter later
// TODO this doesn't play that nice with native resource references? I can't do `read($.id)`
export function read(reference: string) {
  return async state => {
    const [$reference] = expandReferences(state, reference);

    assertValidResourceId($reference);

    const response = await request('GET', $reference as string, {
      configuration: state.configuration,
    });

    return prepareNextState(state, response);
  };
}

type SearchQuery = {
  /** k/v pairs. Can do stuff like given:contains=eve and [parameter]=ge2013-03-14. So the parameter can have criteria   */
  query?: Record<string, string>;
  filter?: Record<string, string>;
  lastUpdated?: string;

  [key: string]: any;
};

// Find special fhir parameters like _lastUpdated and map them
const assignParameters = (query, options) => {
  const special = {
    id: 1,
    lastUpdated: 1,
    tag: 1,
    profile: 1,
    security: 1,
    source: 1,
    text: 1,
    content: 1,
    list: 1,
    has: 1,
    type: 1,
    sort: 1,
    count: 1,
    include: 1,
    revinclude: 1,
    summary: 1,
    total: 1,
    elements: 1,
    contained: 1,
    containedType: 1,
  };
  for (const key in options) {
    if (special[key]) {
      query[`_${key}`] = options[key];
    }
  }
};

/**
 * Search for matching FHIR resources. Exclude _ from search parameters, and pass query terms on options.query.
 * @public
 * @function
 * @param {string} resourceType - The type of the resource to search for.
 * @param {object} options - Parameters, query and filter.
 * @param {object} [options.*] - Pass supported query parameters without underscore. See {@link https://www.hl7.org/fhir/R4/search.html#Summary FHIR Search Summary}.
 * @param {object} [options.query] - query terms to search for. These are appended to the query URL veratim..
 * @state data - the newly updated resource, as returned by the server
 * @state response - the HTTP response returned by the server.
 * @example <caption>Search with parameter and query term</caption>
 * search('Patient', {
 *   lastUpdated: $.cursor,
 *   count: 10,
 *   query: { given: 'messi' },
 * })
 * @example <caption>Search for patients with a given name containing "eve"</caption>
 * search('Patient', {
 *   query: { 'given:contains': 'eve' },
 * })
 * @returns Operation
 */
// TODO handle paging
// https://hl7.org/fhir/R4B/search.html
// Note: if you do Family= rather than family=, you get a 400 out of fhir
// best to report a good error for that
export function search(resourceType: string, options: SearchQuery) {
  return async state => {
    const [$resourceType, $options] = expandReferences(
      state,
      resourceType,
      options
    );

    const { query = {} } = $options;
    assignParameters(query, $options);
    const queryParams = new URLSearchParams(query).toString();

    console.log(`Searching for ${$resourceType}s matching:`, queryParams);

    const response = await request('GET', $resourceType as string, {
      configuration: state.configuration,
      query,
    });
    const resources = response.body.entry.map(result => result.resource);

    console.log(`Search found ${resources.length} ${$resourceType}s`);

    return composeNextState(state, resources);
  };
}

/**
 * Update a resource. If the resource does not already exist, it will be created and `state.response.statusCode` will be 201.
 * Otherwise, the existing resource will be replaced.
 * To partially update a resource, use `patch()`.
 * @public
 * @function
 * @param {string} reference - The type and ID of the resource to update, eg, `Patient/123`
 * @param {object} resource - The new version of this resource.
 * @state data - the newly updated resource, as returned by the server
 * @state response - the HTTP response returned by the server.
 * @example <caption>Update a Patient with a builder function</caption>
 * update('Patient/123', b.patient({
 *   id: 'Patient/123',
 *   name: { family: "Messi", given: "Lionel", use: "official" },
 * }))
 * @returns Operation
 */
export function update(reference: string, resource: any) {
  return async state => {
    const [$reference, $resource] = expandReferences(
      state,
      reference,
      resource
    );

    assertValidResourceId($reference);

    console.log(`Updating ${reference}...`);

    const response = await request('PUT', $reference as string, {
      configuration: state.configuration,
      body: $resource,
    });

    if (response.statusCode === 200) {
      console.log(`Updated ${reference}`);
    } else if (response.statusCode === 201) {
      console.log(`Created ${reference}`);
    }

    return prepareNextState(state, response);
  };
}

// Yeah we won't support this today because it's _slightly_ more complicated
// must be JSON patch syntax, so we need a convenient API for that
// https://hl7.org/fhir/R4B/http.html#patch
// https://datatracker.ietf.org/doc/html/rfc6902
// export function patch(reference: string, resource: any) {
//   return async state => {
//     const [$reference, $resource] = expandReferences(
//       state,
//       reference,
//       resource
//     );

//     // TODO assert reference is a path, type/id
//     console.log(`Updating ${reference}...`);

//     const response = await request('PUT', $reference as string, {
//       configuration: state.configuration,
//       body: $resource,
//     });

//     console.log(`Updated ${reference}`);

//     return prepareNextState(state, response);
//   };

/**
 * Delete a single FHIR resource.
 * @public
 * @function
 * @param {string} reference - The type and ID of the resource to delete, eg, `Patient/123`
 * @state response - the HTTP response returned by the server.
 * @example <caption>Delete a single Patient resource</caption>
 * delete('Patient/12345')
 * @returns Operation
 */

function _delete(reference: string) {
  return async state => {
    const [$reference] = expandReferences(state, reference);

    assertValidResourceId($reference);

    const response = await request('DELETE', $reference as string, {
      configuration: state.configuration,
    });

    return prepareNextState(state, response);
  };
}

export { _delete as delete };

/**
 * Create a new resource. The resource does not need to include an id.
 * The created resource will be returned to state.data.
 * @public
 * @function
 * @param {object} resource - The resource to create.
 * @state data - the newly created resource.
 * @state response - the HTTP response returned by the server.
 * @example <caption>Create a Patient with a builder function</caption>
 * create(b.patient({
 *   name: { family: "Messi", given: "Lionel", use: "official" },
 * }))
 * @returns Operation
 */
export function create(resource: any) {
  return async state => {
    const [$resource] = expandReferences(state, resource);

    if (!$resource.resourceType) {
      throwError('INVALID_RESOURCE_TYPE', {
        description:
          'The provided resource does not have a resourceType property',
        fix: 'Set resourceType on the resource, or use a builder function eg b.patient({})',
      });
    }

    const response = await request('POST', $resource.resourceType as string, {
      configuration: state.configuration,
      body: $resource,
    });

    console.log(`Created ${response.body.id}`);

    return prepareNextState(state, response);
  };
}

// writes to state.bundles[name]
export function addToBundle(resources: any[], name?: string) {}

// posts state.bundles[name]
export function submitBundle(name?: string) {}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
