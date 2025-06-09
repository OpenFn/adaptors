import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import request from 'request';
import queryString from 'query-string';
import _ from 'lodash';

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
    data: null,
    references: [],
    cursor: null,
  };

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Access form submissions and post them as JSON.
 * @public
 * @example
 * fetchSubmissions(
 *   "pregnancy", // formId
 *   { "last-event-id": 334 }, // params
 *   "http://localhost:4000/inbox/abc-123-xyz" // postUrl
 * );
 * @function
 * @param {string} formId - Query parameters
 * @param {object} params - Starting sequence id
 * @param {string} postUrl - Inbox to post form data
 * @returns {Operation}
 */
export function fetchSubmissions(formId, params, postUrl) {
  return state => {
    params.include_docs = true;
    return changesApi(params)(state)
      .then(state => {
        return pickFormData(formId)(state);
      })
      .then(state => {
        const submissions = state.data.submissions;
        for (var i = 0, len = submissions.length; i < len; i++) {
          request.post({
            url: postUrl,
            json: submissions[i],
          });
          console.log(
            `Posted submission ${submissions[i].fields.meta.instanceID} ✓`
          );
        }
        return state;
      })
      .then(state => {
        // clean state for next run
        state.data = {};
        state.references = [];
        console.log('Fetching submissions succeeded ✓');
        return state;
      });
  };
}

/**
 * Access the CouchDB Changes API
 * @public
 * @example
 * changesApi(params, callback)
 * @function
 * @param {object} params - Query parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function changesApi(params, callback) {
  function assembleError({ response, error }) {
    if (response && [200, 201, 202, 204].indexOf(response.statusCode) > -1)
      return false;
    if (error) return error;
    console.log(response);
    return new Error(
      `Server responded with ${response.statusCode}:\n ${response.body}`
    );
  }

  return state => {
    const { server, db, username, password } = state.configuration;
    const [query] = expandReferences(state, params);
    const doc_ids = query.doc_ids;
    const scrubbedQuery = _.omit(query, [
      // Ignore last-event-id if state has a cursor...
      'doc_ids',
      state.cursor ? 'last-event-id' : null,
    ]);

    if (state.cursor) {
      // add the cursor...
      scrubbedQuery['last-event-id'] = state.cursor;
    }

    const qs = queryString.stringify(scrubbedQuery);
    const baseUrl = `${server}/${db}/_changes`;
    const url = doc_ids
      ? `${baseUrl}?filter=_doc_ids&${qs}`
      : `${baseUrl}?${qs}`;

    console.log('Performing request on: ' + url);
    console.log('Applying document filter: [\n  ' + doc_ids + '\n]');

    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    return new Promise((resolve, reject) => {
      request
        .post(
          {
            url,
            headers,
            json: { doc_ids },
          },
          function (err, response, body) {
            const error = assembleError({ response, error: err });
            if (error) {
              reject(error);
            } else {
              console.log('Request Success ✓');
              resolve(body);
            }
          }
        )
        .auth(username, password);
    }).then(response => {
      if (!_.isEmpty(response.results)) {
        state.cursor = response.last_seq;
        console.log(`Set cursor for next run to: ${response.last_seq}.`);
      } else {
        console.log(`No new results. Cursor will remain at ${state.cursor}.`);
      }
      const nextState = composeNextState(state, response);
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}

/**
 * Select submissions for a specific form
 * @public
 * @example
 * pickFormData(formId)
 * @function
 * @param {string} formId - The form ID.
 * @returns {Operation}
 */
export function pickFormData(formId) {
  return state => {
    var myFormData = [];
    if (state.data.response.results) {
      myFormData = state.data.response.results
        .filter(item => {
          if (item.doc.form) return item.doc.form == formId;
        })
        .map(item => {
          const { _id, fields, form, type, reported_date, contact } = item.doc;
          return {
            _id,
            form,
            type,
            reported_date,
            contact,
            fields,
          };
        });
    }

    return {
      ...state,
      data: { submissions: myFormData },
      references: [...state.references, state.data],
    };
  };
}

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
  sourceValue,
} from '@openfn/language-common';
