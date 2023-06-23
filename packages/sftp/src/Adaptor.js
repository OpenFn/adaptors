import {
  execute as commonExecute,
  composeNextState,
  parseCsv,
} from '@openfn/language-common';
import Client from 'ssh2-sftp-client';
import { isObjectEmpty, handleResponse, handleError, handleLog } from './Utils';

let sftp = null;

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

  return state =>
    commonExecute(
      connect,
      ...operations,
      disconnect
    )({ ...initialState, ...state });
}

function connect(state) {
  sftp = new Client();

  return sftp.connect(state.configuration).then(() => {
    console.log('Connected');
    return state;
  });
}

function disconnect(state) {
  console.log('Disconnected');
  sftp.end();
  sftp = undefined;
  return state;
}

/**
 * List files present in a directory
 * @public
 * @example
 * list('/some/path/')
 * @function
 * @param {string} dirPath - Path to resource
 * @param {function} [callback] - Optional callback to handle the response
 * @returns {Operation}
 */
export function list(dirPath, callback = state => state) {
  return state => {
    return sftp
      .list(dirPath)
      .then(files => handleResponse(files, state, callback))
      .catch(handleError);
  };
}

/**
 * Get a CSV and return a JSON array of strings for each item separated by the delimiter
 * @public
 * @example
 * getCSV(
 *   '/some/path/to_file.csv',
 *   {delimiter: ";", flatKeys: true }
 * );
 * @function
 * @param {string} filePath - Path to resource
 * @param {{readStreamOptions: object,delimiter: string,noheader: boolean, quote: string, trim: boolean, flatKeys: boolean, output: string}} [parsingOptions] - Optional. `parsingOptions` Parsing options which can be passed to convert csv to json See more {@link https://github.com/Keyang/node-csvtojson#parameters on csvtojson docs}
 * @returns {Operation}
 */
export function getCSV(filePath, parsingOptions = {}) {
  const defaultOptions = {
    readStreamOptions: {
      encoding: null,
      autoClose: false,
    },
    columns: true,
  };

  return state => {
    let results = [];

    const { readStreamOptions, ...csvDefaultOptions } = defaultOptions;
    const useParser = !isObjectEmpty(parsingOptions);

    if (useParser) {
      const stream = sftp.createReadStream(filePath, readStreamOptions);
      return parseCsv(stream, { ...csvDefaultOptions, ...parsingOptions })(
        state
      );
      // .then(json => handleResponse(json, state))
      // .then(state => handleLog('Stream finished.', state))
      // .catch(handleError);
    } else {
      return sftp
        .get(filePath)
        .then(chunk => {
          results.push(chunk);
        })
        .then(() => {
          console.debug('Parsing rows to JSON.\n');
          return new Promise((resolve, reject) => {
            const content = Buffer.concat(results).toString('utf8');
            resolve(content.split('\r\n'));
          }).then(json => {
            const nextState = composeNextState(state, json);
            return nextState;
          });
        })
        .then(state => handleLog('Stream finished.', state))
        .catch(handleError);
    }
  };
}

/**
 * Convert JSON to CSV and upload to an FTP server
 * @public
 * @example
 * putCSV(
 *   '/some/path/to_local_file.csv',
 *   '/some/path/to_remove_file.csv',
 *   { delimiter: ';', noheader: true }
 * );
 * @function
 * @param {string} localFilePath -  Data source for data to copy to the remote server.
 * @param {string} remoteFilePath - Path to the remote file to be created on the server.
 * @param {object} parsingOptions - Options which can be passed to adjust the read and write stream used in sending the data to the remote server
 * @returns {Operation}
 */
export function putCSV(localFilePath, remoteFilePath, parsingOptions) {
  return state => {
    return sftp
      .put(localFilePath, remoteFilePath, parsingOptions)
      .then(response => handleResponse(response, state))
      .then(state => handleLog('Upload finished.', state))
      .catch(e => handleError(e, true));
  };
}

/**
 * Fetch a json file from an FTP server
 * @public
 * @example
 * getJSON(
 *   '/path/To/File',
 *   'utf8',
 * );
 * @function
 * @param {string} filePath - Path to resource
 * @param {string} encoding - Character encoding for the json
 * @returns {Operation}
 */
export function getJSON(filePath, encoding) {
  return state => {
    let results = [];

    return sftp
      .get(filePath)
      .then(chunk => {
        results.push(chunk);
      })
      .then(() => {
        console.debug('Receiving stream.\n');

        return new Promise((resolve, reject) => {
          const content = Buffer.concat(results).toString('utf8');
          resolve(content.split('\r\n'));
        }).then(json => {
          const nextState = composeNextState(state, json);
          return nextState;
        });
      })
      .then(state => handleLog('Stream finished.', state))
      .catch(e => handleError(e, true));
  };
}

/**
 * Convert JSON array of strings into a normalized object
 * @public
 * @example
 * normalizeCSVarray({ delimiter: ';', noheader: true });
 * @function
 * @param {options} options - Options passed to csvtojson parser
 * @param {callback} callback - Options passed to csvtojson parser
 * @returns {Operation}
 */
export function normalizeCSVarray(options, callback) {
  return state => {
    let results = [];

    state.data.map(data => {
      const [keys, ...rest] = data
        .shift()
        .split('\n')
        .map(h => h.replace(/"/g, ''));

      results.push(keys);
    });

    const headers = results[0]
      .trim()
      .split('\n')
      .map(item => item.split(','))
      .flat();

    const values = results[1]
      .trim()
      .split('\n')
      .map(item => item.split(','))
      .flat();

    const normalizedArray = values.map(item => {
      const object = {};
      headers.forEach((key, index) => (object[key] = item.at(index)));
      return object;
    });

    return { ...state, normalizedArray };
  };
}

export * from 'lodash/fp';

export {
  alterState,
  fn,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
  chunk,
  parseCsv,
} from '@openfn/language-common';
