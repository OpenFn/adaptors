import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import * as util from './Utils.js';

/**
 * State object
 * @typedef {Object} HttpState
 * @property data - the parsed response body
 * @property response - the response from the GoData server, including headers, statusCode, url, etc (but not the body)
 * @property references - an array of all previous data objects used in the Job
 **/

/**
 * Options provided to the HTTP request
 * @typedef {Object} RequestOptions
 * @public
 * @property {object} query - An object of query parameters to be encoded into the URL. A `filter` object is JSON-encoded for you.
 * @property {object} body - The request body, sent as JSON.
 * @property {object} headers - An object of headers to append to the request.
 * @property {object} errors - Map of errorCodes -> error messages, ie, `{ 404: 'Resource not found;' }`. Pass `false` to suppress errors for this code.
 * @property {string} parseAs - Parse the response body as json, text or stream. Default: json.
 * @property {number} timeout - Request timeout in ms. Default: 300 seconds.
 */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, logging in to GoData before the first operation.
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

const getList = (path, query) => async state => {
  const [resolvedPath, resolvedQuery] = expandReferences(state, path, query);
  const response = await util.request(
    state.configuration,
    'GET',
    resolvedPath,
    { query: resolvedQuery === undefined ? {} : { filter: resolvedQuery } }
  );
  return util.prepareNextState(state, response);
};

/**
 * Make a request to any GoData API endpoint. Paths are relative to `apiUrl`.
 * @public
 * @example <caption>List the teams in GoData</caption>
 * request('GET', '/teams');
 * @example <caption>Create a follow-up for a contact</caption>
 * request('POST', '/outbreaks/3b55-cdf4/contacts/a1b2/follow-ups', {
 *   body: { date: '2026-11-19', targeted: true },
 * });
 * @function
 * @param {string} method - HTTP method to use
 * @param {string} path - Path to resource, e.g. `/outbreaks`
 * @param {RequestOptions} [options] - Query, body, headers and error options
 * @returns {Operation}
 * @state {HttpState}
 */
export function request(method, path, options = {}) {
  return async state => {
    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );
    const response = await util.request(
      state.configuration,
      resolvedMethod,
      resolvedPath,
      resolvedOptions
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Make a GET request to any GoData API endpoint. A `filter` object in the query is JSON-encoded for you.
 * @public
 * @example <caption>Get users with a filter</caption>
 * get('/users', { filter: { where: { firstName: 'Luca' } } });
 * @example <caption>Get follow-ups for an outbreak</caption>
 * get($ => `/outbreaks/${$.outbreakId}/follow-ups`);
 * @function
 * @param {string} path - Path to resource, e.g. `/users`
 * @param {object} [params] - Query parameters, e.g. `{ filter: { where: {...}, limit: 10 } }`
 * @returns {Operation}
 * @state {HttpState}
 */
export function get(path, params = {}) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    const response = await util.request(
      state.configuration,
      'GET',
      resolvedPath,
      { query: resolvedParams }
    );
    return util.prepareNextState(state, response);
  };
}

const sendWithBody =
  method =>
  (path, data, params = {}) =>
  async state => {
    const [resolvedPath, resolvedData, resolvedParams] = expandReferences(
      state,
      path,
      data,
      params
    );
    const response = await util.request(
      state.configuration,
      method,
      resolvedPath,
      { body: resolvedData, query: resolvedParams }
    );
    return util.prepareNextState(state, response);
  };

/**
 * Make a POST request to any GoData API endpoint.
 * @public
 * @example <caption>Create a team</caption>
 * post('/teams', { name: 'Team A', userIds: [] });
 * @function
 * @param {string} path - Path to resource, e.g. `/teams`
 * @param {object} data - Body of the request
 * @param {object} [params] - Query parameters
 * @returns {Operation}
 * @state {HttpState}
 */
export function post(path, data, params) {
  return sendWithBody('POST')(path, data, params);
}

/**
 * Make a PUT request to any GoData API endpoint. Send only the fields you want to change.
 * @public
 * @example <caption>Update a team</caption>
 * put('/teams/a1b2', { name: 'Team B' });
 * @function
 * @param {string} path - Path to resource, e.g. `/teams/a1b2`
 * @param {object} data - Body of the request
 * @param {object} [params] - Query parameters
 * @returns {Operation}
 * @state {HttpState}
 */
export function put(path, data, params) {
  return sendWithBody('PUT')(path, data, params);
}

/**
 * Make a PATCH request to any GoData API endpoint.
 * @public
 * @example <caption>Patch a user</caption>
 * patch('/users/a1b2', { lastName: 'Smith' });
 * @function
 * @param {string} path - Path to resource
 * @param {object} data - Body of the request
 * @param {object} [params] - Query parameters
 * @returns {Operation}
 * @state {HttpState}
 */
export function patch(path, data, params) {
  return sendWithBody('PATCH')(path, data, params);
}

/**
 * Make a DELETE request to any GoData API endpoint.
 * @public
 * @example <caption>Delete a team</caption>
 * del('/teams/a1b2');
 * @function
 * @param {string} path - Path to resource
 * @param {object} [params] - Query parameters
 * @returns {Operation}
 * @state {HttpState}
 */
