// /** @module Adaptor */
import {
  execute as commonExecute,
  expandReferences,
  composeNextState,
} from '@openfn/language-common';
import { assembleError, scrubResponse, tryJson } from './Utils';
import request from 'request';

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
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
      generateAuthString,
      ...operations,
      cleanupState
    )({ ...initialState, ...state });
  };
}

/**
 * Generate an auth string to support multiple types of auth credentials.
 * @example
 * generateAuthString(state)
 * @function
 * @param {State} state
 * @returns {string}
 */
function generateAuthString(state) {
  const { configuration } = state;
  if (configuration.basicAuth) {
    const { user, password } = configuration;
    const auth = {
      token: 'Basic ' + Buffer.from(`${user}:${password}`).toString('base64'),
    };
    return { ...state, auth };
  }
  return login(state);
}

/**
 * Execute custom query
 * @param {State} state
 * @param {object} params
 * @param {function} callback
 * @returns {State}
 */
function queryHandler(state, params, callback) {
  return new Promise((resolve, reject) => {
    request(params, function (error, response, body) {
      response = scrubResponse(response);
      error = assembleError({ error, response, params });
      if (error) {
        reject(error);
      } else {
        console.log(
          `Primero says: '${response.statusCode} ${response.statusMessage}'`
        );
        const resp = tryJson(body);
        if (params.method === 'GET') {
          console.log(
            `${
              resp.data.length
            } referrals retrieved from request: ${JSON.stringify(
              response.request,
              null,
              2
            )}`
          );
        } else if (params.method === 'PATCH') {
          console.log('Referral updated.');
        }
        const nextState = composeNextState(state, resp.data || resp);
        if (callback) resolve(callback(nextState));
        resolve(nextState);
      }
    });
  });
}

