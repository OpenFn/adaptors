import { sendRequest, requestWithPagination } from './util';
import { expandReferences } from '@openfn/language-common/util';

/**
 * Fetch Entries Request Options
 * @typedef {Object} EntriesRequestOptions
 * See https://mementodatabase.docs.apiary.io/#reference/0/entries/list-entries-on-a-library
 * @public
 * @property {number} [options.pageSize=100] - The maximum number of entries to return per page.
 * @property {string} [options.pageToken] - Start pagination from this token/cursor.
 * @property {string} [options.startRevision] - The revision to start from.
 * @property {string} [options.fields='all'] - The comma-separated list of fields ids to include in the response
 */

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
 * @state data.fields - An array of fields for the library
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
 * List all entries in a library.
 * This function handles rate limits and automatically paginates to fetch all entries.
 * @example <caption>List all entries in a library</caption>
 * listEntries('HyZV7AYk0');
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @param {EntriesRequestOptions} [options] - List entries request options
 * @state data.entries - An array of entry objects for a library
 * @returns {Operation}
 */
export function listEntries(libraryId, options = {}) {
  return state => {
    const [resolvedLibraryId, resolvedOptions] = expandReferences(
      state,
      libraryId,
      options
    );
    const {
      pageToken,
      startRevision,
      fields = 'all',
      pageSize = 100,
      ...restOfOptions
    } = resolvedOptions;

    const query = { pageSize, fields };

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
 * createEntry("HyZV7AYk0", {
 *   fields: [
 *     {
 *       value: "Record 1",
 *       id: 1,
 *     },
 *     {
 *       id: 2,
 *       value: 1000,
 *     },
 *   ],
 * });
 * @function
 * @public
 * @param {string} libraryId - The library ID
 * @param {object} body - The entry body to create
 * @state data - The created entry as returned by Memento
 * @returns {Operation}
 */
export function createEntry(libraryId, body) {
  return state => {
    const [resolvedLibraryId, resolvedBody] = expandReferences(
      state,
      libraryId,
      body
    );
    console.log('Creating a new entry');
    return sendRequest(
      state,
      'POST',
      `libraries/${resolvedLibraryId}/entries`,
      {
        body: resolvedBody,
      }
    );
  };
}

/**
 * Update an entry
 * @example <caption>Update an entry</caption>
 * updateEntry('HyZV7AYk0', 'T0xIYmE-V2QoMmRTWF1sVVJUKnU', {
 *   fields: [
 *     {
 *       value: "Record Updated",
 *       id: 1,
 *     },
 *     {
 *       id: 2,
 *       value: 100,
 *     },
 *   ],
 * });
 * @function
 * @public
 * @param {string} libraryId - The ID of the library to update the entry in
 * @param {string} entryId - The ID of the entry to update
 * @param {object} body - The entry body to update
 * @state data - The updated entry as returned by Memento
 * @returns {Operation}
 */
export function updateEntry(libraryId, entryId, body) {
  return state => {
    const [resolvedLibraryId, resolvedEntryId, resolvedBody] = expandReferences(
      state,
      libraryId,
      entryId,
      body
    );
    console.log('Updating entry');
    return sendRequest(
      state,
      'PUT',
      `libraries/${resolvedLibraryId}/entries/${resolvedEntryId}`,
      {
        body: resolvedBody,
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
