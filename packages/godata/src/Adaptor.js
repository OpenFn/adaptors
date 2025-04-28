import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';
import axios from 'axios';

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
      /* logout */
    )({ ...initialState, ...state }).catch(e => {
      console.error(e);
      /* logout(); */
      process.exit(1);
    });
  };
}

function login(state) {
  const { apiUrl, password, email } = state.configuration;

  return axios({
    method: 'post',
    url: `${apiUrl}/users/login`,
    data: {
      email,
      password,
    },
  }).then(response => {
    console.log('Authentication succeeded.');
    const { id } = response.data;
    return {
      ...state,
      configuration: { ...state.configuration, apiUrl, access_token: id },
    };
  });
}

function logout(state) {
  const { apiUrl, access_token } = state.configuration;
  return axios({
    method: 'post',
    url: `${apiUrl}/users/logout?access_token=${access_token}`,
  }).then(() => {
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
export function listContacts(id, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: `/outbreaks/${id}/contacts`,
      params: {
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function getContact(id, query, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const filter = JSON.stringify(query);

    return axios({
      baseURL: apiUrl,
      url: `/outbreaks/${id}/contacts`,
      method: 'GET',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function upsertContact(id, externalId, goDataContact, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const [data] = expandReferences(state, goDataContact);

    const query = { where: {} };
    query.where[externalId] = data[externalId];

    const filter = JSON.stringify(query);

    return axios({
      baseURL: apiUrl,
      url: `/outbreaks/${id}/contacts`,
      method: 'GET',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        if (response.data.length > 1) {
          console.log('Multiple contacts found. Aborting upsert.');
          console.log(response.data.length, 'contacts');
        } else if (response.data.length === 1) {
          console.log('Contact found. Performing update.');
          const contactId = response.data[0].id;
          return axios({
            method: 'PUT',
            baseURL: apiUrl,
            url: `/outbreaks/${id}/contacts/${contactId}`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        } else {
          console.log('No contact found. Performing create.');
          return axios({
            method: 'POST',
            baseURL: apiUrl,
            url: `/outbreaks/${id}/contacts/`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        }
      })
      .catch(error => {
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
export function listOutbreaks(callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/outbreaks',
      params: {
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function getOutbreak(query, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const filter = JSON.stringify(query);

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/outbreaks',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function upsertOutbreak(outbreak, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const [resolvedOutbreak] = expandReferences(state, outbreak);
    const {externalId, data} =  resolvedOutbreak;

    const filter = JSON.stringify({ where: { id: externalId } });

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/outbreaks',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        if (response.data.length > 0) {
          console.log('Outbreak found. Performing update.');
          const outbreakId = response.data[0].id;
          return axios({
            method: 'PUT',
            baseURL: apiUrl,
            url: `/outbreaks/${outbreakId}`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        } else {
          console.log('No outbreak found. Performing create.');
          return axios({
            method: 'POST',
            baseURL: apiUrl,
            url: '/outbreaks',
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        }
      })
      .catch(error => {
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
export function listCases(id, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: `/outbreaks/${id}/cases`,
      params: {
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function getCase(id, query, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const filter = JSON.stringify(query);

    return axios({
      baseURL: apiUrl,
      url: `/outbreaks/${id}/cases`,
      method: 'GET',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function upsertCase(id, externalId, goDataCase, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const [data] = expandReferences(state, goDataCase);

    const query = { where: {} };
    query.where[externalId] = data[externalId];

    const filter = JSON.stringify(query);

    return axios({
      baseURL: apiUrl,
      url: `/outbreaks/${id}/cases`,
      method: 'GET',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        if (response.data.length > 1) {
          console.log(response.data.length, 'cases found; aborting upsert.');
        } else if (response.data.length === 1) {
          console.log('Case found. Performing update.');
          const caseId = response.data[0].id;
          data['id'] = caseId;
          delete data.visualId;
          return axios({
            method: 'PUT',
            baseURL: apiUrl,
            url: `/outbreaks/${id}/cases/${caseId}`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        } else {
          console.log('No case found. Performing create.');
          return axios({
            method: 'POST',
            baseURL: apiUrl,
            url: `/outbreaks/${id}/cases/`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        }
      })
      .catch(error => {
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
export function listLocations(callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/locations',
      params: {
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function getLocation(query, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const filter = JSON.stringify(query);

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/locations',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function upsertLocation(externalId, goDataLocation, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const [data] = expandReferences(state, goDataLocation);

    const query = { where: {} };
    query.where[externalId] = data[externalId];

    const filter = JSON.stringify(query);

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/locations',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        if (response.data.length > 1) {
          console.log(
            response.data.length,
            'locations found; aborting upsert.'
          );
          return response;
        } else if (response.data.length === 1) {
          console.log('Location found. Performing update.');
          const locationId = response.data[0].id;
          return axios({
            method: 'PUT',
            baseURL: apiUrl,
            url: `/locations/${locationId}`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        } else {
          console.log('No location found. Performing create.');
          return axios({
            method: 'POST',
            baseURL: apiUrl,
            url: '/locations',
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        }
      })
      .catch(error => {
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
export function listReferenceData(callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/reference-data',
      params: {
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function getReferenceData(query, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const filter = JSON.stringify(query);

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/reference-data',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        const nextState = composeNextState(state, response.data);
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(error => {
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
export function upsertReferenceData(externalId, goDataReferenceData, callback) {
  return state => {
    const { apiUrl, access_token } = state.configuration;

    const [data] = expandReferences(state, goDataReferenceData);

    const query = { where: {} };
    query.where[externalId] = data[externalId];

    const filter = JSON.stringify(query);

    return axios({
      method: 'GET',
      baseURL: apiUrl,
      url: '/reference-data',
      params: {
        filter,
        access_token,
      },
    })
      .then(response => {
        if (response.data.length > 1) {
          console.log(
            response.data.length,
            'reference data found; aborting upsert.'
          );
          return response;
        } else if (response.data.length === 1) {
          console.log('Reference data found. Performing update.');
          const referenceDataId = response.data[0].id;
          console.log('referenceDataId', referenceDataId);
          return axios({
            method: 'PUT',
            baseURL: apiUrl,
            url: `/reference-data/${referenceDataId}`,
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        } else {
          console.log('No reference data found. Performing create.');
          return axios({
            method: 'POST',
            baseURL: apiUrl,
            url: '/reference-data',
            params: {
              access_token,
            },
            data,
          })
            .then(response => {
              const nextState = composeNextState(state, response.data);
              if (callback) return callback(nextState);
              return nextState;
            })
            .catch(error => {
              return error;
            });
        }
      })
      .catch(error => {
        return error;
      });
  };
}

// Note that we expose the entire axios package to the user here.
export { axios };

// What functions do you want from the common adaptor?
export {
  fn,
  fnIf,
  alterState,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
