import { execute as commonExecute, expandReferences } from '@openfn/language-common';
import request from 'request';
import { resolve as resolveUrl } from 'url';
/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
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

  return (state) => {
    state.configuration.baseUrl = 'https://'.concat(
      state.configuration.instanceName,
      '.surveycto.com/api/v1'
    );
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Make a GET request and POST it somewhere else
 * @example
 * execute(
 *   fetch(params)
 * )(state)
 * @constructor
 * @param {object} params - data to make the fetch
 * @returns {Operation}
 */
export function fetchSubmissions(formId, afterDate, postUrl) {
  return (state) => {
    const { baseUrl, username, password, instanceName } = state.configuration;

    return new Promise((resolve, reject) => {
      request(
        {
          url: `${baseUrl}/forms/data/wide/json/${formId}`,
          method: 'GET',
          auth: {
            username,
            password,
            sendImmediately: false,
          },
          headers: {
            'Content-Type': 'application/json',
          },
          query: {
            date: state.lastSubmissionDate || afterDate,
          },
        },
        function (error, response, body) {
          if (error) {
            return console.error('Get failed:', error);
          }
          console.log('Get succeeded');
          // Pick submissions out in order to avoid `post` overwriting `response`.
          var submissions = JSON.parse(response.body);

          // return submissions
          return submissions
            .reduce(function (acc, item) {
              // tag submissions as part of the identified form
              item.formId = formId;
              return acc.then(
                request({
                  url: postUrl,
                  method: 'POST',
                  json: item,
                })
              );
            }, Promise.resolve(state))
            .then(function (state) {
              if (submissions.length) {
                state.lastSubmissionDate =
                  submissions[submissions.length - 1].SubmissionDate;
              }
              return state;
            })
            .then(function (state) {
              delete state.response;
              console.log('fetchSubmissions succeeded.');
              return state;
            });
        }
      );
    });
  };
}

export {
  field,
  fields,
  sourceValue,
  alterState,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
