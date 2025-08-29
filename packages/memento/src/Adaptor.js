import { request } from './http';

/**
 * List all libraries
 * @example <caption>List all libraries</caption>
 * listLibraries();
 * @function
 * @public
 * @state data - an array of library objects
 * @returns {Operation}
 */
export function listLibraries() {
  console.log('Listing libraries');
  return request('GET', 'libraries', null, null);
}

/**
 * Get a library
 * @example <caption>Get a library</caption>
 * getLibrary('libraryId');
 * @function
 * @public
 * @param {string} libraryId - The ID of the library to get
 * @param {object} options - Options for the request
 * @state data - a library object
 * @returns {Operation}
 */
export function getLibrary(libraryId, options) {
  console.log('Getting library', libraryId);
  return request('GET', `libraries/${libraryId}`, null, options);
}

/**
 * List all entries in a library
 * @example <caption>List all entries in a library</caption>
 * listEntries('libraryId');
 * @function
 * @public
 * @param {string} libraryId - The ID of the library to list the entries from
 * @param {object} options - Options for the request
 * @state data - an array of entry objects
 * @returns {Operation}
 */
export function listEntries(libraryId, options) {
  console.log('Listing entries:', libraryId);
  return request('GET', `libraries/${libraryId}/entries`, null, options);
}

/**
 * Get an entry
 * @example <caption>Get an entry</caption>
 * getEntry('libraryId', 'entryId');
 * @function
 * @public
 * @param {string} libraryId - The ID of the library to get the entry from
 * @param {string} entryId - The ID of the entry to get
 * @param {object} options - Options for the request
 * @state data - an entry object
 * @returns {Operation}
 */
export function getEntry(libraryId, entryId, options) {
  return request('GET', `${libraryId}/${entryId}`, null, options);
}

export function createEntry(libraryId, entry, options) {
  return request('POST', libraryId, entry, options);
}

export function updateEntry(libraryId, entryId, entry, options) {
  return request('PUT', `${libraryId}/${entryId}`, entry, options);
}

export function deleteEntry(libraryId, entryId, options) {
  return request('DELETE', `${libraryId}/${entryId}`, null, options);
}

export function searchEntries(libraryId, query, options) {
  return request('GET', `${libraryId}/search`, query, options);
}

export {
  as,
  assert,
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
  map,
  merge,
  scrubEmojis,
  sourceValue,
  util,
} from '@openfn/language-common';
