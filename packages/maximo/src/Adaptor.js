import { execute as commonExecute } from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import request from 'request';
import { resolve as resolveUrl } from 'url';
import base64 from 'base-64';
import utf8 from 'utf8';

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
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
    return commonExecute(...operations)({ ...initialState, ...state });
  };
}

/**
 * Make a GET request and POST it somewhere else
 * @example
 * fetch({
 *  endpoint: 'maxrest/rest/os/mxinventory',
 *  query: {
 *    ITEMNUM: '01226',
 *    _format: 'json',
 *  },
 *  postUrl: 'https://www.openfn.org/inbox/not-real',
 * });
 * @function
 * @public
 * @param {object} params - data to make the fetch
 * @returns {Operation}
 */
export function fetch(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const [resolvedParam] = expandReferences(state, params);
    const { endpoint, query, postUrl } = resolvedParam;

    const { username, password, baseUrl } = state.configuration;

    const authy = username + ':' + password;
    // console.log(authy)
    const bytes = utf8.encode(authy);
    const encoded = base64.encode(bytes);
    // console.log(encoded)

    const url = resolveUrl(baseUrl + '/', endpoint);

    console.log('Fetching data from URL: ' + url);
    console.log('Applying query: ' + JSON.stringify(query));

    return new Promise((resolve, reject) => {
      request(
        {
          url: url, //URL to hit
          qs: query, //Query string data
          headers: {
            // Maximo's authentication header
            maxauth: encoded,
          },
        },
        function (err, response, getResponseBody) {
          const error = assembleError({ error: err, response });
          if (error) {
            console.error('GET failed.');
            console.log(response);
            reject(error);
          } else {
            console.log('GET succeeded.');
            // console.log(response)
            console.log('Response body: ' + getResponseBody);
            request.post(
              {
                url: postUrl,
                json: JSON.parse(getResponseBody),
              },
              function (err, response, postResponseBody) {
                const error = assembleError({ error: err, response });
                if (error) {
                  console.error('POST failed.');
                  reject(error);
                } else {
                  console.log('POST succeeded.');
                  resolve(getResponseBody);
                }
              }
            );
          }
        }
      );
    })
      .then(response => {
        console.log('Success:', response);
        let result =
          typeof response === 'object' ? response : JSON.parse(response);
        return { ...state, references: [result, ...state.references] };
      })
      .then(data => {
        const nextState = { ...state, response: { body: data } };
        return nextState;
      });
  };
}

/*
 * Make a POST request using existing data from state
 */
export function create(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const [resolvedParams] = expandReferences(state, params);
    const { endpoint, body } = resolvedParams;

    const { username, password, baseUrl } = state.configuration;

    const authy = username + ':' + password;
    // console.log(authy)
    const bytes = utf8.encode(authy);
    const encoded = base64.encode(bytes);
    // console.log(encoded);

    const url = resolveUrl(baseUrl + '/', endpoint);

    console.log('Creating data at URL: ' + url);
    console.log('Post body:');
    console.log(JSON.stringify(body, null, 4) + '\n');

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          json: body,
          headers: {
            // Maximo's authentication header
            maxauth: encoded,
          },
        },
        function (err, response, body) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
            console.log(body);
          } else {
            console.log(response);
            console.log('Printing response body...\n');
            console.log(JSON.stringify(body, null, 4) + '\n');
            console.log('POST succeeded.');
            resolve(body);
          }
        }
      );
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

/**
 * Make an update in Maximo 7.6 and beyond
 * @example <caption>Update a workorder</caption>
 * update({
 *   endpoint: "maxrest/rest/mbo/workorder/1234",
 *   body: state => state.data,
 * });
 * @function
 * @public
 * @param {object} params - data to make the update
 * @returns {Operation}
 */
export function update(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const [resolvedParams] = expandReferences(state, params);
    const { endpoint, body } = resolvedParams;

    const { username, password, baseUrl } = state.configuration;

    const authy = username + ':' + password;
    const bytes = utf8.encode(authy);
    const encoded = base64.encode(bytes);

    const url = resolveUrl(baseUrl + '/', endpoint);

    console.log('Performing update at URL: ' + url);
    console.log('Update data:');
    console.log(JSON.stringify(body, null, 4) + '\n');

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          json: body,
          headers: {
            // Maximo's authentication header
            maxauth: encoded,
            'x-methodoverride': 'PATCH',
            patchtype: 'MERGE',
          },
        },
        function (err, response, body) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
            console.log(body);
          } else {
            console.log('Printing response body...\n');
            console.log(JSON.stringify(body, null, 4) + '\n');
            console.log('Update succeeded.');
            resolve(body);
          }
        }
      );
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

/**
 * Make an upadte in Maximo 7.5
 * @example <caption>Update an inventory balance</caption>
 * update75({
 *   endpoint: "maxrest/rest/mbo/invbalances",
 *   body: state => state.inventoryBalances,
 * });
 * @function
 * @public
 * @param {object} params - data to make the update
 * @returns {Operation}
 */
export function update75(params) {
  return state => {
    function assembleError({ response, error }) {
      if (response && [200, 201, 202].indexOf(response.statusCode) > -1)
        return false;
      if (error) return error;
      return new Error(`Server responded with ${response.statusCode}`);
    }

    const [resolvedParams] = expandReferences(state, params);
    const { endpoint, body } = resolvedParams;

    const { username, password, baseUrl } = state.configuration;

    const authy = username + ':' + password;
    const bytes = utf8.encode(authy);
    const encoded = base64.encode(bytes);

    const url = resolveUrl(baseUrl + '/', endpoint);

    console.log('Performing update at URL: ' + url);
    console.log('Update data:');
    console.log(JSON.stringify(body, null, 4) + '\n');

    return new Promise((resolve, reject) => {
      request.post(
        {
          url: url,
          form: body,
          headers: {
            // Maximo's authentication header
            maxauth: encoded,
            'x-methodoverride': 'PATCH',
            patchtype: 'MERGE',
          },
        },
        function (err, response, body) {
          const error = assembleError({ error: err, response });
          if (error) {
            reject(error);
            console.log(body);
          } else {
            console.log('Printing update response body...\n');
            console.log(JSON.stringify(body, null, 4) + '\n');
            console.log('Update succeeded.');
            resolve(body);
          }
        }
      );
    }).then(data => {
      const nextState = { ...state, response: { body: data } };
      return nextState;
    });
  };
}

export {
  field,
  fields,
  sourceValue,
  fn,
  fnIf,
  alterState,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
