import md5 from 'md5';
import axios from 'axios';
import client from '@mailchimp/mailchimp_marketing';
import { expandReferences } from '@openfn/language-common/util';
import { execute as commonExecute } from '@openfn/language-common';

import { handleResponse } from './Utils';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
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
      createClient,
      ...operations,
      cleanupState
    )({
      ...initialState,
      ...state,
    });
  };
}

function createClient(state) {
  const { apiKey, server } = state.configuration;
  // TODO: throws an error if apiKey not specified in configuration
  // TODO: should we set a default server if server not defined?
  client.setConfig({ apiKey, server });
  return { ...state, client: client };
}

function cleanupState(state) {
  delete state.client;
  return state;
}
/**
 * Add or update a list members
 * @example
 * upsertMembers((state) => ({
 *   listId: "someId",
 *   users: state.response.body.rows.map((u) => ({
 *     email: u.email,
 *     status: u.allow_other_emails ? "subscribed" : "unsubscribed",
 *     mergeFields: { FNAME: u.first_name, LNAME: u.last_name },
 *   })),
 * }));
 * @function
 * @param {object} params - a listId, users, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
// TODO: Add jsdoc for params ={ path, query, body}
// TODO: Add examples
export function upsertMembers(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    // TODO: Add support for options
    // TODO: rename users to members
    const defaultOptions = {
      update_existing: true,
      sync_tags: false,
    };
    const { listId, users, options } = resolvedParams;
    const opts = { ...defaultOptions, ...options };

    const membersList = [];
    users.forEach(member => {
      const memberDetails = {
        email_address: member.email,
        status: member.status,
        merge_fields: member.mergeFields,
        tags: member.tags,
      };
      membersList.push(memberDetails);
    });

    return state.client.lists
      .batchListMembers(listId, {
        ...opts,
        members: membersList,
      })
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Tag members with a particular tag
 * @example
 * tagMembers((state) => ({
 *   listId: "someId", // All Subscribers
 *   tagId: "someTag", // User
 *   members: state.response.body.rows.map((u) => u.email),
 * }));
 * @example
 * tagMembers((state) => ({
 *   listId: "someId", // All Subscribers
 *   tagId: "someTag", // Other Emails Allowed
 *   members: state.response.body.rows
 *     .filter((u) => u.allow_other_emails)
 *     .map((u) => u.email),
 * }));
 * @function
 * @param {object} params - a tagId, members, and a list
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function tagMembers(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    const { listId, tagId, members } = resolvedParams;

    return state.client.lists
      .batchSegmentMembers({ members_to_add: members }, listId, tagId)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Start a batch with a list of operations.
 * @example
 * startBatch(params)
 * @function
 * @param {object} params - operations batch job
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function startBatch(params, callback = s => s) {
  return state => {
    // const { apiKey, server } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { operations } = resolvedParams;
    // client.setConfig({ apiKey, server });

    return state.client.batches
      .start({ operations: [...operations] })
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * listBatches
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function listBatches(params, callback = s => s) {
  return state => {
    // const { apiKey, server } = state.configuration;
    // client.setConfig({ apiKey, server });
    const [resolvedParams] = expandReferences(state, params);

    return state.client.batches
      .list()
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * listMembers
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function listMembers(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, ...otherParams } = resolvedParams;
    return state.client.lists
      .getListMembersInfo(listId, otherParams)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Get information about all avaliable segments for a specific list
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function listSegments(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, ...otherParams } = resolvedParams;
    return state.client.lists
      .listSegments(listId, otherParams)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Get information about members in saved segment.
 * @function
 * @param {object} params - a listId,segmentId and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getSegmentMembers(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, segmentId, ...otherParams } = resolvedParams;
    return state.client.lists
      .getSegmentMembersList(listId, segmentId, otherParams)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * addMember to a list
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function addMember(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, member } = resolvedParams;
    return state.client.lists
      .addListMember(listId, ...member)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * updateMemberTags
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function updateMemberTags(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, subscriberHash, tags } = resolvedParams;
    return state.client.lists
      .updateListMemberTags(listId, subscriberHash, { tags: tags })
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * archiveMember in a list
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function archiveMember(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, subscriberHash } = resolvedParams;
    return state.client.lists
      .deleteListMember(listId, subscriberHash)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Permanently delete a member from a list
 * @function
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function deleteMember(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    const { listId, subscriberHash } = resolvedParams;
    return state.client.lists
      .deleteListMemberPermanent(listId, subscriberHash)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Get information about all lists in the account.
 * @function
 * @param {object} query - Query parameters
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function getAllLists(query, callback = s => s) {
  return state => {
    const [resolvedQuery] = expandReferences(state, query);

    return state.client.lists
      .getAllLists(resolvedQuery)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Search for tags on a list by name
 * @function
 * @param {object} query - Query parameters
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function searchTag(query, callback = s => s) {
  return state => {
    const [resolvedQuery] = expandReferences(state, query);
    const { listId, name } = resolvedQuery;

    return state.client.lists
      .tagSearch(listId, { name: name })
      .then(response => handleResponse(response, state, callback));
  };
}

// Note that we expose the entire axios package to the user here.
export { axios, md5 };

// What functions do you want from the common adaptor?
export {
  fn,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
