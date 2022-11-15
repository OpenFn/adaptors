"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = execute;
exports.listContacts = listContacts;
exports.getContact = getContact;
exports.upsertContact = upsertContact;
exports.listOutbreaks = listOutbreaks;
exports.getOutbreak = getOutbreak;
exports.upsertOutbreak = upsertOutbreak;
exports.listCases = listCases;
exports.getCase = getCase;
exports.upsertCase = upsertCase;
exports.listLocations = listLocations;
exports.getLocation = getLocation;
exports.upsertLocation = upsertLocation;
exports.listReferenceData = listReferenceData;
exports.getReferenceData = getReferenceData;
exports.upsertReferenceData = upsertReferenceData;
Object.defineProperty(exports, "alterState", {
  enumerable: true,
  get: function get() {
    return _languageCommon.alterState;
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
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function get() {
    return _languageCommon.each;
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
Object.defineProperty(exports, "lastReferenceValue", {
  enumerable: true,
  get: function get() {
    return _languageCommon.lastReferenceValue;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function get() {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, "sourceValue", {
  enumerable: true,
  get: function get() {
    return _languageCommon.sourceValue;
  }
});

var _languageCommon = require("language-common");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
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
    return _languageCommon.execute.apply(void 0, [login].concat(operations))(_objectSpread(_objectSpread({}, initialState), state))["catch"](function (e) {
      console.error(e);
      /* logout(); */

      process.exit(1);
    });
  };
}

function login(state) {
  var _state$configuration = state.configuration,
      apiUrl = _state$configuration.apiUrl,
      password = _state$configuration.password,
      email = _state$configuration.email;
  return (0, _axios["default"])({
    method: 'post',
    url: "".concat(apiUrl, "/users/login"),
    data: {
      email: email,
      password: password
    }
  }).then(function (response) {
    console.log('Authentication succeeded.');
    var id = response.data.id;
    return _objectSpread(_objectSpread({}, state), {}, {
      configuration: _objectSpread(_objectSpread({}, state.configuration), {}, {
        apiUrl: apiUrl,
        access_token: id
      })
    });
  });
}

function logout(state) {
  var _state$configuration2 = state.configuration,
      apiUrl = _state$configuration2.apiUrl,
      access_token = _state$configuration2.access_token;
  return (0, _axios["default"])({
    method: 'post',
    url: "".concat(apiUrl, "/users/logout?access_token=").concat(access_token)
  }).then(function () {
    console.log('logged out');
    delete state.configuration;
    return state;
  });
}
/**
 * Fetch the list of contacts within a particular outbreak using its ID.
 * @public
 * @example
 *  listContacts("343d-dc3e", // Outbreak Id
 *    state => {
 *       console.log(state);
 *    return state;
 *  });
 * @function
 * @param {string} id - Outbreak id
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function listContacts(id, callback) {
  return function (state) {
    var _state$configuration3 = state.configuration,
        apiUrl = _state$configuration3.apiUrl,
        access_token = _state$configuration3.access_token;
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: "/outbreaks/".concat(id, "/contacts"),
      params: {
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Get one or multiple contacts within an outbreak from a query filter
 * @public
 * @example
 *  getContact("343d-dc3e", {"where":{"firstName": "Luca"}}, state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {string} id - Outbreak id
 * @param {object} query - An object with a query filter parameter
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function getContact(id, query, callback) {
  return function (state) {
    var _state$configuration4 = state.configuration,
        apiUrl = _state$configuration4.apiUrl,
        access_token = _state$configuration4.access_token;
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      baseURL: apiUrl,
      url: "/outbreaks/".concat(id, "/contacts"),
      method: 'GET',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Upsert contact to godata using an external id to match a specific record.
 * @public
 * @example
 *  upsertContact("4dce-3eedce3-rd33", 'visualId',
 *    {
 *      firstName: 'Luca',
 *      gender: 'male',
 *      'age:years': '20'
 *      ...
 *    }
 *  )
 * @function
 * @param {string} id - Outbreak id
 * @param {string} externalId - External Id to match
 * @param {object} goDataContact - an object with some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function upsertContact(id, externalId, goDataContact, callback) {
  return function (state) {
    var _state$configuration5 = state.configuration,
        apiUrl = _state$configuration5.apiUrl,
        access_token = _state$configuration5.access_token;
    var data = (0, _languageCommon.expandReferences)(goDataContact)(state);
    var query = {
      where: {}
    };
    query.where[externalId] = data[externalId];
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      baseURL: apiUrl,
      url: "/outbreaks/".concat(id, "/contacts"),
      method: 'GET',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      if (response.data.length > 1) {
        console.log('Multiple contacts found. Aborting upsert.');
        console.log(response.data.length, 'contacts');
      } else if (response.data.length === 1) {
        console.log('Contact found. Performing update.');
        var contactId = response.data[0].id;
        return (0, _axios["default"])({
          method: 'PUT',
          baseURL: apiUrl,
          url: "/outbreaks/".concat(id, "/contacts/").concat(contactId),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      } else {
        console.log('No contact found. Performing create.');
        return (0, _axios["default"])({
          method: 'POST',
          baseURL: apiUrl,
          url: "/outbreaks/".concat(id, "/contacts/"),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      }
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Fetch the list of outbreaks
 * @public
 * @example
 *  listOutbreaks(state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function listOutbreaks(callback) {
  return function (state) {
    var _state$configuration6 = state.configuration,
        apiUrl = _state$configuration6.apiUrl,
        access_token = _state$configuration6.access_token;
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/outbreaks',
      params: {
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Get one or multiple outbreaks from a query filter
 * @public
 * @example
 *  getOutbreak({"where":{"name": "Outbreak demo"}}, state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {object} query - An object with a query filter parameter
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function getOutbreak(query, callback) {
  return function (state) {
    var _state$configuration7 = state.configuration,
        apiUrl = _state$configuration7.apiUrl,
        access_token = _state$configuration7.access_token;
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/outbreaks',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Upsert outbreak to godata
 * @public
 * @example
 *  upsertOutbreak({externalId: "3dec33-ede3", data: {...}})
 * @function
 * @param {object} outbreak - an object with an externalId and some outbreak data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function upsertOutbreak(outbreak, callback) {
  return function (state) {
    var _state$configuration8 = state.configuration,
        apiUrl = _state$configuration8.apiUrl,
        access_token = _state$configuration8.access_token;

    var _expandReferences = (0, _languageCommon.expandReferences)(outbreak)(state),
        externalId = _expandReferences.externalId,
        data = _expandReferences.data;

    var filter = JSON.stringify({
      where: {
        id: externalId
      }
    });
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/outbreaks',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      if (response.data.length > 0) {
        console.log('Outbreak found. Performing update.');
        var outbreakId = response.data[0].id;
        return (0, _axios["default"])({
          method: 'PUT',
          baseURL: apiUrl,
          url: "/outbreaks/".concat(outbreakId),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      } else {
        console.log('No outbreak found. Performing create.');
        return (0, _axios["default"])({
          method: 'POST',
          baseURL: apiUrl,
          url: '/outbreaks',
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      }
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Fetch the list of cases within a particular outbreak using its ID.
 * @public
 * @example
 *  listCases("343d-dc3e", state => {
 *    console.log(state);
 *    return state;
 *  });
 * @function
 * @param {string} id - Outbreak id
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function listCases(id, callback) {
  return function (state) {
    var _state$configuration9 = state.configuration,
        apiUrl = _state$configuration9.apiUrl,
        access_token = _state$configuration9.access_token;
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: "/outbreaks/".concat(id, "/cases"),
      params: {
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Get one or multiple cases within an outbreak from a query filter
 * @public
 * @example
 * getCase(
 *    '3b55-cdf4',
 *    { 'where.relationship': { active: true }, where: { firstName: 'Luca'} },
 *    state => {
 *      console.log(state);
 *      return state;
 *    }
 * );
 * @function
 * @param {string} id - Outbreak id
 * @param {object} query - An object with a query filter parameter
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function getCase(id, query, callback) {
  return function (state) {
    var _state$configuration10 = state.configuration,
        apiUrl = _state$configuration10.apiUrl,
        access_token = _state$configuration10.access_token;
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      baseURL: apiUrl,
      url: "/outbreaks/".concat(id, "/cases"),
      method: 'GET',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Upsert case to godata using an external id to mach a specific record
 * @public
 * @example
 *  upsertCase("4dce-3eedce3-rd33", 'visualId',
 *    data: state => {
 *      const patient = state.data.body;
 *       return {
 *         firstName: patient.Patient_name.split(' ')[0],
 *         lastName: patient.Patient_name.split(' ')[1],
 *         visualId: patient.Case_ID,
 *         'age:years': patient.Age_in_year,
 *         gender: patient.Sex,
 *       };
 *  })
 * @function
 * @param {string} id - Outbreak id
 * @param {string} externalId - External Id to match
 * @param {object} goDataCase - an object with some case data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function upsertCase(id, externalId, goDataCase, callback) {
  return function (state) {
    var _state$configuration11 = state.configuration,
        apiUrl = _state$configuration11.apiUrl,
        access_token = _state$configuration11.access_token;
    var data = (0, _languageCommon.expandReferences)(goDataCase)(state);
    var query = {
      where: {}
    };
    query.where[externalId] = data[externalId];
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      baseURL: apiUrl,
      url: "/outbreaks/".concat(id, "/cases"),
      method: 'GET',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      if (response.data.length > 1) {
        console.log(response.data.length, 'cases found; aborting upsert.');
      } else if (response.data.length === 1) {
        console.log('Case found. Performing update.');
        var caseId = response.data[0].id;
        data['id'] = caseId;
        delete data.visualId;
        return (0, _axios["default"])({
          method: 'PUT',
          baseURL: apiUrl,
          url: "/outbreaks/".concat(id, "/cases/").concat(caseId),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      } else {
        console.log('No case found. Performing create.');
        return (0, _axios["default"])({
          method: 'POST',
          baseURL: apiUrl,
          url: "/outbreaks/".concat(id, "/cases/"),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      }
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Fetch the list of locations
 * @public
 * @example
 *  listLocations(state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function listLocations(callback) {
  return function (state) {
    var _state$configuration12 = state.configuration,
        apiUrl = _state$configuration12.apiUrl,
        access_token = _state$configuration12.access_token;
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/locations',
      params: {
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Get one or multiple locations from a query filter
 * @public
 * @example
 *  getLocation({"where":{"name": "30 DE OCTUBRE"}}, state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {object} query - An object with a query filter parameter
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function getLocation(query, callback) {
  return function (state) {
    var _state$configuration13 = state.configuration,
        apiUrl = _state$configuration13.apiUrl,
        access_token = _state$configuration13.access_token;
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/locations',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Upsert location to godata
 * @public
 * @example
 *  upsertLocation('name', {...})
 * @function
 * @param {string} externalId - External Id to match
 * @param {object} goDataLocation - an object with some location data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function upsertLocation(externalId, goDataLocation, callback) {
  return function (state) {
    var _state$configuration14 = state.configuration,
        apiUrl = _state$configuration14.apiUrl,
        access_token = _state$configuration14.access_token;
    var data = (0, _languageCommon.expandReferences)(goDataLocation)(state);
    var query = {
      where: {}
    };
    query.where[externalId] = data[externalId];
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/locations',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      if (response.data.length > 1) {
        console.log(response.data.length, 'locations found; aborting upsert.');
        return response;
      } else if (response.data.length === 1) {
        console.log('Location found. Performing update.');
        var locationId = response.data[0].id;
        return (0, _axios["default"])({
          method: 'PUT',
          baseURL: apiUrl,
          url: "/locations/".concat(locationId),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      } else {
        console.log('No location found. Performing create.');
        return (0, _axios["default"])({
          method: 'POST',
          baseURL: apiUrl,
          url: '/locations',
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      }
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Fetch the list of reference data
 * @public
 * @example
 *  listReferenceData(state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function listReferenceData(callback) {
  return function (state) {
    var _state$configuration15 = state.configuration,
        apiUrl = _state$configuration15.apiUrl,
        access_token = _state$configuration15.access_token;
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/reference-data',
      params: {
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Get one or multiple reference data from a query filter
 * @public
 * @example
 *  getReferenceData({"where":{"categoryId": "LNG_REFERENCE_DATA_CATEGORY_CENTRE_NAME"}}, state => {
 *    console.log(state.data);
 *    return state;
 *  });
 * @function
 * @param {object} query - An object with a query filter parameter
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function getReferenceData(query, callback) {
  return function (state) {
    var _state$configuration16 = state.configuration,
        apiUrl = _state$configuration16.apiUrl,
        access_token = _state$configuration16.access_token;
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/reference-data',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      var nextState = (0, _languageCommon.composeNextState)(state, response.data);
      if (callback) return callback(nextState);
      return nextState;
    })["catch"](function (error) {
      return error;
    });
  };
}
/**
 * Upsert reference data to godata
 * @public
 * @example
 *  upsertReferenceData('id', {...})
 * @function
 * @param {string} externalId - External Id to match
 * @param {object} goDataReferenceData - an object with some reference data.
 * @param {function} callback - (Optional) Callback function
 * @returns {Operation}
 */


function upsertReferenceData(externalId, goDataReferenceData, callback) {
  return function (state) {
    var _state$configuration17 = state.configuration,
        apiUrl = _state$configuration17.apiUrl,
        access_token = _state$configuration17.access_token;
    var data = (0, _languageCommon.expandReferences)(goDataReferenceData)(state);
    var query = {
      where: {}
    };
    query.where[externalId] = data[externalId];
    var filter = JSON.stringify(query);
    return (0, _axios["default"])({
      method: 'GET',
      baseURL: apiUrl,
      url: '/reference-data',
      params: {
        filter: filter,
        access_token: access_token
      }
    }).then(function (response) {
      if (response.data.length > 1) {
        console.log(response.data.length, 'reference data found; aborting upsert.');
        return response;
      } else if (response.data.length === 1) {
        console.log('Reference data found. Performing update.');
        var referenceDataId = response.data[0].id;
        console.log('referenceDataId', referenceDataId);
        return (0, _axios["default"])({
          method: 'PUT',
          baseURL: apiUrl,
          url: "/reference-data/".concat(referenceDataId),
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      } else {
        console.log('No reference data found. Performing create.');
        return (0, _axios["default"])({
          method: 'POST',
          baseURL: apiUrl,
          url: '/reference-data',
          params: {
            access_token: access_token
          },
          data: data
        }).then(function (response) {
          var nextState = (0, _languageCommon.composeNextState)(state, response.data);
          if (callback) return callback(nextState);
          return nextState;
        })["catch"](function (error) {
          return error;
        });
      }
    })["catch"](function (error) {
      return error;
    });
  };
} // Note that we expose the entire axios package to the user here.


exports.axios = _axios["default"]; // What functions do you want from the common adaptor?
