import { sendRequest, requestWithPagination } from './util';
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
    return sendRequest(state, 'GET', 'libraries');
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
    return sendRequest(state, 'GET', `libraries/${resolvedLibraryId}`);
  };
}

/**
 * List all entries in a library
 * @example <caption>List all entries in a library</caption>
 * getEntries('HyZV7AYk0');
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @state data.entries - an array of entry objects for a library
 * @returns {Operation}
 */
export function getEntries(libraryId, options = {}) {
  return state => {
    const [resolvedLibraryId, resolvedOptions] = expandReferences(
      state,
      libraryId,
      options
    );
    const { pageSize, pageToken, startRevision, fields, ...restOfOptions } =
      resolvedOptions;
    const query = {
      pageSize: pageSize || 100,
      fields: fields || '*all',
    };
    if (pageToken) {
      query.pageToken = pageToken;
    }
    if (startRevision) {
      query.startRevision = startRevision;
    }

    console.log('Listing entries');
    return requestWithPagination(
      state,
      'GET',
      `libraries/${resolvedLibraryId}/entries`,
      {
        query,
        ...restOfOptions,
      }
    );
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
    return sendRequest(
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
    return sendRequest(
      state,
      'POST',
      `libraries/${resolvedLibraryId}/entries`,
      {
        body: resolvedEntry,
      }
    );
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
    return sendRequest(
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
