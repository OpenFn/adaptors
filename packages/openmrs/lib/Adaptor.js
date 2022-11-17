"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.getPatient = getPatient;
exports.getPatients = getPatients;
exports.getPeople = getPeople;
exports.createEncounter = createEncounter;
exports.req = req;
Object.defineProperty(exports, "alterState", {
  enumerable: true,
  get: function get() {
    return _languageCommon.alterState;
  }
});
Object.defineProperty(exports, "field", {
  enumerable: true,
  get: function get() {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, "fields", {
  enumerable: true,
  get: function get() {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, "sourceValue", {
  enumerable: true,
  get: function get() {
    return _languageCommon.sourceValue;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function get() {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, "dataPath", {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, "dataValue", {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, "lastReferenceValue", {
  enumerable: true,
  get: function get() {
    return _languageCommon.lastReferenceValue;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function get() {
    return _languageCommon.each;
  }
});

var _languageCommon = require("language-common");

var _request = _interopRequireDefault(require("request"));

var _Utils = require("./Utils");

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @module Adaptor */

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for OpenMRS.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
function execute() {
  for (var _len = arguments.length, operations = new Array(_len), _key = 0; _key < _len; _key++) {
    operations[_key] = arguments[_key];
  }

  var initialState = {
    references: [],
    data: null
  };
  return function (state) {
    return _languageCommon.execute.apply(void 0, [login].concat(operations, [cleanupState]))(_objectSpread(_objectSpread({}, initialState), state));
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
  var _state$configuration = state.configuration,
      instanceUrl = _state$configuration.instanceUrl,
      username = _state$configuration.username,
      password = _state$configuration.password;
  var params = {
    method: 'GET',
    url: "".concat(instanceUrl, "/ws/rest/v1/session"),
    auth: {
      username: username,
      password: password
    },
    jar: true
  };
  return new Promise(function (resolve, reject) {
    (0, _request["default"])(params, function (error, response, body) {
      error = (0, _Utils.assembleError)({
        error: error,
        response: response,
        params: params
      });

      if (error) {
        reject(error);
      } else {
        var resp = (0, _Utils.tryJson)(body);
        resolve(_objectSpread(_objectSpread({}, state), {}, {
          auth: resp
        }));
      }
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
  delete state.auth;
  return state;
} // /**
//  * Create a person
//  * @example
//  * execute(
//  *   person(data)
//  * )(state)
//  * @constructor
//  * @param {object} personData - Payload data for the person
//  * @returns {Operation}
//  */
// export function person(personData) {
//   return (state) => {
//     const body = expandReferences(personData)(state);
//     const { instanceUrl } = state.configuration;
//     const url = `${instanceUrl}/ws/rest/v1/patient/${uuid}`;
//     console.log('Posting person.');
//     return req({ auth: { username, password }, body, url }).then((result) => {
//       console.log('Success:', result);
//       return { ...state, references: [result, ...state.references] };
//     });
//   };
// }

/**
 * Gets patient matching a uuid
 * @example
 * execute(
 *   getPatient({ uuid: 123 })
 * )(state)
 * @constructor
 * @param {object} params - object with uuid for the patient
 * @returns {Operation}
 */


function getPatient(params) {
  return function (state) {
    var _expandReferences = (0, _languageCommon.expandReferences)(params)(state),
        uuid = _expandReferences.uuid;

    console.log("Searching for patient with uuid: ".concat(uuid));
    var instanceUrl = state.configuration.instanceUrl;
    var url = "".concat(instanceUrl, "/ws/rest/v1/patient/").concat(uuid);
    return new Promise(function (resolve, reject) {
      (0, _request["default"])({
        url: url,
        method: 'GET',
        qs: {
          v: 'full'
        },
        jar: true
      }, function (error, response, body) {
        error = (0, _Utils.assembleError)({
          error: error,
          response: response
        });

        if (error) {
          reject(error);
        } else {
          console.log("Success. Found patient.");
          var data = (0, _Utils.tryJson)(body);
          var nextState = (0, _languageCommon.composeNextState)(state, data);
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
 * @constructor
 * @param {object} criteria - Criteria object for the patient
 * @returns {Operation}
 */


function getPatients(criteria, options) {
  return function (state) {
    var qs = (0, _languageCommon.expandReferences)(criteria)(state);
    var instanceUrl = state.configuration.instanceUrl;
    var url = (0, _url.resolve)(instanceUrl + '/', 'ws/rest/v1/patient');
    console.log("Searching for patients: ".concat(JSON.stringify(qs, null, 2)));
    return new Promise(function (resolve, reject) {
      (0, _request["default"])({
        method: 'GET',
        url: url,
        qs: qs,
        jar: true
      }, function (error, response, body) {
        error = (0, _Utils.assembleError)({
          error: error,
          response: response
        });

        if (error) {
          reject(error);
        } else {
          var data = (0, _Utils.tryJson)(body);
          var count = data.results.length;

          if (options.exactlyOne && data.results.length !== 1) {
            reject("Raising an error because ".concat(count, " records were found."));
          } else {
            console.log("Search successful. Returned ".concat(count, " patient").concat(count > 1 ? 's' : '', "."));
          }

          var nextState = (0, _languageCommon.composeNextState)(state, options.exactlyOne ? data.results[0] : data.results);
          resolve(nextState);
        }
      });
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
 * @constructor
 * @param {object} criteria - Criteria object for the people
 * @param {object} options - Options object for the handling of responses
 * @returns {Operation}
 */


function getPeople(criteria, options) {
  return function (state) {
    var qs = (0, _languageCommon.expandReferences)(criteria)(state);
    var instanceUrl = state.configuration.instanceUrl;
    var url = (0, _url.resolve)(instanceUrl + '/', 'ws/rest/v1/person');
    console.log("Searching for people: ".concat(JSON.stringify(qs, null, 2)));
    return new Promise(function (resolve, reject) {
      (0, _request["default"])({
        method: 'GET',
        url: url,
        qs: qs,
        jar: true
      }, function (error, response, body) {
        error = (0, _Utils.assembleError)({
          error: error,
          response: response
        });

        if (error) {
          reject(error);
        } else {
          var data = (0, _Utils.tryJson)(body);
          var count = data.results.length;

          if (options.exactlyOne && data.results.length !== 1) {
            reject("Raising an error because ".concat(count, " records were found."));
          } else {
            console.log("Search successful. Returned ".concat(count, " people."));
          }

          var nextState = (0, _languageCommon.composeNextState)(state, options.exactlyOne ? data.results[0] : data.results);
          resolve(nextState);
        }
      });
    });
  };
}
/**
 * Creates an encounter
 * @example
 * execute(
 *   createEncounter(params)(state)
 * @constructor
 * @param {object} params - parameters of the encounter
 * @returns {Operation}
 */


function createEncounter(params) {
  return function (state) {
    var body = (0, _languageCommon.expandReferences)(params)(state);
    var instanceUrl = state.configuration.instanceUrl;
    var url = (0, _url.resolve)(instanceUrl + '/', 'ws/rest/v1/encounter');
    console.log("Creating an encounter.");
    console.log(body);
    return new Promise(function (resolve, reject) {
      (0, _request["default"])({
        method: 'POST',
        url: url,
        json: body,
        jar: true
      }, function (error, response, body) {
        error = (0, _Utils.assembleError)({
          error: error,
          response: response
        });

        if (error) {
          reject(error);
        } else {
          var data = (0, _Utils.tryJson)(body);
          console.log("Creation successful.");
          var nextState = (0, _languageCommon.composeNextState)(state, data);
          resolve(nextState);
        }
      });
    });
  };
} // /**
//  * Create a patient
//  * @example
//  * execute(
//  *   createPatient(data)
//  * )(state)
//  * @constructor
//  * @param {object} patientData - Payload data for the patient
//  * @returns {Operation}
//  */
// export function createPatient(patientData) {
//   return (state) => {
//     const body = expandReferences(patientData)(state);
//     const { username, password, instanceUrl } = state.configuration;
//     const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/patient');
//     console.log('Posting patient:');
//     console.log(JSON.stringify(body));
//     return post({ auth: { username, password }, body, url }).then((result) => {
//       console.log('Success:', result);
//       return { ...state, references: [result, ...state.references] };
//     });
//   };
// }

/**
 * Make a request to any OpenMRS endpoint and execute a callback
 * @example
 * req({
 *   method: 'GET'
 *   url: 'encounterType'
 * })(state)
 * @constructor
 * @param {object} params - parameters for the request
 * @param {function} callback - a callback to execute on the next state
 * @returns {Operation}
 */


function req(params, callback) {
  return function (state) {
    var instanceUrl = state.configuration.instanceUrl;
    return new Promise(function (resolve, reject) {
      params.jar = true;
      params.url = "".concat(instanceUrl).concat(params.url);
      (0, _request["default"])(params, function (error, response, body) {
        error = (0, _Utils.assembleError)({
          error: error,
          response: response
        });

        if (error) {
          reject(error);
        } else {
          var data = (0, _Utils.tryJson)(body);
          var nextState = (0, _languageCommon.composeNextState)(state, data);
          if (callback) resolve(callback(nextState));
          resolve(nextState);
        }
      });
    });
  };
}