/**
 * Logs in to Primero.
 * @example
 * login(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function login(state) {
  const { url, user, password } = state.configuration;
  const body = JSON.stringify({
    user: {
      user_name: user,
      password,
    },
  });

  const params = {
    method: 'POST',
    url: `${url}/api/v2/tokens`,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  return new Promise((resolve, reject) => {
    request(params, function (error, response, body) {
      response = scrubResponse(response);
      error = assembleError({ error, response, params });
      if (error) {
        reject(error);
      } else {
        const resp = tryJson(body);
        resp.token = `Bearer ${resp.token}`;
        resolve({ ...state, auth: resp });
      }
    });
  });
}

/**
 * Removes unserializable keys from the state.
 * @example
 * cleanupState(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function cleanupState(state) {
  delete state.auth;
  return state;
}

/**
 * Get cases from Primero
 * @public
 * @example
 * getCases({
 *   remote: true,
 *   case_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz'
 *   query: 'sex=male' // optional
 * }, { withReferrals: true }, callback)
 * @function
 * @param {object} query - an object with a query param at minimum, option to getReferrals
 * @param {object} options - (Optional) an object with a getReferrals key to fetch referrals
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getCases(query, options, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const expandedQuery = expandReferences(query)(state);
    const expandedOptions = expandReferences(options)(state);

    const params = {
      method: 'GET',
      url: `${url}/api/v2/cases`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      qs: expandedQuery,
    };

    return new Promise((resolve, reject) => {
      request(params, async function (error, response, body) {
        response = scrubResponse(response);
        error = assembleError({ error, response, params });
        if (error) {
          reject(error);
        } else {
          console.log(
            `Primero says: '${response.statusCode} ${response.statusMessage}'`
          );
          const resp = tryJson(body);
          const cases = resp.data;
          console.log(
            `${cases.length} cases retrieved from request: ${JSON.stringify(
              response.request,
              null,
              2
            )}`
          );

          if (expandedOptions?.withReferrals) {
            for await (const c of cases) {
              const requestParams = {
                method: 'GET',
                url: `${url}/api/v2/cases/${c.id}/referrals`,
                headers: {
                  Authorization: auth.token,
                  'Content-Type': 'application/json',
                },
              };

              const referrals = await new Promise((resolve, reject) => {
                request(requestParams, (e, r, b) => {
                  // console.log('🚨 🚨 🚨 referrals response', b);
                  resolve(tryJson(b).data);
                });
              });

              c.referrals = referrals;
            }
          }

          const nextState = composeNextState(state, cases);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

/**
 * Create case in Primero
 * @public
 * @example
 * createCase({
 *   data: state => data {
 *     "enabled": true,
 *     "age": 15,
 *     "sex": "male",
 *     "name": "Alex",
 *     "status": "open",
 *     "case_id": "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 *     "owned_by": "primero_cp"
 *   }}, callback)
 * @function
 * @param {object} params - an object with some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function createCase(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const { data } = expandReferences(params)(state);

    const requestParams = {
      method: 'POST',
      url: `${url}/api/v2/cases`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
        options: {
          successCodes: [200, 201, 202, 203, 204],
        },
      },
      json: { data: data },
    };

    return new Promise((resolve, reject) => {
      request(requestParams, (error, response, body) => {
        response = scrubResponse(response);
        error = assembleError({ error, response, params: requestParams });
        if (error) {
          reject(error);
        } else {
          const resp = tryJson(body);
          console.log(
            `Post succeeded: ${response.statusCode} ${response.statusMessage}`
          );
          const nextState = composeNextState(state, resp.body?.data);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

/**
 * Update case in Primero
 * @public
 * @example
 * updateCase("7ed1d49f-14c7-4181-8d83-dc8ed1699f08", {
 *   data: state => data {
 *     "age": 20,
 *     "sex": "male",
 *     "name": "Alex",
 *     "status": "open",
 *     "case_id": "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 *   }}, callback)
 * @function
 * @param {string} id - an ID to use for the update.
 * @param {object} params - an object with some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function updateCase(id, params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;
    const { data } = expandReferences(params)(state);

    const requestParams = {
      method: 'PATCH',
      url: `${url}/api/v2/cases/${id}`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      json: { data: data },
    };

    return new Promise((resolve, reject) => {
      request(requestParams, (error, response, body) => {
        response = scrubResponse(response);
        error = assembleError({ error, response, params: {} });
        if (error) {
          reject(error);
        } else {
          const resp = tryJson(body);
          console.log(
            `PATCH succeeded: ${response.statusCode} ${response.statusMessage}`
          );
          const nextState = composeNextState(state, resp.body?.data);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

/**
 * Upsert case to Primero
 * @public
 * @example
 * upsertCase({
 *   externalIds: ['case_id'],
 *   data: state => ({
 *     "age": 20,
 *     "sex": "male",
 *     "name": "Alex",
 *     "status": "open",
 *     "case_id": "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 *   })
 * });
 * @function
 * @param {object} params - an object with an externalId and some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function upsertCase(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;
    const { data, externalIds } = expandReferences(params)(state);

    const qs = {
      remote: true,
      scope: {},
    };

    externalIds
      .filter(x => data[x])
      .forEach(x => {
        // For every externalId field that is provided, add a key to the
        // scope object in our qs (queryString) and set the value for that key to
        // whatever value is found IN THE DATA for the given externalId.
        return (qs[x] = `${data[x]}`);
      });

    const requestParams = {
      method: 'GET',
      url: `${url}/api/v2/cases`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      qs,
    };

    // NOTE: while record_id is used in the GET, it must be dropped before -----
    // subsequent create or update calls are made as it's not valid in Primero.
    delete data['record_id'];
    // -------------------------------------------------------------------------

    return new Promise((resolve, reject) => {
      request(requestParams, (error, response, body) => {
        response = scrubResponse(response);
        error = assembleError({ error, response, params: {} });
        if (error) {
          reject(error);
        } else {
          const resp = tryJson(body);
          if (resp.data.length == 0) {
            console.log('No case found. Performing create.');
            resolve(createCase({ data }, callback)(state));
          } else if (resp.data.length > 0) {
            console.log('Case found. Performing update.');
            resolve(updateCase(resp.data[0].id, { data }, callback)(state));
          }
        }
      });
    });
  };
}

/**
 * Get referrals for a specific case in Primero
 * @public
 * @example
 * getReferrals({
 *   externalId: "record_id",
 *   id: "7ed1d49f-14c7-4181-8d83-dc8ed1699f08",
 * }, callback)
 * @function
 * @param {object} params - an object with an externalId field to select the attribute to use for matching on case and an externalId value for that case.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getReferrals(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const { externalId, id } = expandReferences(params)(state);

    let requestParams = {};

    if (externalId === 'record_id') {
      console.log('Fetching by record id...');
      requestParams = {
        method: 'GET',
        url: `${url}/api/v2/cases/${id}/referrals`,
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json',
        },
      };
      return queryHandler(state, requestParams, callback);
    } else {
      console.log('Fetching by case id...');
      const qs = {
        case_id: `${id}`,
      };
      requestParams = {
        method: 'GET',
        url: `${url}/api/v2/cases`,
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json',
        },
        qs,
      };
      return new Promise((resolve, reject) => {
        request(requestParams, (error, response, body) => {
          response = scrubResponse(response);
          error = assembleError({ error, response, params: {} });
          if (error) {
            reject(error);
          } else {
            const resp = tryJson(body);
            if (resp.data.length == 0) {
              reject('No case found');
              return state;
            } else if (resp.data.length === 1) {
              console.log('Case found. Fetching referrals.');
              const id = resp.data[0].id;
              requestParams = {
                method: 'GET',
                url: `${url}/api/v2/cases/${id}/referrals`,
                headers: {
                  Authorization: auth.token,
                  'Content-Type': 'application/json',
                },
              };
              resolve(queryHandler(state, requestParams, callback));
            } else {
              reject(
                'Multiple cases found. Try using another externalId and ensure that it is unique.'
              );
            }
          }
        });
      });
    }
  };
}

/**
 * Create referrals in Primero
 * @public
 * @example
 * createReferrals({
 *   data: {
 *     "ids": ['case_id'],
 *      "transitioned_to": "primero_cp",
 *      "notes": "Creating a referral"
 *   }
 * }, callback)
 * @function
 * @param {object} params - an object with referral data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function createReferrals(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const { data } = expandReferences(params)(state);

    const requestParams = {
      method: 'POST',
      url: `${url}/api/v2/cases/referrals`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
        options: {
          successCodes: [200, 201, 202, 203, 204],
        },
      },
      json: { data: data },
    };

    return new Promise((resolve, reject) => {
      request(requestParams, (error, response, body) => {
        response = scrubResponse(response);
        error = assembleError({ error, response, params: requestParams });
        if (error) {
          reject(error);
        } else {
          const resp = tryJson(body);
          console.log(
            `Post succeeded: ${response.statusCode} ${response.statusMessage}`
          );
          const nextState = composeNextState(state, resp.data.body);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

// TODO: We need to deprecate this.
export function updateReferrals(params, callback) {
  console.log(
    'DEPRECATION WARNING: `updateReferrals` is being deprecated and is now called' +
      ' `updateReferral`; it only allows users to update a single referral on a' +
      'single case. Please update your job accordingly.'
  );
  return updateReferral(params, callback);
}

/**
 * Update a single referral for a specific case in Primero
 * @public
 * @example
 * updateReferral({
 *   caseExternalId: "record_id",
 *   caseId: "7ed1d49f-14c7-4181-8d83-dc8ed1699f08"
 *   id: "37612f65-3bda-48eb-b526-d31383f94166",
 *   data: state => state.data
 * }, callback)
 * @function
 * @param {object} params - an object with an externalId value to use, the id and the referral id to update.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function updateReferral(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const { caseExternalId, caseId, id, data } =
      expandReferences(params)(state);

    let requestParams = {};

    if (caseExternalId === 'record_id') {
      console.log('Updating referral by record id...');
      requestParams = {
        method: 'PATCH',
        url: `${url}/api/v2/cases/${caseId}/referrals/${id}`,
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json',
        },
        json: { data: data },
      };
      return queryHandler(state, requestParams, callback);
    } else {
      console.log('Updating referral by case id...');
      const qs = {
        case_id: `${caseId}`,
      };
      requestParams = {
        method: 'GET',
        url: `${url}/api/v2/cases`,
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json',
        },
        qs,
      };
      return new Promise((resolve, reject) => {
        request(requestParams, (error, response, body) => {
          response = scrubResponse(response);
          error = assembleError({ error, response, params: {} });
          if (error) {
            reject(error);
          } else {
            const resp = tryJson(body);
            if (resp.data.length == 0) {
              console.log('No case found.');
              resolve(state);
              return state;
            } else if (resp.data.length === 1) {
              console.log('Case found. Fetching referrals.');

              const caseRecordId = resp.data[0].id;
              requestParams = {
                method: 'PATCH',
                url: `${url}/api/v2/cases/${caseRecordId}/referrals/${id}`,

                headers: {
                  Authorization: auth.token,
                  'Content-Type': 'application/json',
                },
                json: { data: data },
              };
              resolve(queryHandler(state, requestParams, callback));
            } else {
              reject(
                'Multiple cases found. Try using another externalId and ensure that it is unique.'
              );
            }
          }
        });
      });
    }
  };
}

/**
 * Get forms from Primero
 * @public
 * @example
 * getForms({
 *   record_type: '' // Optional. Filters by the record type of the form,
 *   module_id: 'id' //Optional. Filter forms by module,
 * }, callback)
 * @function
 * @param {object} query - an object with a query param at minimum
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getForms(query, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const expandedQuery = expandReferences(query)(state);

    const params = {
      method: 'GET',
      url: `${url}/api/v2/forms`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      qs: expandedQuery,
    };

    return new Promise((resolve, reject) => {
      request(params, async function (error, response, body) {
        response = scrubResponse(response);
        error = assembleError({ error, response, params });
        if (error) {
          reject(error);
        } else {
          console.log(
            `Primero says: '${response.statusCode} ${response.statusMessage}'`
          );
          const resp = tryJson(body);
          const forms = resp.data;
          console.log(
            `${forms.length} forms retrieved from request: ${JSON.stringify(
              response.request,
              null,
              2
            )}`
          );

          const nextState = composeNextState(state, forms);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

/**
 * Get lookups from Primero
 * @public
 * @example
 * getLookups({
 *   page: 1 // Optional. Pagination. Defaults to 1,
 *   per: 20 // Optional. Records per page. Defaults to 20,
 * }, callback)
 * @function
 * @param {object} query - an object with a query param at minimum
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getLookups(query, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const expandedQuery = expandReferences(query)(state);

    const params = {
      method: 'GET',
      url: `${url}/api/v2/lookups`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      qs: expandedQuery,
    };

    return new Promise((resolve, reject) => {
      request(params, async function (error, response, body) {
        response = scrubResponse(response);
        error = assembleError({ error, response, params });
        if (error) {
          reject(error);
        } else {
          console.log(
            `Primero says: '${response.statusCode} ${response.statusMessage}'`
          );
          const resp = tryJson(body);
          const lookups = resp.data;
          console.log(
            `${lookups.length} lookups retrieved from request: ${JSON.stringify(
              response.request,
              null,
              2
            )}`
          );

          const nextState = composeNextState(state, lookups);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

/**
 * Get locations from Primero
 * @public
 * @example
 * getLocations({
 *   page: 1 // Optional.
 *   per: 20 // Optional. Records per page,
 *   hierarchy: // Defaults to false,
 * }, callback)
 * @function
 * @param {object} query - an object with a query param at minimum
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getLocations(query, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const expandedQuery = expandReferences(query)(state);

    const params = {
      method: 'GET',
      url: `${url}/api/v2/locations`,
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      qs: expandedQuery,
    };

    return new Promise((resolve, reject) => {
      request(params, async function (error, response, body) {
        response = scrubResponse(response);
        error = assembleError({ error, response, params });
        if (error) {
          reject(error);
        } else {
          console.log(
            `Primero says: '${response.statusCode} ${response.statusMessage}'`
          );
          const resp = tryJson(body);
          const locations = resp.data;
          console.log(
            `${
              locations.length
            } locations retrieved from request: ${JSON.stringify(
              response.request,
              null,
              2
            )}`
          );

          const nextState = composeNextState(state, locations);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

export {
  alterState,
  beta,
  combine,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
