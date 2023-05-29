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
 * @private
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
 * @private
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
 * getPatient("123")
 * @function
 * @param {object} params - object with uuid for the patient
 * @returns {Operation}
 */
export function getPatient(uuid) {
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
 * Creates an encounter
 * @example
 * createEncounter({
 *   encounterDatetime: '2023-05-25T06:08:25.000+0000',
 *   patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
 *   encounterType: 'dd528487-82a5-4082-9c72-ed246bd49591',
 *   location: 'ba685651-ed3b-4e63-9b35-78893060758a',
 *   encounterProviders: [],
 *   visit: {
 *     patient: '1fdaa696-e759-4a7d-a066-f1ae557c151b',
 *     visitType: '7b0f5697-27e3-40c4-8bae-f4049abfb4ed',
 *     startDatetime: '2023-05-25T06:08:25.000+0000',
 *     stopDatetime: '2023-05-25T06:09:25.000+0000',
 *   },
 * })
 * @function
 * @param {object} params - parameters of the encounter
 * @returns {Operation}
 */
export function createEncounter(params) {
  return state => {
    const body = JSON.stringify(expandReferences(params)(state));

    const { agent } = state;
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

    console.log(`Creating an encounter.`);

    return new Promise((resolve, reject) => {
      agent
        .post(url)
        .type('json')
        .send(body)
        .then(response => {
          console.log(`Successfull created an encounter.`);

          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch(({ response }) => {
          const { error } = response;
          reject(error);
        });
    });
  };
}

/**
 * Make a get request to any OpenMRS endpoint and execute a callback
 * @example
 * get({
 *   url: 'encounterType'
 *   qs: {
 *     v: 'default',
 *     limit: 1
 *   }
 * })
 * @function
 * @param {object} params - parameters for the request
 * @param {function} callback - a callback to execute on the next state
 * @returns {Operation}
 */
export function get(params, callback) {
  return state => {
    const { agent } = state;
    const { instanceUrl } = state.configuration;
    const { qs, url } = expandReferences(params)(state);

    const urlPath = `${instanceUrl}/ws/rest/v1/${url}`;

    return new Promise((resolve, reject) => {
      agent
        .get(urlPath)
        .query(qs)
        .then(response => {
          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);

          if (callback) resolve(callback(nextState));
          resolve(nextState);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

/**
 * Fetch all non-retired patients that match any specified parameters
 * @example
 * searchPatient({ q: Sarah })
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
        .then(response => {
          const data = tryJson(response.text);
          const count = data.results.length;

          if (count > 0) {
            console.log(
              `Search successful. Returned ${count} patient${
                count > 1 ? 's' : ''
              }.`
            );
            const nextState = composeNextState(state, data);
            resolve(nextState);
          } else {
            reject(
              new Error(`Raising an error because ${count} records were found.`)
            );
          }
        })
        .catch(({ response }) => {
          const { error } = response;
          reject(error);
        });
    });
  };
}

/**
 * Fetch all non-retired persons that match any specified parameters
 * @example
 * searchPerson({ q: Sarah })
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
        .then(response => {
          const data = tryJson(response.text);
          const count = data.results.length;

          if (count > 0) {
            console.log(
              `Search successful. Returned ${count} person${
                count > 1 ? 's' : ''
              }.`
            );
            const nextState = composeNextState(state, data);
            resolve(nextState);
          } else {
            reject(
              new Error(`Raising an error because ${count} records were found.`)
            );
          }
        })
        .catch(({ response }) => {
          const { error } = response;
          reject(error);
        });
    });
  };
}

/**
 * Creates a new patient
 * @example
 * createPatient({
 *   identifiers: [
 *     {
 *       identifier: '4023287',
 *       identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
 *       preferred: true,
 *     },
 *   ],
 *   person: {
 *     gender: 'M',
 *     age: 42,
 *     birthdate: '1970-01-01T00:00:00.000+0100',
 *     birthdateEstimated: false,
 *     dead: false,
 *     deathDate: null,
 *     causeOfDeath: null,
 *     names: [
 *       {
 *         givenName: 'Doe',
 *         familyName: 'John',
 *       },
 *     ],
 *     addresses: [
 *       {
 *         address1: '30, Vivekananda Layout, Munnekolal,Marathahalli',
 *         cityVillage: 'Bengaluru',
 *         country: 'India',
 *         postalCode: '560037',
 *       },
 *     ],
 *   },
 * })
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

    return new Promise((resolve, reject) => {
      agent
        .post(url)
        .type('json')
        .send(body)
        .then(response => {
          console.log(`Successfull created a new patient.`);

          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch(({ response }) => {
          const { error } = response;
          reject(error);
        });
    });
  };
}

/**
 * Gets encounter matching a uuid
 * @example
 * getEncounter("123")
 * @function
 * @param {object} uuid - object with uuid for the encounter
 * @returns {Operation}
 */
export function getEncounter(uuid) {
  return state => {
    console.log(`Searching for encounter with uuid: ${uuid}`);
    const { agent } = state;
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/encounter/${uuid}`;

    return new Promise((resolve, reject) => {
      agent
        .get(url)
        .accept('json')
        .then(response => {
          console.log(`Successfull found an encounter.`);

          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch(({ response }) => {
          const { error } = response;
          reject(error);
        });
    });
  };
}

/**
 * Gets encounters matching params
 * @example
 * getEncounters({patient: "123", fromdate: "2023-05-18"})
 * @function
 * @param {object} params - Criteria object for the patient
 * @returns {Operation}
 */
export function getEncounters(params) {
  return state => {
    const qs = expandReferences(params)(state);
    const { agent } = state;
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

    console.log(`Searching for encounters: ${JSON.stringify(qs, null, 2)}`);

    return new Promise((resolve, reject) => {
      agent
        .get(url)
        .accept('json')
        .query(qs)
        .then(response => {
          console.log(`Successfull found an encounter.`);

          const data = tryJson(response.text);
          const nextState = composeNextState(state, data);
          resolve(nextState);
        })
        .catch(({ response }) => {
          const { error } = response;
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
