import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from '@openfn/language-common';
import request from 'superagent';
import { assembleError, tryJson } from './Utils';

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

  const agent = request.agent();
  return new Promise((resolve, reject) => {
    agent
      .get(`${instanceUrl}/ws/rest/v1/session`)
      .auth(username, password)
      .then(() => {
        resolve({ ...state, agent });
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
  delete state.agent;
  return state;
}

/**
 * Gets patient matching a uuid
 * @example
 * execute(
 *   getPatient("123")
 * )(state)
 * @function
 * @param {object} params - object with uuid for the patient
 * @returns {Operation}
 */
export function getPatient(uuid, options) {
  return state => {
    console.log(`Searching for patient with uuid: ${uuid}`);
    const { agent } = state;
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient/${uuid}`;

    return new Promise((resolve, reject) => {
      agent
        .get(url)
        .accept('json')
        .query({ v: 'full' })
        .end((error, response) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            console.log(`Success. Found patient.`);

            const data = tryJson(response.text);
            const nextState = composeNextState(state, data);
            resolve(nextState);
          }
        });
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
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

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
 *   searchPatient({ q: Sarah })
 * )(state)
 * @function
 * @param {object} params - object with query for the patient
 * @returns {Operation}
 */
export function searchPatient(params) {
  return state => {
    const qs = expandReferences(params)(state);
    console.log(`Searching for patient with name: ${qs.q}`);
    const { agent } = state;

    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient`;

    return new Promise((resolve, reject) => {
      agent
        .get(url)
        .accept('json')
        .query(qs)
        .end((error, response) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            console.log(`Success. Found patient.`);

            const data = tryJson(response.text);
            const nextState = composeNextState(state, data);
            resolve(nextState);
          }
        });
    });
  };
}

/**
 * Fetch all non-retired persons that match any specified parameters
 * @example
 * execute(
 *   searchPerson({ q: Sarah })
 * )(state)
 * @function
 * @param {object} params - object with query for the person
 * @returns {Operation}
 */
export function searchPerson(params) {
  return state => {
    const qs = expandReferences(params)(state);
    console.log(`Searching for person with name: ${qs.q}`);
    const { agent } = state;

    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/person`;

    return new Promise((resolve, reject) => {
      agent
        .get(url)
        .accept('json')
        .query(qs)
        .end((error, response) => {
          error = assembleError({ error, response });
          if (error) {
            reject(error);
          } else {
            console.log(`Success. Found person.`);

            const data = tryJson(response.text);
            const nextState = composeNextState(state, data);
            resolve(nextState);
          }
        });
    });
  };
}

/**
 * Creates a new patient
 * @example
 * execute(
 *   createPatient(params)(state)
 * @function
 * @param {object} params - parameters of the patient
 * @returns {Operation}
 */
export function createPatient(params) {
  return state => {
    const body = JSON.stringify(expandReferences(params)(state));
    const { agent } = state;
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/patient`;

    console.log(`Creating a patient.`);

    console.log(body);
    return new Promise((resolve, reject) => {
      agent
        .post(url)
        .send(body)
        .then(response => {
          console.log(`Successfull created a new patient.`);

          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch(({ status, response }) => {
          const error = assembleError({ status, response });
          reject(error);
        });
    });
  };
}

/**
 * Upsert a patient
 * @example
 * execute(
 *   upsertPatient(params)(state)
 * @function
 * @param {object} params - parameters of the patient
 * @returns {Operation}
 */
export function upsertPatient(params) {
  return state => {
    const body = JSON.stringify(expandReferences(params)(state));
    const { agent } = state;
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/patient`;

    console.log(`Upserting a patient.`);

    console.log(body);
    return new Promise((resolve, reject) => {
      agent
        .post(url)
        .send(body)
        .then(response => {
          console.log(`Successfull upsert a patient.`);

          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch((error, response) => {
          error = assembleError({ error, response });
          reject(error);
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
  arrayToString,
} from '@openfn/language-common';
