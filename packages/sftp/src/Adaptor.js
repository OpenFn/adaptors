import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import Client from 'ssh2-sftp-client';
import csv from 'csvtojson';

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

  return state => commonExecute(...operations)({ ...initialState, ...state });
}

/**
 * List files present in a directory
 * @public
 * @example
 * list('/some/path/')
 * @function
 * @param {string} dirPath - Path to resource
 * @returns {Operation}
 */
export function list(dirPath) {
  return state => {
    const sftp = new Client();

    return sftp
      .connect(state.configuration)
      .then(() => {
        console.debug('Connected. ✓\n');
        return sftp.list(dirPath);
      })
      .then(files => {
        // TODO: should we remove this?
        // console.debug(`File list: ${JSON.stringify(files, null, 2)}\n`);
        const nextState = composeNextState(state, files);
        sftp.end();
        return nextState;
      })
      .catch(e => {
        sftp.end();
        console.log(e);
      });
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
    delimiter: ',',
    noheader: false,
    quote: '"',
    trim: true,
    flatKeys: false,
    output: 'json',
  };

  return state => {
    const sftp = new Client();

    let results = [];

    if (parsingOptions) {
      return sftp
        .connect(state.configuration)
        .then(() => {
          console.debug('Connected. ✓\n');
          return sftp.createReadStream(filePath, {
            ...defaultOptions.readStreamOptions,
          });
        })
        .then(chunk => {
          console.debug('Parsing rows to JSON.\n');

          return csv({ ...defaultOptions, ...parsingOptions }).fromStream(
            chunk
          );
        })
        .then(json => {
          const nextState = composeNextState(state, json);
          return nextState;
        })
        .then(state => {
          console.log('Stream finished.');
          sftp.end();
          return state;
        })
        .catch(e => {
          console.log(e);
          sftp.end();
        });
    } else {
      return sftp
        .connect(state.configuration)
        .then(() => {
          console.debug('Connected. ✓\n');
          return sftp.get(filePath);
        })
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
        .then(state => {
          console.log('Stream finished.');
          sftp.end();
          return state;
        })
        .catch(e => {
          console.log(e);
          sftp.end();
        });
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
    const sftp = new Client();

    return sftp.connect(state.configuration).then(() => {
      return sftp
        .put(localFilePath, remoteFilePath, parsingOptions)
        .then(res => {
          const nextState = composeNextState(state, res);
          return nextState;
        })
        .then(state => {
          console.log('Upload finished.');
          sftp.end();
          return state;
        })
        .catch(e => {
          throw e;
        });
    });
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
    const sftp = new Client();

    let results = [];

    return sftp
      .connect(state.configuration)
      .then(() => {
        console.debug('Connected. ✓\n');
        return sftp.get(filePath);
      })

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
      .then(state => {
        console.log('Stream finished.');
        sftp.end();
        return state;
      })
      .catch(e => {
        throw e;
      });
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
        .map(h => (h = h.replace(/"/g, '')));

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
} from '@openfn/language-common';