export function del(path, params = {}) {
  return async state => {
    const [resolvedPath, resolvedParams] = expandReferences(
      state,
      path,
      params
    );
    const response = await util.request(
      state.configuration,
      'DELETE',
      resolvedPath,
      { query: resolvedParams }
    );
    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch the list of contacts within a particular outbreak using its ID.
 * @public
 * @example
 * listContacts('343d-dc3e');
 * @function
 * @param {string} id - Outbreak id
 * @returns {Operation}
 * @state {HttpState}
 */
export function listContacts(id) {
  return state => {
    const [resolvedId] = expandReferences(state, id);
    return getList(`/outbreaks/${resolvedId}/contacts`, undefined)(
      state
    );
  };
}

/**
 * Get one or multiple contacts within an outbreak from a query filter.
 * @public
 * @example
 * getContact('343d-dc3e', { where: { firstName: 'Luca' } });
 * @function
 * @param {string} id - Outbreak id
 * @param {object} query - A GoData (LoopBack) filter, e.g. `{ where: {...} }`
 * @returns {Operation}
 * @state {HttpState}
 */
export function getContact(id, query) {
  return state => {
    const [resolvedId] = expandReferences(state, id);
    return getList(`/outbreaks/${resolvedId}/contacts`, query)(state);
  };
}

/**
 * Upsert a contact within an outbreak. Looks up the contact whose `externalId` field
 * matches the value of that field on `goDataContact`. Creates the contact if none match,
 * updates it if one matches, and throws if more than one matches.
 * On update, send only the fields you want to change.
 * @public
 * @example
 * upsertContact('4dce-3eedce3-rd33', 'visualId', {
 *   visualId: 'CON-0001',
 *   firstName: 'Luca',
 *   gender: 'male',
 *   'age:years': '20',
 * });
 * @function
 * @param {string} id - Outbreak id
 * @param {string} externalId - Match field: the contact property used to find an existing contact, e.g. `visualId`
 * @param {object} goDataContact - The contact data. Must include the match field.
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertContact(id, externalId, goDataContact) {
  return async state => {
    const [resolvedId, matchField, data] = expandReferences(
      state,
      id,
      externalId,
      goDataContact
    );
    const listPath = `/outbreaks/${resolvedId}/contacts`;
    const response = await util.upsertBy(state, {
      listPath,
      itemPath: contactId => `${listPath}/${contactId}`,
      where: { [matchField]: data[matchField] },
      data,
    });
    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch the list of outbreaks.
 * @public
 * @example
 * listOutbreaks();
 * @function
 * @returns {Operation}
 * @state {HttpState}
 */
export function listOutbreaks() {
  return getList('/outbreaks', undefined);
}

/**
 * Get one or multiple outbreaks from a query filter.
 * @public
 * @example
 * getOutbreak({ where: { name: 'Outbreak demo' } });
 * @function
 * @param {object} query - A GoData (LoopBack) filter, e.g. `{ where: {...} }`
 * @returns {Operation}
 * @state {HttpState}
 */
export function getOutbreak(query) {
  return getList('/outbreaks', query);
}

/**
 * Upsert an outbreak. `outbreak.externalId` is the outbreak `id` to match:
 * if an outbreak with that id exists it is updated, otherwise `outbreak.data` is created.
 * On update, send only the fields you want to change.
 * @public
 * @example
 * upsertOutbreak({
 *   externalId: '3dec33-ede3',
 *   data: {
 *     name: 'Outbreak demo',
 *     disease: 'LNG_REFERENCE_DATA_CATEGORY_DISEASE_COVID_19',
 *     countries: [{ id: 'SENEGAL' }],
 *     startDate: '2020-12-17T14:54:19.498Z',
 *   },
 * });
 * @function
 * @param {object} outbreak - `{ externalId, data }` where `externalId` is the outbreak id to match and `data` is the outbreak body
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertOutbreak(outbreak) {
  return async state => {
    const [{ externalId, data }] = expandReferences(state, outbreak);
    const response = await util.upsertBy(state, {
      listPath: '/outbreaks',
      itemPath: outbreakId => `/outbreaks/${outbreakId}`,
      where: { id: externalId },
      data,
    });
    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch the list of cases within a particular outbreak using its ID.
 * @public
 * @example
 * listCases('343d-dc3e');
 * @function
 * @param {string} id - Outbreak id
 * @returns {Operation}
 * @state {HttpState}
 */
export function listCases(id) {
  return state => {
    const [resolvedId] = expandReferences(state, id);
    return getList(`/outbreaks/${resolvedId}/cases`, undefined)(
      state
    );
  };
}

/**
 * Get one or multiple cases within an outbreak from a query filter.
 * @public
 * @example
 * getCase('3b55-cdf4', { where: { firstName: 'Luca' } });
 * @function
 * @param {string} id - Outbreak id
 * @param {object} query - A GoData (LoopBack) filter, e.g. `{ where: {...} }`
 * @returns {Operation}
 * @state {HttpState}
 */
export function getCase(id, query) {
  return state => {
    const [resolvedId] = expandReferences(state, id);
    return getList(`/outbreaks/${resolvedId}/cases`, query)(state);
  };
}

/**
 * Upsert a case within an outbreak. Looks up the case whose `externalId` field
 * matches the value of that field on `goDataCase`. Creates the case if none match,
 * updates it if one matches, and throws if more than one matches.
 * On update, the matched case's `id` is added to the body and `visualId` is removed.
 * Send only the fields you want to change.
 * @public
 * @example
 * upsertCase('4dce-3eedce3-rd33', 'visualId', $ => ({
 *   firstName: $.data.firstName,
 *   lastName: $.data.lastName,
 *   visualId: $.data.caseId,
 *   'age:years': $.data.age,
 *   gender: $.data.sex,
 * }));
 * @function
 * @param {string} id - Outbreak id
 * @param {string} externalId - Match field: the case property used to find an existing case, e.g. `visualId`
 * @param {object} goDataCase - The case data. Must include the match field.
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertCase(id, externalId, goDataCase) {
  return async state => {
    const [resolvedId, matchField, data] = expandReferences(
      state,
      id,
      externalId,
      goDataCase
    );
    const listPath = `/outbreaks/${resolvedId}/cases`;
    const response = await util.upsertBy(state, {
      listPath,
      itemPath: caseId => `${listPath}/${caseId}`,
      where: { [matchField]: data[matchField] },
      data,
      prepareUpdate: (body, existing) => {
        body.id = existing.id;
        delete body.visualId;
        return body;
      },
    });
    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch the list of locations.
 * @public
 * @example
 * listLocations();
 * @function
 * @returns {Operation}
 * @state {HttpState}
 */
export function listLocations() {
  return getList('/locations', undefined);
}

/**
 * Get one or multiple locations from a query filter.
 * @public
 * @example
 * getLocation({ where: { name: '30 DE OCTUBRE' } });
 * @function
 * @param {object} query - A GoData (LoopBack) filter, e.g. `{ where: {...} }`
 * @returns {Operation}
 * @state {HttpState}
 */
export function getLocation(query) {
  return getList('/locations', query);
}

/**
 * Upsert a location. Looks up the location whose `externalId` field matches the value
 * of that field on `goDataLocation`. Creates the location if none match, updates it if
 * one matches, and throws if more than one matches.
 * @public
 * @example
 * upsertLocation('name', {
 *   name: '30 DE DECIEMBRE',
 *   active: true,
 *   geoLocation: { lat: -45.343244, lng: -67.193873 },
 * });
 * @function
 * @param {string} externalId - Match field: the location property used to find an existing location, e.g. `name`
 * @param {object} goDataLocation - The location data. Must include the match field.
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertLocation(externalId, goDataLocation) {
  return async state => {
    const [matchField, data] = expandReferences(
      state,
      externalId,
      goDataLocation
    );
    const response = await util.upsertBy(state, {
      listPath: '/locations',
      itemPath: locationId => `/locations/${locationId}`,
      where: { [matchField]: data[matchField] },
      data,
    });
    return util.prepareNextState(state, response);
  };
}

/**
 * Fetch the list of reference data.
 * @public
 * @example
 * listReferenceData();
 * @function
 * @returns {Operation}
 * @state {HttpState}
 */
export function listReferenceData() {
  return getList('/reference-data', undefined);
}

/**
 * Get one or multiple reference data entries from a query filter.
 * @public
 * @example
 * getReferenceData({ where: { categoryId: 'LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME' } });
 * @function
 * @param {object} query - A GoData (LoopBack) filter, e.g. `{ where: {...} }`
 * @returns {Operation}
 * @state {HttpState}
 */
export function getReferenceData(query) {
  return getList('/reference-data', query);
}

/**
 * Upsert a reference data entry. Looks up the entry whose `externalId` field matches the
 * value of that field on `goDataReferenceData`. Creates the entry if none match, updates
 * it if one matches, and throws if more than one matches.
 * @public
 * @example
 * upsertReferenceData('id', {
 *   id: 'LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME_CLINIC_A',
 *   categoryId: 'LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME',
 *   value: 'Clinic A',
 *   active: true,
 * });
 * @function
 * @param {string} externalId - Match field: the reference data property used to find an existing entry, e.g. `id`
 * @param {object} goDataReferenceData - The reference data. Must include the match field.
 * @returns {Operation}
 * @state {HttpState}
 */
export function upsertReferenceData(externalId, goDataReferenceData) {
  return async state => {
    const [matchField, data] = expandReferences(
      state,
      externalId,
      goDataReferenceData
    );
    const response = await util.upsertBy(state, {
      listPath: '/reference-data',
      itemPath: referenceDataId => `/reference-data/${referenceDataId}`,
      where: { [matchField]: data[matchField] },
      data,
    });
    return util.prepareNextState(state, response);
  };
}

export {
  alterState,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  lastReferenceValue,
  log,
  merge,
  sourceValue,
} from '@openfn/language-common';
