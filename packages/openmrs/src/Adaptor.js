import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from 'language-common';
import request from 'request';
import { assembleError, tryJson } from './Utils';
import { resolve as resolveUrl } from 'url';

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for OpenMRS.
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
    return commonExecute(
      login,
      ...operations,
      cleanupState
    )({ ...initialState, ...state });
  };
}

/**
 * Logs in to OpenMRS, gets a session token.
 * @example
 *  login(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function login(state) {
  const { instanceUrl, username, password } = state.configuration;

  const params = {
    method: 'GET',
    url: `${instanceUrl}/ws/rest/v1/session`,
    auth: { username, password },
    jar: true,
  };

  return new Promise((resolve, reject) => {
    request(params, function (error, response, body) {
      error = assembleError({ error, response, params });
      if (error) {
        reject(error);
      } else {
        const resp = tryJson(body);
        resolve({ ...state, auth: resp });
      }
    });
  });
}

/**
 * Removes unserializable or confidential keys from the state.
 * @example
 *  cleanupState(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function cleanupState(state) {
  delete state.auth;
  return state;
}

// /**
//  * Create a person
//  * @example
//  * execute(
//  *   person(data)
//  * )(state)
//  * @constructor
//  * @param {object} personData - Payload data for the person
//  * @returns {Operation}
//  */
// export function person(personData) {
//   return (state) => {
//     const body = expandReferences(personData)(state);

//     const { instanceUrl } = state.configuration;

//     const url = `${instanceUrl}/ws/rest/v1/patient/${uuid}`;

//     console.log('Posting person.');

//     return req({ auth: { username, password }, body, url }).then((result) => {
//       console.log('Success:', result);
//       return { ...state, references: [result, ...state.references] };
//     });
//   };
// }

/**
 * Gets patient matching a uuid
 * @example
 * execute(
 *   getPatient({ uuid: 123 })
 * )(state)
 * @constructor
 * @param {object} params - object with uuid for the patient
 * @returns {Operation}
 */
export function getPatient(params) {
  return (state) => {
    const { uuid } = expandReferences(params)(state);
    console.log(`Searching for patient with uuid: ${uuid}`);

    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient/${uuid}`;

    return new Promise((resolve, reject) => {
      request(
        { url, method: 'GET', qs: { v: 'full' }, jar: true },
        (error, response, body) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            console.log(`Success. Found patient.`);

            const data = tryJson(body);
            const nextState = composeNextState(state, data);
            resolve(nextState);
          }
        }
      );
    });
  };
}

/**
 * Gets patients matching criteria
 * @example
 * execute(
 *   getPatients(criteria)
 * )(state)
 * @constructor
 * @param {object} criteria - Criteria object for the patient
 * @returns {Operation}
 */
export function getPatients(criteria, options) {
  return (state) => {
    const qs = expandReferences(criteria)(state);
    const { instanceUrl } = state.configuration;
    const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/patient');

    console.log(`Searching for patients: ${JSON.stringify(qs, null, 2)}`);

    return new Promise((resolve, reject) => {
      request(
        { method: 'GET', url, qs, jar: true },
        (error, response, body) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            const data = tryJson(body);
            const count = data.results.length;

            if (options.exactlyOne && data.results.length !== 1) {
              reject(`Raising an error because ${count} records were found.`);
            } else {
              console.log(
                `Search successful. Returned ${count} patient${
                  count > 1 ? 's' : ''
                }.`
              );
            }

            const nextState = composeNextState(
              state,
              options.exactlyOne ? data.results[0] : data.results
            );
            resolve(nextState);
          }
        }
      );
    });
  };
}

/**
 * Gets people matching criteria
 * @example
 * execute(
 *   getPeople(
 *   { identifier: '007' },
 *   { exactlyOne: true }
 * )(state)
 * @constructor
 * @param {object} criteria - Criteria object for the people
 * @param {object} options - Options object for the handling of responses
 * @returns {Operation}
 */
export function getPeople(criteria, options) {
  return (state) => {
    const qs = expandReferences(criteria)(state);
    const { instanceUrl } = state.configuration;
    const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/person');

    console.log(`Searching for people: ${JSON.stringify(qs, null, 2)}`);

    return new Promise((resolve, reject) => {
      request(
        { method: 'GET', url, qs, jar: true },
        (error, response, body) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            const data = tryJson(body);
            const count = data.results.length;

            if (options.exactlyOne && data.results.length !== 1) {
              reject(`Raising an error because ${count} records were found.`);
            } else {
              console.log(`Search successful. Returned ${count} people.`);
            }

            const nextState = composeNextState(
              state,
              options.exactlyOne ? data.results[0] : data.results
            );
            resolve(nextState);
          }
        }
      );
    });
  };
}

/**
 * Creates an encounter
 * @example
 * execute(
 *   createEncounter(params)(state)
 * @constructor
 * @param {object} params - parameters of the encounter
 * @returns {Operation}
 */
export function createEncounter(params) {
  return (state) => {
    const body = expandReferences(params)(state);
    const { instanceUrl } = state.configuration;
    const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/encounter');
    console.log(`Creating an encounter.`);
    console.log(body);
    return new Promise((resolve, reject) => {
      request(
        { method: 'POST', url, json: body, jar: true },
        (error, response, body) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            const data = tryJson(body);
            console.log(`Creation successful.`);
            const nextState = composeNextState(state, data);
            resolve(nextState);
          }
        }
      );
    });
  };
}

// /**
//  * Create a patient
//  * @example
//  * execute(
//  *   createPatient(data)
//  * )(state)
//  * @constructor
//  * @param {object} patientData - Payload data for the patient
//  * @returns {Operation}
//  */
// export function createPatient(patientData) {
//   return (state) => {
//     const body = expandReferences(patientData)(state);

//     const { username, password, instanceUrl } = state.configuration;

//     const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/patient');

//     console.log('Posting patient:');
//     console.log(JSON.stringify(body));

//     return post({ auth: { username, password }, body, url }).then((result) => {
//       console.log('Success:', result);
//       return { ...state, references: [result, ...state.references] };
//     });
//   };
// }

/**
 * Make a request to any OpenMRS endpoint and execute a callback
 * @example
 * req({
 *   method: 'GET'
 *   url: 'encounterType'
 * })(state)
 * @constructor
 * @param {object} params - parameters for the request
 * @param {function} callback - a callback to execute on the next state
 * @returns {Operation}
 */
export function req(params, callback) {
  return (state) => {
    const { instanceUrl } = state.configuration;
    return new Promise((resolve, reject) => {
      params.jar = true;
      params.url = `${instanceUrl}${params.url}`;
      request(params, (error, response, body) => {
        error = assembleError({ error, response });
        if (error) {
          reject(error);
        } else {
          const data = tryJson(body);
          const nextState = composeNextState(state, data);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

export {
  alterState,
  field,
  fields,
  sourceValue,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
  each,
} from 'language-common';
