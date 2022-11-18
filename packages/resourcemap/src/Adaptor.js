import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import request from 'request';

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for resourcemap.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
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
 * Create an event
 * @example
 * execute(
 *   event(eventData)
 * )(state)
 * @constructor
 * @param {object} eventData - Payload data for the event
 * @returns {Operation}
 */
export function submitSite(collection_id, submissionData) {
  function assembleError({ response, error }) {
    if ([200, 201, 202].indexOf(response.statusCode) > -1) return false;
    if (error) return error;
    return new Error(
      `Server responded with ${response.statusCode} \n ${response.body}`
    );
  }

  return state => {
    const body = expandReferences(submissionData)(state);
    console.log(
      'Submitting site to collection ' +
        collection_id +
        ':' +
        '\n' +
        JSON.stringify(body, null, 4) +
        '\n'
    );

    const { username, password, baseUrl } = state.configuration;

    // /api/collections/:collection_id/sites.json
    const url = resolveUrl(
      baseUrl + '/',
      'api/collections/' + collection_id + '/sites.json'
    );

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          json: body,
          auth: {
            user: username,
            pass: password,
            sendImmediately: true,
          },
          headers: {
            'content-disposition': 'form-data; name=\\"site\\"',
          },
        },
        function (error, response, body) {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            console.log('Printing response...\n');
            console.log(JSON.stringify(response, null, 4) + '\n');
            console.log('Site submission succeeded.');
            resolve(body);
          }
        }
      );
    });

    return request.post({
      username,
      password,
      body,
      url,
    });
  };
}

export {
  fn,
  alterState,
  field,
  fields,
  sourceValue,
  merge,
  each,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
