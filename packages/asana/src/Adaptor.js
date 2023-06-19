import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

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
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Get a single task of a given project.
 * @public
 * @example
 * getTask("taskGid",
 *  {
 *    opt_fields: "name,notes,assignee"
 *  })
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {object} params - Query params to include.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTask(taskGid, params, callback) {
  return state => {
    const resolvedTaskGid = expandReferences(taskGid)(state);
    const { opt_fields } = expandReferences(params)(state);

    const { apiVersion, token } = state.configuration;

    const url = `https://app.asana.com/api/${apiVersion}/tasks/${resolvedTaskGid}`;

    const config = {
      url,
      headers: { Authorization: `Bearer ${token}` },
      params: {
        opt_fields,
      },
    };

    return http
      .get(config)(state)
      .then(response => {
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

/**
 * Get the list of tasks for a given project.
 * @public
 * @example
 * getTasks("projectGid",
 *  {
 *    opt_fields: "name,notes,assignee"
 *  })
 * @function
 * @param {string} projectGid - Globally unique identifier for the project
 * @param {object} params - Query params to include.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function getTasks(projectGid, params, callback) {
  return state => {
    const resolvedProjectGid = expandReferences(projectGid)(state);
    const { opt_fields } = expandReferences(params)(state);

    const { apiVersion, token } = state.configuration;

    const url = `https://app.asana.com/api/${apiVersion}/projects/${resolvedProjectGid}/tasks`;

    const config = {
      url,
      headers: { Authorization: `Bearer ${token}` },
      params: {
        opt_fields,
      },
    };

    return http
      .get(config)(state)
      .then(response => {
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

/**
 * Update a specific task.
 * @public
 * @example
 * updateTask("taskGid",
 *  {
 *    name: 'test', "approval_status": "pending", "assignee": "12345"
 *  }
 * )
 * @function
 * @param {string} taskGid - Globally unique identifier for the task
 * @param {object} params - Body parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function updateTask(taskGid, params, callback) {
  return state => {
    const resolvedTaskGid = expandReferences(taskGid)(state);
    const resolvedParams = expandReferences(params)(state);

    const { apiVersion, token } = state.configuration;

    const url = `https://app.asana.com/api/${apiVersion}/tasks/${resolvedTaskGid}/`;

    const config = {
      url,
      data: { data: resolvedParams },
      headers: { Authorization: `Bearer ${token}` },
    };

    return http
      .put(config)(state)
      .then(response => {
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(e => {
        console.log('Asana says:', e.response.data);
        throw e;
      });
  };
}

/**
 * Create a task.
 * @public
 * @example
 * createTask(
 *  {
 *    name: 'test', "approval_status": "pending", "assignee": "12345"
 *  }
 * )
 * @function
 * @param {object} params - Body parameters
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function createTask(params, callback) {
  return state => {
    const resolvedParams = expandReferences(params)(state);

    const { apiVersion, token } = state.configuration;

    const url = `https://app.asana.com/api/${apiVersion}/tasks/`;

    const config = {
      url,
      data: { data: resolvedParams },
      headers: { Authorization: `Bearer ${token}` },
    };

    return http
      .post(config)(state)
      .then(response => {
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      })
      .catch(e => {
        console.log('Asana says:', e.response.data);
        throw e;
      });
  };
}

/**
 * Update or create a task.
 * @public
 * @example
 * upsertTask(
 *  "1201382240880",
 *  {
 *    "externalId": "name",
 *    "data": {
 *      name: 'test', "approval_status": "pending", "assignee": "12345"
 *    }
 *
 *  }
 * )
 * @function
 * @param {string} projectGid - Globally unique identifier for the project
 * @param {object} params - an object with an externalId and some task data.
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function upsertTask(projectGid, params, callback) {
  return state => {
    const resolvedProjectGid = expandReferences(projectGid)(state);
    const { externalId, data } = expandReferences(params)(state);

    const { apiVersion, token } = state.configuration;

    const url = `https://app.asana.com/api/${apiVersion}/projects/${resolvedProjectGid}/tasks`;

    const config = {
      url,
      headers: { Authorization: `Bearer ${token}` },
      params: {
        opt_fields: `${externalId}`,
      },
    };

    return http
      .get(config)(state)
      .then(response => {
        const matchingTask = response.data.data.find(
          task => task[externalId] === data[externalId]
        );
        if (matchingTask) {
          console.log('Matching task found. Performing update.');
          console.log('Data to update', data);
          // projects and workspace ids should ne be included to update
          delete data.projects;
          delete data.workspace;
          return updateTask(matchingTask.gid, data, callback)(state);
        } else {
          console.log('No matching task found. Performing create.');
          return createTask(data, callback)(state);
        }
      });
  };
}

export {
  alterState,
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
