import md5 from 'md5';
import axios from 'axios';
import client from '@mailchimp/mailchimp_marketing';
import { expandReferences } from '@openfn/language-common/util';
import { execute as commonExecute } from '@openfn/language-common';

import { handleResponse, getClient } from './Utils';

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
  const baseUrl = `https://${server}.api.mailchimp.com`;

  // TODO: throws an error if apiKey not specified in configuration
  // TODO: should we set a default server if server not defined?
  const apiClient = getClient(baseUrl);
  client.setConfig({ apiKey, server });
  return { ...state, apiClient, client: client };
}

function cleanupState(state) {
  if (state?.apiClient) delete state.apiClient;
  if (state?.client) delete state.client;
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
 * @public
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

    const membersList = users.map(member => ({
      email_address: member.email,
      status: member.status,
      merge_fields: member.mergeFields,
      tags: member.tags,
    }));

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
 *   listId: "someId", // All Subscribers list
 *   tagId: "someTag", // User tag
 *   members: state.response.body.rows.map((u) => u.email),
 * }));
 * @example
 * tagMembers((state) => ({
 *   listId: "someId",
 *   tagId: "someTag",
 *   members: state.response.body.rows
 *     .filter((u) => u.allow_other_emails)
 *     .map((u) => u.email),
 * }));
 * @function
 * @public
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
 * @public
 * @param {object} params - operations batch job
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function startBatch(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);
    const { operations } = resolvedParams;

    return state.client.batches
      .start({ operations: [...operations] })
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * listBatches
 * @function
 * @public
 * @param {object} params - a listId, and options
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function listBatches(params, callback = s => s) {
  return state => {
    const [resolvedParams] = expandReferences(state, params);

    return state.client.batches
      .list(resolvedParams)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * listMembers
 * @function
 * @public
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
 * addMember to a list
 * @function
 * @public
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
 * updateMember
 * @function
 * @public
 * @param {object} params - a listId,subscriberHash and member
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function updateMember(params, callback = s => s) {
  return state => {
    const requiredParams = ['listId', 'subscriberHash'];
    const [resolvedParams] = expandReferences(state, params);

    const { listId, subscriberHash, member } = resolvedParams;

    return state.client.lists
      .updateListMember(listId, subscriberHash, member)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * updateMemberTags
 * @function
 * @public
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
 * @public
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
 * @public
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
 * @public
 * @param {object} query - Query parameters
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function listAudiences(query, callback = s => s) {
  return state => {
    const [resolvedQuery] = expandReferences(state, query);

    return state.client.lists
      .getAllLists(resolvedQuery)
      .then(response => handleResponse(response, state, callback));
  };
}

/**
 * Get information about a specific list in your Mailchimp account.
 * Results include list members who have signed up but haven't confirmed their subscription yet and unsubscribed or cleaned.
 * @function
 * @public
 * @param {object} query - listId and query parameters
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function listAudienceInfo(query, callback = s => s) {
  return state => {
    const [resolvedQuery] = expandReferences(state, query);
    const { listId, ...queries } = resolvedQuery;
    return state.client.lists
      .getList(listId, queries)
      .then(response => handleResponse(response, state, callback));
  };
}

// Default options for request()
const defaultOptions = {
  query: {},
  body: undefined,
};

const assertOK = async (response, fullUrl) => {
  if (response.statusCode >= 400) {
    // Mailchimp returns great error objects - so try to just throw it back out
    const message = `Request to ${fullUrl} failed with status: ${response.statusCode}`;
    console.error(message);
    let mailchimpError;
    try {
      mailchimpError = await response.body.json();
    } catch (e) {
      console.warning('Error parsing mailchimp error body');
      console.warning(e);
    }

    if (mailchimpError) {
      throw mailchimpError;
    }
    // If for any reason we fail to parse the response body,
    // throw something a bit more generic
    const error = new Error(message);
    error.status = response.statusCode;
    error.url = fullUrl;
    throw error;
  }
};
/**
 * Make an HTTP request to Mailchimp API
 * @example <caption>Get list to all other resources available in the API</caption>
 * request('GET','/');
 * @example <caption>Create a new account export in your Mailchimp account</caption>
 * request('POST','/accounts-export', {include_stages:[]});
 * @function
 * @public
 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} path - The endpoint of the api to which the request should be made.
 * @param {Object} options - Additional options for the request (query, body only).
 * @param {function} [callback] - (Optional) callback function to handle the response.
 * @returns {Operation}
 */
export function request(method, path, options, callback) {
  return async state => {
    const apiVersion = '3.0';
    const { apiKey, server } = state.configuration;

    const [resolvedMethod, resolvedPath, resolvedOptions] = expandReferences(
      state,
      method,
      path,
      options
    );
    const { query, body } = { ...defaultOptions, ...resolvedOptions };

    const apiToken = Buffer.from(`openfn:${apiKey}`, 'utf-8').toString(
      'base64'
    );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiToken}`,
    };

    const urlPath = `/${apiVersion}${resolvedPath}`;
    const response = await state.apiClient.request({
      method: resolvedMethod,
      path: urlPath,
      headers,
      query,
      body: body ? JSON.stringify(body) : undefined,
    });

    console.log(response.statusCode, urlPath);

    await assertOK(response, `https://${server}.api.mailchimp.com${urlPath}`);

    let data = {};
    // Mailchimp returns 204 if there's no response data
    if (response.statusCode !== 204) {
      data = await response.body.json();
    }

    const nextState = {
      ...state,
      data,
      response: {
        headers: response.headers,
        body: data,
        statusCode: response.statusCode,
      },
    };
    if (callback) return callback(nextState);

    return nextState;
  };
}

/**
 * The get function is used to make a GET request to the Mailchimp API.
 * @example <caption>Get a list of account exports for a given account</caption>
 * get('/account-exports');
 * @function
 * @public
 * @param {string} path - The endpoint of the api to which the request should be made
 * @param {object} query - An object containing query parameters to be included in the request
 * @param {function} [callback] - (Optional) callback to handle the response
 * @returns {Operation}
 */
export function get(path, query, callback) {
  return request('GET', path, { query }, callback);
}

/**
 * The post function is used to make a POST request to the Mailchimp API.
 *
 * @example <caption>Create a new account export in your Mailchimp account</caption>
 * post('/accounts-export', {include_stages:[]});
 * @function
 * @public
 * @param {string} path - The endpoint of the api to which the request should be made.
 * @param {object} body - The data to be sent in the body of the request
 * @param {object} query - An object containing query parameters to be included in the request
 * @param {function} [callback] - (Optional) callback to handle the response
 * @returns {Operation}
 */
export function post(path, body, query, callback) {
  return request('POST', path, { body, query }, callback);
}

// TODO Remove axios export
// Note that we expose the entire axios package to the user here.
export { axios, md5 };

// What functions do you want from the common adaptor?
export {
  fn,
  fnIf,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  lastReferenceValue,
  merge,
  chunk,
  sourceValue,
} from '@openfn/language-common';
