import { request } from './http';
import { execute as commonExecute } from '@openfn/language-common';

// /**
//  * Execute a sequence of operations
//  * Wraps `language-common/execute`, and prepends initial state for http.
//  * @private
//  * @param {Operations} operations - Operations to be performed.
//  * @returns {Operation}
//  */
// export function execute(...operations) {
//   const initialState = {
//     references: [],
//     data: null,
//   };

//   return state => {
//     return commonExecute(...operations)({ ...initialState, ...state });
//   };
// }

export function getLibrary(libraryId, options) {
  return request('GET', libraryId, null, options);
}

export function listLibraries(options) {
  return request('GET', 'libraries', null, options);
}

export function getLibrary(libraryId, options) {
  return request('GET', libraryId, null, options);
}

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
