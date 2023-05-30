import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from '@openfn/language-common';
import request from 'superagent';
import { Log, handleError } from './Utils';

let agent = null;

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
  agent = null;

  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(login, ...operations)({ ...initialState, ...state });
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
async function login(state) {
  const { instanceUrl, username, password } = state.configuration;
  agent = request.agent();
  await agent.get(`${instanceUrl}/ws/rest/v1/session`).auth(username, password);

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
    Log.info(`Searching for patient with uuid: ${uuid}`);
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient/${uuid}`;

    return agent
      .get(url)
      .accept('json')
      .query({ v: 'full' })
      .then(response => {
        Log.success(`Found patient.`);

        return stateWithResponseData(state, response);
      })
      .catch(handleError);
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

    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

    Log.info(`Creating an encounter.`);

    return agent
      .post(url)
      .type('json')
      .send(body)
      .then(response => {
        Log.success(`Created an encounter.`);

        return stateWithResponseData(state, response);
      })
      .catch(handleError);
  };
}

/**
 * Make a get request to any OpenMRS endpoint
 * @example
 * get("encounterType", {
 *   v: "default",
 *   limit: 1,
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - parameters for the request
 * @returns {Operation}
 */
export function get(path, params) {
  return state => {
    const { instanceUrl } = state.configuration;

    const urlPath = `${instanceUrl}/ws/rest/v1/${path}`;

    return agent
      .get(urlPath)
      .query(params)
      .then(response => stateWithResponseData(state, response))
      .catch(handleError);
  };
}

/**
 * Make a post request to any OpenMRS endpoint
 * @example
 * post("encounterType", {
 *   v: "default",
 *   limit: 1,
 * });
 * @function
 * @param {string} path - Path to resource
 * @param {object} params - parameters for the request
 * @returns {Operation}
 */
export function post(path, params) {
  return state => {
    const { instanceUrl } = state.configuration;

    const urlPath = `${instanceUrl}/ws/rest/v1/${path}`;

    return agent
      .post(urlPath)
      .type('json')
      .send(params)
      .then(response => stateWithResponseData(state, response))
      .catch(handleError);
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
    Log.info(`Searching for patient with name: ${qs.q}`);
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/patient`;

    return agent
      .get(url)
      .accept('json')
      .query(qs)
      .then(response => {
        const count = response.body.length;

        if (count > 0) {
          Log.success(
            `Search successful. Returned ${count} patient${
              count > 1 ? 's' : ''
            }.`
          );
          return stateWithResponseData(state, response);
        } else {
          throw new Error(
            `Raising an error because ${count} records were found.`
          );
        }
      })
      .catch(handleError);
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
    Log.info(`Searching for person with name: ${qs.q}`);

    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/person`;

    return agent
      .get(url)
      .accept('json')
      .query(qs)
      .then(response => {
        const data = response.body;
        const count = data.results.length;

        if (count > 0) {
          Log.success(
            `Search successful. Returned ${count} person${
              count > 1 ? 's' : ''
            }.`
          );
          return stateWithResponseData(state, response);
        } else {
          throw new Error(
            `Raising an error because ${count} records were found.`
          );
        }
      })
      .catch(handleError);
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
 *     names: [
 *       {
 *         givenName: 'Doe',
 *         familyName: 'John',
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
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/patient`;

    Log.info(`Creating a patient.`);

    return agent
      .post(url)
      .type('json')
      .send(body)
      .then(response => {
        Log.success(`Created a new patient.`);

        return stateWithResponseData(state, response);
      })
      .catch(handleError);
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
    Log.info(`Searching for encounter with uuid: ${uuid}`);
    const { instanceUrl } = state.configuration;

    const url = `${instanceUrl}/ws/rest/v1/encounter/${uuid}`;

    return agent
      .get(url)
      .accept('json')
      .then(response => {
        Log.success(`Found an encounter.`);

        return stateWithResponseData(state, response);
      })
      .catch(handleError);
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
    const { instanceUrl } = state.configuration;
    const url = `${instanceUrl}/ws/rest/v1/encounter`;

    Log.info(`Searching for encounters: ${JSON.stringify(qs, null, 2)}`);

    return agent
      .get(url)
      .accept('json')
      .query(qs)
      .then(response => {
        Log.success(`Found an encounter.`);

        return stateWithResponseData(state, response);
      })
      .catch(handleError);
  };
}

function stateWithResponseData(state, response) {
  const { body } = response;
  const nextState = composeNextState(state, { body });
  return nextState;
}

export {
  alterState,
  fn,
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
