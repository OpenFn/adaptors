import { request } from './util';
import { expandReferences } from '@openfn/language-common/util';

/**
 * List all libraries
 * @example <caption>List all libraries</caption>
 * listLibraries();
 * @function
 * @public
 * @state data.libraries - an array of library objects
 * @returns {Operation}
 */
export function listLibraries() {
  return state => {
    console.log('Listing libraries');
    return request(state, 'GET', 'libraries');
  };
}

/**
 * Get fields for a library
 * @example <caption>Get library fields</caption>
 * getFields('HyZV7AYk0');
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @state data.fields - a list of fields for a library
 * @returns {Operation}
 */
export function getFields(libraryId) {
  return state => {
    const [resolvedLibraryId] = expandReferences(state, libraryId);
    console.log('Getting library fields');
    return request(state, 'GET', `libraries/${resolvedLibraryId}`);
  };
}

/**
 * List all entries in a library
 * @example <caption>List all entries in a library</caption>
 * listEntries('HyZV7AYk0');
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @state data.entries - an array of entry objects for a library
 * @returns {Operation}
 */
export function listEntries(libraryId) {
  return state => {
    const [resolvedLibraryId] = expandReferences(state, libraryId);
    console.log('Listing entries');
    return request(state, 'GET', `libraries/${resolvedLibraryId}/entries`);
  };
}

/**
 * Get an entry
 * @example <caption>Get an entry</caption>
 * getEntry('HyZV7AYk0', 'T0xIYmE-V2QoMmRTWF1sVVJUKnU');
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @param {string} entryId - The entry ID
 * @state data - an entry object
 * @returns {Operation}
 */
export function getEntry(libraryId, entryId) {
  return state => {
    const [resolvedLibraryId, resolvedEntryId] = expandReferences(
      state,
      libraryId,
      entryId
    );
    console.log('Getting entry');
    return request(
      state,
      'GET',
      `libraries/${resolvedLibraryId}/entries/${resolvedEntryId}`
    );
  };
}

/**
 * Create an entry
 * @example <caption>Create an entry</caption>
 * createEntry('HyZV7AYk0', {
 *   name: 'Bukayo',
 *   age: 20,
 * });
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @param {object} entry - The entry to create
 * @state data - an entry object
 * @returns {Operation}
 */
export function createEntry(libraryId, entry) {
  return state => {
    const [resolvedLibraryId, resolvedEntry] = expandReferences(
      state,
      libraryId,
      entry
    );
    console.log('Creating entry');
    return request(state, 'POST', `libraries/${resolvedLibraryId}/entries`, {
      body: resolvedEntry,
    });
  };
}

/**
 * Update an entry
 * @example <caption>Update an entry</caption>
 * updateEntry('HyZV7AYk0', 'T0xIYmE-V2QoMmRTWF1sVVJUKnU', {
 *   name: 'Bukayo',
 *   age: 20,
 * });
 * @function
 * @public
 * @param {string} libraryId - The ID of the library to update the entry in
 * @param {string} entryId - The ID of the entry to update
 * @param {object} entry - The entry to update
 * @state data - an entry object
 * @returns {Operation}
 */
export function updateEntry(libraryId, entryId, entry) {
  return state => {
    const [resolvedLibraryId, resolvedEntryId, resolvedEntry] =
      expandReferences(state, libraryId, entryId, entry);
    console.log('Updating entry');
    return request(
      state,
      'PUT',
      `libraries/${resolvedLibraryId}/entries/${resolvedEntryId}`,
      {
        body: resolvedEntry,
      }
    );
  };
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
