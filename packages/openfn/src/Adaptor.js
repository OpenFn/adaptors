import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
} from '@openfn/language-common';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import fs from 'fs';

const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const filepath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(filepath));
const { version } = pkg;
const defaultHeaders = { 'User-Agent': `language-openfn-v${version}` };

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
      login,
      ...operations
      // logout
    )({ ...initialState, ...state });
    // .catch(e => {
    //   console.error(e);
    //   logout;
    //   process.exit(1);
    // });
  };
}

function login(state) {
  const { configuration } = state;
  const { host, password, username } = configuration;

  return axios({
    method: 'post',
    url: `${host}/api/login`,
    headers: { ...defaultHeaders },
    data: {
      session: {
        email: username,
        password: password,
      },
    },
  }).then(response => {
    console.log('Authentication succeeded.');
    const { jwt } = response.data;
    return { ...state, configuration: { ...configuration, host, jwt } };
  });
}

function logout(state) {
  const { jwt } = state;
  const { host } = state.configuration;
  return axios({
    method: 'post',
    url: `${host}/api/logout`,
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${jwt}`,
    },
  }).then(() => {
    delete state.configuration;
    resolve(state);
  });
}

/**
 * Make a POST request
 * @public
 * @example
 *  request({method: 'get', path: '/jobs/});
 * @function
 * @param {object} options - Body, Query, Headers and Authentication parameters
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */
export function request(options, callback) {
  return state => {
    const { host, jwt } = state.configuration;
    const { method, path, params, data } = expandReferences(options)(state);

    return axios({
      method,
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${jwt}`,
      },
      url: `${host}/api/${path}`,
      params,
      data,
    }).then(response => {
      const { data } = response;
      const nextState = composeNextState(state, data);
      if (callback) {
        return callback(nextState);
      }
      return nextState;
    });
  };
}

export {
  alterState,
  beta,
  combine,
  dataPath,
  dataValue,
  each,
  field,
  fn,
  fnIf,
  fields,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
