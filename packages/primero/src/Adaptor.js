// /** @module Adaptor */
import {
  execute as commonExecute,
  expandReferences,
} from '@openfn/language-common';
import { assembleError, scrubResponse, tryJson } from './Utils';
import request from 'request';

const composeNextState = (state, data, meta) => {
  const nextState = {
    ...state,
    data,
    references: [...state.references, state.data],
  };

  if (meta) {
    return { ...nextState, metadata: meta };
  }
  return nextState;
};

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
 *
 * Use this function to get cases from Primero based on a set of query parameters.
 * Note that in many implementations, the `remote` attribute should be set to `true` to ensure that only cases marked for remote access will be retrieved.
 * You can specify a `case_id` value to fetch a unique case and a query string to filter result.
 * @public
 * @example <caption> Get cases from Primero with query parameters</caption>
 * getCases(
 *  {
 *    remote: true,
 *    query: 'sex=male',
 *  },
 *  state => {
 *    console.log('Here is the callback.');
 *    return state;
 *  }
 * );
 * @example <caption>Fetching a unique case id</caption>
 * getCases(
 *  {
 *    remote: true,
 *    case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 *  },
 *  (state) => {
 *    console.log("We are fetching a unique case id");
 *    return state;
 *  }
 * );
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
          const metadata = resp.metadata;
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

          const nextState = composeNextState(state, cases, metadata);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}

/**
 * Create a new case in Primero
 *
 * Use this function to insert a new case in Primero based on a set of Data.
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
 * @example
 * createCase(
 * {
 *   data: state => ({
 *     remote: true,
 *     enabled: true,
 *     age: 15,
 *     sex: 'male',
 *     name: 'Alex',
 *     status: 'open',
 *     case_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz',
 *     child: {
 *       date_of_birth: "2020-01-02",
 *       ...,
 *       services_section: [ ... ],
 *       transitions: [ ... ]
 *     },
 *   })
 * }
 * );
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
 *
 * Use this function to update an existing case from Primero.
 * In this implementation, the function uses an ID to check for the case to update.
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
 * @example <caption>Update case with query Parameters</caption>
 * updateCase(
 *  "case_id", {
 *    data: {
 *      remote: true,
 *      oscar_number: c.oscar_number,
 *      case_id: c.case_id,
 *      child: {
 *        date_of_birth: "2020-01-02",
 *        ...,
 *        services_section: [ ... ],
 *        transitions: [ ... ]
 *      },
 *    }
 *  }
 * );
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
 *
 * Use this function to update an existing case from Primero or to insert it otherwise.
 * In this implementation, we first fetch the list of cases,
 * then we check if the case exist before choosing the right operation to do.
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
 *
 * @example
 * upsertCase(
 *  {
 *   externalIds: ["case_id"],
 *   data: {
 *     remote: true,
 *     oscar_number: c.oscar_number,
 *     case_id: c.case_id,
 *     child: {
 *       date_of_birth: "2020-01-02",
 *       ...,
 *       services_section: [ ... ],
 *       transitions: [ ... ]
 *     },
 *   }
 *  },
 *  state => {
 *   console.log(state.data);
 *   return state;
 *  }
 * );
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
 *
 * Use this function to get the list of referrals of one case from Primero.
 * The search can be done using either `record id` or `case id`.
 * @public
 * @example
 * getReferrals({
 *   externalId: "record_id",
 *   id: "7ed1d49f-14c7-4181-8d83-dc8ed1699f08",
 * }, callback)
 * @example <caption>Get referrals for a case in Primero</caption>
 * getReferrals(
 *  { externalId: 'case_id' },
 * 'a59e880e-d58f-4b68-ba6e-e0616a49aefd',
 *  state => {
 *    console.log(state.data);
 *    return state;
 *  }
 * );
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
 *
 * Use this function to bulk refer to one or multiple cases from Primero
 * @public
 * @example
 * createReferrals({
 *   data: {
 *     "ids": ['case_id'],
 *      "transitioned_to": "primero_cp",
 *      "notes": "Creating a referral"
 *   }
 * }, callback)
 * @example <caption>Create referrals for one or multiple cases in Primero</caption>
 * createReferrals(
 *  {
 *   data: {
 *     ids: ['case_id'],
 *     transitioned_to: 'primero_cp',
 *     notes: 'Creating a referral',
 *   },
 *  },
 *  state => {
 *    console.log('Here is the callback.');
 *    return state;
 *  }
 * );
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
 *
 * Use this function to get forms from Primero that are accessible to this user based on a set of query parameters.
 * The user can filter the form list by record type and module.
 * @public
 * @example <caption>Get the list of forms</caption>
 * getForms(state => {
 *    console.log('We are fetching forms from Primero for this user');
 *    return state;
 * });
 *
 * @example <caption>fetching a unique form using `module_id`</caption>
 * getForms(
 *  {
 *   module_id: '6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz',
 *  },
 *  state => {
 *     console.log('We are fetching a unique form using module_id');
 *    return state;
 *  }
 * );
 *
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
 *
 * Use this function to get a paginated list of all lookups that are accessible to this user from Primero.
 * Note: You can specify a `per` value to fetch records per page(Defaults to 20).
 * Also you can specify `page` value to fetch pagination (Defaults to 1)
 * @public
 * @example
 * getLookups({
 *   page: 1 // Optional. Pagination. Defaults to 1,
 *   per: 20 // Optional. Records per page. Defaults to 20,
 * }, callback)
 * @example <caption>Get lookups from Primero with query parameters</caption>
 * getLookups(
 *   {
 *     per: 10000,
 *     page: 1,
 *  },
 *  state => {
 *   console.log('Here is the callback.');
 *   return state;
 *  }
 * );
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
 *
 * Use this function to get a paginated list of all locations that are accessible to this user from Primero.
 * Note: You can specify a `per` value to fetch records per page(Defaults to 20).
 * Also you can specify `page` value to fetch pagination (Defaults to 1).
 * Another parameter is `hierarchy: true` (Defaults to false)
 * @public
 * @example
 * getLocations({
 *   page: 1 // Optional.
 *   per: 20 // Optional. Records per page,
 *   hierarchy: // Defaults to false,
 * }, callback)
 * @example <caption>Get loocations from Primero with query parameters</caption>
 * getLocations(
 *  {
 *    per: 100000,
 *  },
 *  state => {
 *    console.log('Here is the callback.');
 *    return state;
 *  }
 * );
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
