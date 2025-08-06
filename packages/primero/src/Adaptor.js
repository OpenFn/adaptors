import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import { assembleError, scrubResponse, tryJson } from './Utils';
import request from 'request';

export const composeNextState = (state, data, meta) => {
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
 * @private
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
    request(params, function (err, resp, body) {
      const response = scrubResponse(resp);
      const error = assembleError({ error: err, response, params });
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
    request(params, function (err, resp, body) {
      const response = scrubResponse(resp);
      const error = assembleError({ error: err, response, params });
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
 * Use this function to get cases from Primero based on a set of query parameters.
 * Note that in many implementations, the `remote` attribute should be set to `true` to ensure that only cases marked for remote access will be retrieved.
 * Set `case_id` on the query object to fetch a specific case.
 * @public
 * @function
 * @example <caption>Fetch all cases</caption>
 * getCases();
 * @example <caption>Fetch all cases which match query criteria</caption>
 * getCases({
 *   remote: true,
 *   sex: "male",
 *   age: "10..15",
 *   protection_concerns :"unaccompanied,separated",
 * });
 * @example <caption>Fetch a specific case by id</caption>
 * getCases({
 *   case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 * });
 * @example <caption>Get all remote cases and their referrals</caption>
 * getCases(
 *  { remote: true },
 *  { withReferrals: true }
 * );
 * @param {object} query - Query parameters to send to primero, which will be built into URL parameters. See {@link https://github.com/primeroIMS/primero/blob/master/doc/api/cases/get.md Primero Docs} for a list of valid parameters.
 * @param {object} options - (Optional) Additional options
 * @param {boolean} options.withReferrals - Set to true to include referrals with each case. This will generate an extra request for each case and may take some time to process.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getCases(query, options, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [expandedQuery] = expandReferences(state, query);
    const [expandedOptions] = expandReferences(state, options);

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
      request(params, async function (err, resp, body) {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
            console.log(`Fetching referrals for ${cases.length} cases...`);
            for await (const c of cases) {
              console.log(`Fetching referral...`);
              const requestParams = {
                method: 'GET',
                url: `${url}/api/v2/cases/${c.id}/referrals`,
                headers: {
                  Authorization: auth.token,
                  'Content-Type': 'application/json',
                },
              };

              const referrals = await new Promise(resolve => {
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
 * Use this function to create a new case in Primero based on a set of Data.
 * @public
 * @example <caption>Create a new case in Primero based on a set of Data</caption>
 * createCase({
 *   data: {
 *     age: 16,
 *     sex: "female",
 *     name: "Edwine Edgemont",
 *   },
 * });
 * @function
 * @param {object} params - an object with some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function createCase(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [data] = expandReferences(state, params);

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
      request(requestParams, (err, resp, body) => {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
 * Update an existing case in Primero
 *
 * Use this function to update an existing case from Primero.
 * In this implementation, the function uses a case ID to check for the case to update,
 * Then merge the values submitted in this call into an existing case.
 * Fields not specified in this request will not be modified.
 * For nested subform fields, the subform arrays will be recursively merged,
 * keeping both the existing values and appending the new
 * @public
 * @example <caption>Update case for a specific case id</caption>
 * updateCase("6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz", {
 *   data: {
 *     age: 16,
 *     sex: "female",
 *     name: "Fiona Edgemont",
 *   },
 * });
 * @function
 * @param {string} id - A case ID to use for the update.
 * @param {object} params - an object with some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function updateCase(id, params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;
    const [data] = expandReferences(state, params);

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
      request(requestParams, (err, resp, body) => {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
 * Use this function to update an existing case from Primero or to create it otherwise.
 * In this implementation, we first fetch the list of cases,
 * then we check if the case exist before choosing the right operation to do.
 * @public
 * @example <caption>Upsert case for a specific case id</caption>
 * upsertCase({
 *   externalIds: ["case_id"],
 *   data: state => ({
 *     age: 20,
 *     sex: "male",
 *     name: "Alex",
 *     status: "open",
 *     case_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 *   }),
 * });
 * @function
 * @param {object} params - an object with an externalIds and some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function upsertCase(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;
    const [resolvedParams] = expandReferences(state, params);
    const { data, externalIds } = resolvedParams;

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
      request(requestParams, (err, resp, body) => {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
 * @example <caption>Get referrals for a case in Primero by record id</caption>
 * getReferrals({
 *   externalId: "record_id",
 *   id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 * });
 * @example <caption>Get referrals for a case in Primero by case id</caption>
 *  getReferrals({
 *   id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 * });
 * @function
 * @param {object} params - an object with an externalId field to select the attribute to use for matching on case and an externalId value for that case.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getReferrals(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [resolvedParams] = expandReferences(state, params);
    const { externalId, id } = resolvedParams;

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
        request(requestParams, (err, resp, body) => {
          const response = scrubResponse(resp);
          const error = assembleError({ error: err, response, params });
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
 * Use this function to bulk refer to one or multiple cases from Primero to a single user
 * @public
 * @example <caption>Create referrals for multiple cases in Primero</caption>
 * createReferrals({
 *   data: {
 *     ids: [
 *       "749e9c6e-60db-45ec-8f5a-69da7c223a79",
 *       "dcea6052-07d9-4cfa-9abf-9a36987cdd25",
 *     ],
 *     transitioned_to: "primero_cp",
 *     notes: "This is a bulk referral",
 *   },
 * });
 * @function
 * @param {object} params - an object with referral data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function createReferrals(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [data] = expandReferences(state, params);

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
      request(requestParams, (err, resp, body) => {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
 * @example <caption>Update referral by record id</caption>
 * updateReferral({
 *   caseExternalId: "record_id",
 *   id: "749e9c6e-60db-45ec-8f5a-69da7c223a79",
 *   caseId: "dcea6052-07d9-4cfa-9abf-9a36987cdd25",
 *   data: (state) => state.data,
 * });
 * @function
 * @param {object} params - an object with an caseExternalId value to use, the id and the referral id to update.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function updateReferral(params, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [resolvedParams] = expandReferences(state, params);
    const { caseExternalId, caseId, id, data } = resolvedParams;

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
        request(requestParams, (err, resp, body) => {
          const response = scrubResponse(resp);
          const error = assembleError({ error: err, response, params });
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
 * @example <caption>Get the list of all forms</caption>
 * getForms();
 *
 * @example <caption>Get the list of all forms for a specific module</caption>
 * getForms({
 *   module_id: "6aeaa66a-5a92-4ff5-bf7a-e59cde07eaaz",
 * });
 * @function
 * @param {object} query - an object with a query param at minimum
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getForms(query, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [expandedQuery] = expandReferences(state, query);

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
      request(params, async function (err, resp, body) {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
 * @example <caption>Get lookups from Primero with query parameters</caption>
 * getLookups({
 *   per: 10000,
 *   page: 5
 * });
 * @function
 * @param {object} query - an object with a query param at minimum
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getLookups(query, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [expandedQuery] = expandReferences(state, query);

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
      request(params, async function (err, resp, body) {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
 * @example <caption>Get loocations from Primero with query parameters</caption>
 * getLocations({
 *   page: 1,
 *   per: 20
 * })
 * @function
 * @param {object} query - an object with a query param at minimum
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function getLocations(query, callback) {
  return state => {
    const { auth } = state;
    const { url } = state.configuration;

    const [expandedQuery] = expandReferences(state, query);

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
      request(params, async function (err, resp, body) {
        const response = scrubResponse(resp);
        const error = assembleError({ error: err, response, params });
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
  fnIf,
  lastReferenceValue,
  merge,
  sourceValue,
  as,
} from '@openfn/language-common';
