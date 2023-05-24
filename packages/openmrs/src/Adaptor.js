import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from '@openfn/language-common';
import request from 'request';
import { assembleError, tryJson } from './Utils';
import { resolve as resolveUrl } from 'url';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for OpenMRS.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @private
 * @param {Array} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
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
    fetch(params)
      .then(response => response.text())
      .then(result => {
        const resp = tryJson(result);
        resolve({ ...state, auth: resp });
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
    // request(params, function (error, response, body) {
    //   error = assembleError({ error, response, params });
    //   if (error) {
    //     reject(error);
    //   } else {
    //     const resp = tryJson(body);
    //     resolve({ ...state, auth: resp });
    //   }
    // });
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

/**
 * Gets patient matching a uuid
 * @example
 * execute(
 *   getPatient({ uuid: 123 })
 * )(state)
 * @function
 * @param {object} params - object with uuid for the patient
 * @returns {Operation}
 */
export function getPatient(params) {
  return state => {
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
 * @function
 * @param {object} criteria - Criteria object for the patient
 * @param {object} options - Options
 * @returns {Operation}
 */
export function getPatients(criteria, options) {
  return state => {
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
 * @function
 * @param {object} criteria - Criteria object for the people
 * @param {object} options - Options object for the handling of responses
 * @returns {Operation}
 */
export function getPeople(criteria, options) {
  return state => {
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
 * @function
 * @param {object} params - parameters of the encounter
 * @returns {Operation}
 */
export function createEncounter(params) {
  return state => {
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

/**
 * Make a request to any OpenMRS endpoint and execute a callback
 * @example
 * req({
 *   method: 'GET'
 *   url: 'encounterType'
 * })(state)
 * @function
 * @param {object} params - parameters for the request
 * @param {function} callback - a callback to execute on the next state
 * @returns {Operation}
 */
export function req(params, callback) {
  return state => {
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

/**
 * Fetch all non-retired patients that match any specified parameters
 * @example
 * execute(
 *   searchPatient({ query: Sarah })
 * )(state)
 * @function
 * @param {object} params - object with query for the patient
 * @returns {Operation}
 */
export function searchPatient(params) {
  return state => {
    const { query, limit } = expandReferences(params)(state);
    console.log(`Searching for patient with name: ${query}`);

    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient?q=${query}&v=default&limit=${limit}`;

    return new Promise((resolve, reject) => {
      fetch({ url, method: 'GET', qs: { v: 'full' }, jar: true })
        .then(response => response.text())
        .then(result => {
          console.log(`Success. Found patient.`);

          const data = tryJson(result);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
      // request(
      //   { url, method: 'GET', qs: { v: 'full' }, jar: true },
      //   (error, response, body) => {
      //     error = assembleError({ error, response });
      //     if (error) {
      //       reject(error);
      //     } else {
      //       console.log(`Success. Found patient.`);

      //       const data = tryJson(body);
      //       const nextState = composeNextState(state, data);
      //       resolve(nextState);
      //     }
      //   }
      // );
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
  arrayToString,
} from '@openfn/language-common';
