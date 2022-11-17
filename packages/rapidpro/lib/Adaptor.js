"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.addContact = addContact;
exports.upsertContact = upsertContact;
exports.startFlow = startFlow;
exports.sendBroadcast = sendBroadcast;
Object.defineProperty(exports, "alterState", {
  enumerable: true,
  get: function () {
    return _languageCommon.alterState;
  }
});
Object.defineProperty(exports, "dataPath", {
  enumerable: true,
  get: function () {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, "dataValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function () {
    return _languageCommon.each;
  }
});
Object.defineProperty(exports, "field", {
  enumerable: true,
  get: function () {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, "fields", {
  enumerable: true,
  get: function () {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, "fn", {
  enumerable: true,
  get: function () {
    return _languageCommon.fn;
  }
});
Object.defineProperty(exports, "http", {
  enumerable: true,
  get: function () {
    return _languageCommon.http;
  }
});
Object.defineProperty(exports, "lastReferenceValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.lastReferenceValue;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, "sourceValue", {
  enumerable: true,
  get: function () {
    return _languageCommon.sourceValue;
  }
});

var _languageCommon = require("@openfn/language-common");

/** @module Adaptor */
const {
  axios
} = _languageCommon.http;
exports.axios = axios;
/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */

function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  };
  return state => {
    return (0, _languageCommon.execute)(...operations)({ ...initialState,
      ...state
    });
  };
}
/**
 * Adds a new contact to RapidPro
 * @public
 * @example
 * addContact({
 *   name: "Mamadou",
 *   language: "ENG",
 *   urns: ["tel:+250788123123"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function addContact(params, callback) {
  return state => {
    params = (0, _languageCommon.expandReferences)(params)(state);
    const {
      host,
      apiVersion,
      token
    } = state.configuration;
    const url = `${host}/api/${apiVersion || 'v2'}/contacts.json`;
    const config = {
      url,
      data: params,
      headers: {
        Authorization: `Token ${token}`
      }
    };
    return _languageCommon.http.post(config)(state).then(response => {
      console.log('Contact added with uuid:', response.data.uuid);
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Upserts a contact to RapidPro by URN
 * @public
 * @example
 * upsertContact({
 *   name: "Mamadou",
 *   language: "ENG",
 *   urns: ["tel:+250788123123"]
 * });
 * @function
 * @param {object} params - data to upsert a contact
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function upsertContact(params, callback) {
  return state => {
    params = (0, _languageCommon.expandReferences)(params)(state);
    const {
      host,
      apiVersion,
      token
    } = state.configuration;
    const url = `${host}/api/${apiVersion || 'v2'}/contacts.json`;
    const config = {
      url,
      data: params,
      headers: {
        Authorization: `Token ${token}`
      }
    };
    return _languageCommon.http.post(config)(state).then(resp => {
      console.log('Contact added with uuid:', resp.data.uuid);
      return resp;
    }).catch(err => {
      const {
        data
      } = err.response;

      if (data && data.urns && Array.isArray(data.urns) && data.urns.find(x => x.includes('URN belongs to another'))) {
        const newUrl = `${url}?urn=${config.data.urns[0]}`;
        delete config.data['urns'];
        return _languageCommon.http.post({ ...config,
          url: newUrl
        })(state).then(resp => {
          console.log('Contact updated with uuid:', resp.data.uuid);
          return resp;
        });
      } else {
        console.log(JSON.stringify(data, null, 2));
        delete err.response.request;
        delete err.response.config;
        throw err.response;
      }
    }).then(response => {
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Start a RapidPro flow for a number of contacts
 * @public
 * @example
 * startFlow({
 *   flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
 *   restart_participants: false,
 *   contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function startFlow(params, callback) {
  return state => {
    params = (0, _languageCommon.expandReferences)(params)(state);
    const {
      host,
      apiVersion,
      token
    } = state.configuration;
    const url = `${host}/api/${apiVersion || 'v2'}/flow_starts.json`;
    const config = {
      url,
      data: params,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    };
    return _languageCommon.http.post(config)(state).catch(error => {
      console.log(error.response);
      throw 'That was an error from RapidPro.';
    }).then(response => {
      console.log('Flow started:', response.data);
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}
/**
 * Sends a message to a list of contacts and/or URNs
 * @public
 * @example
 * sendBroadcast({
 *   text: "Hello world",
 *   urns: ["twitter:sirmixalot"],
 *   contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */


function sendBroadcast(params, callback) {
  return state => {
    params = (0, _languageCommon.expandReferences)(params)(state);
    const {
      host,
      apiVersion,
      token
    } = state.configuration;
    const url = `${host}/api/${apiVersion || 'v2'}/broadcasts.json`;
    const config = {
      url,
      data: params,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    };
    return _languageCommon.http.post(config)(state).catch(error => {
      console.log(error.response);
      throw 'That was an error from RapidPro.';
    }).then(response => {
      console.log('Broadcast queued:', response.data);
      const nextState = { ...(0, _languageCommon.composeNextState)(state, response.data),
        response
      };
      if (callback) return callback(nextState);
      return nextState;
    });
  };
}